import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { useGetData } from '../DataLayer/DataAccessLayer';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import PopUpNotification from './PopUpNotification';
// import StarBorderIcon from '@m' '@mui/icons-material/StarBorder';

const HomeCatMui = () => {
    function srcset(image, width, height, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${width * cols}&h=${
            height * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
      }

      const sxValues={
        width: 650,
        height: 450,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }


      const navigation = useNavigate();

      const [category, setCategory] = useState();
      const [isLoading, setIsLoading] = useState(true);
      const [sx,setSx] = useState(sxValues)
      const [notificationMsg , setNotificationMsg] = useState('')
const [showNotification,setShowNotification] = useState(false)


      const { response, error, isLoading_ } = useGetData('category');

      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 766) {
            setSx({height: 180,transform: 'translateZ(0)',})
          
          } else {
            setSx({width: 650,height: 450,transform: 'translateZ(0)',})
          }
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);


      useEffect(() => {
    
    
        if (isLoading_) {
          setIsLoading(isLoading_);
         }
          if (error) {
            setIsLoading(isLoading_);
            setNotificationMsg(`The following error ocured. ${error}` )
            setShowNotification(true);
            
         }
          else if (response)
        {
          setIsLoading(isLoading_);
          setCategory(response);
          if (localStorage.getItem("category") === null){
  
              localStorage.setItem("category", JSON.stringify(response) );
          }
  
        }
      },[error, isLoading_, response])
      
      return ( <>
        {isLoading ?
        (
            <Spinner animation="grow" variant="light"></Spinner>
        ) : (
        <ImageList
          sx={sx}
        rowHeight={sx.height - 120}
        gap={1}
      >

      {category.map((item, index) => {
        const cols = [0,5].includes(index) ? 2 : 1;
        const rows = [0,5].includes(index)  ? 2 : 1;
        return (
          <ImageListItem key={item.text} cols={cols} rows={rows} onClick={() => navigation(`/viewRecipes/`, { state: { value: item.value } })} 
          style={{cursor:"pointer"}}>
            <img
              {...srcset(
                 `https://foodish-api.com/images/random`
                , 250, 200, rows, cols)}
              alt={item.text}
              loading="lazy"
            />
           {
 } 
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.text}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.text}`}
                >
                 
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
        )
     }
                     <PopUpNotification notificationTitle ={'notification Title'}
            notificationMsg ={notificationMsg}
            showNotification ={showNotification} timer={4000}/> </>
    );
};

export default HomeCatMui;

