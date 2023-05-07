import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios";
import { Link } from "react-router-dom";
import ListingImg from "../ListingImg"
import { differenceInCalendarDays, format } from "date-fns"


export default function BookingsPage(){
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get("/bookings").then(response => {
            setBookings(response.data)
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div>
                {bookings && bookings.map((booking, index) => (
                    <Link to={`/account/bookings/${booking._id}`} key={index} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48">
                            <ListingImg listing={booking.listing} />
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl">{booking.listing.title}</h2>
                            <div className="flex gap-2 border-t items-center border-gray-300 mt-2 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                </svg>
                                {format(new Date(booking.checkIn), "yyyy-MM-dd")} 
                                &rarr; 
                                {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                            </div>
                            <div className="text-xl">
                                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights
                                | Total: ${booking.price}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}