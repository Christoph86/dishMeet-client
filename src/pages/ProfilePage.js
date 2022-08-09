import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from '../context/auth.context';

import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

//import { useState, useEffect } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
//import AddRecipe from "../components/AddRecipe";
//import { useContext } from "react";
//import { AuthContext } from "../context/auth.context"


function ProfilePage(props) {

    const { user } = useContext(AuthContext);
    const [allRecipes, setAllRecipes] = useState([]);
    const [open, setOpen] = useState(false);

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
                <>
                    <div className="card">
                        <strong>Welcome back {user.username}!</strong>
                        <p>{user.email}</p>
                        <br/>
                        {/* {console.log("user from payload: ",user)}
                        {console.log("createdAt from payload: ",user.createdAt)} */}
                        <p>you are a Member in our Community since {user.createdAt}</p>
                        <p>{user.email}</p>
                    </div>
                </>
            )}


            <div className='card'>
                <Button
                    variant="warning"
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-addRecipe-Form"
                    aria-expanded={open}
                >
                    my Recipes
                </Button>
                <br /><br />
                <Collapse in={open}>
                    <div id="collapse-addRecipe-Form">
                        <div className="card">
                            <ul>
                                {allRecipes.map((recipe) => {
                                    if (recipe.user._id === user._id)
                                        return (
                                            <>
                                            <li>
                                                <Link to={`/recipes/${recipe._id}`}>
                                                    <Button variant="warning">
                                                        {recipe.title}
                                                    </Button>
                                                </Link>
                                            </li>
                                            <br/>
                                            </>
                                        );
                                })}
                            </ul>
                        </div>
                    </div>
                </Collapse>
            </div>


            {/* myRecipes */}


        </div>
    )
}

export default ProfilePage;
