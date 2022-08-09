import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />

        <Route path="/profile" element={ <ProfilePage/>}/>
        
        <Route path="/recipes" element={ <RecipeListPage /> } />

        <Route path="/signup" element={ 
          <IsAnon>
            <SignupPage />
          </IsAnon>
        } />

        <Route path="/login" element={ 
          <IsAnon>
            <LoginPage />
          </IsAnon>
        } />

        {/* add wildcard route for forbidden requests */}

      </Routes>
      
    </div>
  );
}

export default App;
