import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import AddPost from "../components/AddPost";


function RecipeDetailsPage(props) {
    const { user, isLoggedIn } = useContext(AuthContext);
    const storedToken = localStorage.getItem("authToken");
    const [recipe, setRecipe] = useState(null);
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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

            <hr />Recipe:<hr />

            {recipe && (
                <div className="card">
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                </div>
            )}

            {recipe && user && recipe.user === user._id && ( //you are the Author, show edit, delete
                <>
                    <Link to={`/recipes/edit/${recipeId}`}>
                        <Button variant="warning" >Edit</Button>
                    </Link>
                    <Button onClick={deleteRecipe} variant="warning" >Delete the Recipe</Button>
                </>)}

            <br /><br /><br />

            <div className="card">
                <hr />Comments:<hr />
                {recipe &&
                    recipe.posts.map((post) => (
                        <li className="PostCard card" key={post._id}>
                            <h5>{post.title}</h5>
                            <p>{post.description}</p>
                        </li>
                    ))}
            </div>

            {!user && (
                <>
                    <Link to={`/login/`}>
                        login to create a comment
                    </Link>
                </>
            )}
            {user && (
                <div className='card'>
                    <Button
                        variant="warning"
                        onClick={() => setOpen(!open)}
                        aria-controls="collapse-addRecipe-Form"
                        aria-expanded={open}
                    >
                        Add new Comment
                    </Button>
                    <Collapse in={open}>
                        <div id="collapse-addRecipe-Form">
                            <AddPost recipeId={recipeId} refreshRecipeDetails={getRecipe} />
                        </div>
                    </Collapse>
                </div>
            )}

            <Link to="/recipes">
                <Button variant="warning" type="submit">back to all Recipes</Button>
            </Link>
        </div>
    );
}

export default RecipeDetailsPage;
