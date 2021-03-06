import React,{useState,useEffect} from 'react';
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
    const [info,setInfo]=useState([]);
    useEffect(() => {
        const fetchData=()=>{
            let url=`${window.location.protocol}//${window.location.hostname}:5000/student/info/to_from`
            fetch(url,{
                method:"GET",
                credentials:"include",
            }).then(res=>res.json())
            .then((data)=>{
                setInfo(data.result[0]);
            })
            .catch(e=>{
                console.log(e);
            })
        }
        fetchData()
    }, [])
    return(
        <div className="cardContainer">
            <div className="div1">
                <Cards condition="From" name={`${info.customer_first_name} ${info.customer_last_name}`} contact={`${info.customer_phone_number}`} email={`${info.customer_email}`} />
                       <Switch>
                                <Route exact path ="/student/cart">
                                    <Main/>  
                                </Route>
                                <Route exact path ="/student/wish">
                                    <Wish/>  
                                </Route> 
                                <Route exact path="/student/next">
                                     <Distribution/>
                                </Route>
                                <Route exact path ="/student/save">
                                     <Save/>  
                                </Route>
                                
                       </Switch>

                <Cards condition="To" name={`${info.student_first_name} ${info.student_last_name}`} contact={`${info.student_phone_number}`} email={`${info.student_email}`}/>    
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