import CryptoJS from 'crypto-js';

// Your key and plaintext
const password = 'gitaura'; // Password for key derivation
const plaintext = '670bae3738f6a9a5ba6b6a90';

// Derive a key using PBKDF2
const salt = CryptoJS.lib.WordArray.random(128 / 8); // Generate a random salt
const keySize = 256 / 32; // AES key size
const iterations = 1000; // Number of iterations for PBKDF2

const key = CryptoJS.PBKDF2(password, salt, {
    keySize: keySize,
    iterations: iterations,
});

// Generate a random initialization vector (IV)
const iv = CryptoJS.lib.WordArray.random(128 / 8); 

// Encrypt the plaintext
const ciphertext = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
}).toString();

// Combine salt, iv, and ciphertext into a single string
const encryptedData = salt.toString() + '.' + iv.toString() + '.' + ciphertext;

// Encode the combined string in Base64
const base64Encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedData));

// Log the encoded response
console.log(`Encoded response: ${base64Encoded}`);

// Decrypting the ciphertext from the single Base64 string
const decodedData = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(base64Encoded));
const parts = decodedData.split('.');

// Extract salt, iv, and ciphertext from the decoded string
const saltFromEncoded = CryptoJS.enc.Hex.parse(parts[0]);
const ivFromEncoded = CryptoJS.enc.Hex.parse(parts[1]);
const ciphertextFromEncoded = parts[2];

// Re-derive the key using the original password and the extracted salt
const decryptedKey = CryptoJS.PBKDF2(password, saltFromEncoded, {
    keySize: keySize,
    iterations: iterations,
});

// Decrypt the ciphertext
const decryptedBytes = CryptoJS.AES.decrypt(ciphertextFromEncoded, decryptedKey, {
    iv: ivFromEncoded,
});

const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

// Log the decrypted response
console.log(`Decoded response: ${decryptedText}`);
