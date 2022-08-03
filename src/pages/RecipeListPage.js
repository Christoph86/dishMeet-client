import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddRecipe from "../components/AddRecipe";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"


function RecipeListPage() {
    const { isLoggedIn } = useContext(AuthContext); 
    const [recipes, setRecipes] = useState([]);

    const getAllRecipes = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes`)
            .then((response) => setRecipes(response.data))
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getAllRecipes();
    }, []);


    return (
        <div className="RecipeListPage">

            <hr/>
            {isLoggedIn  && (<AddRecipe refreshRecipes={getAllRecipes}/>)}
            {!isLoggedIn && (<p>login to add your own recipes</p>)}
            <hr/>

            {recipes.map((recipe) => {
                return (
                    <div className="RecipeCard card" key={recipe._id} >
                        <Link to={`/recipes/${recipe._id}`}>
                            <h3>{recipe.title}</h3>
                        </Link>
                    </div>
                );
            })}

        </div>
    );
}

export default RecipeListPage;
