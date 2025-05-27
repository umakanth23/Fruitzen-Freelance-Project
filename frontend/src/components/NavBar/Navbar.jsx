import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate(); //it's hook used for navigating to other pages.
    const logout = ()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }


  return (
    <div className='navbar' >
        <Link to='/'> <img src={assets.logo} alt='logo' className='logo'/></Link> 
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={`${menu ==="home" ? "active" : ""}`}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu ==="menu" ? "active" : ""}`}>Menu</a>
            <a href='#about' onClick={()=>setMenu("about")}  className={`${menu ==="about" ? "active" : ""}`}>About Us</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={`${menu ==="contact-us" ? "active" : ""}`}>Contact Us</a>

        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" className="src" />
            <Link to='/cart' className='navbar-search-icon'>
               <img src={assets.basket_icon} alt="" />               
                <div className={getTotalCartAmount() ===0 ? "":"dot"}></div>
            </Link>
            {!token?<button onClick={()=>setShowLogin(true) } className="signin-btn">Sign-in</button>
             : <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
             </div>
             }
           
        </div>
    </div>
  )
}

export default Navbar
