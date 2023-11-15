import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

export default function CategorySelect() {
  
 const{id}= useParams()
 
const  {data,isLoading}=useQuery("CatigoryDetails",getCatigoryDetails)
  
function getCatigoryDetails(){
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
}

if(isLoading==true){
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
console.log(data.data.data)
  return <>
  
  <div className="container my-5">
    <h1 className=' text-center main-color mb-5'>{data.data.data.name}Subcategory</h1>
    <div className="row g-3">
       
{data?.data.data.map(function(cate,idx){
return <div key={idx} className="col-md-4">
<div className="catigory border-1 rounded-1 border green-shadow p-4 text-center fs-2 ">
<p>{cate.name}</p>

</div>
            </div>

})}
    </div>
  </div>
  
  
  </>
}