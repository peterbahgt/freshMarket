import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';

export default function CategorySlider () {

   function getAllCategories ()
    {
     return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const {data , isLoading} = useQuery("categorySlider" , getAllCategories , {
        refetchOnMount : false
    })

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows : false
      };

      if (isLoading){
        return <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
      }

    return <>
            <div>
                <h2>Category Slider</h2>
        <Slider {...settings}>
          {data?.data.data.map( function(category , idx ) { 
            return <> <div key={idx}>
            <img style={{width : "100%" , height : "200px"}} src={category.image} alt="pics" />
            <h6 className='mt-2'>{category.name}</h6>
          </div>
        </>
          } )}
        </Slider>
      </div>
        </>

}


