import React from "react";
import {  useEffect, useState } from "react";
import { db } from "../FireBaseInit";
import { collection,  onSnapshot, where,
    doc, query,  deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import FormCss from './form.module.css';


const items = [];
const TestRealtimeFirebase = (colName) => {
    
    const [loading, setLoading] = useState(false);
    const ref = collection(db, colName)

    useEffect(() => {
        const q = query(
            ref,
            where('title', '==', 'School1') // does not need index
        );

        setLoading(true);
        const unsub = onSnapshot(ref, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
           
            setLoading(false);
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
            await setDoc(dataRef, data);
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
