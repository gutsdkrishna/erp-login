// Encrypt data using AES
function encryptData(data, passphrase) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), passphrase).toString();
    return encrypted;
}

// Decrypt data using AES
function decryptData(encryptedData, passphrase) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

// Example usage: Storing encrypted data
function storeEncryptedData(data, passphrase) {
    const encrypted = encryptData(data, passphrase);
    chrome.storage.sync.set({ 'encryptedData': encrypted }, () => {
        console.log('Data encrypted and stored.');
    });
}

// Example usage: Retrieving and decrypting data
function retrieveEncryptedData(passphrase, callback) {
    chrome.storage.sync.get(['encryptedData'], (result) => {
        if (result.encryptedData) {
            const decryptedData = decryptData(result.encryptedData, passphrase);
            callback(decryptedData);
        } else {
            callback(null); // Handle case where no data is found
        }
    });
}
