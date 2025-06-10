import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../provider/AuthProvider';

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/food/${id}`)
      .then(res => res.json())
      .then(data => setFood(data))
      .catch(err => console.error(err));
  }, [id]);

  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]); 

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/purchases/user/${user.email}`)
        .then(res => res.json())
        .then(data => setPurchases(Array.isArray(data) ? data : [])) 
        .catch(err => {
          console.error(err);
          setPurchases([]); 
        });
    }
  }, [user]);

  if (!food) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <img src={food.foodImage} alt={food.foodName} className="w-full h-64 object-cover rounded-lg mb-6" />

        <div className='text-center'>
          <h1 className="text-3xl font-bold mb-2">{food.foodName}</h1>
          <p className="text-gray-700 mb-1">Category: {food.foodCategory}</p>
          <p className="text-gray-700 mb-1">Origin: {food.foodOrigin}</p>
          <p className="text-green-600 text-xl font-semibold">Price: ${food.price}</p>
          <p className="text-gray-600 mt-2">Available Quantity: {food.quantity}</p>

          {/* Fixed Purchase Count Calculate */}
          <p className="text-gray-600 mt-2">
            Purchase Count: {
              purchases
                .filter(p => p.foodId?.toString() === food._id?.toString()) 
                .reduce((total, item) => total + (item.purchaseQuantity || 0), 0)
            }
          </p>

          <p className="mt-4 text-gray-800">{food.description || 'No description available.'}</p>

          <button
            onClick={() => window.location.href = `/purchase/${food._id}`}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md cursor-pointer"
          >
            Purchase
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FoodDetails;
