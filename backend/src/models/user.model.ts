import mongoose, {Schema, Document} from "mongoose";


export interface IUser extends Document {
    // User Details
    firstname?: string;
    lastname?: string;
    email: string;
    username?: string;
    age?: string,
    gender?: "Male" | "Female" | "Other" | null;
    

    // 🔐 Auth
    authProvider: "local" | "google";
    password?: string;        
    googleId?: string;
    
    // 🔑 Crypto
    publicKey: string;
    encryptedPrivateKey: {
        cipher: string;
        iv: string;
        tag: string;
    };

    // Misc
    isPremium: boolean;
    profilePhoto: string;
}

const userSchema = new Schema<IUser>({
    firstname:    { type: String, default: null },
    lastname:     { type: String, default: null },


    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },

    age:    { type: String, default: null},

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: null,
    },

    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local", 
    },

    password: {
        type: String,
        required: false,
        select: false,
    },

    googleId: {
        type: String,
        default: null,
        index: true,
        sparse: true, 
    },


    // 🔑 CRYPTO
    publicKey:    { 
        type: String, 
        required: true
    },
    encryptedPrivateKey: {
        cipher: { type: String, required: true },
        iv: { type: String, required: true },
        tag: { type: String, required: true }
    },


    isPremium:    { type: Boolean, default: false},
    profilePhoto: { type: String, default: null},
    },
    
    { timestamps: true }

)


export const User = mongoose.model<IUser>("User", userSchema);