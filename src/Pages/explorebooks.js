// src/pages/ExploreBooks.js
import React, { useEffect, useState } from "react";
import { fetchBooksByGenre } from "../api/fetchbookapi";
import BookList from "../Pages/booklist";

const GENRES = [
  "All",
  "Fantasy",
  "Mystery",
  "History",
  "Horror",
  "Romance",
  "Science Fiction",
  "Thriller",
  "Non-Fiction",
  "Biography",
];

const ExploreBooks = () => {
  const [genre, setGenre] = useState(GENRES[0]);
  const [search, setSearch] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBooksByGenre(genre === "All" ? "" : genre)
      .then(setAllBooks)
      .finally(() => setLoading(false));
  }, [genre]);

  const filteredBooks = allBooks.filter((book) => {
    const title = book.volumeInfo?.title?.toLowerCase() || "";
    const authors = book.volumeInfo?.authors?.join(" ").toLowerCase() || "";
    return (
      title.includes(search.toLowerCase()) ||
      authors.includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      {/* Single filter UI */}
      <div className="flex flex-col items-end mb-8 gap-4">
        <input
          type="text"
          placeholder="🔎Search by book name or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-2/3 md:w-1/4 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border rounded px-4 py-2 md:w-1/4  focus:ring focus:ring-blue-200 focus:outline-none"
        >
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-3xl font-bold text-left mb-8">{genre} Books</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <img
            src="https://res.cloudinary.com/dx5lg8mei/image/upload/v1748845446/research_g1ffsx.png"
            alt="No Books Found"
            className="mb-4"
            style={{ width: "150px", height: "150px" }}
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/150?text=No+Image")
            }
          />
          <p className="text-gray-500 text-lg mb-4 text-center">
            No books found for your search or in the "{genre}" genre.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => (window.location.href = "/books")}
          >
            Go to All Books
          </button>
        </div>
      ) : (
        <BookList books={filteredBooks} />
      )}
    </div>
  );
};

export default ExploreBooks;
