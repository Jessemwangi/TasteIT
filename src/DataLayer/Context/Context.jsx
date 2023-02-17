import React from "react";
import { auth, db } from "../../FireBaseInit";
import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection
} from "@firebase/firestore";


const AuthContext = createContext();
const ref = collection(db, 'admin');
const items = [];

export const AuthContextProvider = ({ children }) => {

  // const adminUser = [
  //   {
  //     "email": "haidang.levn@gmail.com",
  //     "isAdmin": true
  //   }
  //   , {
  //     "email": "jessejzee@gmail.com",
  //     "isAdmin": true

  //   }, {
  //     "email": "adpetelin@gmail.com",
  //     "isAdmin": true
  //   }
  // ]
  const [user, setUser] = useState({});
  // const [regUser, setRegUser] = useState([]);
  const [role, setRole] = useState(false)


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


  // const userRoles = async (uemail) => {

  //   let uroles = await adminUser.filter(item => item.email === uemail)

  //   const isAdmin = uroles[0]?.isAdmin;

  //   setRole(isAdmin)
  // }

  useEffect(() => {


  }, [])

  //TOFIX: admin role context 
  // useEffect(() => {
  //   const q = query(
  //     ref,
  //     where('email', '==', `${user.email}`)
  //   );
  //   const unsub = onSnapshot(q, (querySnapshot) => {

  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //       console.log('this is item,',items);
  //       setRegUser(items);
  //       checkUserStatus();
  //     });
  //   });

  //   const checkUserStatus = () => {
  //     if (regUser.length > 0) {
  //       const userroles = adminUser.filter(item =>item.email === user.email)
  //       setRole({ userroles});
  //     }
  //     else {
  //       regNewUser()
  //     }
  //   }

  //   const regNewUser = async () => {
  //     const data = {
  //       email: user.email,
  //       isAdmin: false,
  //       dateCreated: serverTimestamp()
  //     }

  //     try {
  //       const dataRef = doc(ref, data);
  //       await setDoc(dataRef, data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   return () => {
  //     unsub();
  //   };

  // }, [regUser, user]);


  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};