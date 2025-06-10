import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../provider/AuthProvider';


const PurchasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/food/${id}`)
      .then(res => res.json())
      .then(data => setFood(data))
      .catch(err => console.error('Error fetching food:', err));
  }, [id]);




  const handlePurchase = () => {
  if (!food || quantity < 1 || quantity > food.quantity) {
    alert("Invalid quantity selected.");
    return;

  }

  const purchaseData = {
    purchaseCount: (food.purchaseCount || 0) + 1,
    //purchaseCount: food.purchaseCount || 0,
    quantity: food.quantity - Number(quantity),
    buyerEmail: user?.email,
    buyerName : user?.displayName,
    foodName: food.foodName,
    purchaseQuantity: Number(quantity),
    lastPurchasedAt: Date.now()
  };

  fetch(`http://localhost:3000/food/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchaseData),
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to update food');
      return res.json();
    })
    .then(() => {
      alert('Purchase successful!');
      navigate('/allfoods');
    })
    .catch(err => {
      console.error('Purchase failed:', err);
      alert('Purchase failed. Please try again.');
    });
};



  if (!food) {
    return <div className="text-center mt-10">Loading food details...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Purchase Food</h2>

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
              min=""
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
      </div>
      <Footer />
    </div>
  );
};

export default PurchasePage;
