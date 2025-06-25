



export const generateGuestId = (): string => {
    return `guest-${crypto.randomUUID()}`;
};
