import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddRecipe from "../components/AddRecipe";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"

function RecipeListPage() {
    const { isLoggedIn } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [open, setOpen] = useState(false);

    const getAllRecipes = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes`)
            .then((response) => setRecipes(response.data))
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getAllRecipes();
    }, []);


    return (
        <div className="recipeListPage">
            <hr />
            {!isLoggedIn && (<p>login to add your own recipes</p>)}
            {isLoggedIn && (
                <div className='card'>
                    <Button
                        variant="warning"
                        onClick={() => setOpen(!open)}
                        aria-controls="collapse-addRecipe-Form"
                        aria-expanded={open}
                    >
                        Add new Recipe
                    </Button>
                    <Collapse in={open}>
                        <div id="collapse-addRecipe-Form">
                            <AddRecipe refreshRecipes={getAllRecipes} />
                        </div>
                    </Collapse>
                </div>
            )}

            <hr />

            {recipes.map((recipe) => {


                return (
                    <Card className='bg-light' style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={recipe.image} />
                        <Card.Body>
                            <Card.Title>{recipe.title}</Card.Title>
                            <Card.Text>
                                {recipe.description}
                            </Card.Text>
                            <Link to={`/recipes/${recipe._id}`}>
                                <Button variant="warning">
                                    Show Recipe
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                );
            })}

        </div>
    );
}

export default RecipeListPage;