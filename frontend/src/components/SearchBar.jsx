const SearchBar = ({ query, setQuery }) => (
  <input
    type="text"
    placeholder="Search by location..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="m-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default SearchBar;
