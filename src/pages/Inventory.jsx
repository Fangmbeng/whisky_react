import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard';

export default function Post(props) {
    const [posts, setPosts] = useState([]);

    let user = localStorage.getItem("user")

   // eslint-disable-next-line no-undef
   /*useEffect(() => {
        fetch("http://127.0.0.1:5000/api/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
    },[])*/

    // eslint-disable-next-line no-undef
    useEffect(() => {
             let myHeaders = new Headers();
             myHeaders.append('Content-Type', 'application/json')
             myHeaders.append('Access-Control-Allow-Origin', '*');
 
             fetch("https://whisky-collection.onrender.com/api/post", {
                 method: 'GET',
                 headers: myHeaders,
                 //mode: "no-cors"

             })
                 .then(res => res.json())
                 .then(data => setPosts(data))
     },[])

    return (
        <>
            {posts.map( post => <Dashboard user={user} value={props.value} loggedIn={props.loggedIn} key={post.id} post={post} flashMessage={props.flashMessage}/>)}
        </>
    )
}