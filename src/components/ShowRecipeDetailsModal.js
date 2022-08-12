import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import AddPost from "../components/AddPost";
import EditRecipeModal from '../components/EditRecipeModal';
import Modal from 'react-bootstrap/Modal';


function ShowRecipeDetailsModal(props) {

    const storedToken = localStorage.getItem("authToken");

    const recipeId = props.recipeId;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [recipe, setRecipe] = useState(null);
    const [open, setOpen] = useState(false);
    const [dateOfCreation, setDateOfCreation] = useState(null);
    const [dateOfLastUpdate, setDateOfLastUpdate] = useState(null);


    useEffect(() => {
        getRecipe();
        // eslint-disable-next-line
    }, [recipeId]);

    const checkIfLiked = (recipe) => {
        return (user && recipe && recipe.likes.includes(user._id))
    }

    const toggleLiked = (likedBoolean, recipeId, recipeLikes) => {
        if (!likedBoolean) { //add you to likes[] of targeted Recipe
            recipeLikes.push(user._id)
            const requestBody = {
                likes: recipeLikes
            };
            axios
                .put(
                    `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/likes`,
                    requestBody,
                    { headers: { Authorization: `Bearer ${storedToken}` } }
                )
                .then((response) => {
                    getRecipe()
                });
            console.log("add my heart");
        } else { //remove you from likes[] of targeted Recipe
            recipeLikes = recipeLikes.filter((e) => { return e != user._id })
            const requestBody = {
                likes: recipeLikes
            };
            axios
                .put(
                    `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/likes`,
                    requestBody,
                    { headers: { Authorization: `Bearer ${storedToken}` } }
                )
                .then((response) => {
                    getRecipe()
                });
            console.log("remove my Heart");
        }
    }

    const getRecipe = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
            .then((response) => {
                props.refreshRecipes();
                const oneRecipe = response.data;
                setRecipe(oneRecipe);
                setDateOfCreation(new Date(oneRecipe.createdAt).toLocaleDateString())
                setDateOfLastUpdate(new Date(oneRecipe.updatedAt).toLocaleDateString())
            })
            .catch((error) => console.log(error));
    };

    const deleteRecipe = () => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                props.refreshRecipes();
                handleClose();
                navigate('/recipes');
            })
            .catch((error) => console.log(error));
    };


    return (
        <>
            <br />

            <Button variant="primary" onClick={handleShow}>
                <strong>Show Details</strong>
                {/* {recipe && recipe.title} */}
            </Button>

            <Modal
                size="xl"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{recipe && recipe.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="RecipeDetails card">

                        <p><strong>by: {recipe && recipe.user.username},created at: {dateOfCreation}, last activity: {dateOfLastUpdate} </strong>
                            {checkIfLiked(recipe) && <span onClick={() => { toggleLiked(true, recipe._id, recipe.likes) }}>💗</span>}
                            {!checkIfLiked(recipe) && <span onClick={() => { toggleLiked(false, recipe._id, recipe.likes) }}>🤍</span>}

                        </p>

                        {recipe && (
                            <div className="card">

                                <p><strong>about this Recipe:</strong></p>
                                <pre>{recipe.description}</pre>
                                {recipe.image && <img className="imgOnDetails" src={recipe.image} alt={recipe.title} />}
                                <p><strong>servings: </strong>{recipe.servings}</p>
                                <p><strong>Ingedients:</strong></p>
                                <pre>{recipe.ingredients}</pre>
                                <p><strong>Cooking Advices:</strong></p>
                                <pre>{recipe.cookingAdvice}</pre>
                            </div>
                        )}

                        {recipe && user && recipe.user._id === user._id && ( //you are the Author, show edit, delete
                            <>
                                <div>
                                    <EditRecipeModal recipeId={recipeId} refreshDetails={getRecipe} />
                                    <Button onClick={deleteRecipe} variant="danger" >Delete the Recipe</Button>
                                </div>
                                <br />
                            </>)}

                        <div className="card">
                            <hr />Comments:<hr />
                            {recipe &&
                                recipe.posts.map((post) => (
                                    <>
                                        <li className="PostCard card" key={post._id}>
                                            by: {post.user}, created on: {post.createdAt}
                                            <h5>{post.title}</h5>
                                            <p>{post.description}</p>
                                        </li>
                                        <br />
                                    </>
                                ))}
                        </div>

                        {!user && (
                            <>
                                <Link to="/login/">
                                    <Button variant="secondary" >login to create a comment</Button>
                                </Link>
                            </>
                        )}
                        {user && (
                            <><br />
                                <div className='card'>
                                    <br />
                                    <Button
                                        variant="warning"
                                        onClick={() => setOpen(!open)}
                                        aria-controls="collapse-addRecipe-Form"
                                        aria-expanded={open}
                                    >
                                        Add new Comment ↕️
                                    </Button>
                                    <br />
                                    <Collapse in={open}>
                                        <div id="collapse-addRecipe-Form">
                                            <AddPost recipeId={recipeId} refreshRecipeDetails={getRecipe} />
                                        </div>
                                    </Collapse>
                                </div>
                            </>
                        )}

                        <br />
                        <div>
                            <Link to="/recipes">
                                <Button variant="secondary" onClick={handleClose}>back to all Recipes</Button>
                            </Link>

                        </div>
                        <br />
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
}

export default ShowRecipeDetailsModal;
