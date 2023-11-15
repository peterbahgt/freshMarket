import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from 'react-query';
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


export default function Products() {

  const {addToCart} = useContext ( CartContext )

  async function addProductToCart ( id ){

    const res = await addToCart( id );

    console.log("response from products" , res);
    if (res.status === "success"){
      toast.success(res.message , {
        duration :4000 
      }) 
    }
    else{
      toast.error("Error happened ... ")
    }
  }

  function getAllProducts()
  {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let {isLoading , isError , data , isFetching , refetch } = useQuery('featuredProducts' , getAllProducts ,{
    // cacheTime:7000,
    // refetchOnMount:false,
    // staleTime:4000,
    // refetchInterval:5000,
    // enabled:false,

  } );



  //*********************** */
  // let [allProducts, setAllProducts] = useState(null);

  // async function getAllProducts() {
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   setAllProducts(data?.data);
  // }

  // useEffect(function () {
  //   getAllProducts();
  // }, []);

  

  return <>
<div className="container">
<div className="row gx-0 mb-5">
            <div className="col-sm-9"><HomeSlider/></div>

            <div className="col-sm-3">
              <img style={{width:"100%" , height : "200px" }} src={require('../Assets/Images/images/banner-4.jpeg')} alt="" />
              <img style={{width:"100%" , height : "200px" }} src={require('../Assets/Images/images/slider-2.jpeg')} alt="" />
            </div>

          </div>
          <CategorySlider/>
</div>
  
  {/* <button onClick={() => refetch ()} className='btn main-bg-color text-white w-100'>Get Products</button> */}
      {data?.data.data?(
        <div className="container py-5">

          <h2>Featured Products</h2>
          <div className="row gy-4">
            {data?.data.data.map(function (product , idx) {
              return (
                <div className="col-md-2">
                  
                  <div key={idx} className="product ">

                   <Link to={`/productDetails/${product.id}`}> 

                    <img
                      src={product.imageCover}
                      className="w-100"
                      alt="products"
                    />
                    <h6 className="main-color">{product.category.name}</h6>
                    <h5>{product.title.split(' ').splice(0,2).join(" ")}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>{product.price} EGP</p>
                      <p>
                        <span>
                          <i className="fa-solid fa-star main-color"></i>
                        </span>
                        {product.ratingsAverage}
                      </p>
                    </div>
                    </Link>
                    <button onClick={()=> addProductToCart ( product.id )} className="btn main-bg-color w-100 p-1 text-white">+ Add To Cart</button>
                    
                  </div>
                </div>
                
              );
            })}
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
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
      )}
    </>

}

