import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../FireBaseInit";

// Create context
const AuthContext = createContext();

// Provider
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // should start as null
  const [role, setRole] = useState(false); // useState returns [value, setter]

  // Google Sign-in
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  // Sign-out
  const logOut = () => {
    signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // You can check/set user role here
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, role }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy context use
export const UserAuth = () => {
  return useContext(AuthContext);
};
