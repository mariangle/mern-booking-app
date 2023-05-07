import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import ListingsPage from "./ListingsPage"
import AccountNav from "../AccountNav";


export default function ProfilePage(){
    let {subpage} = useParams();
    const navigate = useNavigate();
    const { ready, user, setUser } = useContext(UserContext);
    if (subpage === undefined){
        subpage = "profile"
    }

    async function logout(){
        await axios.post("/logout");
        setUser(null);
        navigate("/")
    }

    if (!ready){
        return "Loading..."
    }

    if (ready && !user){
        return <Navigate to="/login"/>
    }


    return(
        <div>
            <AccountNav />
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>

                </div>
            )}
            {subpage === "listings" && (
                <ListingsPage/>
            )}
        </div>
    )
}