import React, { useMemo } from "react";

// Color palettes for backgrounds and borders
const COLOR_PALETTES = [
    { bg: ["#ff7e5f", "#feb47b"], border: "#ff7e5f", accent: "#fffbe6" },
    { bg: ["#6a11cb", "#2575fc"], border: "#2575fc", accent: "#e6f0ff" },
    { bg: ["#43cea2", "#185a9d"], border: "#185a9d", accent: "#e6fff7" },
    { bg: ["#f7971e", "#ffd200"], border: "#f7971e", accent: "#fffbe6" },
    { bg: ["#00c6ff", "#0072ff"], border: "#0072ff", accent: "#e6f7ff" },
    { bg: ["#e65c00", "#f9d423"], border: "#e65c00", accent: "#fff7e6" },
    { bg: ["#fd746c", "#ff9068"], border: "#fd746c", accent: "#fff0ee" },
    { bg: ["#4b6cb7", "#182848"], border: "#182848", accent: "#e6eaff" },
    { bg: ["#ff512f", "#dd2476"], border: "#dd2476", accent: "#fff0f6" },
    { bg: ["#1e3c72", "#2a5298"], border: "#2a5298", accent: "#e6eaff" },
    { bg: ["#ff9a9e", "#fad0c4"], border: "#ff9a9e", accent: "#fff5f5" },
    { bg: ["#a18cd1", "#fbc2eb"], border: "#a18cd1", accent: "#f9f0ff" },
    { bg: ["#f093fb", "#f5576c"], border: "#f5576c", accent: "#ffe6e9" },
    { bg: ["#4facfe", "#00f2fe"], border: "#00f2fe", accent: "#e6faff" },
    { bg: ["#43e97b", "#38f9d7"], border: "#43e97b", accent: "#e6fff5" },
    { bg: ["#fa709a", "#fee140"], border: "#fa709a", accent: "#fffbe6" },
    { bg: ["#30cfd0", "#330867"], border: "#330867", accent: "#e6f0ff" },
    { bg: ["#c471ed", "#f64f59"], border: "#f64f59", accent: "#ffe6f0" },
    { bg: ["#12c2e9", "#c471ed"], border: "#12c2e9", accent: "#e6f5ff" },
    { bg: ["#fbc2eb", "#a6c1ee"], border: "#a6c1ee", accent: "#f9f5ff" },
];

// Pick a palette and a style type based on book info (deterministic)
function getStyleIndex(title = "", authors = "") {
  const str = (title + (authors || "")).toLowerCase();
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

// Get best text color for contrast
function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#222" : "#fff";
}

const CustomCover = ({
  title,
  authors,
  width = 120,
  height = 180,
  className = "",
}) => {
  const styleIndex = useMemo(
    () => getStyleIndex(title, authors),
    [title, authors]
  );
  const palette = COLOR_PALETTES[styleIndex % COLOR_PALETTES.length];
  const styleType = ["gradient", "solid", "stripes"][styleIndex % 3];
  const borderColor = palette.border;
  const accentColor = palette.accent;
  const titleColor = getContrastYIQ(palette.bg[0].replace("#", ""));
  // Author color: slightly muted version of title color or accent
  const authorColor = titleColor === "#fff" ? "rgba(255,255,255,0.8)" : "#444";

  let background;
  if (styleType === "gradient") {
    background = `linear-gradient(135deg, ${palette.bg[0]}, ${palette.bg[1]})`;
  } else if (styleType === "solid") {
    background = palette.bg[0];
  } else {
    // diagonal stripes pattern
    background = `repeating-linear-gradient(
      135deg,
      ${palette.bg[0]},
      ${palette.bg[0]} 15px,
      ${palette.bg[1]} 15px,
      ${palette.bg[1]} 30px
    )`;
  }

  return (
    <div
      className={`relative flex flex-col justify-center items-center rounded-2xl shadow-lg overflow-hidden ${className}`}
      style={{
        width,
        height,
        background,
        border: `4px solid ${borderColor}`,
        color: titleColor,
        padding: 16,
        textAlign: "center",
        fontFamily: "inherit",
        transition: "background 0.3s",
        boxSizing: "border-box",
      }}
    >
      <span
        className="font-bold text-base truncate w-full"
        style={{
          color: titleColor,
          fontWeight: 700,
          fontSize: width > 140 ? 20 : 16,
          letterSpacing: ".01em",
          marginBottom: 4,
        }}
      >
        {title}
      </span>
      <span
        className="text-xs mt-1 truncate w-full"
        style={{
          color: authorColor,
          fontWeight: 500,
          fontSize: width > 140 ? 14 : 12,
        }}
      >
        {Array.isArray(authors) ? authors.join(", ") : authors}
      </span>
      {/* SVG wave at the bottom */}
      <svg
        viewBox="0 0 100 18"
        width={width}
        height={height * 0.18}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          zIndex: 1,
          display: "block",
        }}
        preserveAspectRatio="none"
      >
        <path
          d="M0 10 Q 25 18 50 10 T 100 10 V18 H0Z"
          fill={accentColor}
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

export default CustomCover;
