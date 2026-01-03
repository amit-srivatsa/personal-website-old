"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscribers = exports.subscribe = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
admin.initializeApp();
const corsHandler = cors({ origin: true });
exports.subscribe = functions.https.onRequest(async (req, res) => {
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
        }
        catch (error) {
            functions.logger.error("Error subscribing:", error);
            res.status(500).json({ message: "Something went wrong." });
        }
    });
});
exports.getSubscribers = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== "GET") {
            res.status(405).send("Method Not Allowed");
            return;
        }
        // specific key check can be added here if needed, but relying on client-side gate for now per instructions
        try {
            const db = admin.firestore();
            const snapshot = await db.collection("subscribers").orderBy("subscribedAt", "desc").get();
            const subscribers = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            res.status(200).json(subscribers);
        }
        catch (error) {
            functions.logger.error("Error fetching subscribers:", error);
            res.status(500).json({ message: "Something went wrong." });
        }
    });
});
__exportStar(require("./oauth"), exports);
//# sourceMappingURL=index.js.map