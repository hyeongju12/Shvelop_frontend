import * as React from 'react';
import './Logo.scss'
import Logo from './logo.png'
import {Link} from "react-router-dom";

export default function LogoBox() {
    return (
        <Link to="/">
            <img src={Logo} className="logo" alt="Logo"/>
        </Link>
    );
}
