import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={assets.logo} className="w-36" alt="logo" />
      <nav className="hidden md:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p className="uppercase">home</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p className="uppercase">collection</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p className="uppercase">about</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p className="uppercase">contact</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
      </nav>
      <div className="flex items-center gap-6">
        <img src={assets.search_icon} className="w-5 cursor-pointer" />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />
          <div className="hidden group-hover:block absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500">
              <p className=" cursor-pointer hover:text-black">My Profile</p>
              <p className=" cursor-pointer hover:text-black">Orders</p>
              <p className=" cursor-pointer hover:text-black">Logo</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-3 bg-black text-white aspect-square rounded-full text-[9.5px] flex items-center justify-center">
            3
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
