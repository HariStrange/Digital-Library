import React from "react";
import { Link } from "react-router-dom";

const DEFAULT_IMAGE = "https://via.placeholder.com/120x180?text=No+Image";

function BookList({ books }) {
  return (
    <div className="min-h-[90vh] p-4 flex items-center justify-center w-screen">
      <div className="flex items-center flex-wrap justify-start m-auto gap-4 p-4">
        {books.map((book, index) => {
          const id = book.id || index;
          const title = book.title || book.volumeInfo?.title || "Untitled";
          const authors = book.authors ||
            book.volumeInfo?.authors || ["Unknown"];
          const price = book.price || "N/A";
          const thumbnail =
            book.thumbnail ||
            book.image ||
            book.volumeInfo?.imageLinks?.thumbnail ||
            DEFAULT_IMAGE;

          return (
            <Link
              to={`/book/${id}`}
              key={id}
              className="no-underline text-inherit"
            >
              <div
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col items-center p-2 justify-center"
                style={{ width: "150px", minHeight: "210px" }}
              >
                <img
                  src={thumbnail}
                  alt={title}
                  className="object-cover rounded"
                  style={{
                    width: "150px",
                    height: "180px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    background: "#f3f3f3",
                  }}
                  onError={(e) => {
                    e.target.src = DEFAULT_IMAGE;
                  }}
                />
                <div className="p-2 flex-1 flex flex-col items-center w-full">
                  <h3
                    className="text-sm font-semibold text-center text-nowrap overflow-hidden relative"
                    style={{
                      whiteSpace: "nowrap",
                      width: "100%",
                      textOverflow: "ellipsis",
                      animation: "marquee 5s linear infinite",
                      overflow: "hidden",
                    }}
                  >
                    {title}
                  </h3>
                  <p className="text-xs text-gray-600 text-center truncate">
                    {Array.isArray(authors) ? authors.join(", ") : authors}
                  </p>
                  <p className="text-xs font-bold text-gray-900 mt-1 text-center">
                    Price: {price === "N/A" ? "Free" : price}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookList;
