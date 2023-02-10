import { useEffect, useState } from 'react';
import {
    collection, doc, setDoc, 
} from "@firebase/firestore";
import { db } from '../FireBaseInit';

const usePostToColle = (collectionName, idColName) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const postData = async () => {
            const ref = collection(db, collectionName)
            const dataRef = doc(ref, collectionName?.[idColName]);

            try {
                await setDoc(dataRef, collectionName);
                setResponse(collectionName?.[idColName])
            } catch (error) {
                setError(`An error occured ... ${error}`);
            }
            setIsLoading(false);
        }
        postData();

    }, [collectionName, idColName]);
    // console.log('response', response, 'error', error, 'isLoading', isLoading, '')

    return { response, error, isLoading };
};

export default usePostToColle;