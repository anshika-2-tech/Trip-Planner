import {Link} from "react-router-dom";

function PatientDashboard(){

return(

<div className="container">

<h2>Patient Dashboard</h2>

<Link to="/book">

<button>

Book Appointment

</button>

</Link>

<Link to="/appointments">

<button>

View Appointments

</button>

</Link>

</div>

)

}

export default PatientDashboard;