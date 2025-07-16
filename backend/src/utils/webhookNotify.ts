import axios from "axios";

const webhooks = [
    process.env.DISCORD_WEBHOOK_URL,
    process.env.DISCORD_WEBHOOK_URL_2,
    process.env.DISCORD_WEBHOOK_URL_3,
    process.env.DISCORD_WEBHOOK_URL_4,
];

export const sendDiscordMessage = async (text: string) => {
    for (const url of webhooks) {
        if (!url) continue;
        try {
            await axios.post(url, { content: text });
            console.log("✅ Discord message sent successfully");
            break; 
        } catch (error: any) {
            console.error(`❌ Failed to send to webhook ${url}:`, error.message);
        }
    }
};