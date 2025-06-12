import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Navbar from '../components/Navbar';
import bannerA from '../assets/bg1.png'
import Footer from '../components/Footer';
import Swal from 'sweetalert2';



const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`https://server11-livid.vercel.app/food/${id}`)
      .then(res => res.json())
      .then(data => setFood(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFood = {
      foodName: food.foodName,
      description: food.description,
      foodOrigin: food.foodOrigin,
      price: parseFloat(food.price),
      quantity: parseInt(food.quantity),
      foodCategory: food.foodCategory,
      foodImage: food.foodImage,
      addedBy: user?.email, 
    };

    fetch(`https://server11-livid.vercel.app/updatefood/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFood),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {

            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Food updated successfully!",
  showConfirmButton: false,
  timer: 1000
});

          //alert('Food updated successfully!');
          navigate('/myFoods');
        } else {
          alert(data.error || 'Update failed');
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood(prev => ({ ...prev, [name]: value }));
  };

  if (!food) return <p>Loading...</p>;

  return (
    <div>
        <Navbar></Navbar>

<div className="carousel w-full h-20 pt-4">
<div  className="carousel-item relative w-full">
    <img src={bannerA}
      className="w-full" />
{/* Text Overlay */}
<div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-4xl font-bold mb-2 text-black">Update Food</h2>
    </div></div></div>

<div className='bg-amber-300 rounded-3xl'>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 pb-6 pt-6 ">

        <div>
        <label className="font-bold text-2xl text-red-500">Food Name :</label>
      <input
        type="text"
        name="foodName"
        value={food.foodName}
        onChange={handleChange}
        className="w-full border px-3 py-2"
        placeholder="Food Name"
      /></div>
      
      <div><label className="font-bold text-2xl text-red-500">Food Price :</label>
      <input
        type="number"
        name="price"
        value={food.price}
        onChange={handleChange}
        className="w-full border px-3 py-2"
        placeholder="Price"
      /></div>

      <div><label className="font-bold text-2xl text-red-500">Food Quantity :</label>
      <input
        type="number"
        name="quantity"
        value={food.quantity}
        onChange={handleChange}
        className="w-full border px-3 py-2"
        placeholder="Quantity"
      /></div>
     
     <div><label className="font-bold text-2xl text-red-500">Food Category :</label>
      <input
        type="text"
        name="foodCategory"
        value={food.foodCategory}
        onChange={handleChange}
        className="w-full border px-3 py-2"
        placeholder="Category"
      /></div>

      <div><label className="font-bold text-2xl text-red-500">Food Origin :</label>
      <input
        type="text"
        name="foodOrigin"
        value={food.foodOrigin}
        onChange={handleChange}
        className="w-full border px-3 py-2"
        placeholder="Origin"
      /></div>


<div><label className="font-bold text-2xl text-red-500">Food Photo :</label>
       <input
        type="text"
        name="foodImage"
        value={food.foodImage}
        onChange={handleChange}
        className="w-full border px-3 py-2"
        placeholder="Image URL"
      /></div>

<div><label className="font-bold text-2xl text-red-500">Food Description :</label>
      <textarea
        name="description"
        value={food.description}
        onChange={handleChange}
        className="w-full border px-3 py-2"
        placeholder="Description"
      /></div>

      <div className='text-center'>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer ">
        Update
      </button></div>

    </form>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default UpdateFood;
