import React from 'react'


const Login = ({...props}) => {
    return (
        <div className="login">
            <h2>Here's our login page!</h2>
            <a href="/login" dangerouslySetInnerHTML={{__html: loginSVG}}></a>
        </div>
    )


}