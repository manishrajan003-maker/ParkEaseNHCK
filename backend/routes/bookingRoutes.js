import express from "express";
import { createBooking, unbookSpot, getHistory } from "../controllers/bookingController.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

// Book a spot
router.post("/", protect, createBooking);

// Unbook a spot (must match frontend call)
router.post("/unbook", protect, unbookSpot);

// Get booking history
router.get("/history", protect, getHistory);

export default router;