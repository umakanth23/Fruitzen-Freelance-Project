import React from 'react'

import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'

import './Home.css'
import { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import About from '../../components/About/About'

const Home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <About/>
    </div>
  )
}

export default Home
