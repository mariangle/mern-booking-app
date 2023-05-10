import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage(){
    const [ listings, setListings] = useState([]);
    useEffect(() => {
        axios.get("/listings").then(response => {
            setListings([...response.data]);
        })
    }, [])

    return (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 inner">
            {listings.length > 0 && listings.map((listing, index ) => (
                <Link to={"/listing/"+listing._id} key={index} className="bg-white border rounded-xl">
                    <div className="flex">
                        {listing.images?.[0] && (
                            <img className="rounded-l object-cover aspect-square" src={"http://localhost:4000/uploads/" + listing.images?.[0]} alt="" />
                        )}
                    </div>
                    <div className="p-3">
                        <h3 className="font-bold text-sm">{listing.type} i {listing.city}</h3>
                        <h2 className="text-sm truncate text-gray-500">{listing.title}</h2>
                        <div className="mt-1">
                            <span className="font-bold">{listing.price} DKK</span> per  nat
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}