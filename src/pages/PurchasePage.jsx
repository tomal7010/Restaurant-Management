import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://server11-livid.vercel.app/food/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error('Error fetching food:', err));
  }, [id]);

  const handlePurchase = () => {
    if (!food || quantity < 1 || quantity > food.quantity) {
      toast.warning(' Invalid quantity selected.', { position: 'top-right' });
      return;
    }

    const purchaseData = {
      purchaseCount: (food.purchaseCount || 0) + 1,
      quantity: food.quantity - Number(quantity),
      buyerEmail: user?.email,
      buyerName: user?.displayName,
      foodPrice: food.price,
      foodName: food.foodName,
      purchaseQuantity: Number(quantity),
      lastPurchasedAt: Date.now(),
      foodImage: food.foodImage,
      foodCategory: food.foodCategory,
      foodQuantity: food.quantity - Number(quantity),/////
      foodOrigin: food.foodOrigin,
      foodDescription: food.description,
    };

    fetch(`https://server11-livid.vercel.app/food/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update food');
        return res.json();
      })
      .then(() => {
        toast.success(' Purchase successful!', { position: 'top-right' });
        setTimeout(() => {
          navigate('/allfoods');
        }, 1500);
      })
      .catch(() => {
        toast.error(' Purchase failed. Please try again.', { position: 'top-right' });
      });
  };

  if (!food) {
    return <div className="text-center mt-10">Loading food details...</div>;
  }

  return (
    <div>
      <Navbar />
      <ToastContainer />

<h2 className="text-3xl font-bold mb-6 text-center pt-6">Purchase Food</h2>


<div className='pb-6'>
      <div className="max-w-xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg">


        <div className="space-y-4">
          <div>
            <label className="block font-medium">Food Name</label>
            <input
              type="text"
              value={food.foodName}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Price ($)</label>
            <input
              type="text"
              value={food.price}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Quantity</label>
            <input
              type="number"
              max={food.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
            />
            <small className="text-gray-500">Available: {food.quantity}</small>
          </div>

          <div>
            <label className="block font-medium">Buyer Name</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Buyer Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <button
            onClick={handlePurchase}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-4 cursor-pointer"
          >
            Purchase
          </button>
        </div>
      </div></div>
      <Footer />
    </div>
  );
};

export default PurchasePage;
