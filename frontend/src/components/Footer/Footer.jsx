import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

        <div className="footer-content">
            <div className='footer-content-left'>
                <img className='footer_logo' src={assets.footer_logo} alt="" />
                {/* <p>FruitZen is a fresh and vibrant brand dedicated to serving delicious, authentic, and 100% organic fruit-based dishes. From refreshing juices and detox drinks to wholesome fruit bowls, frozen fruit chunks, and guilt-free desserts — everything we offer is preservative-free and made with nature’s purest ingredients. At FruitZen, we believe in keeping it real, raw, and naturally nourishing.</p> */}
                <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul className='footer-links'>
                    <a href='/'>Home</a>
                    <a href='#about'>About Us</a>
                    <a>Delivery</a>
                    <a>Privacy Policy</a>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-7093601509</li>
                    <li>fruitzen@gmail.com</li>
                </ul>
            </div>
            
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2025 @Fruitzen.com -All rights reserved</p>

    </div>
  )
}

export default Footer
