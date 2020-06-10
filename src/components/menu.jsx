import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
    return(
        <div className='menu'>
            <h2>Main Menu</h2>
            <div className='menu-option'>
                <h3>Local</h3>
                <ul>
                    <li><Link to='/local-pvp'>PVP</Link></li>
                    <li>AI</li>
                </ul>
            </div>
            <div className='menu-option'>
                <h3>Online</h3>
            </div>
        </div>
    )
}

export default Menu