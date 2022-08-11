import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import ShowRecipeDetailsModal from "../components/ShowRecipeDetailsModal";



function ProfilePageModal(props) {

    const { user } = useContext(AuthContext);
    const [allRecipes, setAllRecipes] = useState([]);
    const [openMyRecipes, setOpenMyRecipes] = useState(false);

    const [errorMessage, setErrorMessage] = useState(undefined);

    const [openMyLikes, setOpenMyLikes] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getAllRecipes = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes`)
            .then((response) => {
                setAllRecipes(response.data)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllRecipes();
    }, []);


    return (
        <>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <br />

            <Button variant="primary" onClick={handleShow}>
                Profile
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><strong>Welcome back {user.username}!</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="profilePage">

                        {user && (
                            <div className="card">
                                <p>{user.email}</p>
                                <p>you are a Member in our Community since {user.createdAt}</p>
                            </div>
                        )}

                        <>
                            <br />
                            <Button
                                variant="warning"
                                onClick={() => setOpenMyRecipes(!openMyRecipes)}
                                aria-controls="collapse-RecipeList"
                                aria-expanded={openMyRecipes}
                            >
                                my Recipes ↕️
                            </Button>
                            <br /><br />
                            <Collapse in={openMyRecipes}>
                                <div id="collapse-RecipeList">
                                    <div className="card">
                                        <ul>
                                            {// eslint-disable-next-line
                                                allRecipes.map((recipe) => {
                                                    if (recipe.user._id === user._id)
                                                        return (
                                                            <>
                                                                <li>
                                                                    <strong>{recipe.title}</strong>
                                                                    <ShowRecipeDetailsModal refreshRecipes={getAllRecipes} recipeId={recipe._id} />
                                                                    <br />
                                                                </li>
                                                            </>
                                                        );
                                                })}
                                        </ul>
                                    </div>
                                </div>
                            </Collapse>
                        </>

                        <>
                            <br />
                            <Button
                                variant="warning"
                                onClick={() => setOpenMyLikes(!openMyLikes)}
                                aria-controls="collapse-LikesList"
                                aria-expanded={openMyLikes}
                            >
                                💗 my Likes 💗
                            </Button>
                            <br /><br />
                            <Collapse in={openMyLikes}>
                                <div id="collapse-LikesList">
                                    <div className="card">
                                        <ul>
                                            {// eslint-disable-next-line
                                                allRecipes.map((recipe) => {
                                                    if (user && recipe.likes.includes(user._id))
                                                        return (
                                                            <>
                                                                <li>
                                                                    <strong>{recipe.title} by: {recipe.user.username}</strong>
                                                                    <ShowRecipeDetailsModal refreshRecipes={getAllRecipes} recipeId={recipe._id} />
                                                                    <br />
                                                                </li>
                                                            </>
                                                        );
                                                })}
                                        </ul>
                                    </div>
                                </div>
                            </Collapse>
                        </>
                    </div>
                </Modal.Body>
            </Modal>
        </>



        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    )
}

export default ProfilePageModal;
