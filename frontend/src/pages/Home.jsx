import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSpots } from "../services/api";

const Home = () => {
  const [availableCount, setAvailableCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });
  const bookedCount = totalCount - availableCount;

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await getSpots();
        const spots = res.data || [];
        const available = spots.filter((s) => s.isAvailable).length;
        setAvailableCount(available);
        setTotalCount(spots.length);
      } catch (err) {
        console.error("Failed to load slots:", err.response?.data || err);
        setAvailableCount(0);
        setTotalCount(0);
      }
    };

    fetchSlots();
  }, []);

  return (
    <div className="font-sans">
      <section className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="uppercase tracking-wider text-sm font-semibold mb-3">
              New Horizon College Kasturinagar Parking
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ParkEase NHCK
            </h1>
            <p className="text-lg text-blue-50 leading-relaxed">
              Find an empty parking slot before you reach campus. Book your
              slot, cancel it when you leave, and check your parking history
              anytime.
            </p>

            <div className="mt-8 flex justify-center md:justify-start gap-4 flex-wrap">
              <Link to="/map">
                <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-md hover:bg-blue-50 transition">
                  Check Slots
                </button>
              </Link>
              <Link to="/history">
                <button className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition">
                  View History
                </button>
              </Link>
            </div>

            <p className="mt-5 text-sm text-blue-50">
              Tip: Green slots are free and red slots are already booked.
            </p>
          </div>

          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Current Parking Status
            </h2>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Available</span>
              <span>
                {availableCount}/{totalCount}
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{
                  width: totalCount
                    ? `${(availableCount / totalCount) * 100}%`
                    : "0%",
                }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center mt-5">
              <div className="bg-green-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Free</p>
                <p className="text-2xl font-bold text-green-600">
                  {availableCount}
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Booked</p>
                <p className="text-2xl font-bold text-red-600">
                  {bookedCount}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalCount}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-5">
              {user ? (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100 p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        User NHCK
                      </h3>
                      <p className="text-sm text-gray-600">
                        Logged in student details
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white rounded-md p-3 shadow-sm">
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                    <div className="bg-white rounded-md p-3 shadow-sm">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800 break-words">
                        {user.email}
                      </p>
                    </div>
                    <div className="bg-white rounded-md p-3 shadow-sm">
                      <p className="text-xs text-gray-500">Registration No</p>
                      <p className="font-semibold text-gray-800">
                        {user.regNo}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100 p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    User NHCK
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Please login to see your profile and book parking slots.
                  </p>
                  <div className="flex gap-3">
                    <Link to="/login">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                        Register
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            How to use ParkEase NHCK
          </h2>
          <p className="text-gray-600 mt-2">
            Just three simple steps to manage your campus parking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-800">Open the Map</h3>
            <p className="text-gray-600 mt-2">
              Go to the parking map and look for a green available slot.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-800">Book a Slot</h3>
            <p className="text-gray-600 mt-2">
              Click on a slot and confirm your booking. You can book only one
              slot at a time.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-800">Track History</h3>
            <p className="text-gray-600 mt-2">
              Check your previous bookings anytime using your registration
              number.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-yellow-100 border border-yellow-300 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-yellow-800">
              Quick Reminder
            </h3>
            <p className="text-yellow-900 mt-1">
              Please cancel your slot after leaving so other students can use
              it.
            </p>
          </div>
          <Link to="/map">
            <button className="px-5 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition">
              Go to Map
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
