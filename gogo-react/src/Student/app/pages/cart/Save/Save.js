import React,{useState,useEffect} from 'react';
// import "./Main.css";
import course from "../img/images.fc914787.jpg"
import logoIs from "../img/logo.76ebe1c4.png";
import {Link} from "react-router-dom";
import "./Save.css"

const Wish=()=>{
    const [count,setCount]=useState([]);
    const [List,setList]=useState([]);
    useEffect(  ()=>{
        const url=`${window.location.protocol}//${window.location.hostname}:5000/student/cart/save_list`
         fetch(url,{
            method:"GET",
            credentials:'include',
            
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.result);
            setList(data.result)
            console.log(count[0].session_name);
        })
        .catch(e=>console.log(e))
        
    },[List,count])

    const removeItem=(save_item_id)=>{
        const url=`${window.location.protocol}//${window.location.hostname}:5000/student/cart/remove_item_save_list`;
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                save_item_id
            }),
            credentials:"include"
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            alert("done")
        })
        .catch(e=>console.log(e))
    }
    const addCart=(item)=>{
        const url=`${window.location.protocol}//${window.location.hostname}:5000/student/cart/add_to_cart`;
        
        console.log(item);
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                values:item
            }),
            credentials:"include"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            removeItem(item.save_item_id)
        })
        .catch(e=>console.log(e))
        
        
    }
    const wishItem=(item)=>{
        const url=`${window.location.protocol}//${window.location.hostname}:5000/student/cart/add_to_wish`
        
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                item
            }),
           credentials:"include"
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(e=>console.log(e))
        removeItem(item.save_item_id)
    }
    return (
        <>
       <div className="Wish">
                        <div className="header">
                            {/* <div>Item Name</div>
                            <div>Item Price</div>
                            <div>Action</div> */}
                            <h2>
                                    Saved List
                            </h2>
                        </div>
                        {
                            List?List.map((item)=>{
                                return(
                                    <>
                                    <div className="body">
                                    <div className="section1">
                                    <div className="img_item">
                                        <img src={course} />
                                    </div>
                                    <div className="details">
                                        <h5>{item.session_name}</h5>
                                        <div className="section2"><i class="fas fa-rupee-sign"></i>  {item.session_fee}</div>
                                        
                                    </div>
                                </div>
                                <div className="section2">
                                    <div onClick={()=>{addCart(item)}}>
                                        Add to Cart
                                    </div>
                                    <div onClick={()=>{wishItem(item)}} >
                                        Add to WishList
                                    </div>
                                    <div onClick={()=>{removeItem(item.save_item_id)}}>
                                        Remove
                                    </div>
                                </div>

                            </div>
                                    </>
                                )
                            }):<div>
                                Empty
                            </div>
                        }
                      
                        {/* <div className="body">
                            <div className="section1">
                                <div className="img_item">
                                    <img src={course} />
                                </div>
                                <div className="details">
                                    <h5>{count[0].session_name}</h5>
                                    <div className="section2"><i class="fas fa-rupee-sign"></i>  {count[0].session_fee}</div>
                                    
                                </div>
                            </div>
                            <div className="section2">
                                <div>
                                    Add to Cart
                                </div>
                                <div>
                                    Save for Later
                                </div>
                                <div>
                                    Remove
                                </div>
                            </div>

                           
                        </div> */}
                        {/* 
                        <div className="body">
                            <div className="section1">
                                <div className="img_item">
                                    <img src={course} />
                                </div>
                                <div className="details">
                                    <h5>{count[0].name}</h5>
                                    <div className="section2"><i class="fas fa-rupee-sign"></i>  100</div>
                                    
                                </div>
                            </div>
                            <div className="section2">
                                <div>
                                    Add to Cart
                                </div>
                                <div>
                                    Save for Later
                                </div>
                                <div>
                                    Remove
                                </div>
                            </div>

                           
                        </div>
                        <div className="body">
                            <div className="section1">
                                <div className="img_item">
                                    <img src={course} />
                                </div>
                                <div className="details">
                                    <h5>{count[0].name}</h5>
                                    <div className="section2"><i class="fas fa-rupee-sign"></i>  100</div>
                                    
                                </div>
                            </div>
                            <div className="section2">
                                <div>
                                    Add to Cart
                                </div>
                                <div>
                                    Save for Later
                                </div>
                                <div>
                                    Remove
                                </div>
                            </div>
                            
                           
                        </div>
                         */}
                        {/* <div className="body">
                            <div className="section1">
                                <img src={course} />
                                <div className="name">
                                    <h5>{count[1].name}</h5>
                                </div>
                                <div className="qnt">
                                    <div className="func">
                                        <h5>Quantity</h5>
                                        <button onClick={()=>{sub(count[1].id)}}>-</button>
                                        <h5>{count[1].no}</h5>
                                        <button onClick={()=>{add(count[1].id)}}>+</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="section2"><i class="fas fa-rupee-sign"></i>  200</div>
                            <div className="section3">
                                <div>
                                    Add to Cart
                                </div>
                                <div>
                                    Save for Later
                                </div>
                                <div>
                                    Remove
                                </div>
                            </div>
                        </div> */}
                        
            </div>
        </>
    )

}

export default Wish;