module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        purple: "#6B46C1", // Custom color, if needed
        dusk: "#4A5568", // Custom color, if needed
      },
      backgroundImage: {
        "custom-pattern":
          "url('https://images.pexels.com/photos/1787219/pexels-photo-1787219.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load')",
        "mob-custom-pattern":
          "url('https://images.pexels.com/photos/18446787/pexels-photo-18446787/free-photo-of-row-of-books-on-a-shelf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", // Replace with your image path
        // Replace with your image path
      },
    },
  },
  plugins: [],
};
