import mongoose from "mongoose";
import dotenv from "dotenv";
import Spot from "./models/Spot.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

// Utility to generate slots along a road.
const generateRoadSlots = (
  areaName,
  baseLat,
  baseLng,
  count,
  bendLeft = false,
  bendRightStrong = false,
  extraLatShift = 0,
  extraLngShift = 0
) => {
  const slots = [];

  for (let i = 0; i < count; i++) {
    const latShift = i * 0.00002 + extraLatShift;
    const lngShift =
      (bendLeft ? i * -0.00001 : bendRightStrong ? i * 0.00005 : 0) +
      extraLngShift;

    slots.push({
      location: `${areaName} Slot ${i + 1}`,
      bounds: [
        [baseLat + latShift, baseLng + lngShift],
        [baseLat + latShift + 0.000015, baseLng + lngShift + 0.00004],
      ],
      isBooked: false,
      isAvailable: true,
      bookedBy: null,
    });
  }

  return slots;
};

const horizonSlots = generateRoadSlots("Horizon Roadside", 13.00485, 77.66065, 70, true);

let crossSlots = generateRoadSlots(
  "4th Cross Road",
  13.0060,
  77.6598,
  50,
  false,
  true,
  0.0001
);
crossSlots = crossSlots.filter((slot, index) => index >= 6);

const thirdACrossSlots = [];
for (let i = 0; i < 43; i++) {
  const latShift = i * 0.00002;
  const lngShift = i * 0.000035;

  thirdACrossSlots.push({
    location: `3rd A Cross Slot ${i + 1}`,
    bounds: [
      [13.0048 + latShift, 77.6607 + lngShift],
      [13.0048 + latShift + 0.000015, 77.6607 + lngShift + 0.00004],
    ],
    isBooked: false,
    isAvailable: true,
    bookedBy: null,
  });
}

await Spot.deleteMany();
await Spot.insertMany([...horizonSlots, ...crossSlots, ...thirdACrossSlots]);

console.log("Slots seeded with original layout!");
process.exit();
