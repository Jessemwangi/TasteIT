import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PopUpNotification from '../Views/PopUpNotification';

const Help = () => {
    const [showNotification,setShowNotification] = useState(false);

    const seton = () =>{
    // console.log(showNotification);
    setShowNotification(true);
    
}

useEffect(() =>{
    if (showNotification) {
        setTimeout(() => setShowNotification(false), 3000);
      }
},[showNotification])

    return (
        <main>
            <button className='btn btn-dark mt-3 mb-3 p-2 btn-lg' onClick={seton}>show notification</button>
            <PopUpNotification notificationTitle ={'sample notification'}
            notificationMsg ={'hi jesse succes in notification'}
            showNotification ={showNotification}/>
            {/* {console.log(showNotification)} */}
        </main>
    );
};

export default Help;