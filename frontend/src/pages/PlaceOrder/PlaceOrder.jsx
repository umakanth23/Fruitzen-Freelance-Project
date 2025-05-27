import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets';

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url,setCartItems,currency} = useContext(StoreContext);
  const [payment, setPayment] = useState("cod")
  
  const[data,setData] = useState({

    firstName :"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:""
    
  })

  const onChangeHandler =(event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
  }



  // useEffect(()=>{
  //   console.log(data);
  // },[data]);

  const placeOrder = async (event)=>{

    event.preventDefault();
    
    //structure all order-data
    let orderItems = [];
    food_list.map((item)=>{
        if(cartItems[item._id]>0)
        {
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo);
           
        }
    })
     console.log("Order Item details :",orderItems);

     let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+ 50,     
     }

     let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
     if(response.data.success){

      //if this condition is true, we will get session url;
      const {session_url} = response.data;
      // we have to send user on to this url.
      window.location.replace(session_url);
      
     }
     else{

          alert("Error");
     }

  }

  const navigate = useNavigate();

  useEffect(()=>{

    if(!token)
    {
        navigate('/cart');
    }
    else if(getTotalCartAmount === 0) // when cartAmout is 0 , we set to navigate only to cart page.
    {
      navigate('/cart')
    }

  },[token]);


  return (
   <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>

          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>

        <div className="multi-fields">
          <input name="pincode" onChange={onChangeHandler} value={data.pincode} type="text" placeholder='Pincode'/>
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text"  placeholder='Phone'/>
      </div>
      <div className="place-order-right">
          
      <div className="cart-total">
              <h2>Cart Totals</h2>
              <div >
                    <div className="cart-total-details">
                      <p>Subtotal</p>
                      <p>{currency}{getTotalCartAmount()}</p> 
                    </div>
                    <hr />
                    <div className="cart-total-details">
                      <p>Delivery Fee</p>
                      <p>{currency}{getTotalCartAmount() === 0 ? 0 : 50}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                      <b>Total</b>
                      <b>{currency}{getTotalCartAmount() ===0?0:getTotalCartAmount() + 50}</b>
                    </div>
              </div>
              <button type='submit'>PROCEED TO PAYMENT</button>
            </div>

      </div>
   </form>
  )
}

export default PlaceOrder
