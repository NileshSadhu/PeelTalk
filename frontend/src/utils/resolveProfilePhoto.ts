import profile from '../assets/default_profile.png';
import { getAvatarFromUsername } from './getAvatar';

const guestPrefixes = [
    "Peeler", "FruitNinja", "Juicy", "ChatBerry", "PeelBuddy",
    "Smoothie", "Zesty", "Tropic", "Snacky", "Peelster", "ChatterFruit"
];

export const resolveProfilePhoto = (username: string, photo: string | null): string => {
    const prefix = username?.split('-')?.[0];
    const isGuest = guestPrefixes.includes(prefix);

    if (!isGuest) {
        return photo || profile;
    }

    const guestAvatar = getAvatarFromUsername(username);
    return guestAvatar || profile;
};
