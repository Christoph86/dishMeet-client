import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function EditRecipePage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


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
            })
            .catch((error) => console.log(error));

    }, [recipeId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description };
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

            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea" rows={5}
                    />
                </Form.Group>
                <Button variant="warning" type="submit">Update Recipe</Button>
            </Form>

            <Link to={`/recipes/${recipeId}`}>
                <Button variant="warning" >Cancel without Changes on the Recipe</Button>
            </Link>
        </div>
    );
}

export default EditRecipePage;
