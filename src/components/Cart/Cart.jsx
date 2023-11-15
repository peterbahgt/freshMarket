import React, { useContext, useState } from 'react';
import style from './Cart.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function Cart () {

  const {getUserCart , addToCart , removeCartData , updateCount , deleteProduct , cartProducts , numOfCartItems , totalCartPrice} = useContext (CartContext);

  if ( cartProducts === null ){
    return <div className="vh-100 d-flex justify-content-center align-items-center">
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  </div>

  }

  if ( cartProducts.length === 0 ){
    return <>
    <h1 className='main-Color'>No Data Found In Your Crat  <Link to="/products"> Get Some Products</Link></h1>
    </>
  }

  async function deleteCart (){
    removeCartData();

  }

  async function updateElementCount (id , count)  {
     const res = await updateCount(id , count);
     if (res && res.status === "success"){
      toast.success(res.message , {
        duration :4000 
      })
     }
     else {
       toast.error("error please try again..")
     }
  }


  async function deleteElement (id) {
    let res = await deleteProduct(id);
    if (res && res.status === "success"){
      toast.success("Product Removed Successfully")
    }
    else {
      toast.error("Try Again.... ")
    }
  }
    return <div className='container py-5 shop-cart-bg'>
          <h2 className='py-2'>Shop Cart :</h2>
          <h5 className='main-color text-muted'>Total Cart Price : {totalCartPrice} EGP </h5>

           <div className="d-flex justify-content-between align-items-center">
           <button onClick={()=> deleteCart()} className='btn btn-outline-danger'>Clear Cart </button>
           <button className='btn btn-outline-primary mx-3'><Link className='text-primary' to={"/payment"}>Confirm Payment </Link></button>
           </div>
          
          {cartProducts.map(function (product , idx ){

            console.log(product);

            return <div key={idx} className="row border-bottom border-3 p-2 my-2  d-flex justify-content-between  align-items-center">

            <div className="col-md-1">
              <img className='w-100' src={product?.product?.imageCover} alt="image" />
            </div>
  
  
              <div className="col-md-9">
                <h2 className='h5'>{product?.product?.title}</h2>
                <h3 className='h6 main-color'>Price: {product?.price}</h3>
                <button onClick={()=> deleteElement(product?.product?.id)} className='btn trach-cart'><i class="fa-regular fa-trash-can main-color mx-2"></i> Remove </button>
              </div>
  
              <div className="col-md-2">
  
              <button onClick={()=> updateElementCount(product.product.id , product.count + 1)} className='btn btn-outline-success'>+</button>
              <span className='mx-2'>{product?.count}</span>
              <button onClick={()=> updateElementCount(product.product.id , product.count - 1)} className='btn btn-outline-success'>-</button>
              </div>
  
  
            </div>
          })}
         

          <h6>Total Items : {numOfCartItems}</h6>
        </div>
}
