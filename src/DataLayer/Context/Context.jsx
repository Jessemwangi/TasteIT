import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../../FireBaseInit";

// Create context
const AuthContext = createContext();

// Provider
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Google Sign-in with popup
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  // Sign-out
  const logOut = async () => {
    try {
      await signOut(auth);
      // Clear any cached data or state here if needed
      setUser(null);
      setRole(false);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      
      if (currentUser && !currentUser.isAnonymous) {
        // Set role only for authenticated users
        // Example: setRole(currentUser.email === 'admin@example.com');
      } else {
        setRole(false);
      }
    });

    // Handle redirect result from Google sign-in
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User successfully signed in with Google
          setUser(result.user);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, []);

  // Helper functions
  const isAuthenticated = user && !user.isAnonymous;
  const isAnonymous = user && user.isAnonymous;

  const value = {
    user,
    googleSignIn,
    logOut,
    role,
    isLoading,
    isAuthenticated,
    isAnonymous,  
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('UserAuth must be used within an AuthContextProvider');
  }
  return context;
};