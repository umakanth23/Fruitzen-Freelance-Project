import userModel from "../models/userModel.js";

//add items to user cart
const addToCart = async (req,res)=>{

    try {
        
        let userData = await userModel.findById(req.body.userId); // 
        let cartData = await userData.cartData;  // users cart data will be store in cartData.
        if(!cartData[req.body.itemId])
        {   
            cartData[req.body.itemId] = 1;      // creates new entry.       
        }
        else
        {
            cartData[req.body.itemId] +=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"});
    } catch (error) {
        
        console.log("addToCart :",error);
        res.json({success:false,message:"addToCart Error"});

    }


}

//remove items. from user cart
const removeFromCart = async (req,res)=>{

    try {
        
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId] -=1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"});


    } catch (error) {
        
        console.log(error);
        res.json({success:false, message:"Error"});
    }

}

//fetch user cart data
const getCart = async(req,res)=>{
    try {

        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData:cartData});

    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"Error"});

    }

}

export {addToCart,removeFromCart,getCart};