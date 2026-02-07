import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const Company = mongoose.model("Company", companySchema);
