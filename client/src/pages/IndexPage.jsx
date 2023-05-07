import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage(){
    const [ listings, setListings] = useState([]);
    useEffect(() => {
        axios.get("/listings").then(response => {
            setListings([...response.data, ...response.data, ...response.data, ...response.data]);
        })
    }, [])
    return (
        <div className="grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {listings.length > 0 && listings.map((listing, index ) => (
                <Link to={"/listing/"+listing._id} key={index}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {listing.images?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000/uploads/" + listing.images?.[0]} alt="" />
                        )}
                    </div>
                    <h2 className="font-bold">{listing.address}</h2>
                    <h3 className="text-sm truncate text-gray-500">{listing.title}</h3>
                    <div className="mt-1">
                        <span className="font-bold">${listing.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
}