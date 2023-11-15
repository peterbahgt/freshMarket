import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import SignOut from "./components/SignOut/SignOut";
import CounterContextProvider from "./Context/CounterContext";
import React, { useContext , useEffect } from 'react';
import { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile/Profile";
import Payment from "./components/Payment/Payment";
import AllOrders from "./components/AllOrders/AllOrders";
import BrandDetails from "./components/BrandDetails/BrandDetails";
import CategorySelect from "./components/CategorySelect/CategorySelect";





let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute> <Home/> </ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute>  },
      { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute>},
      { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute>},
      { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: "payment", element: <ProtectedRoute> <Payment /> </ProtectedRoute> },
      { path: "allOrders", element: <ProtectedRoute> <AllOrders  /> </ProtectedRoute> },
      { path: "productDetails/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "BrandDetails/:id", element: <ProtectedRoute> <BrandDetails/> </ProtectedRoute> },
      { path: "CategorySelect/:id", element : <ProtectedRoute> <CategorySelect/> </ProtectedRoute>},
      { path: "profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
      { path: "login", element:  <Login />  },
      { path: "signout", element:  <SignOut />  },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {

  let {setUserToken} = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }

  } , []);


  return <> 
  <CartContextProvider>
  <CounterContextProvider>
        <RouterProvider router={routers}></RouterProvider>
      </CounterContextProvider>
      </CartContextProvider>
      <Toaster/>
      </>
}
