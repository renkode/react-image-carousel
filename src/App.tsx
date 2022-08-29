import { useState, useEffect } from "react";
import "./App.css";
import ImageCarousel from "./components/ImageCarousel";

function App() {
  const NUM_IMAGES = 8;
  const [images, setImages] = useState([]);

  async function fetchImages(num: number) {
    await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${num}&api_key= live_ioaRkIuTfIezHHWkZ6rJsDgLfDiXPG4jk8LrnjfMogBqNp1i9cYOqU1OLFASHIm4`
    )
      .then((res) => res.json())
      .then((data) => setImages(data.map((img: { url: string }) => img.url)));
  }

  useEffect(() => {
    fetchImages(NUM_IMAGES);
  }, []);

  return (
    <div className="App">
      <ImageCarousel images={images} interval={3000} />
    </div>
  );
}

export default App;
