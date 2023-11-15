import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../Assets/Images/images/freshcart-logo.svg';
// import style from './Navbar.module.css';
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';


export default function Navbar () {

  let {userToken , setUserToken} = useContext(UserContext);
  let {counter} = useContext(CounterContext);
  let {numOfCartItems} = useContext(CartContext); 
  let navigate = useNavigate();

  function Logout (){
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate ('/login');
  }

    return <>
          <nav className="navbar bg-light navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    
    <Link className="navbar-brand" to="products"> <img src={logo} alt='logo'/> </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 cursor-pointer">

        {userToken !== null ? <>
        {/* <li className="nav-item">
        <Link className="nav-link" to="/">Home {counter}</Link>
      </li> */}
      <li className="nav-item">
        <Link className="nav-link" to="products">Products</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="categories">Categories</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="brands">Brands</Link>
      </li> 
      <li className="nav-item">
      <Link className="nav-link position-relative" to="cart"><i  className="fa-solid fa-cart-shopping fa-xl cart-color"></i> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
    {numOfCartItems}
    <span class="visually-hidden">unread messages</span>
  </span></Link>
    </li> </> : "" }
        
        

      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center cursor-pointer">
          <i className='mx-2 fa-brands fa-instgram'></i>
          <i className='mx-2 fa-brands fa-facebook'></i>
          <i className='mx-2 fa-brands fa-tiktok'></i>
          <i className='mx-2 fa-brands fa-linkedin'></i>
          <i className='mx-2 fa-brands fa-youtube'></i>
        </li>
        {userToken !== null ? <>
          <li className="nav-item">
          <Link className="nav-link cursor-pointer" to="/profile">Profile</Link>
        </li>
          <li className="nav-item">
          <Link className="nav-link cursor-pointer" to="/allOrders">All Orders</Link>
        </li>
        <li className="nav-item">
          <span onClick={()=>Logout()} className="nav-link cursor-pointer" >Logout</span>
        </li>
        
        </> : <>
        <li className="nav-item">
          <Link className="nav-link cursor-pointer" to="/register">Register</Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link cursor-pointer" to="/login">Login</Link>
        </li></>}
        
       

      </ul>

    </div>
  </div>
</nav> 
        </>
}
