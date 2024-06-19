import React from 'react'
import logo from '../css/logo2.png';
import {Link} from "react-router-dom"

const Branding = props => {
    return (
        <div>
            <Link to="../">
            <img alt='Logo' src={logo} style={{width: '120px', margin: '20px'}}/>
            </Link>
        </div>
    )
}

export default Branding
