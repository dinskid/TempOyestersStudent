import React,{useState,useEffect} from 'react';
import "./Distribution.css"
const Main=(props)=>{

    const [totInput,setTotInput]=useState([[]]);
    const [Inputs,setInputs]=useState([]);
    let [Data,setData]=useState([])
    useEffect(()=>{

        
        // setData(JSON.parse(localStorage.getItem("Count")));
        // if(Inputs.length==0){
        //     setInputs(data.filter((info,index)=>{
        //         return info.no=1;
        //     }));
        // }
        fetch(`${window.location.protocol}//${window.location.hostname}:5000/student/cart/cart_list`,{
            method:"GET",
            credentials:"include"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.result);
            setInputs(data.result);
        })
        .catch(err=>{
            console.log(err);
        })

    },[Data,Inputs,totInput])

    const addInput=(id)=>{
        let data =JSON.parse(localStorage.getItem("data"))
        console.log(data);
        let msg=document.querySelectorAll(`.msg`);
        
        

            if(!totInput[id]){
                for (let i=0;i<=id;i++){
                    totInput.push([])
                }
                
                totInput[id].push({inputId:Math.random()})
                console.log(totInput);

            }else{
                if(totInput[id].length<data[id]){

                totInput[id].push({inputId:Math.random()})
                console.log(totInput);

                }
            }
              
        // }else{
        //     console.log(totInput);
        //     msg[id].style.display="block";
        
        // }
        console.log(Inputs);
        console.log(Data);
        
    }
    const removeRow=(index1,index2)=>{
        var indexRemove=0;
        for(let i=0;i<totInput[index1].length;i++){
            if(totInput[index1][i].inputId==index2){
                 indexRemove = i;        
            }
        }
        // console.log(index2);
        console.log(indexRemove);
        // console.log(totInput[index1][indexRemove].inputId);
        let msg=document.querySelectorAll(`.msg`);
        
            if(totInput[index1].length>1){

                console.log(totInput[index1]);
                totInput[index1]=totInput[index1].filter((input)=>{
                    return input.inputId !=index2
                })
                console.log(totInput[index1]);
                // if (indexRemove !== -1) {
                //     console.log(indexRemove);
                //     totInput[index1].splice(indexRemove, 1);
                //     setInputs(totInput)
                //     console.log(totInput[index1][indexRemove]);
                // }
             

                msg[index1].style.display="none";
                // // totInput[index1].filter((data,i)=>{
                    
                //     if(data.inputId==index2){
                //         console.log(data);
                //         return data;
                //     }
                // },this)
                console.log(totInput,"totInput");
                // setInputs(Inputs.filter((value,indexIs)=>{
            
                //     return  index!=value.key
                    
                //   },this))
                //   setTotInput(totInput-1) 
            }
            // let msg=document.querySelector(".msg");
            // msg.style.display="none"; 
    }
  
    return(
        <>
            
            <div className="Main">
                        {
                           Inputs.length!=0?Inputs.map((input,index)=>{
                              return(<>
                                    <div className="D_header">
                                            <h2>Cource Name:{input.session_name}</h2>
                                        </div>
                                    
                                    {/* <div>
                                        {Inputs[0].no}
                                    </div> */}
                                    <div className="body_next" >
                                        {totInput[index]!=undefined?totInput[index].map((In)=>{
                                            return(
                                                <div className="add_user_field">
                                                    <input  type="email" placeholder="Enter user email ..." />
                                                    <i onClick={(e)=>removeRow(index,In.inputId)} key={index} class="fas fa-times"></i>
                                                </div>
                                            )
                                        }):<div className="add_here"> Add user to add user !</div>}
                                        
                                        <div  className={`msg ${input.name}`}><p>Max limit reached !</p></div>
                                    </div>
                                    <div className="add_user">
                                        <button onClick={()=>{addInput(index)}} >Add User</button>
                                    </div>
                              </>)
                            }):<div>Loading please wait</div>
                        }   
                            {/* {Inputs.map(input=>{
                                return(<>
                                    <div className="add_user_field">
                                        <input onChange={(e)=>{setInputs(Inputs.filter((s,index)=>{
                                            if(s.id==input.id){
                                                s.InValue=e.target.value
                                            }
                                            return s
                                        }))}} value={input.InValue} type="email" placeholder="Enter user email ..." />
                                        <i onClick={(e)=>removeRow(input.id)} key={input.id} class="fas fa-times"></i>
                                    </div>
                                </>)
                            })} */}
                            
                            
                        {/* <div className="D_header">
                            <h2>Cource Name: Heroic Coaching 2</h2>
                        </div>
                        <div className="body_next" >
                            {Inputs.map(input=>{
                                return(<>
                                    <div className="add_user_field">
                                        <input onChange={(e)=>{setInputs(Inputs.filter((s,index)=>{
                                            if(s.key==input.key){
                                                s.InValue=e.target.value
                                            }
                                            return s
                                        }))}} value={input.InValue} type="email" placeholder="Enter user email ..." />
                                        <i onClick={(e)=>removeRow(input.key)} key={input.key} class="fas fa-times"></i>
                                    </div>
                                </>)
                            })}
                            
                            <div className="msg"><p>Max limit reached !</p></div>
                        </div>
                        <div className="add_user">
                            <button onClick={()=>{addInput(data[1].id)}} >Add User</button>
                        </div> */}
            </div>
        </>)

}

export default Main;