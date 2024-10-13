import CryptoJS from 'crypto-js';

const password = 'gitaura'; 
const plaintext = '670bae3738f6a9a5ba6b6a90';

const salt = CryptoJS.lib.WordArray.random(128 / 8); 
const keySize = 256 / 32;
const iterations = 1000; 

const key = CryptoJS.PBKDF2(password, salt, {
    keySize: keySize,
    iterations: iterations,
});

const iv = CryptoJS.lib.WordArray.random(128 / 8); 

const ciphertext = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
}).toString();

const encryptedData = salt.toString() + '.' + iv.toString() + '.' + ciphertext;

const base64Encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedData));

console.log(`Encoded response: ${base64Encoded}`);

const decodedData = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(base64Encoded));
const parts = decodedData.split('.');

const saltFromEncoded = CryptoJS.enc.Hex.parse(parts[0]);
const ivFromEncoded = CryptoJS.enc.Hex.parse(parts[1]);
const ciphertextFromEncoded = parts[2];

const decryptedKey = CryptoJS.PBKDF2(password, saltFromEncoded, {
    keySize: keySize,
    iterations: iterations,
});

const decryptedBytes = CryptoJS.AES.decrypt(ciphertextFromEncoded, decryptedKey, {
    iv: ivFromEncoded,
});

const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

console.log(`Decoded response: ${decryptedText}`);
