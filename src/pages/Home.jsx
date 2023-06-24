import React from 'react'
import { Link } from 'react-router-dom'

function Home(props) {

  return (
    <div>  
      <center>
        <marquee  behavior="scroll" direction="left">        
          <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png"/> 
        </marquee>  
          
        <marquee  behavior="scroll" direction="up">         
          <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png"/> 
        </marquee> 
      </center>
      <div className="position-absolute top-50 start-50 translate-middle">
      {props.loggedIn || props.value ? (
                    <>
                    <Link className='btn btn-success' to='/posts'>Access Inventory</Link>
                    </>
                ) : (
                    <>
                    <Link className='btn btn-success' to='/login'>Login to Acess Inventory</Link>
                    </>
                )}
      </div>      
    </div>
  )
}

export default Home
