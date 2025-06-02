import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "cod",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    // Optionally clear cart here:
    localStorage.removeItem("cart");
    setTimeout(() => {
      setShowModal(false);
      navigate("/books");
    }, 2500);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 p-4">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Address</label>
          <textarea
            name="address"
            required
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Delivery Address"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Payment Method</label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded font-bold text-lg hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </form>

      {/* Animated Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center animate-bounce-in">
            <svg
              className="w-16 h-16 text-green-500 mb-4 animate-ping-once"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12l2 2 4-4"
              />
            </svg>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h3>
            <p className="text-center text-gray-700">Thank you for your purchase.<br />You will be redirected soon.</p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes bounce-in {
            0% { transform: scale(0.7); opacity: 0; }
            60% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-bounce-in {
            animation: bounce-in 0.5s;
          }
          @keyframes ping-once {
            0% { transform: scale(0.7); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-ping-once {
            animation: ping-once 0.7s;
          }
        `}
      </style>
    </div>
  );
};

export default Checkout;