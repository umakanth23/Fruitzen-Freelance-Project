import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import validator from 'validator';


// login user, 
const loginUser = async (req,res)=>{

    const {email,password} = req.body;
    try {
        
        const user = await userModel.findOne({email});
        if(!user)
        {
            //means user detials not exist .
            return res.json({success:false, message:"User doest't exist"});

        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.json({success:false, message:"Invalid credentials"});
        }

        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"login Error"});
    }



}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


//register user
const registerUser = async (req,res)=>{


    const {name,password,email} = req.body;

    try {
        
        //checking if user - email already exist
        const exists = await userModel.findOne({email});
        if(exists)
        {
            // if exists,
            return res.json({success:false,message:"User already exists"});
        }
        
        //validating email format & strong password 

        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please enter valid email"});
        }
        
        if(password.length <8)
        {
            return res.json({success:false,message:"Please enter strong password"});
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //save this new user data into db
        const user = await newUser.save();

        //creating token
        const token = createToken(user._id); // user._id will be present in DB.
        res.json({success:true,token});

    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"use register error"});

    }

}

export {loginUser,registerUser};