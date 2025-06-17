import axios from "axios";


export const sendSlackMessage = async (text: string) => {
    try {
        await axios.post(process.env.SLACK_WEBHOOK_URL!, {
        text,
        });
    } catch (err) {
        console.error("❌ Failed to send Slack message:", err);
    }
};
