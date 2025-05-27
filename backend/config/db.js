    import mongoose from "mongoose";

    export const connectDB = async()=>{
        await mongoose.connect('mongodb+srv://umakanth_d:45784578@cluster0.izxyjdx.mongodb.net/food-del')
        .then(()=>{
            console.log("MongoDB connection is done");
        })

    }
    