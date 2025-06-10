
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router'; 
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth'; 
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';


const Register = () => {
  const { createUser, setUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    //console.log(setUser);

    // Password validation
    if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      setError('Password must contain an uppercase letter, lowercase letter, and be at least 6 characters long.');
      return;
    }

    setError('');
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() => {


            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Account created Successfully",
                showConfirmButton: false,
                timer: 1500
              });


        navigate('/');
      })
      .catch((error) => {
        
        if (error.code === 'auth/email-already-in-use') {
          setError('This email is already registered. Please use another email.');


          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email is already registered. Please use another email",
            
          });




        } else {
          setError(error.message);
        }
      });
  };

  //////////////
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        //console.log("Google Login Successful:", user);

        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account created Successfully",
            showConfirmButton: false,
            timer: 1500
          });



        navigate('/');
      })
      .catch((error) => {
        //console.error("Google Login Error:", error.message);


        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email is already registered. Please use another email",
            
          });



        setError(error.message);
      });
  };
  

  return (
    <div className='flex justify-center min-h-screen items-center'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-10">
        <h2 className='font-semibold text-2xl text-center pt-4'>Register your account</h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input name='name' type="text" className="input" placeholder="Name" required />

            <label className="label">Email</label>
            <input name='email' type="email" className="input" placeholder="Email" required />

            <label className="label">Photo URL</label>
            <input name='photo' type="text" className="input" placeholder="Photo URL"  />

            <label className="label">Password</label>
            <input name='password' type="password" className="input" placeholder="Password" required />

            {error && <p className='text-red-600 pt-2'>{error}</p>}

            <button type='submit' className="btn btn-neutral mt-4">Register</button>

            <p className='font-semibold pt-5'>
              Already Have An Account?{" "}
              <Link className='text-blue-800' to="/auth/login">Login</Link>
            </p>
          </fieldset>
        </form>


        <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>



      </div>
    </div>
  );
};

export default Register;