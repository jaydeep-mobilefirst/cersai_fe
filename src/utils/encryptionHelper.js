const crypto = require("crypto-browserify");
const forge = require("node-forge");

// Function to encrypt payload
function encryptPayload(payload) {
  const sskey = process?.env?.REACT_APP_sskey || "1234567890123456"; // Symmetric key for AES
  // Protean public key (you can import this from a different config file if needed)
  const publicKeyString =
    process?.env?.REACT_APP_publicKeyString ||
    `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArwofvqJ6x5D7i0enHIYf
oUCb/Bs8JJAKhx9JTykLWsDmos+gG3qYshv5DjBBnLNoWc+1GE046/fB0IwcRpH8
G2jUcgKpft25687wx+i/EHObtUlTySiT42LjW/fwm4kB4ZImyySjvf4aiNxFPDIj
axyO/pW13X5cyjZsgAAwaWrZklT3xDgrpxgRVsrP16sz31RJcTMJkit9WVvnjH+V
oPSS/iCVgap+JJz6xo7oH4pyDdegwD78wtM2yAtkfW4AxNuiMGSELsABAWlhcB3s
5uK9yGIVkEIUUVc9XrYHKGnTjHBRqT4s5nuqVnpFKH2uu4eXtJzFdICBn2S3f2p8
awIDAQAB
-----END PUBLIC KEY-----`;
  console.log({ sskey, publicKeyString }, "sskey");
  const publicKey = forge.pki.publicKeyFromPem(publicKeyString);

  // Encrypt the symmetric key with RSA-OAEP
  const sskeyBytes = Buffer.from(sskey, "utf8").toString();
  const encryptedSymmetricKey = publicKey.encrypt(sskeyBytes, "RSA-OAEP", {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });

  // Encrypt the actual data with AES
  const encryptedData = encrypt(payload, sskey);

  // Calculate HMAC for integrity and change HMAC to hash in the return object
  const hash = calculateHmacSHA256(sskey, JSON.stringify(payload));

  // Return encrypted data, key, and hash
  return {
    encryptedData,
    encryptedKey: Buffer.from(
      forge.util.bytesToHex(encryptedSymmetricKey),
      "hex"
    ).toString("base64"),
    hash,
  };
}

// Function to calculate HMAC SHA256 hash
function calculateHmacSHA256(plainSymmetricKeyReceived, encryptedData) {
  const hasher = crypto.createHmac(
    "sha256",
    Buffer.from(plainSymmetricKeyReceived)
  );
  const hash = hasher.update(encryptedData).digest("base64");
  return hash;
}

// Function to generate random bytes
function getRandomBytes(length) {
  return crypto.randomBytes(length);
}

// Function to derive AES key from password and salt using PBKDF2
function getAESKeyFromPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 65536, 32, "sha256"); // 32 bytes = 256-bit AES key
}

// Function to encrypt data using AES-256-GCM
function encrypt(plainText, plainSymmetricKey) {
  const salt = getRandomBytes(16); // 16 bytes for salt
  const iv = getRandomBytes(12); // 12 bytes for IV (recommended for GCM)

  const aesKeyFromPassword = getAESKeyFromPassword(
    Buffer.from(plainSymmetricKey),
    salt
  );

  const cipher = crypto.createCipheriv("aes-256-gcm", aesKeyFromPassword, iv);
  const cipherText = Buffer.concat([
    cipher.update(JSON.stringify(plainText), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  const cipherTextWithIvSalt = Buffer.concat([iv, salt, cipherText, tag]);

  return cipherTextWithIvSalt.toString("base64");
}

module.exports = {
  encryptPayload,
};
