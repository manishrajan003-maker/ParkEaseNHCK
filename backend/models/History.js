import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    spot: { type: mongoose.Schema.Types.ObjectId, ref: "Spot" },
    spotName: { type: String, required: true }, // permanent copy of spot name
    action: { type: String, enum: ["BOOKED", "CANCELED"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("History", historySchema);