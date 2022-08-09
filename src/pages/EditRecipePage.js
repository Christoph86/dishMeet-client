import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function EditRecipePage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage] = useState("");
    const [servings, setServings] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [cookingAdvice, setCookingAdvice] = useState("");

    const { recipeId } = useParams();
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
                navigate(`/recipes/${recipeId}`)
            });
    };


    return (
        <div className="EditProjectPage">
            <h3>Edit the Recipe</h3>

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
                        //value={`<pre>${description}</pre>`}
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

                <div>
                    <Button variant="warning" type="submit">Update Recipe</Button>
                    <Link to={`/recipes/${recipeId}`}>
                        <Button variant="warning" >Cancel without Changes on the Recipe</Button>
                    </Link>
                </div>

            </Form>


        </div>
    );
}

export default EditRecipePage;
