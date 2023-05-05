import { Link } from "react-router-dom"

export default function RegisterPage(){
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-40">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto">
                    <input type="text" placeholder="John Doe" />
                    <input type="email" placeholder="Your@email.com" />
                    <input type="password" placeholder="Password" />
                    <button className="primary">Register</button>
                </form>
                <div className="py-2 text-gray-500">Already a member? <Link className="underline text-bl" to={"/login"}>Login</Link></div>
            </div>
        </div>
    )
}