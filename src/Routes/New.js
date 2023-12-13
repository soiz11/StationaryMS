import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { db } from '../firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { serverTimestamp } from "firebase/firestore";
import "./New.css";

const New = () => {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [quantityerror, setQuantityError] = useState("");
  const [minCount, setMinCount] = useState("");
  const [emptyerror, setEmptyError] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [submitButtonActive, setSubmitButtonActive] = useState(false);

  const handleSubmit = async(e) => {
    setSubmitButtonActive(true);
    e.preventDefault();
    if(name !== "" && quantity !== "" && description !== "" && minCount !== "" ){

      const quantityValue = parseInt(quantity); 
      const min = parseInt(minCount)

      if(!isNaN(quantityValue) && !isNaN(min)){
          await addDoc(collection(db,"itemlog"),{
            name,
            quantity: quantityValue,
            description,
            minCount:minCount,
            createdAt: serverTimestamp()
          });
          setSuccessmsg("Data added successfully");
          setName("");
          setQuantity("");
          setDescription("");
          setQuantityError("");
          setMinCount("");

          setTimeout(() => {
            setSuccessmsg("");
          }, 3000);
    

          const inputs = document.querySelectorAll(".newinput");
          inputs.forEach((input) => (input.value = ""));

          
         
          

        }

        else{
          setQuantityError("Quantity and Min Count must be a number");
          
        }
    }

    else{
         setEmptyError("Feilds cannot keep empty");
    }

    
 };

    const handleFocus = () => {
      setEmptyError("");
      setQuantityError("");
      setSubmitButtonActive(false);
    };
    
  return (
    <>
    <Navbar/>

    <div className='new-wrapper'>
    <div className = "newitems">
      Add New Items
      </div>

    <label className="newname">Name</label><br/>
    <input className = "newinput"onChange={(event)=>{setName(event.target.value)}} onFocus={handleFocus}></input><br/>

    <label className='newquantity'>Quantity</label><br/>
    <input className = "newinput" onChange={(event)=>{setQuantity(event.target.value)}} onFocus={handleFocus}></input><br/>

    
    <label className='mincount'>Set Minimum Count</label><br/>
    <input className= "newinput"onChange={(event)=>{setMinCount(event.target.value)}} onFocus={handleFocus}></input><br/>

    <label className='newdiscription'>Description</label><br/>
    <input className= "newinput"onChange={(event)=>{setDescription(event.target.value)}} onFocus={handleFocus}></input><br/>
    
    <button className ={submitButtonActive?"activebtn":"newbtn"} onClick={handleSubmit}>submit</button><br/>

    <div className={`error-area ${quantityerror||emptyerror||successmsg ? 'show':''}`}>
      {quantityerror && <h2>{quantityerror}</h2>}
      {emptyerror && <h2>{emptyerror}</h2>}
      {successmsg && <h2>{successmsg}</h2>}
    </div>

    </div>

    
    <Footer/>
    </>
  )
}

export default New