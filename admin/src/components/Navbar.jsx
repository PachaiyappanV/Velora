import axios from "axios";
import { assets } from "../assets/assets";

const Navbar = ({ setAdmin }) => {
  return (
    <div className="flex justify-between items-center border-b py-2 px-[4%]">
      <img className="w-36 " src={assets.logo} />
      <button
        onClick={async () => {
          setAdmin("");
          await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
        }}
        className="border border-black px-8 py-3 text-sm md:text-lg 
      hover:bg-black hover:text-white transition-all duration-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
