import { Schema, model } from "mongoose";

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

const PolicyCategory = model("PolicyCategory", policyCategorySchema);
export default PolicyCategory;
