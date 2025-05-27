import { createContext, useState,useEffect } from "react";
import { food_list ,menu_list} from "../assets/assets";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]); //to fetch foodlist data from DB
    const currency = "₹";
    const deliveryCharge = 50;

    const addToCart = async (itemId)=>{
        if(!cartItems[itemId])
        {       
            setCartItems((prev)=>({...prev,[itemId]:1})) // if user adds first item into cart, this line will be executed.
        }
        else
        {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})); 
            //cart items will be increased by 1
        }
        if(token)
        {   
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }   

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){

            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price*cartItems[item];
            }            
        }
        return totalAmount;
    }
     const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token)
        {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:token});
        }

    }

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async(token)=>
    {
        const response = await axios.post(url+"/api/cart/get",{},{headers:token});
        setCartItems(response.data.cartData);
    }




    useEffect(()=>{

        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token"))
            {
                setToken(localStorage.getItem("token"));
                await loadCartData({token:localStorage.getItem("token")});
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list, 
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        setToken,
        menu_list,
        token,
        loadCartData,
        currency,
        deliveryCharge

    }
    return (
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;