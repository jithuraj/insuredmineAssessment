import { Schema, model } from "mongoose";

// Users Account schema
const usersAccountSchema = new Schema(
  {
    account_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Users Account model
const UsersAccount = model("UsersAccount", usersAccountSchema);
export default UsersAccount;
