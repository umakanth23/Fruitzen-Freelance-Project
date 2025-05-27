import React from 'react'

import './Header.css'

const Header = () => {
  return (
    <div className='header' id="header">
        <div className="header-contents">
            <h2>Fresh, juicy, and delicious</h2>
            <p>
                Satisfy your cravings with our best fruit dishes — order now!
            </p>
            {/* <button>View Menu</button> */}
        </div>
    </div>
  )
}

export default Header
