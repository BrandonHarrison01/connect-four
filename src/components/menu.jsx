import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
    return(
        <div>
            <h2>Main Menu</h2>
            <h3>Local</h3>
            <ul>
                <li><Link to='/local-pvp'>PVP</Link></li>
                <li>AI</li>
            </ul>
            <h3>Online</h3>
        </div>
    )
}

export default Menu