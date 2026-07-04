import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

import BookAppointment from "./pages/BookAppointment";
import ViewAppointments from "./pages/ViewAppointments";

import Navbar from "./components/Navbar";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/admin" element={<AdminDashboard/>}/>

<Route path="/doctor" element={<DoctorDashboard/>}/>

<Route path="/patient" element={<PatientDashboard/>}/>

<Route path="/book" element={<BookAppointment/>}/>

<Route path="/appointments" element={<ViewAppointments/>}/>

</Routes>

</BrowserRouter>

)

}

export default App;