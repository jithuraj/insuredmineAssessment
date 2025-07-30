import { Schema, model } from "mongoose";

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

const PolicyCarrier = model("PolicyCarrier", policyCarrierSchema);
export default PolicyCarrier;
