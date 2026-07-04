import {useState} from "react";

import api from "../services/api";

function BookAppointment(){

const[data,setData]=useState({

doctor:"",

patient:"",

appointmentDate:"",

symptoms:"",

email:""

});

const handle=(e)=>{

setData({

...data,

[e.target.name]:e.target.value

});

}

const submit=async()=>{

try{

await api.post("/appointment/book",data);

alert("Appointment Booked");

}catch{

alert("Booking Failed");

}

}

return(

<div className="container">

<h2>Book Appointment</h2>

<input

name="doctor"

placeholder="Doctor Id"

onChange={handle}

/>

<input

name="patient"

placeholder="Patient Id"

onChange={handle}

/>

<input

type="datetime-local"

name="appointmentDate"

onChange={handle}

/>

<textarea

name="symptoms"

placeholder="Symptoms"

onChange={handle}

/>

<input

name="email"

placeholder="Email"

onChange={handle}

/>

<button onClick={submit}>

Book

</button>

</div>

)

}

export default BookAppointment;