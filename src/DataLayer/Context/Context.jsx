import React from "react";
import { auth } from "../../FireBaseInit";
import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState({});
  // const [regUser, setRegUser] = useState([]);
  const role = useState(false)


  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
  };

  const logOut = () => {
    signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // userRoles(user?.email);

    });
    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  useEffect(() => {


  }, [])

 
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};