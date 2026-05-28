import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  spot: { type: mongoose.Schema.Types.ObjectId, ref: "Spot", required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: null }
});

export default mongoose.model("Booking", bookingSchema);