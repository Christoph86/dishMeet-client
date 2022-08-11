import Card from 'react-bootstrap/Card';

import { useState, useEffect } from "react";
import axios from "axios";
import AddRecipeModal from "../components/AddRecipeModal";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import ShowRecipeDetailsModal from '../components/ShowRecipeDetailsModal';
import LoginModal from '../components/LoginModal';
import { Button } from 'react-bootstrap';

function RecipeListPage() {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);

    const [likedByUser, setLikedByUser] = useState([]);

    const storedToken = localStorage.getItem("authToken");

    const checkIfLiked = (recipe) =>{
        return (user && recipe.likes.includes(user._id))
    }


    const toggleLiked = (likedBoolean, recipeId, recipeLikes) =>{
        if(!likedBoolean){ //add you to likes[] of targeted Recipe
            recipeLikes.push(user._id)
            const requestBody = {
                likes : recipeLikes
            };
            axios
            .put(
                `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/likes`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                getAllRecipes()
            });
            console.log("add my heart");
        } else { //remove you from likes[] of targeted Recipe
            recipeLikes = recipeLikes.filter((e)=>{return e != user._id})
            const requestBody = {
                likes : recipeLikes
            };
            axios
            .put(
                `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/likes`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                getAllRecipes()
            });
            console.log("remove my Heart");
        }
    }

    const getAllRecipes = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes`)
            .then((response) => {
                setRecipes(response.data)
            })
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getAllRecipes();
    }, []);


    return (
        <>
            {!isLoggedIn && (<p><strong>login to add your own recipes</strong> </p>)}
            {isLoggedIn && (
                <div className=''>
                            <AddRecipeModal refreshRecipes={getAllRecipes} />
                </div>
            )}
        <div className="recipeListPage">

            {recipes.map((recipe) => {
                let dateOfLastUpdate =new Date(recipe.updatedAt).toLocaleDateString();
                return (
                    <Card className='bg-warning singleRecipeCard' style={{ width: '18rem' }}> 
                        <p>by: {recipe.user.username}, 
                           last activity: {dateOfLastUpdate} 
                           
                           {/* <h1>big bookmark test</h1> */}
                           {checkIfLiked(recipe)&&  <span onClick={() => {toggleLiked(true,  recipe._id, recipe.likes)}}>💗</span>} 
                           {!checkIfLiked(recipe)&& <span onClick={() => {toggleLiked(false, recipe._id, recipe.likes)}}>🤍</span>} 
                        </p>
                        <Card.Img variant="top" src={recipe.image} />
                        <Card.Body>
                            <Card.Title>{recipe.title}</Card.Title>
                            <Card.Text>
                                {recipe.description}
                            </Card.Text>
                            <ShowRecipeDetailsModal recipeId={recipe._id} refreshRecipes={getAllRecipes} />
                        </Card.Body>
                    </Card>
                );
            })}

        </div>
        </>
    );
}

export default RecipeListPage;