import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function EditRecipePage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const { recipeId } = useParams(); //  // Get the URL parameter `:projectId` 
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    // This effect will run after the initial render and each time
    // the project id coming from URL parameter `projectId` changes
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
            .then((response) => {
                /* 
                  We update the state with the project data coming from the response.
                  This way we set inputs to show the actual title and description of the project
                */
                const oneRecipe = response.data;
                setTitle(oneRecipe.title);
                setDescription(oneRecipe.description);
            })
            .catch((error) => console.log(error));

    }, [recipeId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { title, description };

        // Make a PUT request to update the project
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/recipes/${recipeId}`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                navigate(`/recipes/${recipeId}`)
            });
        //catch error here if not author
    };


    return (
        <div className="EditProjectPage">
            <h3>Edit the Recipe</h3>

            {/* <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button variant="warning" type="submit">Update Recipe</Button>
            </form> */}

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
