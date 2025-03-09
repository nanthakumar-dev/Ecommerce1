
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";
import Loader from "../components/Loader"

export default function ProtectedRoute({isAdmin}){
    const {isAuthenticated,loading}=useSelector(state=>state.authState)
    const {user}=useSelector(state=>state.authState)
 
    if(!isAuthenticated && !loading){
        return <Navigate to={'/login'}/>
    }
    if(loading){
        return <Loader/>
    }
    if(isAuthenticated){
       
        
        if(isAdmin && user.role!=='admin'){
            return <Navigate to={'/'}/>
        }
       return <Outlet/>
    }
    
}
