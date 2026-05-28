const ParkingCard = ({ spot, onBook, onUnbook }) => {
  return (
    <div className="border border-gray-300 p-3 m-3 rounded-md shadow-sm">
      <h4 className="font-semibold text-lg">{spot.location}</h4>
      <p className="text-sm text-gray-700">
        {spot.isAvailable ? "Available" : "Booked"}
      </p>
      {spot.isAvailable ? (
        <button
          onClick={() => onBook(spot._id)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          Book
        </button>
      ) : (
        <button
          onClick={() => onUnbook()}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Unbook
        </button>
      )}
    </div>
  );
};

export default ParkingCard;
