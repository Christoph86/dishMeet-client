import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddRecipe(props) {
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [servings, setServings] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [cookingAdvice, setCookingAdvice] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const storedToken = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { 
            title,
            description, 
            image,
            servings,
            ingredients,
            cookingAdvice,
            user: user._id };
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/recipes`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                props.refreshRecipes(); //update RecipesList
                setTitle("");//clear form
                setDescription("");//clear form
                setImage("");
                setServings("");
                setIngredients("");
                setCookingAdvice("");
            })
            .catch((error) => {
                setErrorMsg("error creating new Recipe");
                console.log(error)
            });
    };


    return (
<div className="AddRecipePage">

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
                

                <Button variant="warning" type="submit">Add Recipe</Button>
            </Form>

        </div>
    );
}

export default AddRecipe;
