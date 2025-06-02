import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import BookList from "./booklist";
import CustomCover from "../components/CustomCover";

const DEFAULT_IMAGE = "https://via.placeholder.com/300x450?text=No+Image";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [similarGenreBooks, setSimilarGenreBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showCustomCover, setShowCustomCover] = useState(false);

  // Fetch book details by ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const data = await res.json();
        setBook(data);

        // Trigger similar books fetch
        const author = data.volumeInfo?.authors?.[0];
        const genre = data.volumeInfo?.categories?.[0];
        if (author) {
          fetchSimilarBooks(author);
        }
        if (genre) {
          fetchSimilarGenreBooks(genre);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching book:", err);
        setLoading(false);
      }
    };

    const fetchSimilarBooks = async (author) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
            author
          )}&maxResults=10`
        );
        const data = await res.json();
        const filtered = data.items?.filter((b) => b.id !== id) || [];
        setSimilarBooks(filtered);
      } catch (err) {
        console.error("Error fetching similar books:", err);
      }
    };

    const fetchSimilarGenreBooks = async (genre) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
            genre
          )}&maxResults=10`
        );
        const data = await res.json();
        const filtered = data.items?.filter((b) => b.id !== id) || [];
        setSimilarGenreBooks(filtered);
      } catch (err) {
        console.error("Error fetching similar genre books:", err);
      }
    };

    fetchBook();
  }, [id]);

  // Add to cart handler
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Use "Free" if price is not a valid number
    let price = book.saleInfo?.listPrice?.amount;
    if (!price || isNaN(price)) {
      price = "Free";
    }
    const cartItem = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ["Unknown"],
      thumbnail:
        book.volumeInfo.imageLinks?.thumbnail ||
        book.thumbnail ||
        book.image ||
        "",
      price,
      quantity: 1,
    };
    const existingIndex = cart.findIndex((item) => item.id === cartItem.id);
    if (existingIndex !== -1) {
      alert("Book already in cart!");
    } else {
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Book added to cart!");
    }
  };

  // Rent modal handler
  const handleRent = () => {
    setShowRentModal(true);
  };

  // Buy handler
  const handleBuy = () => {
    // Use "Free" if price is not a valid number
    let price = book.saleInfo?.listPrice?.amount;
    if (!price || isNaN(price)) {
      price = "Free";
    }
    const buyItem = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ["Unknown"],
      price,
      thumbnail:
        book.volumeInfo.imageLinks?.thumbnail ||
        book.thumbnail ||
        book.image ||
        "",
      quantity: 1,
    };
    // Pass as a cart array for BuyDummy
    navigate("/buy-dummy", {
      state: { cart: [buyItem] },
    });
  };

  if (loading)
    return (
      <div className="p-6 min-h-[70vh] flex flex-col items-center justify-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-center mt-4">Loading book details...</p>
      </div>
    );
  if (!book) return <div className="p-6 text-red-500">Book not found.</div>;

  const volume = book.volumeInfo;
  const title = volume.title;
  const authors = volume.authors || ["Unknown Author"];
  const genre = volume.categories?.[0] || "Unknown Genre";
  const description = volume.description || "No description available.";
  const image =
    book.volumeInfo.imageLinks?.thumbnail || book.thumbnail || book.image || "";

  return (
    <div className="p-4 min-h-[90vh]">
      {/* Book Info */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mx-auto">
        <div className="flex-shrink-0 w-full md:w-[260px] flex justify-center md:justify-start mb-6 md:mb-0">
          {!showCustomCover && image ? (
            <img
              src={image}
              alt={title}
              className="rounded-lg shadow object-cover"
              style={{ width: 220, height: 330, background: "#f3f3f3" }}
              onError={() => setShowCustomCover(true)}
            />
          ) : (
            <CustomCover
              title={title}
              authors={authors}
              width={220}
              height={330}
              className="w-full"
            />
          )}
        </div>
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-bold text-left">{title}</h1>
          <p className="text-lg text-gray-700 mt-2 text-left">
            by {Array.isArray(authors) ? authors.join(", ") : authors}
          </p>
          <p className="text-md text-gray-500 mt-2 text-left">Genre: {genre}</p>
          <p
            className="mt-4 text-gray-800 text-left"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleRent}
            >
              Rent
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleBuy}
            >
              Buy
            </button>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 flex items-center gap-2"
              onClick={handleAddToCart}
            >
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Rent Modal */}
      {showRentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Rent Book</h2>
            <p>
              Renting: <span className="font-semibold">{title}</span>
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowRentModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  setShowRentModal(false);
                  alert("Book rented!");
                }}
              >
                Confirm Rent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Similar Books by Author */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">
          Similar books by {Array.isArray(authors) ? authors[0] : authors}
        </h2>
        {similarBooks.length > 0 ? (
          <BookList
            books={similarBooks.map((b) => ({
              id: b.id,
              title: b.volumeInfo.title,
              authors: b.volumeInfo.authors || ["Unknown"],
              thumbnail:
                b.volumeInfo.imageLinks?.thumbnail ||
                b.thumbnail ||
                b.image ||
                "",
              price: "Free",
            }))}
          />
        ) : (
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/dx5lg8mei/image/upload/v1748845446/open-book_gcmmiw.png"
              alt="No Similar Books"
              className="mb-4"
              style={{ width: "150px", height: "150px" }}
              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
            />
            <p className="text-gray-500">No similar books found.</p>
          </div>
        )}
      </div>
      {/* Similar Books by Genre */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">
          Similar books by {genre}
        </h2>
        {similarGenreBooks.length > 0 ? (
          <BookList
            books={similarGenreBooks.map((b) => ({
              id: b.id,
              title: b.volumeInfo.title,
              authors: b.volumeInfo.authors || ["Unknown"],
              thumbnail:
                b.volumeInfo.imageLinks?.thumbnail ||
                b.thumbnail ||
                b.image ||
                "",
              price: "Free",
            }))}
          />
        ) : (
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/dx5lg8mei/image/upload/v1748845446/open-book_gcmmiw.png"
              alt="No Similar Books"
              className="mb-4"
              style={{ width: "150px", height: "150px" }}
              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
            />
            <p className="text-gray-500">No similar books found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
