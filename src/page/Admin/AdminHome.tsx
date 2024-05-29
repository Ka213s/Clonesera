import React from 'react';
import RedirectToLoginIfNoUserData from '../../components/RedirectToLoginIfNoUserData';

const Home = () => {
    return (
        <div>
            <RedirectToLoginIfNoUserData />
            <div>Admin Home</div>
        </div>
    );
};

export default Home;
