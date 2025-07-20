import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Name */}
          <div className="flex items-center">
            <img src={logo} alt="PeelTalk Logo" className="h-10 w-10 mr-2" />
            <span className="font-bold text-xl text-brown-800">PeelTalk</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a
              href="#home"
              className="text-brown-800  hover:text-brown font-medium hover:text-xl"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-brown-800  hover:text-brown font-medium hover:text-xl"
            >
              About
            </a>
            <a
              href="#services"
              className="text-brown-800  hover:text-brown font-medium hover:text-xl"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-brown-800 hover:text-brown font-mediumc hover:text-xl"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <a href="#home" className="block text-center py-1 text-brown-800">
              Home
            </a>
            <a href="#about" className="block text-center py-1 text-brown-800">
              About
            </a>
            <a
              href="#services"
              className="block text-center py-1 text-brown-800"
            >
              Services
            </a>
            <a
              href="#contact"
              className="block text-center py-1 text-brown-800"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
