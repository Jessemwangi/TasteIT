import { db } from "../FireBaseInit";
import { collection, onSnapshot, where, query } from "@firebase/firestore";
import { useEffect, useState } from 'react';
import { UserAuth } from "./Context/Context";

const useGet_Recipe = (colName, id, value) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = UserAuth(); // Get user from context
  const ref = collection(db, colName);

  useEffect(() => {
    // Don't fetch if no user at all (still loading auth state)
    if (!user) {
      setResponse(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Don't fetch if required params are missing
    if (!colName || !id || !value) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const q = query(ref, where(value, '==', id));
      
      const unsubscribe = onSnapshot(
        q, 
        (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setResponse(items);
          setIsLoading(false);
        },
        (err) => {
          setError(`An error occurred: ${err.message}`);
          setResponse(null);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      setResponse(null);
      setIsLoading(false);
    }
  }, [colName, id, value, user]); // Removed isLoading and ref from dependencies

  return { response, error, isLoading };
};

const useGet_one_recipe = (colName, id, value) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState();
  const [error, setError] = useState(null);
  const { user } = UserAuth(); // Get user from context
  const ref = collection(db, colName);

  useEffect(() => {
    // Don't fetch if no user at all (still loading auth state)
    if (!user) {
      setResponse(null);
      setDocId(null);
      setError(null);
      setLoading(false);
      return;
    }

    // Don't fetch if required params are missing
    if (!colName || !id || !value) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const q = query(ref, where(id, '==', value));

      const unsubscribe = onSnapshot(
        q, 
        (querySnapshot) => {
          const items = [];
          let foundDocId = null;
          
          querySnapshot.forEach((doc) => {
            foundDocId = doc.id;
            items.push({ id: doc.id, ...doc.data() });
          });

          setDocId(foundDocId);
          setResponse(items);
          setLoading(false);
        },
        (err) => {
          setError(`Error occurred: ${err.message}`);
          setResponse(null);
          setDocId(null);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      setError(`Error occurred: ${error.message}`);
      setResponse(null);
      setDocId(null);
      setLoading(false);
    }
  }, [colName, id, value, user]); // Added user to dependencies

  return { response, docId, loading, error };
};

export { useGet_Recipe, useGet_one_recipe };