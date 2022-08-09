import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import AddPost from "../components/AddPost";


function RecipeDetailsPage(props) {

    const storedToken = localStorage.getItem("authToken");
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const [recipe, setRecipe] = useState(null);
    const [open, setOpen] = useState(false);
    const [dateOfCreation, setDateOfCreation] = useState(null);
    const [dateOfLastUpdate, setDateOfLastUpdate] = useState(null);
   // let dateOfLastUpdate="BBB";

    useEffect(() => {
        getRecipe();
    }, [recipeId]);



    const getRecipe = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
            .then((response) => {
                const oneRecipe = response.data;
                setRecipe(oneRecipe);
                setDateOfCreation(new Date(oneRecipe.createdAt).toLocaleDateString())
                setDateOfLastUpdate(new Date(oneRecipe.updatedAt).toLocaleDateString())
            })
            //.then(dateOfLastUpdate =new Date(recipe.updatedAt).toLocaleDateString())
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


    return (
        <div className="RecipeDetails card">

<p>by: {recipe &&recipe.user.username},created at: {dateOfCreation}, last activity: {dateOfLastUpdate}</p>

            <hr />
            <h1>{recipe && recipe.title}</h1>
            <hr />

            {recipe && (
                <div className="card">

                    <p>about this Recipe:</p>
                        <pre>{recipe.description}</pre>
                    <img src={recipe.image} alt='NO Picture' />
                    <p>servings: {recipe.servings}</p>
                    <p>Ingedients:</p>
                        <pre>{recipe.ingredients}</pre>
                    <p>Cooking Advices:</p>
                        <pre>{recipe.cookingAdvice}</pre>
                </div>
            )}

            {recipe && user && recipe.user === user._id && ( //you are the Author, show edit, delete
                <>  <br/>
                    <div>
                        <Link to={`/recipes/edit/${recipeId}`}>
                            <Button variant="warning" >Edit</Button>
                        </Link>
                        <Button onClick={deleteRecipe} variant="warning" >Delete the Recipe</Button>
                    </div>

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
                    <Link to="/login/">
                        <Button variant="warning" >login to create a comment</Button>
                        
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

            <br/>

            <Link to="/recipes">
                <Button variant="warning">back to all Recipes</Button>
            </Link>
        </div>
    );
}

export default RecipeDetailsPage;
