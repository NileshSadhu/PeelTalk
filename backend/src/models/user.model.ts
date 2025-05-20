import mongoose, {Schema, Document} from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
    isPremium: boolean;
    profilePhoto: string;
}

const userSchema = new Schema<IUser>({
    name:         { type: String, required: true },
    email:        { type: String, required: true, unique: true },
    username:     { type: String, required: true, unique: true },
    password:     { type: String, required: true},
    isPremium:    { type: Boolean, default: false},
    profilePhoto: { type: String, default: null}
})


export const User = mongoose.model<IUser>("User", userSchema);