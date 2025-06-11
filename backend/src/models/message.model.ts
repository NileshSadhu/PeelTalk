import mongoose, {Schema, Document} from "mongoose";



export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    content: string;
    conversationId?: mongoose.Types.ObjectId;
    createdAt?: Date; 
    updatedAt?: Date; 
}

const messageSchema = new Schema<IMessage>({
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }, 
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
},{
    timestamps: true
})


export const Message = mongoose.model<IMessage>("Message", messageSchema);