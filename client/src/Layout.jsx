import Header from "./components/Header"
import { Outlet } from "react-router-dom"

export default function Layout(){
    return (
        <div className="max-w-6xl mx-auto py-4 px-8 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}