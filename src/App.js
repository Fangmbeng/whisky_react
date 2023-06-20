import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup';
import AlertMessage from './components/AlerteMessage';
import Edit from './pages/UpdateInventory';
import CreatePost from './pages/MyCollection';
import Post from './pages/Inventory';

function App () {
  const [myName, setMyName] = useState('');
  const [myCity, setMyCity] = useState('');

  function updateUserInfo (username, usercity) {
    setMyName(username);
    setMyCity(usercity);
  }

  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);

  const now = new Date();
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now));

    // Function that will update myName and myCity variables with whatever strings are passed into it
    // eslint-disable-next-line no-redeclare
    function updateUserInfo(username, usercity){
        setMyName(username);
        setMyCity(usercity);
    };

    function flashMessage(message, category){
        setMessage(message);
        setCategory(category);
    }

    function logUserIn(){
        setLoggedIn(true);
    }

    function logUserOut(){
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        flashMessage("You have logged out", "primary");
    }


  return (
    <>
      <Navbar city={myCity} name={myName} updateUser={updateUserInfo} loggedIn={loggedIn} logUserOut={logUserOut} />
      <div className="container">
        {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
      <h1 className='text-center'> GG Boissons</h1> 
        <Routes>
          <Route path="/create" element={<CreatePost loggedIn={loggedIn} flashMessage={flashMessage}/>} />
          <Route path="/" element={<Home loggedIn={loggedIn} flashMessage={flashMessage}/>} />
          <Route path="/login" element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/>} />
          <Route path="/sign_up" element={<SignUp flashMessage={flashMessage}/>} />
          <Route path="/edit" element={<Edit loggedIn={loggedIn} flashMessage = {flashMessage}/>} />
          <Route path="/post" element={<Post flashMessage={flashMessage}/>} />
        </Routes>
        
      </div>
    </>
  );
}

export default App;