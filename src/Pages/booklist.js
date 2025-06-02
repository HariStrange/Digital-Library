import React from "react";
import { Link } from "react-router-dom";
import CustomCover from "../components/CustomCover";

const DEFAULT_IMAGE = "https://via.placeholder.com/120x180?text=No+Image";

function BookList({ books }) {
  return (
    <div className="flex items-center justify-center p-4  ">
      <div className="flex items-center flex-wrap justify-center m-auto gap-6 p-4">
        {books.map((book, index) => {
          const id = book.id || index;
          const title = book.title || book.volumeInfo?.title || "Untitled";
          const authors = book.authors ||
            book.volumeInfo?.authors || ["Unknown"];
          const price =
            typeof book.price === "number"
              ? book.price
              : parseInt(book.price) ||
                book.price === "Free" ||
                book.price === "N/A"
              ? "Free"
              : "Free"; // fallback to Free if price is not a number
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
                {thumbnail && thumbnail !== DEFAULT_IMAGE ? (
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
                      e.target.onerror = null;
                      e.target.src = "";
                    }}
                  />
                ) : (
                  <CustomCover
                    title={title}
                    authors={authors}
                    width={150}
                    height={180}
                  />
                )}
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
                    Price: {price === "Free" ? "Free" : `₹${price}`}
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
