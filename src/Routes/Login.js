import React, { useState } from 'react'
import "./Login.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase-config"
import {useNavigate} from "react-router-dom"

export let nullUser = true;

const Login = () => {
  
  const [loginEmail, setLoginEmail]  = useState("");
  const [loginPassword, setLoginPassword]  = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  //const [loggedUser, setLoggedUser] = useState();


 /* useEffect(() => {
    console.log(loggedUser);
  }, [loggedUser]);*/

 
  console.log(nullUser);

  const login =  async ()=>{

   
    try {
        const userCredentials = await signInWithEmailAndPassword(auth,loginEmail,loginPassword);
        const user = userCredentials.user;
        nullUser = false; 
        console.log(user)
        //const nullUser = user === null;
        //console.log(nullUser)
        navigate("/home", { nullUser });
      
    }
    catch(error){
        setError(error.message);
        console.log(error.message);
      
    }

 

  } 


 
 
  return (
    <div>
        <p>Login</p>

        <label>Username</label><br/>
        <input onChange={(event)=>{setLoginEmail(event.target.value)}}></input><br/>

        <label>Password</label><br/>
        <input onChange={(event)=>{setLoginPassword(event.target.value)}}></input><br/>

        <button onClick={login}>Login</button>

        {error && <p>{error}</p>}
    </div>
  )
}

export default Login