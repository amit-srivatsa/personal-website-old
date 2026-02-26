import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const cors = require('cors');

admin.initializeApp();

const allowedOrigins = [
  'https://amitsrivatsa.com',
  'http://localhost:3000',
];
const corsHandler = cors({ origin: allowedOrigins });

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
    const adminKey = functions.config().admin?.key;

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
