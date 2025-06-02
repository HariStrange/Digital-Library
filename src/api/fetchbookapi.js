// src/api/fetchBooks.js
export async function fetchBooksByGenre(genre) {
  const API_KEY = 'AIzaSyC2gVtWSdOAvGHNjqenmCfpMIh51PpKieA'; // Replace with your actual API key
  const query = `subject:${encodeURIComponent(genre)}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) return [];

    return data.items.map((item) => {
      const info = item.volumeInfo;
      return {
        id: item.id,
        title: info.title || 'No Title',
        authors: info.authors || ['Unknown Author'],
        description: info.description || 'No Description',
        categories: info.categories || ['Uncategorized'],
        thumbnail: info.imageLinks?.thumbnail || '',
        price: item.saleInfo?.listPrice?.amount || 'N/A',
      };
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}
