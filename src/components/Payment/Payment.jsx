import axios from 'axios';
import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom";

export default function Payment () {

    const {cartId , getUserCart , setNumOfCartItems , setTotalCartPrice , setCartProducts } = useContext(CartContext);
    let navigate =  useNavigate();

    async function confirmCashPayment () {

       const phoneValue = document.querySelector('#phone').value ;
       const cityValue = document.querySelector('#city').value ;
       const detailsValue = document.querySelector('#details').value ;

      const shippingAddress = {
        "shippingAddress":{
            "details": detailsValue,
            "phone": phoneValue,
            "city": cityValue
            }
         }

         try {
            const {data} = axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , shippingAddress , {
                headers : { token : localStorage.getItem('userToken')}
            });

            console.log(data);

            if (data.status === "success"){
                toast.success("Order Initialized Successfully");
                setCartProducts([]);
                setNumOfCartItems(0);
                setTotalCartPrice(0);
            }
            else {
                toast.error("Error");
            }

         } catch (error) {
            console.log("error" , error );
         }
    }
    async function confirmOnlinePayment () {

       const phoneValue = document.querySelector('#phone').value ;
       const cityValue = document.querySelector('#city').value ;
       const detailsValue = document.querySelector('#details').value ;

      const shippingAddress = {
        "shippingAddress":{
            "details": detailsValue,
            "phone": phoneValue,
            "city": cityValue
            }
         }

         try {
            const {data} = axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , shippingAddress , 
            {
                headers : { token : localStorage.getItem('userToken')} ,
                params : { url : 'http://localhost:3000'}
            }
            );

        window.open(data.session.url , "_blank");

            if (data.status === "success"){
                toast.success("Order Initialized Successfully");
                setCartProducts([]);
                setNumOfCartItems(0);
                setTotalCartPrice(0);
            }
            else {
                toast.error("Error");
            }

         } catch (error) {
            console.log("error" , error );
         }
    }

    return <>

    <div className="container py-5">

        <form >
            <label htmlFor="">phone : </label>
            <input id='phone' type="tel" placeholder='Phone ' className='mb-3 form-control' />

            <label htmlFor="">City : </label>
            <input id='city' type="text" placeholder='City ' className='mb-3 form-control' />

            <label htmlFor="">Details : </label>
            <textarea  id='details' type="tel" placeholder='Details ' className='mb-3 form-control'></textarea>

            <button onClick={confirmCashPayment}  className='btn btn-outline-primary'>  Confirm Cash Payment </button>
            <button onClick={confirmOnlinePayment}  className='btn btn-outline-primary mx-3'>  Confirm online Payment </button>
        </form>
    </div>
            
        </>
}
 