import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBook, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Update cart count on mount and when location changes (route change)
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, [location]);

  return (
    <header className="flex justify-between items-center p-4 bg-black text-white">
      <Link to="/" className="text-xl font-bold flex items-center gap-2">
        <FaBook /> Digital Library
      </Link>
      <nav className="flex gap-6">
        <Link to="/books">Books</Link>
        <Link to="/cart" className="relative">
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;