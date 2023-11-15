import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Bars, ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';



export default function ProductDetails ()  {
 
  const {addToCart} = useContext ( CartContext )

    const {id} = useParams();
    const [sendingLoader , setSendingLoader] = useState(false);

    async function addProduct( id ){

      setSendingLoader(true) ;

     const res = await addToCart( id )

    //  console.log(res);
    if (res.status === "success"){
      toast.success(res.message , {
        duration :4000 
      }) 
    }
    else{
      toast.error("Error happened ... ")
    }

    setSendingLoader(false) ;

    }


    function getProductDetails () {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const {data , isLoading} = useQuery("productDetails" , getProductDetails)
    // console.log(data);

    if(isLoading){
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

    // console.log(data.data.data);

    return <>
           <div className="container py-5">

            <div className="row align-items-center">

              <div className="col-md-3">
                <figure>
                  <img className='w-100' src={data?.data.data.imageCover } alt={data?.data.data.title} />
                </figure>
              </div>

              <div className="col-md-9">

                <div className="details">
                  <h2>{data?.data.data.title}</h2>
                  <p className='text-muted'>{data?.data.data.description}</p>
                  <h6>{data?.data.data.category?.name}</h6>

                  <div className="d-flex justify-content-between align-items-center">
                  <p>Prcie: {data?.data.data.price} EGP</p>
                  <p>
                    <span><i className="fa-solid fa-star star-rate-specific-product"></i></span>
                    {data?.data.data.ratingsAverage}
                  </p>
                  </div>

                  <button onClick={()=> addProduct( data.data.data.id )} className='btn main-bg-color w-100 p-1 text-center justify-content-center text-white'> 
                  
                  {sendingLoader ? <Bars
                 height="25"
                 width="40"
                 color="#fff"
                 ariaLabel="bars-loading"
                 wrapperStyle={{}}
                 wrapperClass=""
                 visible={true}
                /> : "+ Add to Cart"  } </button>
                  
                </div>
              </div>
            </div>
           </div>
        </>
}
