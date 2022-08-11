import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import RecipeListPage from "./pages/RecipeListPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">

      <Navbar />
    <RecipeListPage/>
      
    </div>
  );
}

export default App;
