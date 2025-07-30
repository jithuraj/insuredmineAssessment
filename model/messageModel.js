import { Schema, model } from "mongoose";

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

const Message = model("Message", messageSchema);
export default Message;
