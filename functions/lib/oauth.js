"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = exports.auth = void 0;
const functions = require("firebase-functions");
const cors = require("cors");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const node_fetch_1 = require("node-fetch");
const corsHandler = cors({ origin: true });
// Configuration - Env vars must be set in Firebase Config
// firebase functions:config:set github.client_id="YOUR_ID" github.client_secret="YOUR_SECRET"
exports.auth = functions.https.onRequest((req, res) => {
    const { provider } = req.query;
    if (provider !== "github") {
        res.status(400).send("Only GitHub is supported.");
        return;
    }
    const client_id = functions.config().github ? functions.config().github.client_id : process.env.GITHUB_CLIENT_ID;
    if (!client_id) {
        res.status(500).send("GitHub Client ID not configured.");
        return;
    }
    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
    res.redirect(redirectUri);
});
exports.callback = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        const { code } = req.query;
        if (!code) {
            res.status(400).send("No code provided.");
            return;
        }
        const client_id = functions.config().github ? functions.config().github.client_id : process.env.GITHUB_CLIENT_ID;
        const client_secret = functions.config().github ? functions.config().github.client_secret : process.env.GITHUB_CLIENT_SECRET;
        if (!client_id || !client_secret) {
            res.status(500).send("GitHub config missing.");
            return;
        }
        try {
            const tokenResponse = await (0, node_fetch_1.default)("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    client_id,
                    client_secret,
                    code,
                }),
            });
            const tokenData = await tokenResponse.json();
            const content = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Authentication Success</title>
                    <style>
                        body { font-family: sans-serif; text-align: center; padding: 40px; }
                        button { padding: 10px 20px; font-size: 16px; cursor: pointer; background: #000; color: #fff; border: none; border-radius: 4px; }
                        .success { color: green; margin-bottom: 20px; }
                    </style>
                </head>
                <body>
                    <h2 class="success">Authentication Successful!</h2>
                    <p>You are now logged in. This window should close automatically.</p>
                    <p>If not, please click the button below to complete the process.</p>
                    
                    <button id="retryBtn">Complete Login</button>

                    <script>
                        (function() {
                            const rawData = ${JSON.stringify(tokenData)};
                            // Normalize for Decap CMS which often looks for 'token'
                            const normalizeData = {
                                token: rawData.access_token,
                                ...rawData
                            };
                            
                            function sendAuthMessage() {
                                console.log('Sending auth message...');
                                
                                // 1. String format with normalized data (token property)
                                const msg = 'authorization:github:success:' + JSON.stringify(normalizeData);
                                
                                if (window.opener) {
                                    console.log('Posting to opener', msg);
                                    window.opener.postMessage(msg, '*');
                                } else {
                                    console.error("Window opener not found");
                                }
                            }
                            
                            // Send repeatedly for a short while to ensure receipt
                            sendAuthMessage();
                            setTimeout(sendAuthMessage, 500);
                            setTimeout(sendAuthMessage, 1000);

                            document.getElementById('retryBtn').addEventListener('click', function() {
                                sendAuthMessage();
                                alert("Login signal sent.");
                            });

                            // Longer timeout before auto-close to ensure message is processed
                            setTimeout(function() {
                                if (window.opener) {
                                     window.close();
                                }
                            }, 3000);
                        })()
                    </script>
                </body>
                </html>
            `;
            res.send(content);
        }
        catch (error) {
            functions.logger.error("OAuth error", error);
            res.status(500).send("Authentication failed");
        }
    });
});
//# sourceMappingURL=oauth.js.map