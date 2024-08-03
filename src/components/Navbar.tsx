import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <span className="text-teal-400">APP</span>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="relative text-lg hover:text-teal-400 transition duration-300 ease-in-out"
            >
              Home
              <span className="absolute inset-x-0 -bottom-1 h-1 bg-teal-400 transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/product-view"
              className="relative text-lg hover:text-teal-400 transition duration-300 ease-in-out"
            >
              Product View
              <span className="absolute inset-x-0 -bottom-1 h-1 bg-teal-400 transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/product-setting"
              className="relative text-lg hover:text-teal-400 transition duration-300 ease-in-out"
            >
              Product Setting
              <span className="absolute inset-x-0 -bottom-1 h-1 bg-teal-400 transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
