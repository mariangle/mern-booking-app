import { Link } from "react-router-dom"

export default function PlacesPage(){
    return (
        <div>
            <div className="text-center">
                <Link to="/account/places/new" className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new listing
                </Link>
            </div>
            my places
        </div>
    )

}