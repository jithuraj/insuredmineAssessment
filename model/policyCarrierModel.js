import { Schema, model } from "mongoose";

// Policy Carrier schema
const policyCarrierSchema = new Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Policy Carrier model
const PolicyCarrier = model("PolicyCarrier", policyCarrierSchema);
export default PolicyCarrier;
