import React from 'react'
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default function Brands() {
  
 const {data,isLoading}= useQuery("brands",getAllBrands)
  function getAllBrands(){
  return  axios.get("https://ecommerce.routemisr.com/api/v1/brands");
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
      console.log(getAllBrands())
  return <>
 <title>Brands</title>
  <div className="container my-5">
    <div className="row g-2">
    {data?.data.data.map(function(brand,idx){
    return <div key={idx} className="col-md-3">

    <Link to={`/BrandDetails/${brand._id}`}>
    <div className="brand border-1 rounded-1 border green-shadow">
       <img src={brand.image} className="w-100" alt="brand" />
       <p className='mt-1 text-center'>{brand.name}</p>
      </div>
    </Link>
     </div>
      })}
    </div>
  </div>
  
  
  </>
}