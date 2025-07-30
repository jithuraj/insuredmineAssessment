import { Schema, model } from "mongoose";

// Agent schema
const agentSchema = new Schema(
  {
    agent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Agent model
const Agent = model("Agent", agentSchema);
export default Agent;
