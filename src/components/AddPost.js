
import { AuthContext } from "../context/auth.context";

import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { useState,  useContext } from "react";
import axios from "axios";


function AddPost(props) {
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const storedToken = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, user:user.username, recipeId: props.recipeId };
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/posts`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                props.refreshRecipeDetails(); //update RecipeDetails
                setTitle("");//clear form
                setDescription("");//clear form
            })
            .catch((error) => {
                setErrorMsg("error creating new Post");
                console.log(error)
            });
    };


    return (
        <div className="AddPost">
            {errorMsg && <p className="error">{errorMsg}</p>}

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
                    <Form.Label>your Comment:</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea" rows={5}
                    />
                </Form.Group>
                <Button variant="warning" type="submit">Submit new Comment</Button>
            </Form>
            <br/>
        </div >
    );
}

export default AddPost;
