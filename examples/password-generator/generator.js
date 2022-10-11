function generate(length) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = '';
    for (let i = 0; i < length; i++) {
        let random = Math.floor(Math.random() * chars.length);
        password += chars.substring(random, random + 1);
    }
    return password;
}

function generatePasswords(amount, length) {
    const passwords = [];
    for (let i = 0; i < amount; i++) {
        passwords.push(generate(length));
    }
    return passwords;
}

module.exports = { generatePasswords };