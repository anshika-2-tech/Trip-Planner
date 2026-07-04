import {useState} from "react";
import api from "../services/api";

function Login(){

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const login=async()=>{

try{

await api.post("/patient/login",{

email,

password

});

alert("Login Successful");

}

catch{

alert("Login Failed");

}

}

return(

<div className="container">

<h2>Patient Login</h2>

<input

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>

<input

type="password"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>

<button onClick={login}>

Login

</button>

</div>

)

}

export default Login;