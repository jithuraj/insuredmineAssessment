import { Schema, model } from "mongoose";
import User from "./userModel.js";
import Agent from "./agentModel.js";
import PolicyCarrier from "./policyCarrierModel.js";
import PolicyCategory from "./policyCategoryModel.js";
import UsersAccount from "./usersAccountModel.js";

// Policy Info schema
const policyInfoSchema = new Schema(
  {
    policy_number: {
      type: String,
      required: true,
    },
    policy_type: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
    },
    csr: {
      type: String,
    },
    premium_amount: {
      type: String,
      required: true,
    },
    policy_start_date: {
      type: String,
      required: true,
    },
    policy_end_date: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    agent_id: {
      type: Schema.Types.ObjectId,
      ref: Agent,
      required: true,
    },
    carrier_id: {
      type: Schema.Types.ObjectId,
      ref: PolicyCarrier,
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: PolicyCategory,
      required: true,
    },
    account_name_id: {
      type: Schema.Types.ObjectId,
      ref: UsersAccount,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Policy Info model
const PolicyInfo = model("policyinfo", policyInfoSchema);
export default PolicyInfo;
