import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AddRecipe(props) {
    const { user } = useContext(AuthContext);

    const [title,       setTitle]       = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg,    setErrorMsg]    = useState("");

    const storedToken = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();

        //setErrorMsg("");  set to initialState on every mount,.... or??? 
        const requestBody = { title, description, user:user._id };


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//---->need add new recipe also to user

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
            })
            .catch((error) => {
                setErrorMsg("error creating new Recipe");
                console.log(error)
            });
    };


    return (
        <div className="AddRecipe">
            <h3>Add Recipe</h3>
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
                <button type="submit">Submit new Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipe;
