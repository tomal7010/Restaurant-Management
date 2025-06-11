import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../provider/AuthProvider';
import Navbar from '../components/Navbar';
import bannerA from '../assets/bg1.png';
import Footer from '../components/Footer';

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [food, setFood] = useState({
    foodName: '',
    foodImage: '',
    foodCategory: '',
    quantity: '',
    price: '',
    foodOrigin: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      ...food,
      quantity: parseInt(food.quantity),
      price: parseInt(food.price),
      addedBy: user?.email,
      UserName: user?.displayName,
    };

    try {
      const res = await fetch('http://localhost:3000/add-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      const result = await res.json();

      if (res.ok && result.insertedId) {
        toast.success(' Food item added successfully!');
        setTimeout(() => {
          navigate('/myFoods');
        }, 1500);
      } else {
        toast.error(' Failed to add food item.');
      }
    } catch (err) {
      console.error(err);
      toast.error(' Something went wrong.');
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="carousel w-full h-20 pt-4">
        <div className="carousel-item relative w-full">
          <img src={bannerA} className="w-full" alt="Banner" />
          <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-4xl font-bold mb-2 text-black">Add Food</h2>
          </div>
        </div>
      </div>

      <div className="pb-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-6 bg-white shadow-md mt-10 rounded space-y-4"
        >
          <label className="font-bold text-2xl text-red-500">Food Name :</label>
          <input
            name="foodName"
            placeholder="Food Name"
            value={food.foodName}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />

          <label className="font-bold text-2xl text-red-500">Image URL :</label>
          <input
            name="foodImage"
            placeholder="Image URL"
            value={food.foodImage}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />

          <label className="font-bold text-2xl text-red-500">Food Category :</label>
          <input
            name="foodCategory"
            placeholder="Category"
            value={food.foodCategory}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />

          <label className="font-bold text-2xl text-red-500">Food Quantity :</label>
          <input
            name="quantity"
            placeholder="Quantity"
            type="number"
            value={food.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />

          <label className="font-bold text-2xl text-red-500">Food Price :</label>
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={food.price}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />

          <label className="font-bold text-2xl text-red-500">Food Country of Origin :</label>
          <input
            name="foodOrigin"
            placeholder="Country of Origin"
            value={food.foodOrigin}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />

          <label className="font-bold text-2xl text-red-500">Food Description :</label>
          <textarea
            name="description"
            placeholder="Description"
            value={food.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 h-24"
            required
          />

          <div>
            <p className="text-sm text-gray-600">User Email : {user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">User Name : {user?.displayName}</p>
          </div>

          <div className='text-center'><button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded cursor-pointer"
          >
            Add Item
          </button></div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddFood;
