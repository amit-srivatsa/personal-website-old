import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
const cors = require('cors');

admin.initializeApp();

const allowedOrigins = [
  'https://amitsrivatsa.com',
  'http://localhost:3000',
];
const corsHandler = cors({ origin: allowedOrigins });

// Secret Manager client — uses Application Default Credentials automatically
// when running inside Firebase Functions / GCP.
const secretClient = new SecretManagerServiceClient();

// In-memory cache so we only call Secret Manager once per warm instance.
let cachedAdminKey: string | null = null;

/**
 * Fetches the admin API key from Google Cloud Secret Manager.
 * The secret must be created before deploying:
 *   gcloud secrets create admin-api-key --data-file=-  <<< "your-secret-value"
 * The Firebase Functions service account must have the
 * roles/secretmanager.secretAccessor role on this secret.
 */
async function getAdminKey(): Promise<string | null> {
  if (cachedAdminKey) return cachedAdminKey;

  try {
    const projectId = process.env.GCLOUD_PROJECT ?? process.env.GOOGLE_CLOUD_PROJECT;
    if (!projectId) {
      functions.logger.error("GCLOUD_PROJECT env var not set — cannot resolve secret name.");
      return null;
    }

    const [version] = await secretClient.accessSecretVersion({
      name: `projects/${projectId}/secrets/admin-api-key/versions/latest`,
    });

    const payload = version.payload?.data?.toString() ?? null;
    if (payload) cachedAdminKey = payload;
    return cachedAdminKey;
  } catch (err) {
    functions.logger.error("Failed to fetch admin-api-key from Secret Manager:", err);
    return null;
  }
}

export const subscribe = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const { email, source } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    try {
      const db = admin.firestore();
      await db.collection("subscribers").add({
        email,
        source: source || 'newsletter',
        subscribedAt: new Date(),
      });

      res.status(200).json({ message: "Subscription successful!" });
    } catch (error) {
      functions.logger.error("Error subscribing:", error);
      res.status(500).json({ message: "Something went wrong." });
    }
  });
});

export const getSubscribers = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "GET") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const providedKey = req.headers['x-admin-key'];
    const adminKey = await getAdminKey();

    if (!providedKey || !adminKey || providedKey !== adminKey) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const db = admin.firestore();
      const snapshot = await db.collection("subscribers").orderBy("subscribedAt", "desc").get();
      const subscribers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.status(200).json(subscribers);
    } catch (error) {
      functions.logger.error("Error fetching subscribers:", error);
      res.status(500).json({ message: "Something went wrong." });
    }
  });
});
