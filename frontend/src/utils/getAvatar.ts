import defaultProfile from '../assets/default_profile.png';
import banana from '../assets/profile/banana.png';
import berry from '../assets/profile/berry.png';
import coconut from '../assets/profile/coconut.png';
import guava from '../assets/profile/guava.png';
import kiwi from '../assets/profile/kiwi.png';
import lemon from '../assets/profile/lemon.png';
import lychee from '../assets/profile/lychee.png';
import mango from '../assets/profile/mango.png';
import orange from '../assets/profile/orange.png';
import papaya from '../assets/profile/papaya.png';
import peach from '../assets/profile/peach.png';
import pineapple from '../assets/profile/pineapple.png';

const fruitAvatars: Record<string, string> = {
    banana,
    berry,
    coconut,
    guava,
    kiwi,
    lemon,
    lychee,
    mango,
    orange,
    papaya,
    peach,
    pineapple,
};

export const getAvatarFromUsername = (username: string): string => {
    const match = username.match(/^[A-Za-z]+-([A-Za-z]+)-\d+$/);

    if (match) {
        const fruitKey = match[1].toLowerCase(); // e.g., 'kiwi'
        return fruitAvatars[fruitKey] || defaultProfile;
    }

    return defaultProfile;
};
