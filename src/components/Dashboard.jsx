import React from 'react'
import { useNavigate } from 'react-router-dom';


function Dashboard({user, post, key, flashMessage}) {


  const navigate = useNavigate();

  function handleEdit(){
      navigate('/edit');
      localStorage.setItem("id", post.id)
  }

  async function handleDelete(){
    let id = post.id;
    let brand = post.brand;
    let alcohol_level = post.alcohol_level;
    let class_alcohol= post.class_alcohol;
    console.log(typeof id)

    // Get the token from localStorage
    let token = localStorage.getItem('token');

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Bearer ${token}`);

    let requestBody = JSON.stringify({brand, alcohol_level, class_alcohol, id})
    // Make the fetch request
    let response = await fetch(`https://whisky-collection.onrender.com//api/post/delete/${id}`, {
        method: 'POST',
        headers: myHeaders,
        body: requestBody
    })

    if (response.ok){
        flashMessage(`Drink has been deleted`, 'primary')
        //window.location.reload()

    } else {
        flashMessage("There was an issue, please try again", 'warning');
    }
  }

  return (
    <div>
      <div className="card my-3">
            <div className="card-header">
            { post.brand }
            </div>
            <div className="card-body">
            <blockquote class="blockquote mb-0">
                <p>alchohol level: { post.alcohol_level }%</p>
                <p>{ post.class_alcohol }</p>
                <p>Posted by {user}</p>
                <p>{post.date_created}</p>
                <footer className="blockquote-footer">
                    <cite title="Source Title"></cite>
                </footer>
            </blockquote>
            
            </div>
        </div>
        <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Brand</th>
                <th scope="col">Alcohol %</th>
                <th scope="col">Alcohol Class</th>
                <th scope="col">Posted by</th>
                <th scope="col">See More</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{ post.brand }</td>
                    <td>{ post.alcohol_level }</td>
                    <td>{ post.class_alcohol }</td>
                    <td>{ user }</td>
                    <tr><button className='btn btn-primary' onClick={handleEdit}>Edit Post</button></tr>
                    <tr><button className='btn btn-danger' onClick={handleDelete}> Delete</button></tr>
                </tr>
            </tbody>
          </table>
    </div>
  )
}

export default Dashboard
