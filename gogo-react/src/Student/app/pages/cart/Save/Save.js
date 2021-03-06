import React,{useState,useEffect} from 'react';
// import "./Main.css";
import course from "../img/images.fc914787.jpg"
import logoIs from "../img/logo.76ebe1c4.png";
import {Link} from "react-router-dom";
import "./Save.css"

const Wish=()=>{
    const [count,setCount]=useState([]);
    const [List,setList]=useState([]);
    const fetchData=()=>{
        const url=`${window.location.protocol}//${window.location.hostname}:5000/student/cart/save_list`
         fetch(url,{
            method:"GET",
            credentials:'include',
            
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setList(data.dataIs)
            console.log(count[0].session_name);
        })
        .catch(e=>console.log(e))
    }
    useEffect(  ()=>{
        fetchData()
        
    },[])

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
            if(data){
                alert("done")
                fetchData()
            }
            
        })
        .catch(e=>console.log(e))
        
    }
    const addCart=(item)=>{
        const url=`${window.location.protocol}//${window.location.hostname}:5000/student/cart/add_to_cart`;
        
        const values={student_cart_items:item.session_id}
        fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                values
            }),
            credentials:"include"
        })
        .then(res=>res.json())
        .then(data=>{
            if(data)
                {
                    removeItem(item.session_id)
                    console.log("Done",data);
                }
        })
        .catch(e=>console.log(e))
        
    }
    const wishItem=(item)=>{
        const url=`${window.location.protocol}//${window.location.hostname}:5000/student/cart/add_to_wish`
        const values={student_wish_list_items:item.session_id}
        fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                values
            }),
           credentials:"include"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            alert("Jitul",data)
        })
        .catch(e=>console.log(e,"Jitul"))
        removeItem(item.session_id)
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
                            List.length!=0?List.map((item)=>{
                                return(
                                    <>
                                    <div className="body">
                                    <div className="section1">
                                    <div className="img_item">
                                        <img src={course} />
                                    </div>
                                    <div className="details">
                                        <h5>{item[0].session_name}</h5>
                                        <div className="section2"><i class="fas fa-rupee-sign"></i>  {item[0].session_fee}</div>
                                        
                                    </div>
                                </div>
                                <div className="section2">
                                    <div onClick={()=>{addCart(item[0])}}>
                                        Add to Cart
                                    </div>
                                    <div onClick={()=>{wishItem(item[0])}} >
                                        Add to WishList
                                    </div>
                                    <div onClick={()=>{removeItem(item[0].session_id)}}>
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