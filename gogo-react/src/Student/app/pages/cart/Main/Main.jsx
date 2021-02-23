import React,{useState,useEffect} from 'react';
import "./Main.css";
import course from "../img/images.fc914787.jpg"
import logoIs from "../img/logo.76ebe1c4.png";
import {Link} from "react-router-dom";

function ShowPay(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

// const ShowPay=()=>{
//     return new Promise((resolve)=>{
//        const script=document.createElement("script")
//        script.src="https://checkout.razorpay.com/v1/checkout.js";
//        document.body.appendChild(script)
//        script.onload=()=>{
//            resolve(true)
//        }
//        script.onerror=()=>{
//            resolve(false)
//        }
//     })
   
   
// }


const Main=()=>{
    const [count,setCount]=useState([]);
    const [price,setPrice]=useState(0);
    const [btnCode1,setBtnCode1]=useState("");
    const [btnCode2,setBtnCode2]=useState("");
    const [discount,setDiscount]=useState(0);
    const [discount1,setDiscount1]=useState(0);
    const [discount2,setDiscount2]=useState(0);
    const [original,setOriginal]=useState(0);
    const [Code1Apply,setCode1Apply]=useState(false);
    const [Code2Apply,setCode2Apply]=useState(false);
    const [num,setNum]=useState([]);
    const updateCart=(item)=>{
        console.log(item);
        const url="/student/cart/update_cart_item"
        let course=item.courses;
        let id=item.cart_item_id
        fetch(url,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                course,
                id
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data){
                console.log(data);
                setCount(data.cart)
            }else{
                console.log("JItul");
            }
        })
        .catch(e=>console.log(e))
        
    }
    const add=(id)=>{
        num[id]=num[id]+1
        let tot=price;
        // for(let i =0;num.length;i++){
                
                tot=tot+JSON.parse(count[id].session_fee)
                setPrice(tot)
        // }
        
    //     console.log(count[id].courses);
    //     let course=JSON.parse(count[id].courses)
    //     console.log(course);
    //     let added=parseInt(course.no)+1;
    //     let priceIs=price+course.p;
    //     setCount(count.filter((info,index)=>{
    //         let data=JSON.parse(info.courses)
    //         if(data.id==course.id){
    //                 data.no=JSON.stringify(added);
    //                 data.totP=course.p*added;
    //                 info.courses=JSON.stringify(data)
    //                 updateCart(info)
    //              }
    //         return info

    //          }
    //    ));
        //   setPrice(priceIs);
    }
    const sub=(id)=>{
        if(num[id]>1){
            num[id]=num[id]-1
            let tot=price;
            tot=tot-JSON.parse(count[id].session_fee)
            setPrice(tot)
        }

        // let course=JSON.parse(count[id-1].courses)
        // if(course.no>1){
        //     let subed=parseInt(course.no)-1;
        //     let priceIs=price-course.p;
        //     setCount(count.filter((info,index)=>{
        //         let data=JSON.parse(info.courses)
        //         if(data.id==course.id){
        //             data.no=JSON.stringify(subed);
        //             data.totP=course.p*subed;
        //             info.courses=JSON.stringify(data)
        //             updateCart(info)
                    
        //         }
        //         return info;
        //     }));
        //     setPrice(priceIs)
            
        // }
    }
    const code1Apply=()=>{
        if(btnCode1=="1"&&!Code1Apply){
            let priceIs=original*0.25;
            setDiscount1(original*0.25)
            if(discount1!=0){
                setDiscount(discount1+discount2)
            setPrice(original-discount1-discount2)
            document.querySelector(".foot .codes #code1 .wrongCode").style.display="none";
            document.querySelector(".cardContainer .div1 .Main .foot .tot .couponJ").style.display="block";
            document.querySelector(".cardContainer .div1 .Main .foot .discount").style.display="block";
            setCode1Apply(true)       
            }
            
            
        }else if(btnCode1!="1"){
            document.querySelector(".foot .codes #code1 .wrongCode").style.display="block";
            document.querySelector(".cardContainer .div1 .Main .foot .tot .gstJ").style.display="none";
            document.querySelector(".cardContainer .div1 .Main .foot .tot .couponJ").style.display="none";
        }
    }

    const code2Apply=()=>{
        if(btnCode2=="2"&&!Code2Apply){
            let priceIs=original*0.10;
            setDiscount2(original*0.10)
            if(discount2!=0){
                
            setDiscount(discount1+discount2)
            setPrice(original-discount1-discount2)
            document.querySelector(".foot .codes #code2 .wrongCode").style.display="none";
            document.querySelector(".cardContainer .div1 .Main .foot .tot .gstJ").style.display="block";
            document.querySelector(".cardContainer .div1 .Main .foot .discount").style.display="block";
            setCode2Apply(true)
            }
        }else if(btnCode2!="2"){
            document.querySelector(".foot .codes #code2 .wrongCode").style.display="block";
            document.querySelector(".cardContainer .div1 .Main .foot .tot .gstJ").style.display="none";
            document.querySelector(".cardContainer .div1 .Main .foot .tot .couponJ").style.display="none";
        }
        
    }
    const CoupounRemove=()=>{
        document.querySelector(".div2").style.display="none";
        localStorage.setItem("data",JSON.stringify(num))
    }
    useEffect(()=>{
        const url="http://localhost:5000/student/cart/cart_list"
        document.querySelector(".div2").style.display="flex";
        fetch(url,{
            method:"GET",
            credentials:"include"
        }).then(res=>res.json())
        .then(async data=>{
            
            setCount(data.result)
            let tot=0;
            // localStorage.setItem("tot",)
            for(let i =0;i<data.result.length;i++){
                if(num.length<data.result.length){
                    num.push(1);
                }                
                    tot=tot+JSON.parse(data.result[i].session_fee)

            }
            if(original==0){
                console.log("Jitul");
                setOriginal(tot)
            }
            if(price==0){
                setPrice(tot-discount)
            }
            console.log("num",num);
            
            // tot=tot+JSON.parse(data.cart[0].courses).totP;
            // console.log(tot);
            
        })
        localStorage.setItem("Count",JSON.stringify(count)); 
      },[count,Code2Apply,Code1Apply,price]);
      
    // const AddItem=(id,place)=>{
    //     let items=JSON.parse(localStorage.getItem(place));
    //     if(items){
    //         localStorage.removeItem(place)
    //         items.filter((item,index)=>{
    //             if(!item.id==count[id].id){
    //                 items.push(count[id])
    //                 localStorage.setItem(place,JSON.stringify(items))
    //             }
    //         })
    //     }else {
    //         items=[];
    //         items.push(count[id])
    //         localStorage.setItem(place,JSON.stringify(items))
    //     }
        
    // }

    const removeItem=(cart_item_id)=>{
        const url="http://localhost:5000/student/cart/remove_item_cart_list";
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                cart_item_id
            }),
            credentials:"include"
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            alert("done")
        })
        .catch(e=>console.log(e))
    }

const wishItem=(item)=>{
    
        const url="http://localhost:5000/student/cart/add_to_wish"
        
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
            alert("Jitul",data)
        })
        .catch(e=>console.log(e,"Jitul"))
        removeItem(item.cart_item_id)
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
        removeItem(item.cart_item_id)
     }

     
        
       

     const displayPay= async()=>{

        const res=await ShowPay("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert("Razor pay faild")
            return 
        }
        const data = await fetch('/pay_item',
         { method: 'POST' ,
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             price:price
         })

        }).then((t) =>
			t.json()
		)
        console.log(data);
        
        var options = {
            key: "rzp_test_VRw137IijSL6i7", // Enter the Key ID generated from the Dashboard
            amount: data.amount.toString(),
            currency: data.currency,
            name: "Oyester Tranings",
            description: "Test Transaction",
            image: logoIs,
            order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            }
            // "notes": {
            //     "address": "Razorpay Corporate Office"
            // },
            // "theme": {
            //     "color": "#3399cc"
            // }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open()
     }
     
    return(
        <>
            
            <div className="Main">
                        <div className="header">
                            <div>Item Name</div>
                            <div>Item Price</div>
                            <div>Action</div>
                        </div>
                        {
                            count?count.map((item,index)=>{
                                return(
                                    <div className="body">
                                    <div className="section1">
                                        <img src={course} />
                                        <div className="name">
                                            <h5>{item.session_name}</h5>
                                        </div>
                                        <div className="qnt">
                                            <div className="func">
                                                <h5>Quantity</h5>
                                                <button onClick={()=>{sub(index)}}>-</button>
                                                <h5>{num[index]}</h5>
                                                <button onClick={()=>{add(index)}}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="section2"><i class="fas fa-rupee-sign"></i>{item.session_fee}</div>
                                    <div className="section3">
                                        <div onClick={()=>{wishItem(item)}}>
                                            Add to WishList
                                        </div>
                                        <div onClick={()=>{addSave(item)}}>
                                            Save for Later
                                        </div>
                                        <div onClick={()=>{removeItem(item.cart_item_id)}}>
                                            Remove
                                        </div>
                                    </div>
                                </div>
                                )
                            }):<div>Empty</div>
                        }
{/*                         
                        <div className="body">
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
                            <div onClick={()=>{AddItem(count[1].id,"wish")}}>
                                    Add to WishList
                                </div>
                                <div>
                                    Save for Later
                                </div>
                                <div>
                                    Remove
                                </div>
                            </div>
                        </div> */}
                        <div className="foot">
                            <div className="codes">
                                <div id="code1">
                                    <input onChange={(e)=>{setBtnCode1(e.target.value)}} placeholder="Enter coupon code..." />
                                    <button onClick={()=>{code1Apply()}}  className="codeBtn">Apply Coupon Code</button>
                                    <div className="wrongCode">
                                        <p>Invalid coupon code !</p>
                                    </div>
                                </div>
                                {/* <div id="code2">
                                    <input onChange={(e)=>{setBtnCode2(e.target.value)}} placeholder="Enter GSTIN..." />
                                    <button onClick={()=>{code2Apply()}} className="codeBtn">Verify GSTIN</button>
                                    <div className="wrongCode">
                                        <p>Invalid coupon code !</p>
                                    </div>
                                </div> */}
                            </div>
                            <div className="price">
                                    <h5>Total</h5>
                                    <div className="discount">
                                        <p>{original}</p>
                                        <p>-{discount}</p>
                                        <p>___________</p>
                                    </div>
                                    <div className="tot">
                                        <span className="couponJ">25% discount coupon applied</span>
                                        <span className="gstJ">15% discount gst applied</span>
                                         <h4> <div><i class="fas fa-rupee-sign"></i> {price}</div></h4>
                                    </div>
                            </div>
                        </div>
                        <div className="pay">
                            {price>original?<Link target="_blank"  to="/app/pages/cart/next"><button target="_blank" onClick={()=>{CoupounRemove()}} >Next</button ></Link>:<Link><button onClick={()=>{displayPay()}}>Pay Now</button> </Link>}
                        </div>
            </div>
        </>)

}

export default Main;