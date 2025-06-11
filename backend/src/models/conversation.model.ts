import mongoose, { Schema, Document } from "mongoose";


export interface IConversation extends Document {
    user1Id: mongoose.Types.ObjectId;
    user2Id: mongoose.Types.ObjectId;
}


const conversationSchema = new Schema<IConversation>(
    {
        user1Id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        user2Id: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },{
        timestamps: true
    }
)


export const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);