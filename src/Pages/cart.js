import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = "https://via.placeholder.com/120x180?text=No+Image";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // For demo, assign a price if not present
  const getPrice = (item) => {
    // If item.price exists and is a number, use it, else fallback to 199
    return typeof item.price === "number"
      ? item.price
      : parseInt(item.price) || 199;
  };

  const totalAmount = cart.reduce((sum, item) => sum + getPrice(item), 0);

  const handleCheckout = () => {
    // You can add your checkout logic here
    alert("Proceeding to checkout!");
    // For demo, navigate to a dummy checkout page
    navigate("/checkout");
  };

  return (
    <div className="p-4 min-h-[90vh] flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col gap-4 text-center justify-center items-center min-h-[60vh]">
          <p className="text-center text-gray-500">Your cart is empty</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate("/books")}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md flex flex-col items-center p-4 relative hover:shadow-lg transition-shadow w-[160px]"
              >
                <button
                  className="absolute top-2 right-2 text-lg text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(item.id)}
                  title="Remove from cart"
                >
                  &times;
                </button>
                <img
                  src={item.thumbnail || DEFAULT_IMAGE}
                  alt={item.title}
                  className="rounded object-cover mb-3"
                  style={{
                    width: "90px",
                    height: "135px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    background: "#f3f3f3",
                  }}
                  onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                />
                <h3 className="text-base font-semibold text-center mt-2 mb-1 truncate w-full">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 text-center mb-2 truncate w-full">
                  {Array.isArray(item.authors)
                    ? item.authors.join(", ")
                    : item.authors}
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1 text-center">
                  ₹{getPrice(item)}
                </p>
              </div>
            ))}
          </div>
          {/* Cart Summary */}
          <div
            className="
              bg-white
              rounded-lg
              shadow
              p-6
              flex
              flex-col
              items-center
              z-50
              transition-all
              w-full
              max-w-xs
              mx-auto
              mt-8
              static
              sm:fixed
              sm:right-8
              sm:bottom-8
              sm:left-auto
              sm:mx-0
              sm:mt-0
            "
            style={{
              width: "90vw",
              maxWidth: "350px",
            }}
          >
            <div className="flex justify-between w-full mb-2 text-lg">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between w-full mb-4 text-lg font-semibold">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
            <button
              className="w-full bg-green-600 text-white py-3 rounded font-bold text-lg hover:bg-green-700 transition"
              onClick={handleCheckout}
            >
              Checkout Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
