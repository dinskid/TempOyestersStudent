import React,{useState} from 'react';
import "./MainCard.css";
import Cards from "../Cards/Carts";
import Distribution from "../Distribution/Distribution";
import {TransitionGroup,CSSTransition} from "react-transition-group";
import {BrowserRouter,Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import Wish from "../Wish/Wish";
import Save from "../Save/Save";

const MainCard=()=>{
    
    const Show1=()=>{
        document.querySelector("#code1").style.display="block";
    }
    const Show2=()=>{
        document.querySelector("#code2").style.display="block";
    }
    return(
        <div className="cardContainer">
            <div className="div1">
                <Cards condition="From" name="John" contact="+98 93839232323" email="john@gmail.com" />
                       <Switch>
                                <Route exact path ="/app/pages/cart">
                                    <Main/>  
                                </Route>
                                <Route exact path ="/app/pages/cart/wish">
                                    <Wish/>  
                                </Route> 
                                <Route exact path ="/app/pages/cart/save">
                                     <Save/>  
                                </Route>
                                <Route path="/app/pages/cart/next">
                                        <Distribution/>
                                </Route>
                       </Switch>

                <Cards condition="To" name="Henry" contact="+91 23432423487" email="henry@gmail.com"/>    
            </div>
            <div className="div2">
                <div className="innerDiv">
                    <button onClick={()=>{Show1()}} className="btn1">Have a coupon code?</button>
                    {/* <button onClick={()=>{Show2()}} className="btn2">Have a GSTIN?</button> */}
                </div>
            </div>
        </div>)

}

export default MainCard;