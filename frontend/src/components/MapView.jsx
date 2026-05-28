import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Rectangle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getSpots, bookSpot, unbookSpot } from "../services/api";

export default function MapView() {
  const [spots, setSpots] = useState([]);
  const center = [13.0052, 77.6605];

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await getSpots();
        setSpots(res.data);
      } catch (err) {
        console.error("Error fetching spots:", err.response?.data || err);
      }
    };

    fetchSpots();
  }, []);

  const handleBook = async (spotId) => {
    try {
      const res = await bookSpot(spotId);
      const updatedSpot = res.data.spot;

      setSpots((prev) =>
        prev.map((spot) => (spot._id === updatedSpot._id ? updatedSpot : spot))
      );

      alert("Spot booked successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
      console.error("Booking error:", err.response?.data || err);
    }
  };

  const handleUnbook = async (spotId) => {
    try {
      const res = await unbookSpot(spotId);
      const updatedSpot = res.data.spot;

      setSpots((prev) =>
        prev.map((spot) => (spot._id === updatedSpot._id ? updatedSpot : spot))
      );

      alert("Spot unbooked successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Unbooking failed");
      console.error("Unbooking error:", err.response?.data || err);
    }
  };

  return (
    <div className="h-[600px] w-full border rounded shadow">
      <MapContainer center={center} zoom={19} className="h-full w-full" maxZoom={22}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {spots.map((spot) => (
          <Rectangle
            key={spot._id}
            bounds={spot.bounds}
            pathOptions={{
              color: spot.isBooked ? "red" : "green",
              weight: 2,
              fillOpacity: 0.4,
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{spot.location}</p>
                {spot.isBooked ? (
                  <button
                    onClick={() => handleUnbook(spot._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                  >
                    Unbook
                  </button>
                ) : (
                  <button
                    onClick={() => handleBook(spot._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                  >
                    Book
                  </button>
                )}
              </div>
            </Popup>
          </Rectangle>
        ))}
      </MapContainer>
    </div>
  );
}
