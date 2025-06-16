import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


export const sendOtpEmail = async(to: string, otp: string) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: 'Your One-Time Password for Peel Talk',
        text: `Hi there,

Thank you for using Peel Talk!

Your One-Time Password (OTP) is:

👉 **${otp}**

This code is valid for the next **5 minutes**. Please do not share this code with anyone for your account’s safety.

If you did not request this code, please ignore this message or contact our support team immediately.

Thanks,  
The Peel Talk Team  
https://www.peeltalk.live

---
`,
    })
}

