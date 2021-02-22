import React from 'react';
import {Link} from "react-router-dom";
import "./Carts.css"
const Cards=(arg)=>{
    return(
        <>
            <div className="CardFromTo">
                    <div className="header" >{arg.condition}</div>
                    <ul className="list">
                        <li>Name :{arg.name}</li>
                        <li>Contact :{arg.contact}</li>
                        <li>Email :{arg.email}</li>
                    </ul>
            </div>
        </>)

}

export default Cards;