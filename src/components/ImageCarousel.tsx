import { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: Array<string>;
}

// no need to reset timer for some reason.

export default function ImageCarousel({ images = [] }: ImageCarouselProps) {
  const INTERVAL = 3000;
  let TIMER: ReturnType<typeof setInterval>;
  const SLOTS = images.length;
  const [imageIndex, setImageIndex] = useState<number>(0);

  function changeIndex(index: number) {
    if (index < 0) {
      setImageIndex(SLOTS - 1);
    } else if (index >= SLOTS) {
      setImageIndex(0);
    } else {
      setImageIndex(index);
    }
  }

  // start carousel timer
  useEffect(() => {
    if (SLOTS === 0) return;
    TIMER = setInterval(() => {
      changeIndex(imageIndex + 1);
    }, INTERVAL);
    console.log("tick");
    return () => clearInterval(TIMER); // clear on dismount
  });

  // log current index
  useEffect(() => {
    console.log(`Current index: ${imageIndex}`);
  }, [imageIndex]);

  return (
    <div className="carousel">
      <div className="left-arrow-container">
        <div className="left-arrow" onClick={() => changeIndex(imageIndex - 1)}>
          <i className="gg-chevron-left" />
        </div>
      </div>
      <div className="right-arrow-container">
        <div
          className="right-arrow"
          onClick={() => changeIndex(imageIndex + 1)}
        >
          <i className="gg-chevron-right" />
        </div>
      </div>
      <div className="slot-container">
        {images.map((img, index) => (
          <span
            className={`slot ${index === imageIndex ? "lit" : "none"}`}
            key={index}
            onClick={() => changeIndex(index)}
          />
        ))}
      </div>
      <div className="image-container">
        {images.map((img, index) => (
          <img
            className={`carousel-image ${
              index === imageIndex ? "fade-in" : ""
            }`}
            src={img}
            key={index}
            alt={img}
            style={{ display: `${index === imageIndex ? "block" : "none"}` }}
          />
        ))}
      </div>
    </div>
  );
}
