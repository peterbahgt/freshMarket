import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
// import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Catigory() {
  
 const{data ,isLoading}= useQuery("category",getAllCatigories)

  function getAllCatigories(){
 return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  
if(isLoading===true){
  return <div className="vh-100 d-flex justify-content-center align-items-center ">
  <ThreeCircles
    height="100"
    width="100"
    color="#4fa94d"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="three-circles-rotating"
    outerCircleColor=""
    innerCircleColor=""
    middleCircleColor=""
  />
  </div>
}

  return <>
  <><title>Categories</title></>
  <div className="container my-5">
    <div className="row g-3">
      {data.data.data.map(function(cat,idx){
        return <div key={idx} className="col-md-4  green-shadow ">
          <Link to={`/CategorySelect/${cat._id}`} >
          <div className="catigory border-1 rounded-1 border">
          <img style={{width:"350px",height:"300px"}} src={cat.image} alt="" />
           <p className=' text-center main-color fs-4 mt-4'>{cat.name}</p>
          </div>
          </Link>
        </div>
      })}
    </div>
  </div>
  
  
  </>
}