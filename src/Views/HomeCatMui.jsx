import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { useGetData } from '../DataLayer/DataAccessLayer';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
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




      const navigation = useNavigate();

      const [category, setCategory] = useState();
      const [isLoading, setIsLoading] = useState(true);
  
      const { response, error, isLoading_ } = useGetData('category');
      useEffect(() => {
    
    
        if (isLoading_) {
          setIsLoading(isLoading_);
         }
          if (error) {
            setIsLoading(isLoading_);
            
           console.log('An error occurred:', error);
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
        sx={{
          width: 650,
          height: 450,
          // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
          transform: 'translateZ(0)',
        }}
        rowHeight={200}
        gap={1}
      >

      {category.map((item, index) => {
        const cols = [0,5].includes(index) ? 2 : 1;
        const rows = [0,5].includes(index)  ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows} onClick={() => navigation(`/viewRecipes/`, { state: { value: item.value } })} 
          style={{cursor:"pointer"}}>
            <img
              {...srcset(
                 `https://source.unsplash.com/250x200/?${item.text==='Others' ? 'meal' : item.text.substring(0,item.text.indexOf(' '))})`
                , 250, 200, rows, cols)}
              alt={item.text}
              loading="lazy"
            />
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
     } </>
    );
};

export default HomeCatMui;

