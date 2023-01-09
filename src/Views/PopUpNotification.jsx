import React, { useEffect } from 'react';
import { useState } from 'react';

const PopUpNotification = ({notificationTitle,notificationMsg,showNotification}) => {
    const [showNotification_,setShowNotification_]=useState(false);

    // console.log('notificationTitle',notificationTitle,'notificationMsg',notificationMsg,'showNotification',showNotification)
  useEffect(() => {
if (showNotification){
    setShowNotification_(true);
}
  },[showNotification]);

    useEffect(() => {
        const notification = () => {

          if (showNotification_) {
            setTimeout(() => setShowNotification_(false), 2000);
          }
    
        }
        notification();
      }, [ showNotification_])

    return (
        <div>
            {showNotification_ && 
          <div className='popNotification' >
          <h1 className='popNotification_title'>{notificationTitle}</h1>
          <p className='popNotification_text'>{notificationMsg}</p>
        </div>
        }
        </div>
    );
};

export default PopUpNotification;