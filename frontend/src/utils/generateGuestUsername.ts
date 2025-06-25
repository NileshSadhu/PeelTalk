

export const generateGuestUsername = (): string => {
    const fruits = [
        "Mango", "Banana", "Papaya", "Pineapple", "Guava", "Lemon",
        "Orange", "Lychee", "Kiwi", "Peach", "Berry", "Coconut"
    ];

    const prefixes = [
        "Peeler", "FruitNinja", "Juicy", "ChatBerry", "PeelBuddy",
        "Smoothie", "Zesty", "Tropic", "Snacky", "Peelster", "ChatterFruit"
    ];

    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    return `${randomPrefix}-${randomFruit}-${randomNumber}`;
};