import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AddPost(props) {
    const { user } = useContext(AuthContext);

    const [title,       setTitle]       = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg,    setErrorMsg]    = useState("");

    const storedToken = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("test555",props.recipeId);
        //setErrorMsg("");  set to initialState on every mount,.... or??? 
        const requestBody = { title, description, user:user._id, recipeId:props.recipeId };
        //title, dexcription und user kommen in das postObj
        //recipeId wird gebraucht um ihn im rezept.posts[] hinzuzufügen

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/posts`, 
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log(requestBody);
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
        <div className="AddPost card">
            add Comment:
            <hr/>
            { errorMsg && <p className="error">{errorMsg}</p> }
            

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br/>
                <button type="submit">Submit new Comment</button>
            </form>
        </div>
    );
}

export default AddPost;
