import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        // Get the data from the form
        
        let username = event.target.username.value;
        let password = event.target.password.value;
        //let stringToEncode = `${username}:${password}`
        

        let myHeaders = new Headers();
        //myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`)
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Access-Control-Allow-Origin', '*');

        let requestBody = JSON.stringify({username, password})

        let response = await fetch("https://whisky-collection.onrender.com/api/user", {
            method:'POST',
            headers: myHeaders,
            body: requestBody
        })

        if (response.ok){
            let data = await response.json();
            // Get the token and token expiration from the response
            let token = data.token;
            let expiration = data.token_expiration;

            // Store the value in local storage on the browser
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);
            localStorage.setItem('user', username)
            localStorage.removeItem("password", password)


            // flash a success message and redirect back home
            props.flashMessage('You have successfully logged in', 'success');
            props.logUserIn();
            navigate('/posts');
        } else {
            // flash a fail message
            props.flashMessage('Your username and/or password are incorrect', 'danger');
        }

    }

    return (
        <> 
            <h3 className="text-center">Login</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                    <input type="password" className="form-control my-3" placeholder='Enter Password' name='password' />
                    <a href="/sign_up">forgot password ?</a>
                    <input type="submit" value="Log In" className="btn btn-success w-100 mt-3 mb-3" />
                    <a href="/sign_up">Click here if you are new</a>
                </div>
            </form>
        </>
    )
}