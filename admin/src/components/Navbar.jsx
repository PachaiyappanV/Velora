import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b py-2 px-[4%]">
      <img className="w-36 " src={assets.logo} />
      <button
        className="border border-black px-8 py-3 text-sm md:text-lg 
      hover:bg-black hover:text-white transition-all duration-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
