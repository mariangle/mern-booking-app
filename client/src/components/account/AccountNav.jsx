import { Link, useLocation } from "react-router-dom";
import UserIcon from "../../assets/icons/UserIcon";
import { useContext } from "react";
import { UserContext } from "../../UserContext"


export default function AccountNav(){
    const {pathname} = useLocation();
    const { logout, user } = useContext(UserContext);

    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
      subpage = 'profile';
    }

    function linkClasses (type=null) {
      let classes = 'flex py-2 px-8 gap-2 text-white ';
      if (type === subpage) {
        classes += 'bg-darkPrimary';
      }
      return classes;
    }

    return (
    <nav className=" left-0 h-full flex flex-col justify-between bg-primary z-50">
      <div>
        <div className="flex flex-col my-6 items-center gap-2">
          <div className="p-2 rounded-full bg-white mt-20 ">
            <UserIcon size={50}></UserIcon>
          </div>
          <p className="text-white font-semibold">{user?.name}</p>
        </div>
        <ul className="py-6 border-t">
          <Link to="/account">
            <div className={linkClasses("profile")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
              <div>Profil</div>
            </div>
          </Link>
          <Link className={linkClasses("bookings")} to="/account/bookings">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Mine bookinger
          </Link>
          <Link className={linkClasses("listings")} to="/account/listings">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Mine opslag
          </Link>
        </ul>
        <div className="w-full p-8">
          <button className="bg-darkPrimary w-full text-white p-2 rounded-xl text-center" onClick={logout}>
              Log Ud
          </button>
      </div>
      </div>
    </nav>
    )
}