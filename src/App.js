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
import { signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
import { auth, Providers } from './config/firebase';

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

    const [value, setValue] = useState('')

    const handleClick=()=>{
        signInWithPopup(auth,Providers).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem('email', data.user.email)
        })

    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    }, [])

    const LogOut=()=>{
      localStorage.removeItem('email');
      window.location.reload()
    }
  return (
    <>
      <Navbar city={myCity} name={myName} handleClick={handleClick} value={value} LogOut={LogOut} updateUser={updateUserInfo} loggedIn={loggedIn} logUserOut={logUserOut} />
      <div className="container">
        {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
      <h1 className='text-center'> GG Boissons</h1> 
        <Routes>
          <Route path="/create" element={<CreatePost value={value} loggedIn={loggedIn} flashMessage={flashMessage}/>} />
          <Route path="/" element={<Home value={value} loggedIn={loggedIn} flashMessage={flashMessage}/>} />
          <Route path="/login" element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/>} />
          <Route path="/sign_up" element={<SignUp flashMessage={flashMessage}/>} />
          <Route path="/edit" element={<Edit value={value} loggedIn={loggedIn} flashMessage = {flashMessage}/>} />
          <Route path="/posts" element={<Post value={value} loggedIn={loggedIn} flashMessage={flashMessage}/>} />
        </Routes>
        
      </div>
    </>
  );
}

export default App;