import foodModel from "../models/foodModel.js";
import fs from 'fs' // file-system

//add food item

const addFood = async (req,res)=>{

    // let image_filename = `${req.file.filename}`; // using this will store uploaded file into image_filename;

    try {
            const image_filename = `${req.file.filename}`;
        console.log("File received:", req.file);
        
        const food = new foodModel({
            name:req.body.name,
            description: req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename

        })
        
        await food.save() // Food-item will be saved into database.
        res.json({success:true, message:"Food item Added"});
    } catch (error) {

        console.log(error);
        res.json({success:false,message:"Food item not Added error"});

    }
}
    
// All food list

const listFood = async (req,res)=>{

    try {

        const foods = await foodModel.find({});
        res.json({success:true,data:foods});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"listFood Error"});
    }

}

//remove food item
const removeFood = async (req,res)=>{

    try {

        //find the food item, that we want to delete
        const food = await foodModel.findById(req.body.id); // find the foodModel using item (which is id);
        fs.unlink(`uploads/${food.image}`,()=>{ });
        
        await foodModel.findByIdAndDelete(req.body.id); // delete item from MongoDB;
        res.json({success:true,message:"Food item removed"});
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"food item delete error"});
    }

}

export {addFood,listFood,removeFood};


