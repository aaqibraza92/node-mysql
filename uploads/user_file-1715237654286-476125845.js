import logo from './logo.svg';
import './App.css';
import VerticalCarousel from './vertical/VerticalCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { qtyItem } from './store/QtySlices';
import { Route, Routes, useLocation } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Account from './pages/Account';
import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
function App() {
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState("")







  if(isLogin && isLogin=="true"){
    return (
      <>
        <Routes><Route path="/account" element={<Account />} />  </Routes>
      <button onClick={() => setLogin(localStorage.setItem("isLogin", false))}>
        Logout
      </button>
      <button onClick={() => setLogin(localStorage.setItem("isLogin", true))}>
        LogIn
      </button></>
    
    )
  }else{
    return (<>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />


  </Routes>
        <button onClick={() => setLogin(localStorage.setItem("isLogin", false))}>
        Logout
      </button>
      <button onClick={() => setLogin(localStorage.setItem("isLogin", true))}>
        LogIn
      </button>
    </>)
  }
  return (
    <div className="App container">
      

    


      


      <button onClick={() => setLogin(localStorage.setItem("isLogin", false))}>
        Logout
      </button>
      <button onClick={() => setLogin(localStorage.setItem("isLogin", true))}>
        LogIn
      </button>
    </div>
  );
}

export default App;
