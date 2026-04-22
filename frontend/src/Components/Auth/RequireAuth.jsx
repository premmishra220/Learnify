import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({allowedRoles}){
 const {isLoggedIn,role} = useSelector((state) => state.auth);      // getting data from auth slice of current user
 return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
    <Outlet />
 ) : isLoggedIn ?  (<Navigate to = "/denied"/>) : (<Navigate to = "Login"/>)
}


export default RequireAuth;