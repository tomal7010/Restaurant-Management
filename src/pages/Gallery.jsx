import React, { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import bannerA from '../assets/bg1.png'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('https://server11-livid.vercel.app/all-foods')
      .then(res => res.json())
      .then(data => {
        const selected = data.slice(0, 10); 
        setImages(selected.map(item => item.foodImage));
      })
      .catch(err => console.error('Failed to load gallery images:', err));
  }, []);

  const slides = images.map(src => ({ src }));

  return (
    <div>

        <Navbar />

 <div className="carousel w-full h-28 pt-4">
<div  className="carousel-item relative w-full">
    <img src={bannerA}
      className="w-full" />
{/* Text Overlay */}
<div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-4xl font-bold mb-2 text-black">Gallery</h2>
    </div></div></div>


    <div className="max-w-6xl mx-auto px-4 py-5 pb-8">
      {/*<h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>*/}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Food ${i + 1}`}
            className="rounded shadow cursor-pointer hover:opacity-80 transition w-60 h-50"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Thumbnails]}
      />
    </div>
    <Footer />
    </div>
  );
};

export default Gallery;
