import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" h-[100vh] text-center bg-mob-custom-pattern md:bg-custom-pattern bg-center bg-no-repeat  bg-cover">
      <div className="bg-black/20 p-8 rounded-lg shadow-lg  h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white ">
          Welcome to the Digital Library
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-6">
          Explore, Read, and Enjoy Thousands of Books Online
        </p>
        <Link
          to="/books"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          <button>Browse books</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
