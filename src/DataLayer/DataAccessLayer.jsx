
import { useEffect, useState } from 'react';
import {
    getDoc,getFirestore, collection, getDocs,
    doc,  addDoc,
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
                setError(err.message);
                setIsLoading(false);

            }
            setIsLoading(false);
        }

        fetchData();
    }, [collectionName]);



    return { response, error, isLoading_ };
}


const useGetOneData = (collectionName, getId) => {
    const db = getFirestore();

    const [response, setResponse] = useState(null);
    const [isLoading_, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () =>{
    const docRef = doc(db,collectionName , 'yjjMd8m56B0f6XPoDhXw');

    setIsLoading(true);
    try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setResponse(docSnap.data());
        } else {
          
            setResponse("Document does not exist");
        }
        
    } catch (err) {
        setResponse(`An Error occured .. ${err.meaasge}` )

    }
    setIsLoading(false);
}
fetchData()

}, [collectionName, db]);
return {response,isLoading_};
}

const post_Data = async (collectionName, data) => {
    let response ;

    try {
        
      await addDoc(collection(db, collectionName), data).then((docRef) => {

         response = {
            message:"Document has been added successfully",
            responseCode:200,
            ref:docRef.id
        }
      });
    } catch (error) {

      response = {
        message:Error (`An error occured...", ${ error }` ),
        responseCode:500,
        ref:0
    }
    }
    
    return response;
  };



const usePostData = async (collectionName, data, idColName) => {  //idColName the id column name, ed Id, transactionID

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const postData = async () => {

            try {
                await addDoc(collection(db, collectionName), data)
                  .then(docRef => {
                 
                    setResponse("Document has been added successfully")
                  });
          
              } catch (error) {
                setError(`An error occured ... ${error}`);
                setResponse(`An error occured ... ${error}`);
              }
              setIsLoading(false);
              return response;
            }
          
        postData();

    }, [collectionName, data, response]);
  
    return { response,error,isLoading };
}

export { usePostData, useGetData,useGetOneData ,post_Data};