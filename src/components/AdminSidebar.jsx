import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminSidebar(){

return(

<div style={{
width:"200px",
height:"100vh",
background:"#222",
color:"#fff",
padding:"20px",
position:"fixed"
}}>

<h4>Admin</h4>

<Nav className="flex-column">

<Nav.Link as={Link} to="/admin/dashboard" style={{color:"#fff"}}>
Dashboard
</Nav.Link>

<Nav.Link as={Link} to="/admin/vendors" style={{color:"#fff"}}>
Vendor List
</Nav.Link>

</Nav>

</div>

);

}

export default AdminSidebar;