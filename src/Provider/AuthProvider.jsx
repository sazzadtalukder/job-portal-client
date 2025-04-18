import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from '../Firebase/Firabase.init';
import axios from 'axios';
export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut =()=>{
        setLoading(true)
        return signOut(auth)

    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            // console.log('state captured', currentUser?.email)
            if(currentUser?.email){
                const user = {email: currentUser.email}
                axios.post('https://job-portal-server-again.vercel.app/jwt',user,{withCredentials: true})
                .then(res=> {
                    // console.log('login token',res.data)
                    setLoading(false)
                })
            }
            else{
                axios.post('https://job-portal-server-again.vercel.app/logout',{},{withCredentials: true})
                .then(res=> {
                    // console.log('logout',res.data)
                    setLoading(false)
                })
            }
           
        })
        return ()=>{
            unSubscribe();
        }
    },[])
    const authInfo = {
        user,loading,createUser,logIn,logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;