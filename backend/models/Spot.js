import mongoose from "mongoose";

const spotSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    bounds: { type: [[Number]], required: true },
    isBooked: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Spot", spotSchema);