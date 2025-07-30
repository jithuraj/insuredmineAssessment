import { Schema, model } from "mongoose";

// Policy Category schema
const policyCategorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Policy Category model
const PolicyCategory = model("PolicyCategory", policyCategorySchema);
export default PolicyCategory;
