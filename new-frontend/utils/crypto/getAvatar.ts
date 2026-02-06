import defaultProfile from "/public/default_profile.png";
import banana from "/public/banana.png";
import berry from "/public/berry.png";
import coconut from "/public/coconut.png";
import guava from "/public/guava.png";
import kiwi from "/public/kiwi.png";
import lemon from "/public/lemon.png";
import lychee from "/public/lychee.png";
import mango from "/public/mango.png";
import orange from "/public/orange.png";
import papaya from "/public/papaya.png";
import peach from "/public/peach.png";
import pineapple from "/public/pineapple.png";

const fruitAvatars = {
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
export const getAvatarFromUsername = (username: string) => {
  const match = username.match(/^[A-Za-z]+-([A-Za-z]+)-\d+$/);

  if (match) {
    const fruitKey = match[1].toLowerCase();

    if (fruitKey in fruitAvatars) {
      return fruitAvatars[fruitKey as keyof typeof fruitAvatars];
    }
  }

  return defaultProfile;
};
