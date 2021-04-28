import React from "react";
import UsersData from '../Components/user/UsersData';

const UserData = () => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h3>User Data</h3>
                    <UsersData />
                </div>
            </div>            
        </>
    );
};

export default UserData;