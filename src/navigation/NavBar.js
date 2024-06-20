import React, { useState, useContext } from 'react';
import Branding from '../components/Branding';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "../navigation/navElements";
import { AuthContext } from "../pages/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Nav>
            <Branding />
            <Bars onClick={toggleMenu} /> {/* Hamburger menu icon */}

            <NavMenu isOpen={isOpen}>
                <NavLink to="/search" activeStyle={{ fontWeight: "bold", color: "red" }}>
                    Search
                </NavLink>
                <NavLink to="/discover" activeStyle={{ fontWeight: "bold", color: "red" }}>
                    Discover
                </NavLink>
                <NavLink to="/trending" activeStyle={{ fontWeight: "bold", color: "red" }}>
                    Trending
                </NavLink>
                <NavLink to="/upcoming" activeStyle={{ fontWeight: "bold", color: "red" }}>
                    Upcoming
                </NavLink>
                <NavLink to="/popular" activeStyle={{ fontWeight: "bold", color: "red" }}>
                    Popular
                </NavLink>
                <NavLink to="/tv" activeStyle={{ fontWeight: "bold", color: "red" }}>
                    TV Shows
                </NavLink>
                <NavLink activeStyle={{ fontWeight: "bold", color: "red" }}>
                    {isAuthenticated ? (
                        <Link to="/favorites">Favorites</Link>
                    ) : (
                        <Link to="/signin">Sign In</Link>
                    )}
                </NavLink>
            </NavMenu>

            {/* <NavBtn>
                
            </NavBtn> */}
        </Nav>
    );
}

export default Navbar;
