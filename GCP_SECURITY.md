# Security Notes

## What was fixed

### Admin key no longer exposed in the client bundle

**Before:** `src/components/Subscribers.tsx` compared the admin password against
`import.meta.env.VITE_ADMIN_KEY` inside browser code. The `VITE_` prefix causes
Vite to inline the value into the JS bundle at build time — meaning anyone who
opened DevTools could read the key and call `/api/subscribers` directly to harvest
subscriber emails.

**After:** The password is sent to the server in an `x-admin-key` header. The
server compares it against `functions.config().admin.key`, which is stored in
Firebase's encrypted runtime config and never reaches the client.

## One-time setup

Set the admin key in Firebase Functions config:

```bash
firebase functions:config:set admin.key="replace-with-a-strong-random-value"
firebase deploy --only functions
```

To read it back and verify:

```bash
firebase functions:config:get admin
```
