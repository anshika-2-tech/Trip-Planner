import {useEffect,useState} from "react";

import api from "../services/api";

function ViewAppointments(){

const[data,setData]=useState([]);

useEffect(()=>{

load();

},[]);

const load=async()=>{

const res=await api.get("/appointment");

setData(res.data);

}

return(

<div className="container">

<h2>Appointments</h2>

<table>

<thead>

<tr>

<th>Doctor</th>

<th>Patient</th>

<th>Date</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

data.map((a)=>(

<tr key={a._id}>

<td>{a.doctor?.name}</td>

<td>{a.patient?.name}</td>

<td>{new Date(a.appointmentDate).toLocaleString()}</td>

<td>{a.status}</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}

export default ViewAppointments;