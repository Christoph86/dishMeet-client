import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import EditRecipePage from "./pages/EditRecipePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
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
        
        <Route path="/recipes/:recipeId" element={ <RecipeDetailsPage /> } />

        <Route path="/recipes/edit/:recipeId" element={
          <IsPrivate>
            <EditRecipePage />
          </IsPrivate>
        } />

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

      </Routes>
      
    </div>
  );
}

export default App;
