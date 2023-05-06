import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

export default function RegisterPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function registerUser(e){
        e.preventDefault();
        axios.get("/test");
        console.log("hey");
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-40">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="email" placeholder="Your@email.com"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="primary">Register</button>
                </form>
                <div className="py-2 text-gray-500">Already a member? <Link className="underline text-bl" to={"/login"}>Login</Link></div>
            </div>
        </div>
    )
}