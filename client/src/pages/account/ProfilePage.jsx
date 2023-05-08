import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Navigate, Link, useParams } from "react-router-dom";
import ListingsPage from "./ListingsPage"


export default function ProfilePage(){
    let {subpage} = useParams();
    const { ready, user } = useContext(UserContext);
    if (subpage === undefined){
        subpage = "profile"
    }

    if (!ready){
        return "Loading..."
    }

    if (ready && !user){
        return <Navigate to="/login"/>
    }

    return(
        <div>
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />

                </div>
            )}
            {subpage === "listings" && (
                <ListingsPage/>
            )}
        </div>
    )
}