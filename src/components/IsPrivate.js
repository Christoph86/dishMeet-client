import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);


  if (isLoading){                    // If the authentication is still loading 
    return <p>Loading ...</p>
  } else if (!isLoggedIn) {          // If the user is not logged in, redirect
    return <Navigate to="/login" />
  } else {                           // If the user is logged in, allow to see the page 
    return children;
  }
}

export default IsPrivate;
