import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerA from '../assets/bg1.png'

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://server11-livid.vercel.app/all-foods')
      .then(res => res.json())
      .then(data => {
        if (user?.email) {
          const userFoods = data.filter(food => food.addedBy === user.email);
          setFoods(userFoods);
        }
      })
      .catch(err => console.error('Error fetching foods:', err));
  }, [user]);

  const handleUpdate = (id) => {
    navigate(`/update-food/${id}`);
  };

  return (
    <div>
      <Navbar />

       <div className="carousel w-full h-28 pt-4">
      <div  className="carousel-item relative w-full">
          <img src={bannerA}
            className="w-full" />
      {/* Text Overlay */}
      <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-4xl font-bold mb-2 text-black">My Added Foods</h2>
          </div></div></div>


      <div className=" px-4 py-8 max-w-7xl mx-auto">
    

        {foods.length === 0 ? (
          <p>No foods added by you yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map(food => (
              <div key={food._id} className="bg-white p-4 shadow-md rounded-xl text-center">
                <img src={food.foodImage} alt={food.foodName} className="w-full h-48 object-cover rounded-md" />

                <div className='text-center'>
                <h3 className="text-lg font-semibold">{food.foodName}</h3>
                <p>Price: ${food.price}</p>
                <p>Quantity: {food.quantity}</p>
                <button
                  onClick={() => handleUpdate(food._id)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded cursor-pointer"
                >
                  Update
                </button>
                </div>


              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyFoods;
