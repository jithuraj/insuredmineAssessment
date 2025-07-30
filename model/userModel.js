import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    user_type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
