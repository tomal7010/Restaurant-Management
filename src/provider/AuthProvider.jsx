import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();


const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);


    //console.log(loading, user);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };


    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }


    const logOut = () =>{
        return signOut(auth);
    }

    useEffect(()=>{

     const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{

        setUser(currentUser);
        setLoading(false);
     });
     return () =>{
        unsubscribe();
     };
    },[]);

    
    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        googleSignIn,
        setLoading
    };

    {/*return  <AuthContext value={authData}> { children }</AuthContext>;*/}

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;

    
};

export default AuthProvider;