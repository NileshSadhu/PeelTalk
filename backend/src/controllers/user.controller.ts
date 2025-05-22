import { Request, Response } from "express";
import { loginSchema, passwordResetSchema, signupSchema } from "../validations/user.schema";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redis from "../redis";
import { sendOtpEmail } from "../utils/mailer";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

if (!jwt_secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

function generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

export const signup = async(req:Request,res:Response):Promise<Response> => {
    const result = signupSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten(), 
    });
    }
    
    const data = result.data;

    try{
        const existingUser = await User.findOne({
            $or: [{email: data.email}, {username: data.username}]
        })

        if(existingUser){
            if (existingUser.email === data.email) {
                return res.status(400).json({ message: "Email already registered" });
            }

            if (existingUser.username === data.username) {
                return res.status(400).json({ message: "Username already taken" });
            }
        }

        const hashedPassword = await bcrypt.hash(data.password,10);

        const otp = generateOtp();

        const tempUserData = {
            name: data.name,
            email: data.email,
            username: data.username,
            password: hashedPassword
        }

        await redis.set(`otp:${data.email}`,JSON.stringify({
            otp: otp,
            user: tempUserData
        }),'EX',300)

        await sendOtpEmail(data.email,otp)

        return res.status(200).json({
            msg: "OTP sent to your email. Please verify to complete signup."
        })

    }catch(error){
        console.error("Server Error:",error)
        return res.status(500).json({message:"Internal server error"})
    }
}


export const verifySignup = async(req:Request,res:Response):Promise<Response> => {
    try{
        const {email,otp} = req.body;

        const data = await redis.get(`otp:${email}`);

        if(!data){
            return res.status(400).json({ message: 'OTP expired or not found.' });
        }

        const parsedData = JSON.parse(data);

        if(parsedData.otp !== otp){
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        const user = await User.create({
            name: parsedData.user.name,
            email: parsedData.user.email,
            username: parsedData.user.username,
            password: parsedData.user.password,
        });

        await redis.del(`otp:${email}`);

        const token = jwt.sign({ id: user._id, email: user.email }, jwt_secret);

        return res.status(201).json({
            msg: 'Signup verified and user created successfully!',
            token: token,
        });
        
    }catch(error){
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const login = async(req:Request,res:Response):Promise<Response> => {
    const result = loginSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten(), 
    });
    }
    
    const data = result.data;

    try{
        const user = await User.findOne({
            $or: [{email: data.email}, {username: data.username}]
        })

        if(!user){
            return res.status(400).json({
                message: "User does not exists!"
            })
        }

        const isPasswordValid = await bcrypt.compare(data.password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({id: user._id,email: user.email},jwt_secret)

        return res.status(201).json({
            msg: "User login in successfully!!!",
            token: token
        });
    }catch(error){
        console.error("Server Error:",error)
        return res.status(500).json({message:"Internal server error"})
    }
}


export const forgotPassword = async(req:Request,res:Response):Promise<Response> =>{
    const result = passwordResetSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten(), 
    });
    }
    
    const data = result.data;

    try{
        const isUser = await User.findOne({
            email: data.email
        })

        if(!isUser){
            return res.status(400).json({
                message: "User does not exists!"
            })
        }

        const otp = generateOtp();

        const hashedPassword = await bcrypt.hash(data.Newpassword,10)

        await sendOtpEmail(data.email,otp);

        await redis.set(
            `reset-otp:${data.email}`,
            JSON.stringify({ otp, password: hashedPassword }),
            'EX',
            300
        );

        return res.status(200).json({
            msg: "Otp sent to your email verify it to change password!!"
        });

    }catch(error){
        console.error("Server Error:",error)
        return res.status(500).json({message:"Internal server error"})
    }
}


export const resetPassword = async(req:Request,res:Response):Promise<Response> => {
    try{
        const { otp,email } = req.body;

        const data = await redis.get(`reset-otp:${email}`);

        if(!data){
            return res.status(400).json({ message: 'OTP expired or not found.' });
        }

        const parsedData = JSON.parse(data);

        if(parsedData.otp !== otp){
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        await User.updateOne({email},{
            password: parsedData.password
        })

        await redis.del(`reset-otp:${email}`);

        return res.status(200).json({
            message: "Password reset successfully."
        })

    }catch(error){
        console.error("Server Error:",error)
        return res.status(500).json({message:"Internal server error"})
    }
}