import Header from "./components/Header"
import { Outlet } from "react-router-dom"

export default function Layout(){
    return (
        <div className="">
            <Header />
            <div className="max-w-6xl mx-auto flex flex-col min-h-screen px-2 py-20">
                <div className="my-5">
                <Outlet />

                </div>
            </div>
        </div>
    )
}