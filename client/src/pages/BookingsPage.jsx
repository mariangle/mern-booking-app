import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import axios from "axios";
import { Link } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns"
import BookingDates from "../components/BookingDates";
import ListingImg from "../components/ListingImg";


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
                            <ListingImg listing={booking.listing}/>
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl">{booking.listing.title}</h2>
                            <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" ></BookingDates>
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