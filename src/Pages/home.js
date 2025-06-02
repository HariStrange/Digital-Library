import React from "react";

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
        <a
          href="/books"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg"
        >
          Browse Books
        </a>
      </div>
    </div>
  );
};

export default Home;
