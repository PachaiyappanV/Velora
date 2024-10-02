import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const Login = ({ setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/adminLogin`,
        {
          email,
          password,
        }
      );
      setAdmin(response.data.data.admin);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type="text"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>
          <div className="mb-4 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full mt-2 py-2 px-4 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
