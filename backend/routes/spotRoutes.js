import express from "express";
import Spot from "../models/Spot.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch spots" });
  }
});

export default router;