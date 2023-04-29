import React, { useEffect } from 'react';
import { useState } from 'react';

const PopUpNotification = ({notificationTitle,notificationMsg,showNotification,timer}) => {
    const [showNotification_,setShowNotification_]=useState(false);
let delay =2000;
    if (timer > 1)
    {
      delay = timer
    }
    useEffect(() => {
if (showNotification){
    setShowNotification_(true);
}
  },[showNotification]);

    useEffect(() => {
        const notification = () => {


          if (showNotification_) {
            setTimeout(() => setShowNotification_(false), delay);
          }
    
        }
        notification();
      }, [delay, showNotification_])

    return (
        <div>
            {showNotification_ && 
          <div className='popNotification' >
          <p className='popNotification_text'>{notificationMsg}</p>
        </div>
        }
        </div>
    );
};

export default PopUpNotification;