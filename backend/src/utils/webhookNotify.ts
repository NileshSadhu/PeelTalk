import axios from "axios";


const MAX_RETRIES = 3;

export const sendDiscordMessage = async (text: string, retries = 0): Promise<void> => {
    try {
        const res = await axios.post(process.env.DISCORD_WEBHOOK_URL!, {
        content: text,
        });

        if (res.status === 204) {
        console.log("✅ Message sent to Discord");
        } else {
        console.log(`ℹ️ Discord responded with status: ${res.status}`);
        }

    } catch (err: any) {
        if (err.response?.status === 429) {
        const retryAfter = parseInt(err.response.headers['retry-after']) || 2; // in seconds
        console.warn(`⚠️ Rate limited by Discord. Retrying after ${retryAfter}s...`);

        if (retries < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            return sendDiscordMessage(text, retries + 1); // retry
        } else {
            console.error("❌ Max retries reached for Discord webhook.");
        }
        } else {
        console.error("❌ Failed to send Discord message:", err.message);
        }
    }
};
