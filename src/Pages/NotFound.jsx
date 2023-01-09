import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main>
            <h1>OOOPPPPsss !!! we cant find your page.</h1>
            <div>
                <Link to={'/'} className='btn btn-danger mt-3 mb-3 p-2 btn-lg '>Go back Home</Link>
            </div>
        </main>
    );
};

export default NotFound;