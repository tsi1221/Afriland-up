import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Sale / Registration
  property: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" }, // Pending/Completed
});

export default mongoose.model("Transaction", transactionSchema);
