import React from 'react';
import RedirectToLoginIfNoUserData from '../../components/RedirectToLoginIfNoUserData';

const Home = () => {
    return (
        <div>
            <RedirectToLoginIfNoUserData />
            <div>Home</div>
        </div>
    );
};

export default Home;
