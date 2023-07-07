const crypto = require("crypto");
const https = require("https");
const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);
const encryption_key = crypto.randomBytes(32);

function encodeRequest(payload) {
  console.log(JSON.stringify(payload), "\n");
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

function signRequest(payload) {
  return crypto.createHash("sha256").update(payload).digest("hex");
}

module.exports = {
  encodeRequest,
  signRequest,
};
