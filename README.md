# Digital Library 📚

A modern, responsive digital library web app built with React.  
Users can explore, search, rent, and buy books by genre, with a beautiful UI and smooth cart/checkout experience.

---

## Features

- 🔎 **Search books** by name within selected genres
- 📚 **Browse by genre** (Fantasy, Mystery, History, etc.)
- 🛒 **Add to cart** with quantity controls and "already in cart" detection
- 💸 **Buy or rent** books (with "Free" books handled everywhere)
- 🖼️ **Custom book covers** for books without images, with dynamic colors and wave design
- 🧾 **Checkout** with a simple form and animated success modal
- 📱 **Responsive design** for desktop and mobile

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Haristrange/digital-library.git
cd digital-library
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
  ├── api/                # API calls (e.g., fetchbookapi.js)
  ├── components/         # Reusable UI components (CustomCover, etc.)
  ├── Pages/              # Main pages (booklist, bookdetails, cart, buydummy, explorebooks, etc.)
  ├── App.js
  └── index.js
```

---

## Customization

- **Genres:** Edit the `GENRES` array in `src/Pages/explorebooks.js`.
- **Book data:** Update your API or mock data in `src/api/fetchbookapi.js`.
- **Custom cover styles:** Tweak color palettes and SVG in `src/components/CustomCover.js`.

---

## Screenshots
![Home](/src/screenshots/1.jpeg)
![Explore Books](/src/screenshots/6.jpeg)
![Book Details](/src/screenshots/4.jpeg)
![SimilarBooks](/src/screenshots/9.png)
![Cart](/src/screenshots/2.jpeg)
![CheckOut](/src/screenshots/8.jpeg)
![EmptyCart](/src/screenshots/7.jpeg)


---

## License

MIT

---

**Made with ❤️ by [Hari Strange]**
