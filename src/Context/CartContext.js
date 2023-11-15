import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartProducts, setCartProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
         getUserCart();
      // setNumOfCartItems(data.numOfCartItems);
      // setCartProducts( data.data.products ); //3shan ana 3wza el goz2 el kamll
      // setTotalCartPrice(data.data.totalCartPrice);

      return data;
    } catch (e) {
      console.log("error", e);
    }
  }

  async function getUserCart() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("userToken") },
      });

      setNumOfCartItems (data.numOfCartItems);
      setTotalCartPrice (data.data.totalCartPrice);
      setCartProducts (data.data.products);
      setCartId ( data.data._id);
      
      return data ;

    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteProduct (productId) {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token: localStorage.getItem("userToken") },
      });
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice (data.data.totalCartPrice);
      setCartProducts (data.data.products);
      
    } catch (er) {
      console.log("error" , er);
    }
  }

  async function updateCount (productId , count ) { 
    try {
      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
      "count" : count
      },
      {headers : { token : localStorage.getItem('userToken')}}
      );

      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice (data.data.totalCartPrice);
      setCartProducts (data.data.products);

      return data ;
      
    } catch (e) {
      console.log("error" , e);
    }
   }

   async function removeCartData() {
    try {
      const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/", {
        headers: { token: localStorage.getItem("userToken") },
      });

      setNumOfCartItems (0);
      setTotalCartPrice (0);
      setCartProducts ( [] );
      
      return data ;

    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect ( function ( ) { 
    getUserCart();
  } , []);

  return (
    <CartContext.Provider
      value={{getUserCart ,
         removeCartData ,
          updateCount , 
          addToCart , 
          deleteProduct ,
          setNumOfCartItems,
          setTotalCartPrice,
          setCartProducts,
          cartProducts, 
          totalCartPrice, 
          numOfCartItems,
          cartId
         }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
