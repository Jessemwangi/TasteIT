import React from "react";
import {  useEffect, useState } from "react";
import { db } from "../FireBaseInit";
import {
    addDoc,
    serverTimestamp, collection, getDocs, onSnapshot, where,
    doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import FormCss from './form.module.css';


const items = [];
const TestRealtimeFirebase = (colName) => {
    
    const [loading, setLoading] = useState(false);
    const ref = collection(db, colName)

    useEffect(() => {
        const q = query(
            ref,
            //  where('owner', '==', currentUserId),
            where('title', '==', 'School1') // does not need index
            //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
            // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
            // limit(1)
        );

        setLoading(true);
        // const unsub = onSnapshot(q, (querySnapshot) => {     to be used when query is present
        const unsub = onSnapshot(ref, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
           
            setLoading(false);
            console.log(items);
            return items;
        });
        return () => {
            unsub();
        };

    }, [ref]);

    // ADD FUNCTION
    const addRecipe = async (data) => {

        try {
            const dataRef = doc(ref, data?.transactionID);
            console.log(data?.transactionID, data)
            await setDoc(dataRef, data);
            // if(doc was save) then sen email to the client of the scheduled trips 
        } catch (error) {
            console.error(error);
        }
    }

    //DELETE FUNCTION
    const deleteData = async (docId) => {
        let newitem = items.filter((item) => item.transactionID === docId);
        try {
            const dataRef = doc(ref, newitem[0].transactionID);
            await deleteDoc(dataRef, dataRef);
        } catch (error) {
            console.error(error);
        }
    }

    // EDIT FUNCTION
    const updateData = async (data,docId) => {
       
        try {
            const datalRef = doc(ref, docId);
            updateDoc(datalRef, data);
        } catch (error) {
            console.error(error);
        }

    }


    return (<div>
    </div>)

}

export default TestRealtimeFirebase;
