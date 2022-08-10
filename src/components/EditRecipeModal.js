import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function EditRecipeModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [servings, setServings] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [cookingAdvice, setCookingAdvice] = useState("");

    const recipeId  = props.recipeId;
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
            .then((response) => {
                const oneRecipe = response.data;
                setTitle(oneRecipe.title);
                setDescription(oneRecipe.description);
                setImage(oneRecipe.image);
                setServings(oneRecipe.servings);
                setIngredients(oneRecipe.ingredients);
                setCookingAdvice(oneRecipe.cookingAdvice);
            })
            .catch((error) => console.log(error));

    }, [recipeId]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            title,
            description,
            image,
            servings,
            ingredients,
            cookingAdvice,
        };
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/recipes/${recipeId}`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                props.refreshDetails()
                //navigate(`/recipes/${recipeId}`)
                
            });
    };


    return (
        <>
            <br />
            <Button variant="danger" onClick={handleShow}>
                Edit this Recipe
            </Button>

            <Modal
                size="xl"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit your Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="editRecipeModal">

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea" rows={5}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Image:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={image}
                                    required
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Servings:</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={servings}
                                    required
                                    onChange={(e) => setServings(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Ingredients:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={ingredients}
                                    required
                                    onChange={(e) => setIngredients(e.target.value)}
                                    as="textarea" rows={5}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cooking Advices:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={cookingAdvice}
                                    required
                                    onChange={(e) => setCookingAdvice(e.target.value)}
                                    as="textarea" rows={5}
                                />
                            </Form.Group>

                            <Button variant="warning" type="submit" onClick={handleClose}>Update Recipe</Button>
                            <Button variant="warning" type="button" onClick={handleClose}>Cancel</Button>

                        </Form>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditRecipeModal;
