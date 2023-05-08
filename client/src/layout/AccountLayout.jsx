import AccountNav from "../components/account/AccountNav";
import { Outlet } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom";


export default function AccountLayout() {
  const { ready, user } = useContext(UserContext);


  if (ready && !user){
    return <Navigate to="/login"/>
}

    return (
      <div className="flex">
        <div className="flex-shrink-0 bg-gray-200">
          <div className="fixed left-0 h-full account-nav-width">
            <AccountNav />
          </div>
        </div>
        <div className="flex-grow ml-30">
          <Outlet />
        </div>
      </div>
    );
  }
  