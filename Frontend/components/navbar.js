import {Link} from "react-router-dom";

function Navbar(){

return(

<div className="nav">

<h2>Healthcare Manager</h2>

<div>

<Link to="/">Home</Link>

<Link to="/login">Login</Link>

<Link to="/register">Register</Link>

</div>

</div>

)

}

export default Navbar;