import React ,{useState} from 'react'
import './MyOrders.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {url,token,currency} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async ()=>{

        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);

        //console.log(response.data.data);

    }

    useEffect(()=>{

        if(token)
        {
            fetchOrders();
        }
        
    },[token]);


  return (
    <div>
        
        <div className="my-orders">
            <h2>
                My Orders
            </h2>
            <div className="container">
                {data.map((order,index)=>{

                    return(
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{

                                if(index === order.items.length-1)
                                {
                                    return item.name+" X "+item.quantity;
                                }
                                else
                                {
                                    return item.name + " X " + item.name;
                                }
                            })}</p>
                            <p>
                               {currency}{order.amount}.00
                            </p>
                            <p>Total Items:{order.items.length}</p>
                            <p>
                                <span>&#x25cf; </span> 
                                <b>
                                    {order.status}
                                </b>
                            </p>
                            <button >Track order</button>
                        </div>
                    )

                })}
            </div>
        </div>

    </div>
  )
}

export default MyOrders
