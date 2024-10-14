import CryptoJS from 'crypto-js';

// Encryption function
const password = 'gitaura';

function encrypt(plaintext) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const keySize = 256 / 32;
    const iterations = 1000;

    // Generate key from password and salt
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: keySize,
        iterations: iterations,
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // Encrypt the plaintext
    const ciphertext = CryptoJS.AES.encrypt(plaintext, key, {
        iv: iv,
    }).toString();

    // Combine salt, iv, and ciphertext into a single string
    const encryptedData = salt.toString() + '.' + iv.toString() + '.' + ciphertext;

    // Base64 encode the encrypted data
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedData));
}

// Decryption function
function decrypt(base64Encoded) {
    const decodedData = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(base64Encoded));
    const parts = decodedData.split('.');

    const saltFromEncoded = CryptoJS.enc.Hex.parse(parts[0]);
    const ivFromEncoded = CryptoJS.enc.Hex.parse(parts[1]);
    const ciphertextFromEncoded = parts[2];

    // Generate key from password and salt
    const decryptedKey = CryptoJS.PBKDF2(password, saltFromEncoded, {
        keySize: 256 / 32,
        iterations: 1000,
    });

    // Decrypt the ciphertext
    const decryptedBytes = CryptoJS.AES.decrypt(ciphertextFromEncoded, decryptedKey, {
        iv: ivFromEncoded,
    });

    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}

export { decrypt, encrypt };
