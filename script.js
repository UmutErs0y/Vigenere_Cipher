// **Turkish alphabet with English letters**
const turkishAlphabet = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZXQW";
const lowercaseTurkishAlphabet = "abcçdefgğhıijklmnoöprsştuüvyzxqw";
const alphabetLength = turkishAlphabet.length;

// **Function to check if the key is valid (only letters allowed)**
function isValidKey(key) {
    return /^[A-Za-zÇÖÜĞŞİçöüğşıXQWxqw]+$/.test(key); // Checks if the key contains only letters
}

// **Function to make the key case-insensitive**
function normalizeKey(key) {
    return key
        .replace(/İ/g, "i") // Convert uppercase İ to lowercase i
        .replace(/I/g, "ı") // Convert uppercase I to lowercase ı
        .toLowerCase(); // Make the key lowercase
}

// **Function to expand the key using only letters**
function extendKeyVigenere(key, text) {
    let keyOnlyLetters = normalizeKey(key).replace(/[^A-Za-zÇÖÜĞŞİçöüğşıXQWxqw]/g, ""); // Keep only letters
    let extendedKey = "";
    let keyIndex = 0;

    // Loop through the text and extend the key
    for (let i = 0; i < text.length; i++) {
        if (turkishAlphabet.includes(text[i]) || lowercaseTurkishAlphabet.includes(text[i])) {
            extendedKey += keyOnlyLetters[keyIndex % keyOnlyLetters.length]; // Add the next letter of the key
            keyIndex++;
        } else {
            extendedKey += text[i]; // Leave non-letter characters as they are
        }
    }

    return extendedKey;
}

// **Vigenere Encryption Function**
function vigenereEncrypt(text, key) {
    if (!isValidKey(key)) {
        alert("The key should only contain letters!");
        return "";
    }

    let normalizedKey = normalizeKey(key);
    let extendedKey = extendKeyVigenere(normalizedKey, text);
    let result = "";

    // Encrypt the text
    for (let i = 0; i < text.length; i++) {
        let textIndex, keyIndex;

        if (turkishAlphabet.includes(text[i])) {
            textIndex = turkishAlphabet.indexOf(text[i]);
            keyIndex = turkishAlphabet.indexOf(extendedKey[i].toUpperCase());
            let newIndex = (textIndex + keyIndex) % alphabetLength;
            result += turkishAlphabet[newIndex];
        } else if (lowercaseTurkishAlphabet.includes(text[i])) {
            textIndex = lowercaseTurkishAlphabet.indexOf(text[i]);
            keyIndex = lowercaseTurkishAlphabet.indexOf(extendedKey[i].toLowerCase());
            let newIndex = (textIndex + keyIndex) % alphabetLength;
            result += lowercaseTurkishAlphabet[newIndex];
        } else {
            result += text[i]; // Non-letter characters stay the same
        }
    }

    return result;
}

// **Vigenere Decryption Function**
function vigenereDecrypt(ciphertext, key) {
    if (!isValidKey(key)) {
        alert("The key should only contain letters!");
        return "";
    }

    let normalizedKey = normalizeKey(key);
    let extendedKey = extendKeyVigenere(normalizedKey, ciphertext);
    let result = "";

    for (let i = 0; i < ciphertext.length; i++) {
        let textIndex, keyIndex;

        if (turkishAlphabet.includes(ciphertext[i])) {
            // Uppercase handling
            textIndex = turkishAlphabet.indexOf(ciphertext[i]);
            keyIndex = lowercaseTurkishAlphabet.indexOf(extendedKey[i]); // Use lowercase key for consistency
            if (keyIndex === -1) keyIndex = turkishAlphabet.indexOf(extendedKey[i].toUpperCase());
            let newIndex = (textIndex - keyIndex + alphabetLength) % alphabetLength;
            result += turkishAlphabet[newIndex];
        } else if (lowercaseTurkishAlphabet.includes(ciphertext[i])) {
            // Lowercase handling
            textIndex = lowercaseTurkishAlphabet.indexOf(ciphertext[i]);
            keyIndex = lowercaseTurkishAlphabet.indexOf(extendedKey[i]);
            if (keyIndex === -1) keyIndex = turkishAlphabet.indexOf(extendedKey[i].toUpperCase());
            let newIndex = (textIndex - keyIndex + alphabetLength) % alphabetLength;
            result += lowercaseTurkishAlphabet[newIndex];
        } else {
            result += ciphertext[i]; // Preserve non-letter characters
        }
    }

    return result;
}

// **Encrypt the input text**
function encrypt() {
    let key = document.getElementById("key").value;
    let plaintext = document.getElementById("plaintext").value;

    if (!key || !plaintext) {
        alert("Both key and plaintext are required!");
        return;
    }

    let ciphertext = vigenereEncrypt(plaintext, key);
    if (ciphertext !== "") {
        document.getElementById("ciphertext").value = ciphertext;
    }
}

// **Decrypt the input text**
function decrypt() {
    let key = document.getElementById("key").value;
    let ciphertext = document.getElementById("ciphertext").value;

    if (!key || !ciphertext) {
        alert("Both key and ciphertext are required!");
        return;
    }

    let plaintext = vigenereDecrypt(ciphertext, key);
    if (plaintext !== "") {
        document.getElementById("plaintext").value = plaintext;
    }
}
