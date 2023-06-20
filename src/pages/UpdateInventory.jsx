import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Edit (props) {

  const navigate = useNavigate();
    useEffect(() => {
        if (!props.loggedIn){
            props.flashMessage('You must be logged in to view this page', 'danger');
            navigate('/');
        }
    })

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(event);

        // Get the data from the form
        let brand = event.target.brand.value;
        let alcohol_level = event.target.alcohol_level.value;
        let class_alcohol = event.target.class_alcohol.value;
        let id = localStorage.getItem("id")

        // Get the token from localStorage
        let token = localStorage.getItem('token');

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Authorization', `Bearer ${token}`);

        // Set up the request body
    
        console.log(brand)
        console.log(alcohol_level)
        console.log(class_alcohol)
        console.log(id)
        console.log(typeof id)
      
        let requestBody = JSON.stringify({brand, alcohol_level, class_alcohol, id})

        // Make the fetch request
        let response = await fetch(`http://127.0.0.1:5000/api/post/edit/${id}`, {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        })

        if (response.ok){
            let data = await response.json();
            setTimeout((props.flashMessage(`${data.brand} has been edited`, 'primary')), 100);
            navigate('/')
            localStorage.removeItem('id')
        } else {
            props.flashMessage("There was an issue, please try again", 'warning');
        }
    }

    return (
        <>
            <h3 className="text-center">Update your taste</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control my-3" placeholder='Update brand' name='brand'/>
                    <input type="text" className="form-control my-3" placeholder='Update alchohol level' name='alcohol_level'/>
                    <input type="text" className="form-control my-3" placeholder='Update Drink Class' name='class_alcohol'/>
                    <input type="submit" value="Update your taste" className="btn btn-success w-100" />
                </div>
            </form>
        </>
    )
}