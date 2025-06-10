import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import bannerA from '../assets/bg1.png'

const AllFoods = () => {
  const [allfoods, setallFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/all-foods') // all-foods api
      .then(res => res.json())
      .then(data => setallFoods(data))
      .catch(err => console.error(err));
  }, []);

  // filter foods by search query
  const filteredFoods = allfoods.filter(food =>
    food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />

 <div className="carousel w-full h-28 pt-4">
<div  className="carousel-item relative w-full">
    <img src={bannerA}
      className="w-full" />
{/* Text Overlay */}
<div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-4xl font-bold mb-2 text-black">All Foods</h2>
    </div></div></div>



<div className="px-4 py-8 max-w-7xl mx-auto">

        

        {/*<h2 className="text-3xl font-bold mb-6 text-center">All Foods</h2>*/}

        {/*  Search Input */}
        <div className="flex justify-center mb-6">
          <label className="input flex items-center gap-2 border rounded-md px-3 py-2">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="outline-none"
            />
          </label>
        </div>

        {/*  Changed allfoods → filteredFoods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <div key={food._id} className="bg-white p-4 shadow-md rounded-xl text-center">
              <img src={food.foodImage} alt={food.foodName} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-3">{food.foodName}</h3>
              <p className="text-gray-600">Category: {food.foodCategory}</p>
              <p className="text-gray-600">Origin: {food.foodOrigin}</p>
              <p className="text-green-600 font-medium">Price: ${food.price}</p>
              <p className="text-sm text-gray-500 mt-1">Quantity: {food.quantity}</p>
              <button
                onClick={() => navigate(`/food/${food._id}`)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllFoods;
