// import { collection, getDocs } from '@firebase/firestore/lite';
import {
    addDoc,
    serverTimestamp, collection, getDocs, onSnapshot, where,
    doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import { useEffect, useState } from 'react';
import {db} from '../FireBaseInit';

const UseGet_Recipe = async (colName) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
          setIsLoading(true);
          try {
            const coll_Name = collection(db, colName);
            const colle_Snapshot = await getDocs(coll_Name);
            const colleList = colle_Snapshot.docs.map(doc => doc.data());
            
            setResponse(colleList );
          
          } catch (err) {
            setError(err);
          
          }
          setIsLoading(false);
        }
        fetchData();
      }, [colName]);
      console.log('response',response,'error',error, 'isLoading',isLoading ,'' )
      return { response, error, isLoading };
}

export default UseGet_Recipe;