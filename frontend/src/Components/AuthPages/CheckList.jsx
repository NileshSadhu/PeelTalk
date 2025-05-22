export function isPasswordValid(password) {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
        return "Password must be at least 8 characters long.";
    }

    if (!specialCharRegex.test(password)) {
        return "Password must include at least one special character.";
    }

    return null;
}

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
