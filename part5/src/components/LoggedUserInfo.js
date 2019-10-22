import React from 'react'

const LoggedUserInfo = ({ user, logoutFunction }) => {
    return (
        <div>
            {user.name} logged in <button onClick={logoutFunction}>logout</button>
        </div>
    )
}

export default LoggedUserInfo