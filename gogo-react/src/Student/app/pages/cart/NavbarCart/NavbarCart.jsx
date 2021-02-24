import React from 'react';
import "./NavbarCart.css";
import {Link,useHistory} from "react-router-dom";
import logo from "../img/logo.76ebe1c4.png"
const NavbarCart=()=>{

    const Histroy=useHistory()
    const menuClick=()=>{
        let menuList=document.querySelector(".menuList");
        
         if(menuList.style.display=="none"|| menuList.style.display === ""){
            menuList.style.display="flex";
           
        }
        else if(menuList.style.display!="none"){
         
            menuList.style.display="none";
        }
    }
    return(
        <>
            <nav className="navCart">
                <ul className="ul1">
                    <li className="liPrim" ><Link onClick={()=>{Histroy.goBack()}} >&#8592; Back</Link></li>
                    <li className="liPrim"><Link to><img src={logo} /></Link></li>
                    <li className="liSec">
                        <div className="menu" onClick={()=>{menuClick()}}>
                            <i class="fas fa-bars"></i>
                        </div>
                        <ul className="ul2">
                            <li><Link to="/student/cart">Cart</Link></li>
                            <li><Link to="/student/wish">WishList</Link></li>
                            <li><Link to="/student/save">Save for later</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <ul className="menuList">
                            <li><Link>Cart</Link></li>
                            <li><Link>WishList</Link></li>
                            <li><Link>Save for later</Link></li>
            </ul>
        </>)

}

export default NavbarCart;