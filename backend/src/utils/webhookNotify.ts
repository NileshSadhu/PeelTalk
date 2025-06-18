import axios from "axios";



export const sendDiscordMessage = async (text: string) => {
    try {
        await axios.post(process.env.DISCORD_WEBHOOK_URL!, {
        content: text, 
        });
    } catch (err) {
        console.error("❌ Failed to send Discord message:", err);
    }
};