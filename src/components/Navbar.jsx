import React, { use } from 'react';
import restaurantmanagementlogo from '../assets/restaurantmanagementlogo.png'
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import profileIcon from '../assets/profileicon.png'

const Navbar = () => {

  const { user, logOut } = use(AuthContext);

  const handleLogOut = () =>{
    //console.log("successfully log out")
    logOut().then(() => {
      //alert("Log-out successful.")
    }).catch((error) => {
      //console.log(error);
    });
  }

    const links = <>
           <Link to='/'><li className='m-2 font-bold text-xl hover:bg-red-700'>Home</li></Link>
      <Link to='/allfoods'><li className='m-2 hover:bg-red-700 font-bold text-xl'>All Foods</li></Link>
      <Link to='/gallery'><li className='m-2 hover:bg-red-700 font-bold text-xl'>Gallery</li></Link>
      
      
    </>


    return (
        <div className="navbar mx-auto bg-white fixed top-0 left-0 w-full z-50 ">



  <div className="navbar-start">
    <div className="dropdown">
    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">


        {links}


      </ul>

    </div>

    <div className='gap-2 flex'>
    <figure>
    <img src={restaurantmanagementlogo} alt="restaurantmanagementlogo" srcset="" className='h-12 ' />
    </figure>
    <a className=" text-2xl font-bold hidden">Restaurant Management Logo</a>
    </div>

  </div>

  <div className="navbar-center hidden lg:flex  ">
    <ul className="menu menu-horizontal px-1">


    {links}


    </ul>
  </div>
  <div className="navbar-end gap-2">


{user ? ( 

<div>
       <div>
       <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="cursor-pointer m-1"><img
      src= {user && user.photoURL ? user.photoURL : profileIcon} 
      className='w-12 rounded-full ' /></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
  <Link to ='/myFoods' ><li className=' font-bold  hover:bg-red-700'>My Foods</li></Link>
  <Link to ='/addfood'><li className=' font-bold  hover:bg-red-700'>Add food</li></Link>
  <Link to ='/myorders'><li className=' font-bold  hover:bg-red-700'>My Orders</li></Link>
  <li><button onClick={handleLogOut} className="btn bg-blue-700 rounded-full text-amber-50">LogOut</button></li>
  </ul>
</div>
        
      </div>
      </div>

): ( 

  <Link to='/auth/register' className="btn bg-blue-700 rounded-full text-amber-50">Register</Link>
  
  )}

    {user ? (" "): (

<Link to='/auth/login' className="btn bg-blue-700 rounded-full text-amber-50">Login</Link>

      )}





  </div>
</div>
    );

};

export default Navbar;