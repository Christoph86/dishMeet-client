import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from '../context/auth.context';


function ProfilePage(props) {

    const { user } = useContext(AuthContext);
    const [allRecipes, setAllRecipes] = useState([]);

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
                        <strong>User Details:</strong>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                </>
            )}


            {/* myRecipes */}
            <div className="card"> <strong>my Recipes:</strong>
                {allRecipes.map((recipe) => {
                    if (recipe.user === user._id)
                        return (
                            <div >
                                <p>i am your recipe: {recipe.title}</p>
                            </div>
                        );
                })}
            </div>

        </div>
    )
}

export default ProfilePage;
