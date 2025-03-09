import { useDispatch, useSelector } from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import Search from "../Search"
import {Dropdown,DropdownButton,Image} from 'react-bootstrap'
import { logoutUser } from "../../Actions/authActions"
export default function Header(){
    const {loading,user,isAuthenticated}=useSelector(state=>state.authState)
    const {items} =useSelector(state=>state.cartState)
    const navigate=useNavigate()
    
    const dispatch=useDispatch()
    function logout(){
        dispatch(logoutUser)
    }
    return(
        <nav className="navbar row">
            <div className="col-12 col-md-3">
            <Link to='/'>
            <div className="navbar-brand">
                <img width="150px" src="/images/logo.png" />
            </div>
            </Link>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search/>
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {
                    isAuthenticated?(
                        <Dropdown>
                            <Dropdown.Toggle variant='default text-dark ' id='basic' >
                                <figure className="avatar avatar-nav bg-danger d-flex" >
                                    <Image style={{"borderRadius":"50%"}}  src={user.avatar??'/images/default_avatar.png'}/>
                                    
                                    
                                    <p className="text-white pr-3">{user.name}</p>
                                    
                                </figure>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    user.role=='admin'&&
                                <Dropdown.Item className='text-dark' onClick={()=>{navigate('/admin/dashboard')}}>Dashboard</Dropdown.Item>
                                }
                                <Dropdown.Item className='text-dark' onClick={()=>{navigate('/myprofile')}}>Profile</Dropdown.Item>
                                <Dropdown.Item className='text-dark' onClick={()=>{navigate('/myorder')}}>Order</Dropdown.Item>
                                <Dropdown.Item className='text-danger'onClick={logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ):
                        <Link to={'/login'} className="btn" id="login_btn">Login</Link>
                }
                <Link to={'/cart'}>
                    <span id="cart" className="ml-3">Cart</span>
                </Link>
            <span className="ml-1" id="cart_count">{items.length}</span>
            </div>
        </nav>
    )
}