import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../UserContext";
import MessageIcon from '../assets/icons/MessageIcon';
import UserIcon from '../assets/icons/UserIcon';

function Header() {
    const { user } = useContext(UserContext)

  return (
    <header className='bg-white border border-b drop-shadow-sm fixed w-full z-50'>
        <div className='flex justify-between max-w-6xl mx-auto bg-white py-2 px-2'>
            <Link to="/" className='flex items-center gap-2 flex-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke='#009688' viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            <span className='font-bold text-xl text-primary'>studiebnb</span>
            </Link>
            <div className='flex gap-2 flex-1'>
                <input type="text" placeholder='Søg...' />
            </div>
            <div className='flex items-center gap-2 py-2 flex-1 justify-end'>
                <div className='bg-lightGrey rounded-full p-4 py-2 border flex gap-2'>
                    <MessageIcon size={24}></MessageIcon>
                    <Link to={user? "/account" : "/login"} >
                        <UserIcon size={24}></UserIcon>
                    </Link>
                    { !!user && (
                    <div>
                        {user.name}
                    </div>
                )}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header