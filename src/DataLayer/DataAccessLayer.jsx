// import { collection, getDocs } from '@firebase/firestore/lite';
import { useEffect, useState } from 'react';
import {
    getDoc,getFirestore, collection, getDocs,
    doc, setDoc, addDoc,
} from "@firebase/firestore";
import { db } from '../FireBaseInit';




const useGetData = (collectionName) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading_, setIsLoading] = useState(true);

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

    // console.log('response', response, 'error', error, 'isLoading', isLoading, '')

    return { response, error, isLoading_ };
}


const useGetOneData = (collectionName, getId) => {
    const db = getFirestore();
// console.log(collectionName, getId);
    const [response, setResponse] = useState(null);
    const [isLoading_, setIsLoading] = useState(true);
    const docRef = doc(db,collectionName , 'yjjMd8m56B0f6XPoDhXw');

    useEffect(() => {
const fetchData = async () =>{

    setIsLoading(true);
    try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setResponse(docSnap.data());
        } else {
            console.log("Document does not exist");
            setResponse("Document does not exist");
        }
        
    } catch (err) {
        setResponse(`An Error occured .. ${err.meaasge}` )

    }
    setIsLoading(false);
}
fetchData()

}, []);
return {response};
}




const usePostData = async (collectionName, data, idColName) => {  //idColName the id column name, ed Id, transactionID

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const ref = collection(db, collectionName)
    useEffect(() => {
        const postData = async () => {

            try {
                await addDoc(collection(db, collectionName), data)
                  .then(docRef => {
                    console.log("Document has been added successfully");
                    setResponse("Document has been added successfully")
                  });
          
              } catch (error) {
                setResponse(`An error occured ... ${error}`);
              }
              setIsLoading(false);
              return response;
            }
          
        postData();

    }, []);
    console.log('response', response, 'error', error, 'isLoading', isLoading, '')
    return { response };
}

export { usePostData, useGetData,useGetOneData };