import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const categories = [
    "Smartphone",
    "Laptop",
    "Camera",
    "Headphones",
    "PC Gaming",
    "Television",
  ];

  return (
    <nav className="w-full flex flex-col justify-center items-center relative">
      {/* Top Bar */}
      <div className="top-nav w-full flex flex-col sm:flex-row justify-between items-center bg-black text-white px-4 md:px-[8%] lg:px-[12%] py-2 text-xs sm:text-sm gap-2 sm:gap-0">
        <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
          {/* Language */}
          <div className="relative group">
            <span className="cursor-pointer flex items-center hover:text-yellow-600">
              English <span className="ml-1 text-xs">▼</span>
            </span>
            <ul className="absolute top-full left-0 bg-white text-black shadow-md rounded-md p-4 hidden group-hover:flex flex-col gap-2 z-50">
              <li>Francais</li>
              <li>Deutsch</li>
            </ul>
          </div>
          {/* Currency */}
          <div className="relative group">
            <span className="cursor-pointer flex items-center hover:text-yellow-600">
              USD <span className="ml-1 text-xs">▼</span>
            </span>
            <ul className="absolute top-full left-0 bg-white text-black shadow-md rounded-md p-4 hidden group-hover:flex flex-col gap-2 z-50">
              <li>CAD</li>
              <li>EURO</li>
            </ul>
          </div>
          <p className="hidden sm:block">Free Shipping On All Orders over $100</p>
        </div>

        <ul className="flex gap-4 sm:gap-6 justify-center sm:justify-end items-center text-xs sm:text-sm">
          <li className="text-yellow-400 flex items-center gap-1">
            ⚡<a href="#">Flash Sale</a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition flex items-center gap-1">
              <i className="bi bi-person-circle"></i> Login
            </a>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 transition flex items-center gap-1">
              <i className="bi bi-globe-americas"></i> Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Middle Nav */}
      <div className="middle-nav w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-[5%] lg:px-[12%] py-4 gap-6">
        {/* Logo */}
        <div className="flex justify-between w-full md:w-1/5">
          <Link to="/">
            <h2 className="text-3xl md:text-5xl font-bricolage text-black font-bold">
              Shop<span className="text-yellow-500">Mart</span>
            </h2>
          </Link>
          {/* Hamburger for mobile */}
          <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Search */}
        <div className="product-search flex items-center border-2 border-yellow-500 rounded-md w-full md:w-1/2 overflow-hidden">
          <select className="bg-gray-100 font-semibold p-2 w-1/3 text-xs md:text-sm">
            <option>All Categories</option>
            <option>Camera</option>
            <option>Accessories</option>
            <option>Games</option>
            <option>Drones</option>
          </select>
          <input type="text" placeholder="Search products..." className="w-full px-2 py-2 outline-none text-xs md:text-sm bg-gray-100" />
          <button className="bg-yellow-500 text-white px-4 md:px-5 font-bold uppercase text-xs md:text-sm h-full">Search</button>
        </div>

        {/* Help, Wishlist, Cart */}
        <div className="get-help flex gap-4 items-center justify-center md:justify-end w-full md:w-1/3 text-xs md:text-sm">
          <div className="flex gap-2 items-center">
            <span className="text-xl md:text-3xl text-gray-500">
              <i className="bi bi-telephone"></i>
            </span>
            <div className="flex flex-col">
              <span className="text-gray-900">Need Help?</span>
              <span className="text-yellow-500">+234 8156755531</span>
            </div>
          </div>
          <Link to='/wishlist' className="flex items-center gap-2">
            <i className="bi bi-suit-heart text-xl md:text-2xl text-gray-500"></i>
            <span className="hidden md:block text-yellow-600 font-bold">Wishlist</span>
          </Link>
          <Link to='/cart' className="flex items-center gap-2">
            <i className="bi bi-cart2 text-xl md:text-2xl text-gray-500"></i>
            <span className="hidden md:block text-yellow-600 font-bold">Cart</span>
          </Link>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className={`w-full px-4 md:px-[5%] lg:px-[12%] py-4 flex-col md:flex-row justify-between items-center gap-6 transition-all duration-500 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
        {/* Categories Dropdown */}
        <div className="relative w-full md:w-1/5">
          <div className="flex items-center justify-between cursor-pointer font-bold" onClick={() => setOpen(!open)}>
            <span className="flex items-center gap-2">
              <span className="text-xl">≣</span>
              Shop Categories
            </span>
          </div>
          {open && (
            <ul className="absolute top-full left-0 bg-white shadow-md rounded-md overflow-hidden mt-2 w-full z-40">
              {categories.map((label, i) => (
                <a key={i} href="#" className="flex items-center px-4 py-2 border-b last:border-none hover:bg-gray-100">
                  {label}
                </a>
              ))}
            </ul>
          )}
        </div>

        {/* Main Links */}
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 font-bold w-full md:w-2/5 text-center">
          <li><Link to="/" className="hover:text-yellow-500 transition">Home</Link></li>
          <li><Link to="/about" className="hover:text-yellow-500 transition">About</Link></li>
          <li><Link to="/shop" className="hover:text-yellow-500 transition">Shop</Link></li>
          <li><Link to="/blog" className="hover:text-yellow-500 transition">Blog</Link></li>
          <li><Link to="/faq" className="hover:text-yellow-500 transition">Faq's</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-500 transition">Contact</Link></li>
        </ul>

        {/* Today's Deal */}
        <Link to='/wishlist' className="flex items-center gap-2 mt-4 md:mt-0">
          <i className="bi bi-suit-heart text-lg md:text-2xl text-gray-600"></i>
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm">Today's Deal</span>
            <span className="bg-red-600 text-white text-xs px-2 rounded-sm uppercase">Hot</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
