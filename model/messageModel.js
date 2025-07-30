import { Schema, model } from "mongoose";

// Message schema
const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    scheduledAt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Message model
const Message = model("Message", messageSchema);
export default Message;
