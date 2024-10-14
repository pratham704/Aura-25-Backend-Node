const encryptedData = salt.toString() + '.' + iv.toString() + '.' + ciphertext;

// const base64Encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedData));

// console.log(`Encoded response: ${base64Encoded}`);