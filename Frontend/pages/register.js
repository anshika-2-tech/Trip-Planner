import {useState} from "react";

import api from "../services/api";

function Register(){

const form={

name:"",

email:"",

password:""

}

const[data,setData]=useState(form);

const handle=(e)=>{

setData({

...data,

[e.target.name]:e.target.value

})

}

const submit=async()=>{

await api.post("/patient/register",data);

alert("Registered");

}

return(

<div className="container">

<h2>Patient Register</h2>

<input

name="name"

placeholder="Name"

onChange={handle}

/>

<input

name="email"

placeholder="Email"

onChange={handle}

/>

<input

name="password"

type="password"

placeholder="Password"

onChange={handle}

/>

<button onClick={submit}>

Register

</button>

</div>

)

}

export default Register;