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



// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     author: '@bkristastucchio',
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     author: '@rollelflex_graphy726',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//     author: '@helloimnik',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     author: '@nolanissac',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//     author: '@hjrc33',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//     author: '@arwinneil',
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//     author: '@tjdragotta',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//     author: '@katie_wasserman',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//     author: '@silverdalex',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//     author: '@shelleypauls',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//     author: '@peterlaster',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//     author: '@southside_customs',
//   },
// ];