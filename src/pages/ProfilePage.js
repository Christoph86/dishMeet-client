import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from '../context/auth.context';


function ProfilePage(props) {

    //useState, to be able for further Update,Delete from profilePage

    //display "bob's" recipes:
    //here get all recipes, save recipes, 
    //filter by user from useContext

    //display "bob's" comments:
    //reuse filtered list from above
    //filter by 'posts.user' == 'useContext user'



    const { user } = useContext(AuthContext);
    const [myRecipes, setMyRecipes] = useState([]);

    let filteredByUserId = {}

    const getAllRecipes = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/recipes`)
            .then((response) => {
                setMyRecipes(response.data)
            })
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getAllRecipes();
    }, []);


    return (
        <div className="profilePage">

            {myRecipes.map((recipe) => {
                if(recipe.user === user._id)
                return (
                    <div >
                        <p>i am your recipe: {recipe.title}</p>
                    </div>
                );
            })}


            {console.log("User", user)}
            {console.log("myrecipesState", myRecipes)}
            {console.log("dummyFilter", filteredByUserId)}




            {user && (
                <>
                    <div className="card">
                        User Details:
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                </>
            )}




        </div>
    )
}

export default ProfilePage;
