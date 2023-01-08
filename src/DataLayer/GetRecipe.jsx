// import { collection, getDocs } from '@firebase/firestore/lite';
import { db } from "../FireBaseInit";
import {
  addDoc,
  serverTimestamp, collection, getDocs, onSnapshot, where,
  doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";

import { useEffect, useState } from 'react';

const useGet_Recipe = (colName, id, value) => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const ref = collection(db, colName)

  useEffect(() => {
  
    async function fetchData() {
      setIsLoading(true);
      setResponse(isLoading);

      try {
        const items = [];
        const q = query(
          ref, where(value, '==', id));
        const unsub = onSnapshot(q, (querySnapshot) => { 
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });

        });
        setResponse(items);

      } catch (err) {
        setResponse(`An error occurred: ${err.message}` );
      }

      setIsLoading(false);
     
    }
   
      fetchData();
   
  }, [colName, id, value]);
return {response};
}

const useGet_one_recipe = (colName, id, value) =>{
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const[docId,setDocId]=useState();
  const ref = collection(db, colName)

  useEffect(() => {
      const q = query(
          ref,
          where(id, '==', value) 
      );

      setLoading(true);
      const unsub = onSnapshot(q, (querySnapshot) => {  
      // const unsub = onSnapshot(ref, (querySnapshot) => {
        const items = [];
        // console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            setDocId(doc.id);
              items.push(doc.data());
          });

          setLoading(false);
          
          setResponse(items);
         
      });
      return () => {
          unsub();
      };

  }, [id, value]);
  return {response,docId};
}


export  {useGet_Recipe,useGet_one_recipe};