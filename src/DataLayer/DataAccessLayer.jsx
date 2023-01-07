// import { collection, getDocs } from '@firebase/firestore/lite';
import {
    getDoc,
    serverTimestamp, collection, getDocs, onSnapshot, where,
    doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from '../FireBaseInit';




const useGetData = (collectionName) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const coll_Name = collection(db, collectionName);
                const colle_Snapshot = await getDocs(coll_Name);
                const colleList = colle_Snapshot.docs.map(doc => doc.data());

                setResponse(colleList);

            } catch (err) {
                setError(err);

            }
            setIsLoading(false);
        }

        fetchData();
    }, [collectionName]);

    console.log('response', response, 'error', error, 'isLoading', isLoading, '')

    return { response, error, isLoading };
}


const useGetOneData = (collectionName, getId) => {

    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const docRef = doc(db,collectionName , getId);

    useEffect(() => {
const fetchData = async () =>{

    setIsLoading(true);
    try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            console.log(docSnap.data());
            setResponse(docSnap.data());
        } else {
            console.log("Document does not exist");
            setResponse("Document does not exist");
        }
        
    } catch (err) {
        setResponse(`An Error occured .. ${err.meaasge}` )

    }
    setIsLoading(false);
    return response
}
        fetchData()

    }, [docRef, response]);
}




const usePostData = async (collectionName, data, idColName) => {  //idColName the id column name, ed Id, transactionID

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const ref = collection(db, collectionName)
    useEffect(() => {
        const postData = async () => {

            try {
                const dataRef = doc(ref, data?.[idColName]);
                await setDoc(dataRef, data);
                // if(doc was save) then sen email to the client of the scheduled trips 
                setResponse(data?.[idColName])
            } catch (error) {
                setError(`An error occured ... ${error}`);
            }
            setIsLoading(false);
        }
        postData();

    }, [data, idColName, ref]);
    console.log('response', response, 'error', error, 'isLoading', isLoading, '')
    return { response, error, isLoading };
}

export { usePostData, useGetData,useGetOneData };