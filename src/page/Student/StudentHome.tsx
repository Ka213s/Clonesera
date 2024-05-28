import React from 'react'
import RedirectToLoginIfNoUserData from '../../components/RedirectToLoginIfNoUserData';
const StudentHome = () => {
    return (

        <div>
            <RedirectToLoginIfNoUserData />
            <div>Student Home</div>
        </div>
    )
}

export default StudentHome