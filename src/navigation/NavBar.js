import React from 'react'
// import Avatar from '../subComponent/Avatar'
import Branding from '../components/Branding'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "../navigation/navElements";

const Navbar = props => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Branding />
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/search" >
                        Search
                    </NavLink>
                    <NavLink to="/discover" activestyle = "true">
                        Discover
                    </NavLink>
                    <NavLink to="/trending" activestyle = "true">
                        Trending
                    </NavLink>
                    <NavLink to="/upcoming" activestyle = "true">
                        Upcoming
                    </NavLink>
                    <NavLink to="/countries" activestyle = "true">
                        Countries
                    </NavLink>
                    <NavLink to="/sign-up" activestyle = "true">
                        Sign Up
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </div>
    )
}

export default Navbar
