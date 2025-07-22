import axios from "axios";


export const sendTelegramMessage = async (text: string) => {
    try {
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text,
        });
    } catch (err) {
        console.error("❌ Failed to send Telegram message:", err);
    }
};
