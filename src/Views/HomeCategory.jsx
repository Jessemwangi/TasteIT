import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const HomeCategory = () => {
    const navigation = useNavigate();

    const [category, setCategory] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getIngridnients = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get("http://localhost:3001/category");
                setCategory(data)
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getIngridnients();
    }, []);

    return (
        <Container fluid="fluid" className='bg-light m-2 border rounded'>
            {isLoading ?
                (
                    <Spinner animation="grow" variant="light"></Spinner>
                ) : (

                    <div className='bg-light m-2 border border-dark rounded p-1 home_row'>
                        {category.map(cat =>
                            <div className='m-2 border border-dark rounded p-2 home_col' 
                            key={cat.value}
                            style={{  
                                backgroundImage: `url( https://source.unsplash.com/100x100/?${cat.text})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                              }}

                            // style={{backGround:`url(https://source.unsplash.com/100x100/?${cat.value} )`}}
                            onClick={() => navigation(`/viewRecipes/`, { state: { value: cat.value } })}>

                                {cat.text}
                            </div>
                        )}

                    </div>
                )
            }

        </Container>


    );
};

export default HomeCategory;