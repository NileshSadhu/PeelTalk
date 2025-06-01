import mongoose, {Schema, Document} from "mongoose";


export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    age: string,
    gender: "Male" | "Female" | "Other",
    password: string;
    isPremium: boolean;
    profilePhoto: string;
}

const userSchema = new Schema<IUser>({
    firstname:    { type: String, default: null },
    lastname:     { type: String, default: null },
    email:        { type: String, required: true, unique: true },
    username:     { type: String, required: true, unique: true },
    age:          { type: String, default: null},
    gender:       { type: String, enum: ["Male","Female","Other"], default: null},
    password:     { type: String, required: true},
    isPremium:    { type: Boolean, default: false},
    profilePhoto: { type: String, default: null}
})


export const User = mongoose.model<IUser>("User", userSchema);