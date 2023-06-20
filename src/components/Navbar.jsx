import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar (props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className='nav-link text-danger-emphasis' to='/'>Home</Link>
                {props.loggedIn ? (
                    <>
                    <Link className='nav-link text-success' to='/post'>Drink Inventory</Link>
                    <Link className='nav-link text-primary' to='/create'>Add Invzntory</Link>
                    <Link className='nav-link text-warning' to='/' onClick={props.logUserOut}>Log Out</Link>
                    </>
                ) : (
                    <>
                    <Link className='nav-link text-success-emphasis' to='/sign_up'>Sign Up</Link>
                    <Link className='nav-link text-primary-emphasis' to='/login'>Log In</Link>              </>
                )}

            </div>
        </nav>
    </>
  )
}