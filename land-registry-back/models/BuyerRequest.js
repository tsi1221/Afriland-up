import mongoose from "mongoose";

const buyerRequestSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  landId: { type: mongoose.Schema.Types.ObjectId, ref: "Land" },
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("BuyerRequest", buyerRequestSchema);
