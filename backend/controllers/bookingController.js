import Spot from "../models/Spot.js";
import History from "../models/History.js";
import User from "../models/User.js";

// Book a spot
export const createBooking = async (req, res) => {
  try {
    const { spotId } = req.body;

    // Check if user already has an active booking
    const existingBooking = await Spot.findOne({ bookedBy: req.user._id, isBooked: true });
    if (existingBooking) {
      return res.status(400).json({ error: "You already have an active booking. Cancel it first!" });
    }

    // Check if the slot itself is already booked by someone else
    const spot = await Spot.findById(spotId);
    if (!spot) return res.status(404).json({ error: "Spot not found" });
    if (spot.isBooked && String(spot.bookedBy) !== String(req.user._id)) {
      return res.status(400).json({ error: "This slot is already booked by another user" });
    }

    // Mark slot as booked
    spot.isBooked = true;
    spot.isAvailable = false;
    spot.bookedBy = req.user._id;
    await spot.save();

    // Add to history
    const historyEntry = await History.create({
      user: req.user._id,
      spot: spot._id,
      spotName: spot.location,
      action: "BOOKED",
    });

    res.json({ message: "Spot booked successfully", spot, history: historyEntry });
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Cancel a spot
export const unbookSpot = async (req, res) => {
  try {
    const { spotId } = req.body;

    const spot = await Spot.findById(spotId);
    if (!spot) return res.status(404).json({ error: "Spot not found" });
    if (!spot.isBooked) return res.status(400).json({ error: "Spot is not booked" });

    // Prevent others from canceling someone else’s booking
    if (String(spot.bookedBy) !== String(req.user._id)) {
      return res.status(400).json({ error: "You cannot cancel another user's booking" });
    }

    spot.isBooked = false;
    spot.isAvailable = true;
    spot.bookedBy = null;
    await spot.save();

    const historyEntry = await History.create({
      user: req.user._id,
      spot: spot._id,
      spotName: spot.location,
      action: "CANCELED",
    });

    res.json({ message: "Spot canceled successfully", spot, history: historyEntry });
  } catch (err) {
    console.error("Cancel error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get booking history (all users, optional regNo filter)
export const getHistory = async (req, res) => {
  try {
    const { regNo } = req.query;
    let filter = {};

    if (regNo) {
      const user = await User.findOne({ regNo });
      if (!user) return res.status(404).json({ error: "User not found with this regNo" });
      filter.user = user._id;
    }

    const history = await History.find(filter)
      .populate("user", "regNo name email")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error("History error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all spots with booking status
export const getSpots = async (req, res) => {
  try {
    const spots = await Spot.find({})
      .populate("bookedBy", "regNo name email"); // include user info
    res.json(spots);
  } catch (err) {
    console.error("Get spots error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};