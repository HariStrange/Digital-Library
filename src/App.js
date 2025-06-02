// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/home"
import BookDetail from "./Pages/bookdetails";
import Cart from "./Pages/cart";
import ExploreBooks from "./Pages/explorebooks";
import Checkout from "./Pages/checkout";
import BuyDummyBook from "./Pages/buydummy";

function App() {
  return (
    // <Router>
    //   <Header />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/books" element={<BookList />} />
    //     <Route path="/book/:id" element={<BookDetail />} />
    //     <Route path="/cart" element={<Cart />} />
    //   </Routes>
    // </Router>
  <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<ExploreBooks />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/buy-dummy" element={<BuyDummyBook />} />

      </Routes>
    </div>
  );
}

export default App;