import React, { useEffect, useState } from 'react';
import bannerB from '../assets/banner2 (2).jpg'
import bannerC from '../assets/banner3 (2) (1).jpg'
import bannerA from '../assets/banner1 (1).jpg'
import extra1 from '../assets/extra1.jpg'
import extra2 from '../assets/extra2.jpg'
import { Link, useNavigate } from 'react-router';



const Home = () => {


    ////Top Selling Food////
    const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://server11-livid.vercel.app/foods') //  top 6 food api
      .then(res => res.json())
      .then(data => setFoods(data))
      .catch(err => console.error(err));
  }, []);

   // recent products
  const recentProducts = foods.slice(0, 4); 

  // Sample reviews
  const reviews = [
    { id: 1, name: "Rahim", text: "Amazing food and quick delivery!" },
    { id: 2, name: "Karim", text: "Best restaurant in town. Highly recommend." },
    { id: 3, name: "Fatema", text: "Loved the ambience and taste of food." },
  ];

    return (
        <div>
            


            <div className="font-sans text-gray-800 p-5 space-y-10 ">
      
      {/* Header Section */}
      
      <div className="carousel w-full h-80 ">
  <div id="slide1" className="carousel-item relative w-full">
    <img
      src={bannerA}
      className="w-full " />

{/* Text Overlay */}
<div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-4xl font-bold mb-2 text-black">Welcome to Our Restaurant</h2>
      <p className="text-lg text-black">Delight in every bite. Fresh ingredients, unforgettable taste.</p>
      <button className="btn btn-primary"><Link to='/allfoods'>Explore Menu</Link></button>
    </div>

    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img
      src={bannerB}
      className="w-full" />


{/* Text Overlay */}
<div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-4xl font-bold mb-2 text-black">Home-Cooked Flavors, Heartfelt Service</h2>
      <p className="text-lg text-black">Bringing tradition and taste to your table.</p>
      <button className="btn btn-primary"><Link to='/allfoods'>See All Foods</Link></button>
    </div>

    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
    <img
      src={bannerC}
      className="w-full" />

{/* Text Overlay */}
<div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-4xl font-bold mb-2 text-black">Crave. Click. Savor</h2>
      <p className="text-lg text-black">Order top-rated dishes in seconds.</p>
      <button className="btn btn-primary"><Link to='/allfoods'>Browse Foods</Link></button>
    </div>

    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
</div>



{/*Top Selling Food*/}
<div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Top Selling Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map(food => (
          <div key={food._id} className="bg-white p-4 shadow-md rounded-xl text-center">
            <img src={food.foodImage} alt={food.foodName} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-3">{food.foodName}</h3>
            <p className="text-gray-600">Category: {food.foodCategory}</p>
            <p className="text-gray-600">Origin: {food.foodOrigin}</p>
            <p className="text-green-600 font-medium">Price: ${food.price}</p>
            <p className="text-sm text-gray-500 mt-1">Sold: {food.purchaseCount} times</p>
            <button
              onClick={() => navigate(`/food/${food._id}`)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Details
            </button>
          </div>
        ))}
      </div>

       <Link to='/allfoods'><div className="text-center mt-8 ">
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md cursor-pointer"
        >
        See All
        </button>
      </div></Link>



    </div>


{/*Extra section*/}
<div className="bg-green-100 py-10 px-10 grid grid-cols-1 md:grid-cols-2 gap-6">



      <Link to='/allfoods'>
      <div className="relative w-full h-[300px] overflow-hidden">
      <img
        src={extra1} 
        alt="Spring Gardening Fest"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-amber-100 text-center p-4">
        <h1 className="text-4xl font-bold mb-2 text-red-600 ">Welcome to Our Restaurant</h1>
        <p className="text-lg text-shadow-amber-600">Experience exceptional dining with our specially crafted recipes and warm hospitality.</p>
        
      </div>
    </div>
    </Link>


    <Link to='/gallery'>
    <div className="relative w-full h-[300px] overflow-hidden">
      <img
        src={extra2} 
        alt="Spring Gardening Fest"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-amber-100 text-center p-4">
        <h1 className="text-4xl font-bold mb-2 text-red-600">Explore Our Gallery</h1>
        <p className="text-lg text-shadow-emerald-500">Take a visual tour of our dishes and cozy dining environment.</p>

        

      </div>
    </div>
    </Link>



        </div>




{/* Recent Products */}
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Recent Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map(food => (
            <div key={food._id} className="bg-white p-4 shadow-md rounded-xl text-center flex flex-col">
              <img src={food.foodImage} alt={food.foodName} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-3">{food.foodName}</h3>
              <p className="text-gray-600">Category: {food.foodCategory}</p>
              <p className="text-gray-600">Origin: {food.foodOrigin}</p>
              <p className="text-green-600 font-medium">Price: ${food.price}</p>
              
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 py-8 max-w-7xl mx-auto bg-gray-100 rounded-lg my-10 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-lg shadow-md p-6">
              <p className="italic mb-4">"{r.text}"</p>
              <h4 className="font-bold text-red-600">{r.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-12 px-5 bg-red-600 text-white text-center rounded-lg max-w-7xl mx-auto my-10">
        <h2 className="text-3xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 max-w-xl mx-auto">Get updates about new menu items, special offers, and events.</p>
        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="rounded-full px-5 py-3 text-gray-900 focus:outline-none"
            required
          />
          <button type="submit" className="bg-white text-red-600 font-bold rounded-full px-6 py-3 hover:bg-gray-100 transition cursor-pointer">
            Subscribe
          </button>
        </form>
      </div>



        </div>
    );
};

export default Home;