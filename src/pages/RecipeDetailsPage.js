import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function RecipeDetailsPage(props) {
    const storedToken = localStorage.getItem("authToken");
    const [recipe, setRecipe] = useState(null);
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const getRecipe = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
            .then((response) => {
                const oneRecipe = response.data;
                setRecipe(oneRecipe);
            })
            .catch((error) => console.log(error));
    };

    const deleteRecipe = () => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                navigate('/recipes');
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getRecipe();
    }, []);


    return (
        <div className="RecipeDetails">
            {recipe && (
                <>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                </>
            )}

            {recipe &&
                recipe.posts.map((post) => (
                    <li className="PostCard card" key={post._id}>
                        <h3>{post.title}</h3>
                        <h4>Description:</h4>
                        <p>{post.description}</p>
                    </li>
                ))}

            <Link to={`/recipes/edit/${recipeId}`}>
                <button>Edit</button>
            </Link>

            <button onClick={deleteRecipe} >Delete Me!</button>

            

            <Link to="/recipes">
                <button>Back to all Recipes</button>
            </Link>
        </div>
    );
}

export default RecipeDetailsPage;
