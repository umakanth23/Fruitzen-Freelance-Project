import React from 'react'
import './About.css'
import { assets } from '../../assets/assets'

const About = () => {
  return (
        <div className="about" id="about">
                {/* <p>For Better Experience Download <br /> FruitZen App</p>
                <div className="app-download-platforms">
                    <img src={assets.play_store} alt=""></img>
                    <img src={assets.app_store} alt=""></img>
                </div> */}
                <div className="about-us">
                    <h1>About Us</h1>
                    <div className="who">
                      <h2>Who Are We?</h2>
                      <p>
                        We are a Hyderabad-based startup born out of a simple yet powerful idea — to serve fresh, organic fruit products without compromising on health, taste, or hygiene. At <strong>FruitZen</strong>, everything we offer is 100% natural, preservative-free, and made with love and care using the purest ingredients.

                        From refreshing cold-pressed juices and detox drinks to vibrant fruit bowls, frozen fruit chunks, and guilt-free desserts — our goal is to bring nature’s goodness to your plate in the most authentic and delicious way possible.
                      </p>
                    </div>
                    <div className="started">
                     
                     <h2> How It All Started</h2>
                      <p>
                     
                            FruitZen began as a dream shared by three close friends, passionate about health, food, and entrepreneurship. With a shared vision of promoting clean, organic living, we launched FruitZen with a commitment to purity, quality, and sustainability. What started as a small venture has now grown into a strong team of four, all united by the same purpose.

                            Over time, we've been blessed with overwhelming support and positive feedback from our customers. With consistency, timely delivery, and a promise of unmatched freshness, we've served over <strong>1,000 happy customers</strong> and counting.
                      </p>
                    </div>
                    <div className="mission">
                      <h2>Our Mission</h2>
                      <p>
                        At FruitZen, we believe in keeping it real, raw, and nourishing. We're here to make healthy choices easier, tastier, and more accessible — one fruit-filled bite at a time.
                        </p>
                    </div>
                </div>
        </div>
  )
}

export default About
