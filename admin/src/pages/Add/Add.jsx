import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {


  const [image,setImage]  = useState(false); // uploaded image will be saved into image-state
  const [data,setData] = useState({

    name:"",
    description:"",
    price:"",
    category:"salad" //default value is set as salad (as dropdown is set to salad already)
  }); // state-variable data will have all admin input-data given by admin.
  
  const onChangeHandler = (event)=>{

      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
  }

  const onSubmitHandler = async(event)=>{
        event.preventDefault();

         if (!image) {
            toast.error('Image not selected');
            return null;
        }
        
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price", Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);

        //API call (for this we use axios);
        const response = await axios.post(`${url}/api/food/add`,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
             },
        });
        if(response.data.success){

          //formData is added to DB
          setData({
                name:"",
                description:"",
                price:"",
                category:"Select" 
          })
          setImage(false);
          toast.success(response.data.message);  //response.data.message value is set in backened

        }
        else{

            toast.error(response.data.message); // whenever there is error while adding add
        }
  }

  return (
    <div className='add'>

          <form action="" className='flex-col' onSubmit={onSubmitHandler}>
              <div className="add-img-upload flex-col">
                  <p>Upload Image</p>
                  <input onChange={(e)=>{setImage(e.target.files[0]); e.target.value = ''} }  name='image' type="file" id="image"  />
                  <label htmlFor="image">
                        <img src={image?URL.createObjectURL(image) :assets.upload_area} alt="" />
                  </label>
                  
              </div>
              <div className="add-product-name flex-col">
                <p>
                  Product name
                </p>
                <input className='product-name' onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
              </div>
              <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" id="" rows="6" placeholder='write description here'></textarea>
              </div>
              <div className="add-category-price">
                <div className="add-category flex-col">
                  <p>Product category</p>
                  <select  onChange={onChangeHandler} name="category" id="">
                      <option value="Select">Select</option>
                      <option value="Bowl">Bowl</option>
                      <option value="Drink">Drink</option>
                      <option value="Frozen">Frozen</option>
                      <option value="Detox">Detox</option>
                      <option value="Dessert">Dessert</option>
                  </select>
                </div>
                <div className="add-price flex-col">
                  <p>Product price</p>
                  <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹20'/>
                </div>
              </div>
              <button type="submit" className='add-btn'>ADD</button>
          </form>
    </div>
  )
}

export default Add
