import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUser} = useContext(UserContext)

    async function loginUser(e){
        e.preventDefault();
        try {
          const { data } = await axios.post("/login", {
            email, 
            password
          });
          alert("Login successful");
          setUser(data);
          navigate("/")
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert("Invalid email or password");
          } else {
            alert("Login failed");
          }
        }
      }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-40">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginUser}>
                    <input type="email" 
                    placeholder="Your@email.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                    <button className="primary">Login</button>
                </form>
                <div className="py-2 text-gray-500">Don't have an account yet? <Link className="underline text-bl" to={"/register"}>Register</Link></div>
            </div>
        </div>
    )
}