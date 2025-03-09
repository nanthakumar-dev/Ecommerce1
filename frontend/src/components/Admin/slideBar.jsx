import { NavDropdown } from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom"

export default function SlideBar() {
    const navigate=useNavigate()
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <a href="#"><i className="fas fa-tachometer-alt"></i> Dashboard</a>
                    </li>

                    <li>
                        <NavDropdown title={
                        <span>
                            <i className="fab fa-product-hunt rule "></i>
                            <i>Product</i>
                            </span>}>
                            
                            <NavDropdown.Item><Link to={'/admin/product'}><i className="fas fa-clipboard-list item">All</i></Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to={'/admin/product/new'}><i className="fab fa-plus item">Create</i></Link></NavDropdown.Item>
                        </NavDropdown>
                        
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <a href="#"><i className="fas fa-clipboard-list"></i> All</a>
                            </li>

                            <li>
                                <a href="#"><i className="fas fa-plus"></i> Create</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to={'/admin/order'}><i className="fas fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to={'/admin/user'}><i className="fas fa-users"></i> Users</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}