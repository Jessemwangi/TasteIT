// import { collection, getDocs } from '@firebase/firestore/lite';
import firebase from 'firebase/app';
import '@firebase/firestore';

import { useEffect, useState } from 'react';

const UseGet_Recipe = async (colName,id,value) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        setIsLoading(true);
        try {
          const querySnapshot = await firebase
            .firestore()
            .collection(colName)
            .query()
            .where(value, '==', id)
            .get();
          const Lists = [];
          querySnapshot.forEach(doc => {
            Lists.push({ id: doc.id, ...doc.data() });
          });
          setResponse(Lists);
        } catch (err) {
          setError(err);
        }
        setIsLoading(false);
      }
      fetchData();
    }, [colName, id, value]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>An error occurred: {error.message}</p>;
    }
    
      console.log('response',response,'error',error, 'isLoading',isLoading ,'' )
      return { response, error, isLoading };
}

export default UseGet_Recipe;