import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main>
            <h1>Page not Found</h1>
            <div>
                <h4>Go back home</h4>
                <Link to={'/'} className="btn btn-danger mt-3 mb-3 p-2 btn-lg" role="button">Home Page</Link>
            </div>
        </main>
    );
};

export default NotFound;