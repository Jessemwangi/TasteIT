// import { collection, getDocs } from '@firebase/firestore/lite';
import { db } from "../FireBaseInit";
import { collection,  onSnapshot, where, query
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
  const [loading, setLoading] = useState(true);
  const[docId,setDocId]=useState();
  const ref = collection(db, colName)
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
	  const q = query(
	          ref,
	          where(id, '==', value) 
	      );
	
	      setLoading(true);
	      const unsub = onSnapshot(q, (querySnapshot) => {  
	        const items = [];
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
} catch (error) {
	setError(` Error occured ${error}`)
}

  }, [id, value]);
  return {response,docId,loading,error};
}


export  {useGet_Recipe,useGet_one_recipe};