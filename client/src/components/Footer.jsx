import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer
      className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 
    mt-40 text-sm"
    >
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="" />
        <p className="w-full md:w-2/3 text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt,
          placeat cumque repudiandae sint nihil recusandae assumenda qui
          praesentium iusto dolorem quo repellat aliquid distinctio voluptatibus
          ipsa! Optio a consectetur tempora!
        </p>
      </div>
      <div>
        <p className="text-lg sm:text-xl font-medium mb-4">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>
      <div>
        <p className="text-lg sm:text-xl font-medium mb-4">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+1-212-456-7890</li>
          <li>contact@foreveryou.com</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
