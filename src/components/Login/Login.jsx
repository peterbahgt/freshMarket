import React , {useContext, useState }  from 'react';
import style from './Login.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';

export default function Login() {

  let {setUserToken} = useContext(UserContext);
  let navigate =  useNavigate();
  let [isLoading , setLoading] = useState(false); 
  let [error , setError] = useState(null);

  const validationSchema = Yup.object({
    email:Yup.string().email('Email format is not valid').required('Email is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,20}$/ , 'Please write a valid pass').required('Pass is required')
  })

  async function sendDataForLogin (values){
   
    setLoading(true);
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values)
    .catch((err)=>{
      setLoading(false);
      setError(err.response.data.message)
    }
    )

     console.log(data);
     if(data.message === 'success'){
      setLoading(false);
      localStorage.setItem('userToken' , data.token);
      setUserToken(data.token);
      navigate('/products');
     }

    }

     let formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: sendDataForLogin
    })
  

    return (
      <>
      <div className="w-75 mx-auto ">
      {error !== null ? <div className="alert alert-danger">{error}</div> : ''}
      
        <h3 className="my-3">Login Now :</h3>
        <form onSubmit={formik.handleSubmit}>
  
          <label htmlFor="userEmail" className="">email : </label>
          <input id="userEmail" className="form-control" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name="email" />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ' '}

          <label htmlFor="userPass" className="">password : </label>
          <input id="userPass" className="form-control" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name="password" />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ' '}

          {isLoading? <InfinitySpin 
                      width='200'
                      color="#4fa94d"/> 
                      : <>
                      <div className='d-fex align-items-center'>
                      <button type="submit"  className="btn btn-outline-danger mx-2 my-3">Login</button> 
                      {/* <Link className='btn' to={'/register'}>Register Now</Link> */}
                      </div>
                       </> }
        </form>
        </div>
      </>
    );
   }