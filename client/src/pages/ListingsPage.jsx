import { Link } from "react-router-dom"
import AccountNav from "../components/AccountNav";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ListingImg from "../components/ListingImg"

export default function ListingsPage(){
    const [listings, setListings] = useState([]);
    useEffect(() => {
        axios.get("/listings").then(({data}) => {
            setListings(data)
        })
    }, [])
    
    return (
        <div>
            <AccountNav />
            <div className="text-center">
                    <Link to="/account/listings/new" className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new listing
                    </Link>
                </div>
                <div className="mt-4">
                    {listings.length > 0 && listings.map(listing => (
                        <Link to={"/account/listings/" + listing._id} key={listing} className="cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-2xl">
                            <div className="flex w-32 h-32 bg-gray-300 grow-0 shrink">
                                <ListingImg listing={listing} />
                            </div>
                            <div className="grow shrink-0">
                                <h2 className="text-xl">{listing.title}</h2>
                                <p className="text-sm mt-2">{listing.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    )

}