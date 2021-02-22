import React,{useState,useEffect} from 'react';
// import "./Main.css";
import course from "../img/images.fc914787.jpg"
import logoIs from "../img/logo.76ebe1c4.png";
import {Link} from "react-router-dom";
import "./Wish.css"

const Wish=()=>{
    const [count,setCount]=useState([{id:0,name:"Course 1",no:1,p:100,totP:100},{id:1,name:"Course 2",no:1,p:200,totP:200}]);
    const [List,setList]=useState([]);
   

    const removeItem=(wish_item_id)=>{
        const url="http://localhost:5000/student/cart/remove_item_wish_list";
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                wish_item_id
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
        const url="http://localhost:5000/student/cart/add_to_cart";
        
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
            if(data)
                {removeItem(item.wish_item_id)}
        })
        .catch(e=>console.log(e))
        
        
    }
    const addSave=(item)=>{
        const url="http://localhost:5000/student/cart/add_to_save";
        
        console.log(item);
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
        .then(data=>{
            console.log(data);
        })
        .catch(e=>console.log(e))
        removeItem(item.wish_item_id)
     }
     useEffect( ()=>{
        const url="http://localhost:5000/student/cart/wish_list"
         fetch(url,{
            method:"GET",
            credentials:'include',
            
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.result);
            setList(data.result)
        })
        .catch(e=>console.log(e))
        
    },[List,count])
    return (
        <>
       <div className="Wish">
                        <div className="header">
                            {/* <div>Item Name</div>
                            <div>Item Price</div>
                            <div>Action</div> */}
                            <h2>
                                    Wish List
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
                                    <div onClick={()=>{addSave(item)}}>
                                        Save for Later
                                    </div>
                                    <div  onClick={()=>{removeItem(item.wish_item_id)}}>
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