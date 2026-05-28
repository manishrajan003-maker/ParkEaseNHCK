import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-pink-600 px-5 py-3 flex items-center justify-between shadow-lg">
      <h2 className="text-white font-bold text-xl tracking-wide">ParkEaseNHCK</h2>
      <div className="flex items-center space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-medium border-b-2 border-yellow-300"
              : "text-white font-medium hover:text-yellow-300 transition duration-300"
          }
        >
          Home
        </NavLink>

        {token ? (
          <>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium border-b-2 border-yellow-300"
                  : "text-white font-medium hover:text-yellow-300 transition duration-300"
              }
            >
              Map
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium border-b-2 border-yellow-300"
                  : "text-white font-medium hover:text-yellow-300 transition duration-300"
              }
            >
              History
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-white text-black font-semibold px-3 py-1.5 rounded-md transition duration-300 hover:bg-yellow-300 hover:text-black"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium border-b-2 border-yellow-300"
                  : "text-white font-medium hover:text-yellow-300 transition duration-300"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium border-b-2 border-yellow-300"
                  : "text-white font-medium hover:text-yellow-300 transition duration-300"
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
