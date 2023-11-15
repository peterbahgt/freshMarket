import axios from "axios";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
// import { Helmet } from "react-helmet";

export default function BrandDetails() {
  const { id } = useParams();

  function getBrandDetails() {
    return axios.get(`https:ecommerce.routemisr.com/api/v1/brands/${id}`);
  }

  const { data, isLoading } = useQuery("brandDetails", getBrandDetails);

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center ">
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
    );
  }
  return (
    <>
      
        <title>BrandDetails</title>
      

      <div className="container d-flex justify-content-center">
        <div className="brand bg-body-secondary p-4 m-4">
          <div className=" m-5 ">
            <img
              src={data.data.data.image}
              alt=""
            />
            <p className=" main-color fs-3 text-center mt-4">
              {data.data.data.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}