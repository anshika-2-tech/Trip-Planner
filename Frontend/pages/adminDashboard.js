import {useEffect,useState} from "react";
import api from "../services/api";

function AdminDashboard(){

const[doctors,setDoctors]=useState([]);

useEffect(()=>{

loadDoctors();

},[]);

const loadDoctors=async()=>{

const res=await api.get("/admin/doctors");

setDoctors(res.data);

}

return(

<div className="container">

<h2>Admin Dashboard</h2>

<h3>Doctors List</h3>

<table>

<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Specialization</th>

</tr>

</thead>

<tbody>

{

doctors.map((d)=>(

<tr key={d._id}>

<td>{d.name}</td>

<td>{d.email}</td>

<td>{d.specialization}</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}

export default AdminDashboard;