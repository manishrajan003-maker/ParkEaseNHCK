import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    regNo: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Registration successful!");
      navigate("/map");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
      console.error("Registration error:", err.response?.data || err);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />

        <input
          type="text"
          name="regNo"
          placeholder="Registration Number"
          value={formData.regNo}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full pr-14"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}
