import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from '../context/auth.context';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import ShowRecipeDetailsModal from "../components/ShowRecipeDetailsModal";



function ProfilePage(props) {

    const { user } = useContext(AuthContext);
    const [allRecipes, setAllRecipes] = useState([]);
    const [openMyRecipes, setOpenMyRecipes] = useState(false);

    const [openMyLikes, setOpenMyLikes] = useState(false);


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
        <div className="profilePage">

            {user && (
                <div className="card">
                    <strong>Welcome back {user.username}!</strong>
                    <p>{user.email}</p>
                    <br />
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
                                                        <ShowRecipeDetailsModal recipeId={recipe._id} />
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
                                                        <ShowRecipeDetailsModal recipeId={recipe._id} />
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
    )
}

export default ProfilePage;
