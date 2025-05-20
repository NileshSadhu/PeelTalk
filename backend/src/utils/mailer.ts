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
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    })
}

