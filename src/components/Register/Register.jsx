import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";



export default function Register() {

  let [isLoading , setLoading] = useState(false);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    name:Yup.string('Must be string').min(3 , "Name must be more than 3").max(15 , "Name must be less than 15" ).required('Name is erquired'),
    email:Yup.string().email('Email format is not valid').required('Email is required'),
    phone:Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,20}$/ , 'Please qrite a valid pass').required('Pass is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')] , "passwoed doesn't match").required('Pass is required')
  })

  // function validate (values){
  //   let errors={};
    
  //   let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  //   if(values.name.length == ' ' )
  //   {
  //     errors.name="name is required";
  //   }
  //   else if(values.name.length < 10 )
  //   {
  //     errors.name="name length must be more then 10";
  //   }
  //   else if(values.name.length > 20){
  //     errors.name = "name length must be less than 20";
  //   }


  //   if (values.email == ''){
  //     errors.email = 'Email is required ';
  //   }
  //   else if (!emailRegex.test(values.email)){
  //     errors.email = 'Email format is not valid';
  //   }

  //   return errors;
  // }

  
  let navigate =  useNavigate();
  let [error , setError] = useState(null);

  async function sendData (values){
   
    setLoading(true);

    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
    .catch((err)=>
    {
      setLoading(false);
      setError(err.response.data.message)
    } )
    console.log("senData" , data )

    if(data.message === "success")
    {
    setLoading(false);
    navigate('/login');
    }

  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendData
  })

  return <>
    <div className="w-75 mx-auto ">
      {error !== null ? <div className="alert alert-danger">{error}</div> : ''}
      
      <h3 className="my-3">Register Now :</h3>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="userName" className="">name : </label>
        <input id="userName" className="form-control" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" name="name" />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ' '}
        

        <label htmlFor="userEmail" className="">email : </label>
        <input id="userEmail" className="form-control" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name="email" />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ' '}

        <label htmlFor="userphone" className="">phone : </label>
        <input id="userphone" className="form-control" onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" name="phone" />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ' '}

        <label htmlFor="userPass" className="">password : </label>
        <input id="userPass" className="form-control" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name="password" />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ' '}

        <label htmlFor="userRePass" className="">repassword : </label>
        <input id="userRePass" className="form-control" onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" name="rePassword" />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ' '}

        {isLoading? <InfinitySpin 
                    width='200'
                    color="#4fa94d"/> : <button type="submit" className="btn btn-outline-danger my-3 ">Register</button> }
      </form>
      </div>
    </>
  
}
