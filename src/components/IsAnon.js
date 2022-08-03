import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {

  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {                // If the authentication is still loading 
      return <p>Loading ...</p>
  } else if (isLoggedIn) {
      return <Navigate to="/" />  // If the user is logged in, navigate to home page    
  } else {
      return children;            // If the user is not logged in, allow to see the page 
  }
}

export default IsAnon;
