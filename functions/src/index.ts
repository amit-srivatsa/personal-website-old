import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const cors = require('cors');

admin.initializeApp();

const corsHandler = cors({ origin: true });

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

    // specific key check can be added here if needed, but relying on client-side gate for now per instructions

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

