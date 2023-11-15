import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';


export default function AllOrders (){

    const [userOrders, setUserOrders] = useState(null);

    useEffect( ()=> {
        const res = jwtDecode( localStorage.getItem('userToken') )
        // setuserId(res.id);

        getUserOrders(res.id)
    } , [])

    async function getUserOrders (id) {
        try {
          const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
          console.log(data);

          setUserOrders(data);

        } catch (error) {
            console.log("error" , error);
        }
    }

    if (userOrders === null){
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

    return <>
            
        <div className="container">

            <div className="row g-4">

                {userOrders.map( function ( order , idx ) {

                    return <div key={idx} className="col-md-6">
                    <div className="order bg-info rounded-4 p-3">

                        <div className="container">
                            <div className="row">
                            {order.cartItems?.map( function ( item , index ) {

                                return <div key={index} className='col-sm-4'>

                                <img className='w-100' src={item.product.imageCover} alt={item.product.title} />
                                <h6>Title : {item.product.title.split('').slice(0,2).join(" ")} </h6>
                                <p>Count : {item.count}</p>
                                <p>Price : {item.price}</p>
                                </div>
                                 })}
                            </div>
                        </div>


                    <p>Order Sent To User With Phone : {order.shippingAddress.phone} 
                    and with details : {order.shippingAddress.details} at {order.shippingAddress.city}</p>

                    <h5>Payment Method : {order.paymentMethodType} </h5>
                    <h5>Total Price : {order.totalOrderPrice} </h5>

                    </div>

                </div>
                })} 

                
            </div>
        </div>
        </>
}

