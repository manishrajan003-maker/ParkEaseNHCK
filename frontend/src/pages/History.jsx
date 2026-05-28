import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchRegNo, setSearchRegNo] = useState("");

  const fetchHistory = async (regNo = "") => {
    try {
      const res = await getHistory(regNo);
      setHistory(res.data || []);
    } catch (err) {
      console.error("Failed to load history:", err.response?.data || err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res.data || []);
      } catch (err) {
        console.error("Failed to load history:", err.response?.data || err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchHistory(searchRegNo.trim());
  };

  if (loading) return <p className="p-5">Loading history...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>

      <form onSubmit={handleSearch} className="mb-5 flex gap-2">
        <input
          type="text"
          placeholder="Search by Reg No"
          value={searchRegNo}
          onChange={(e) => setSearchRegNo(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Time</th>
              <th className="border px-3 py-2">Spot</th>
              <th className="border px-3 py-2">Action</th>
              <th className="border px-3 py-2">User</th>
              <th className="border px-3 py-2">Reg No</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry._id}>
                <td className="border px-3 py-2">
                  {new Date(entry.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="border px-3 py-2">
                  {new Date(entry.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="border px-3 py-2">{entry.spotName}</td>
                <td className="border px-3 py-2">{entry.action}</td>
                <td className="border px-3 py-2">{entry.user?.name || "Unknown"}</td>
                <td className="border px-3 py-2">{entry.user?.regNo || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
