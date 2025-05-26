export function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        return "Email is required.";
    }
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
    }
    return null;
}

export function validPin(pin) {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        return "Pin must be exactly 4 digits.";
    }
    return null;
}