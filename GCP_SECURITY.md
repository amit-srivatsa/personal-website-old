# GCP Security Best Practices

This document covers the five credential-security recommendations applied to this project
(Firebase Hosting + Firebase Functions + Firestore, built with Astro/React/TypeScript).

---

## Audit: What Was Found in the Codebase

| Credential | Where referenced | Risk before this PR |
|---|---|---|
| `NOTION_API_KEY` | `scripts/setup-notion.mjs`, `scripts/sync-notion.mjs` | Loaded from `process.env` — safe, never hardcoded |
| `NOTION_DATABASE_ID` | Same scripts | Same as above |
| `IMAGEKIT_PRIVATE_KEY` | `scripts/sync-notion.mjs` | Same as above |
| `PUBLIC_GA_MEASUREMENT_ID` | Build env var | Public identifier — low risk |
| `FIREBASE_SERVICE_ACCOUNT` | `.github/workflows/deploy.yml` | **Long-lived JSON key stored as GitHub Secret** — replaced by WIF |
| `admin.key` (Functions config) | `functions/src/index.ts` | **Stored in Firebase config, not Secret Manager** — now migrated |
| `VITE_ADMIN_KEY` | `src/components/Subscribers.tsx` | **CRITICAL: `VITE_` prefix bundles the key into client-side JS** — removed |

Good news: no secrets are hardcoded or committed to the repository. The changes in this PR
close the remaining three gaps listed above.

---

## 1. Zero-Code Storage — Secret Manager Migration

### What changed in this PR

| File | Change |
|---|---|
| `functions/src/index.ts` | Replaced `functions.config().admin.key` with a Secret Manager lookup |
| `functions/package.json` | Added `@google-cloud/secret-manager` dependency |
| `src/components/Subscribers.tsx` | Removed client-side `VITE_ADMIN_KEY` comparison; key is now verified server-side only |
| `.github/workflows/deploy.yml` | Replaced `FIREBASE_SERVICE_ACCOUNT` JSON key with Workload Identity Federation |

### One-time setup: create the secret

```bash
# Create the secret
echo -n "replace-with-a-strong-random-value" | \
  gcloud secrets create admin-api-key \
    --data-file=- \
    --project=YOUR_PROJECT_ID

# Grant the Firebase Functions service account read access
gcloud secrets add-iam-policy-binding admin-api-key \
  --member="serviceAccount:YOUR_PROJECT_ID@appspot.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor" \
  --project=YOUR_PROJECT_ID
```

### One-time setup: Workload Identity Federation for GitHub Actions

Replaces the `FIREBASE_SERVICE_ACCOUNT` JSON key with short-lived OIDC tokens.

```bash
PROJECT_ID="YOUR_PROJECT_ID"
GITHUB_ORG="your-github-username-or-org"
REPO="personal-website"

# 1. Create a Workload Identity Pool
gcloud iam workload-identity-pools create "github-pool" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions pool"

# 2. Add GitHub as an OIDC provider
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# 3. Create a dedicated service account for CI/CD
gcloud iam service-accounts create "github-ci-sa" \
  --project="${PROJECT_ID}" \
  --display-name="GitHub CI/CD"

# 4. Allow the GitHub Actions OIDC token to impersonate the service account
POOL_ID=$(gcloud iam workload-identity-pools describe "github-pool" \
  --project="${PROJECT_ID}" --location="global" --format="value(name)")

gcloud iam service-accounts add-iam-policy-binding \
  "github-ci-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${POOL_ID}/attribute.repository/${GITHUB_ORG}/${REPO}"

# 5. Set two GitHub Actions secrets (replace FIREBASE_SERVICE_ACCOUNT with these):
#    WIF_PROVIDER  → projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider
#    WIF_SERVICE_ACCOUNT → github-ci-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

After completing the above, delete the `FIREBASE_SERVICE_ACCOUNT` secret from GitHub.

### Secret Manager access pattern in Node.js / TypeScript

The pattern used in `functions/src/index.ts`:

```typescript
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const secretClient = new SecretManagerServiceClient();
// Application Default Credentials (ADC) are used automatically on GCP.

async function getSecret(secretName: string): Promise<string> {
  const projectId = process.env.GCLOUD_PROJECT ?? process.env.GOOGLE_CLOUD_PROJECT;
  const [version] = await secretClient.accessSecretVersion({
    name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
  });
  return version.payload?.data?.toString() ?? "";
}
```

For build-time scripts (running locally or in CI), the Notion and ImageKit keys are fetched
from environment variables that GitHub Actions injects from GitHub Secrets. This is acceptable
because the scripts run in an ephemeral CI environment; the values are never written to disk
or bundled into the output. As an additional hardening step you can migrate them to Secret
Manager as well:

```bash
# Store Notion API key in Secret Manager
echo -n "ntn_your_actual_token" | \
  gcloud secrets create notion-api-key --data-file=- --project=YOUR_PROJECT_ID

# Grant the CI service account access
gcloud secrets add-iam-policy-binding notion-api-key \
  --member="serviceAccount:github-ci-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor" \
  --project=YOUR_PROJECT_ID
```

Then update `scripts/sync-notion.mjs` to fetch secrets at runtime using `@google-cloud/secret-manager`
and remove the GitHub Secrets for these values.

---

## 2. Disable Dormant Keys — Audit Checklist

### Service Account Keys

```bash
PROJECT_ID="YOUR_PROJECT_ID"

# List all service accounts
gcloud iam service-accounts list --project="${PROJECT_ID}"

# For each service account, list its keys and their last-use time
gcloud iam service-accounts keys list \
  --iam-account="SA_EMAIL@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${PROJECT_ID}" \
  --format="table(name.basename(), validAfterTime, validBeforeTime, keyType)"

# Review Cloud Audit Logs for key usage over the past 30 days
# (requires Log Analytics or BigQuery export)
gcloud logging read \
  'protoPayload.authenticationInfo.serviceAccountKeyName!="" AND timestamp>="2026-01-27T00:00:00Z"' \
  --project="${PROJECT_ID}" \
  --limit=100 \
  --format="table(timestamp, protoPayload.authenticationInfo.principalEmail, protoPayload.authenticationInfo.serviceAccountKeyName)"

# Disable a specific key that shows no activity
gcloud iam service-accounts keys disable KEY_ID \
  --iam-account="SA_EMAIL@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${PROJECT_ID}"

# After confirming the disabled key causes no breakage, delete it
gcloud iam service-accounts keys delete KEY_ID \
  --iam-account="SA_EMAIL@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${PROJECT_ID}"
```

### API Keys

```bash
# List all API keys in the project
gcloud services api-keys list --project="${PROJECT_ID}"

# Show full details (restrictions, creation time) for a specific key
gcloud services api-keys get-key-string API_KEY_UID --project="${PROJECT_ID}"
gcloud services api-keys describe API_KEY_UID --project="${PROJECT_ID}"

# Check usage via Cloud Monitoring (requests in the last 30 days)
# Navigate in the Cloud Console: APIs & Services → Credentials → click the key → View usage

# Disable an unused API key
gcloud services api-keys update API_KEY_UID \
  --flags-file=- <<EOF
{"clear-restrictions": true}
EOF
# Then from the console: APIs & Services → Credentials → Actions → Disable

# Delete an unused API key
gcloud services api-keys delete API_KEY_UID --project="${PROJECT_ID}"
```

### 30-day dormancy checklist

- [ ] Run `gcloud iam service-accounts keys list` for every service account.
- [ ] Cross-reference key IDs against Cloud Audit Logs for the past 30 days.
- [ ] Keys with zero log entries → disable immediately, schedule deletion after 7-day observation.
- [ ] Run `gcloud services api-keys list` and check usage graphs in the Console.
- [ ] API keys with no requests in 30 days → disable; delete after confirming no impact.
- [ ] Schedule a monthly calendar reminder to repeat this audit.
- [ ] Consider enabling the **IAM Deny policy** or **Service Account Insights** in the console
      for continuous automated detection.

---

## 3. Enforce API Restrictions — API Keys

### Google Analytics (`PUBLIC_GA_MEASUREMENT_ID`)

The `G-XXXXXXXXXX` measurement ID is a public identifier embedded in the client-side bundle.
It is **not** a secret API key, but it should still be locked down to prevent unauthorised
data collection:

- **HTTP Referrer restriction**: Add `https://amitsrivatsa.com/*` and `http://localhost:3000/*`
  (for development) as the only allowed referrers.

```bash
# Example: create a restricted API key for the GA Data API if you ever call it server-side
gcloud services api-keys create \
  --display-name="GA Reporting key" \
  --api-target=service="analyticsdata.googleapis.com" \
  --allowed-referrers="https://amitsrivatsa.com/*" \
  --project="${PROJECT_ID}"
```

### ImageKit (`IMAGEKIT_PRIVATE_KEY`)

ImageKit private keys are used server-side only (in CI) for uploading images. Restrictions:

- **Never expose this key in client-side code or `VITE_` env vars.**
- In ImageKit's dashboard → API Keys, set the key's **IP whitelist** to your CI runner's
  egress IPs (GitHub Actions: `https://api.github.com/meta` lists current ranges).
- Create a **dedicated restricted key** with only the `upload` permission scope rather than
  using an admin/full-access key.

### Notion (`NOTION_API_KEY`)

The Notion integration token is scoped at creation time to specific databases. Verify:

```
Notion Dashboard → Settings → Integrations → your integration
  ✓ Capabilities: Read/Update content only (no Insert unless needed for setup-notion.mjs)
  ✓ Connected pages: only the blog database
```

### General API key hardening checklist

- [ ] Every API key has at least one **API restriction** (allowed services list).
- [ ] Browser/client keys have **HTTP Referrer** restrictions.
- [ ] Server/CI keys have **IP address** restrictions.
- [ ] No key has both client and server permissions — create separate keys per environment.
- [ ] Rotate all keys annually (or whenever a team member with access leaves).

---

## 4. Apply Least Privilege — IAM Permissions

### Current service accounts in this project

| Service Account | Default role | Recommended scoped role(s) |
|---|---|---|
| `YOUR_PROJECT_ID@appspot.gserviceaccount.com` (Firebase Functions / App Engine default) | `roles/editor` (⚠️ too broad) | See below |
| `firebase-adminsdk-*@YOUR_PROJECT_ID.iam.gserviceaccount.com` | Firebase Admin SDK defaults | Keep as-is (Firebase-managed) |
| `github-ci-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com` (new, from WIF setup above) | None | See below |

### Overly-permissive roles to remove

| Role to remove | Why it is dangerous |
|---|---|
| `roles/editor` | Grants read/write on almost every GCP resource |
| `roles/owner` | Full control including IAM management |
| `roles/iam.serviceAccountAdmin` | Can create/delete any service account |
| `roles/storage.admin` | Full control of all GCS buckets |

### Least-privilege replacements for Firebase Functions SA

The Firebase Functions default SA (`appspot.gserviceaccount.com`) needs:

```bash
SA="YOUR_PROJECT_ID@appspot.gserviceaccount.com"
PROJECT_ID="YOUR_PROJECT_ID"

# Firestore read/write (subscribers collection)
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${SA}" \
  --role="roles/datastore.user"

# Secret Manager read (admin-api-key secret)
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${SA}" \
  --role="roles/secretmanager.secretAccessor"

# Cloud Logging write (functions.logger)
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${SA}" \
  --role="roles/logging.logWriter"

# Remove the overly broad editor role
gcloud projects remove-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${SA}" \
  --role="roles/editor"
```

### Least-privilege for the GitHub CI service account

```bash
CI_SA="github-ci-sa@${PROJECT_ID}.iam.gserviceaccount.com"

# Firebase Hosting deploy
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${CI_SA}" \
  --role="roles/firebasehosting.admin"

# Firebase Functions deploy
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${CI_SA}" \
  --role="roles/cloudfunctions.developer"

# Allow CI to act as the Firebase Admin SA during deploy (if required by Firebase CLI)
gcloud iam service-accounts add-iam-policy-binding \
  "${PROJECT_ID}@appspot.gserviceaccount.com" \
  --member="serviceAccount:${CI_SA}" \
  --role="roles/iam.serviceAccountUser" \
  --project="${PROJECT_ID}"
```

### Using IAM Recommender to prune unused permissions

```bash
# Enable the IAM Recommender API
gcloud services enable recommender.googleapis.com --project="${PROJECT_ID}"

# List role recommendations for the project
gcloud recommender recommendations list \
  --project="${PROJECT_ID}" \
  --location=global \
  --recommender=google.iam.policy.Recommender \
  --format="table(name, stateInfo.state, primaryImpact.securityProjection.details)"

# Apply a specific recommendation
gcloud recommender recommendations mark-claimed RECOMMENDATION_ID \
  --project="${PROJECT_ID}" \
  --location=global \
  --recommender=google.iam.policy.Recommender \
  --etag=ETAG

# After review, apply the recommended role replacement
gcloud recommender recommendations apply RECOMMENDATION_ID \
  --project="${PROJECT_ID}" \
  --location=global \
  --recommender=google.iam.policy.Recommender \
  --etag=ETAG
```

---

## 5. Mandatory Rotation — Service Account Key Policies

### Option A: Enforce a maximum key lifetime (Org Policy)

Applies to projects under a Google Cloud Organisation. Limits how long a user-managed
service account key may exist (e.g. 90 days = 2160 hours).

```bash
ORG_ID="YOUR_ORGANIZATION_ID"  # gcloud organizations list

# Set the expiry policy at the organisation level
gcloud org-policies set-policy - --organization="${ORG_ID}" <<EOF
name: organizations/${ORG_ID}/policies/iam.serviceAccountKeyExpiryHours
spec:
  rules:
  - values:
      allowedValues:
      - "2160"   # 90 days; minimum allowed is 24 hours
EOF

# Verify the policy
gcloud org-policies describe iam.serviceAccountKeyExpiryHours \
  --organization="${ORG_ID}"
```

To apply at project level instead of org level:

```bash
gcloud resource-manager org-policies set-policy - --project="${PROJECT_ID}" <<EOF
name: projects/${PROJECT_ID}/policies/iam.serviceAccountKeyExpiryHours
spec:
  rules:
  - values:
      allowedValues:
      - "2160"
EOF
```

### Option B: Disable user-managed key creation entirely (recommended)

If Workload Identity Federation covers all access needs (as it does for this project after
the changes in this PR), prevent new JSON keys from being created at all.

```bash
# At organisation level
gcloud org-policies set-policy - --organization="${ORG_ID}" <<EOF
name: organizations/${ORG_ID}/policies/iam.managed.disableServiceAccountKeyCreation
spec:
  rules:
  - enforce: true
EOF

# At project level
gcloud org-policies set-policy - --project="${PROJECT_ID}" <<EOF
name: projects/${PROJECT_ID}/policies/iam.managed.disableServiceAccountKeyCreation
spec:
  rules:
  - enforce: true
EOF

# Verify
gcloud org-policies describe iam.managed.disableServiceAccountKeyCreation \
  --project="${PROJECT_ID}"
```

> **Note**: Enable Option B only after verifying that no workload still relies on a JSON key.
> Delete existing keys first, confirm deploys succeed with WIF, then enforce the policy.

### Rotation checklist

- [ ] Org policy `iam.serviceAccountKeyExpiryHours` set to ≤ 2160 (90 days).
- [ ] All remaining JSON keys inventoried; scheduled for deletion once WIF is validated.
- [ ] `iam.managed.disableServiceAccountKeyCreation` enforced once zero JSON keys remain.
- [ ] GitHub Secret `FIREBASE_SERVICE_ACCOUNT` deleted after WIF migration is confirmed working.
- [ ] Calendar reminder set to audit key inventory every 60 days.
