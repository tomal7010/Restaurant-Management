import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('https://server11-livid.vercel.app/all-purchases')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => item.buyerEmail === user?.email);
        setOrders(filtered);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        toast.error('Failed to load orders.');
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    fetch(`https://server11-livid.vercel.app/purchase/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete');
        toast.success('Order deleted!');
        setOrders(prev => prev.filter(order => order._id !== id));
      })
      .catch(() => {
        toast.error('Failed to delete order.');
      });
  };

  return (
    <div>
        

       <div className='p-8'>
      <Navbar />
    </div> 



    <div className="max-w-5xl mx-auto px-4 py-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-red-500">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 shadow-md rounded-xl text-center">

              <img src={order.foodImage} alt={order.foodName} className="h-40 w-full object-cover rounded mb-4" />
              <div className='text-center'>
              <h3 className="text-xl font-semibold">{order.foodName}</h3>
              <p><span className="font-medium">Price :</span> ${order.foodPrice}</p>
              <p><span className="font-medium">Food Owner :</span> {order.buyerName}</p>
              <p><span className="font-medium">Purchased At :</span> {order.purchaseDate}</p>
              <p><span className="font-medium">Food Available Now :</span> {order.foodQuantity}</p>
              <p><span className="font-medium">Purchased Your Quantity :</span> {order.purchaseQuantity}</p>

              <button
                onClick={() => handleDelete(order._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer></Footer>
    </div>
  );
};

export default MyOrders;