import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../../components/booking/BookingWidget";
import ListingGallery from "../../components/listing/ListingGallery";
import AddressLink from "../../components/listing/AddressLink";

export default function ListingPage(){
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get(`/listings/${id}`).then(response => {
            setListing(response.data)
            console.log(response.data)
        })
    }, [id] )

    return (
        <>
            {listing && (
                <div>
                    <div className="bg-white p-4 rounded-xl">
                        <h1 className="text-3xl">{listing.title}</h1>
                        <AddressLink>{listing.address}, {listing.city}</AddressLink>
                        <ListingGallery listing={listing}/>
                        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                        <div>
                                <div className="my-4">
                                    <h2 className="font-semibold text-xl">Description</h2>
                                    {listing.description}
                                </div>
                                Checkin:{listing.checkIn} <br />
                                CheckOut: {listing.checkOut} <br />
                                max number guests {listing.maxGuests}
                                <div>
                                    <h2 className="font-semibold text-l">Om stedet</h2>
                                </div>
                            </div>
                            <div>
                               <BookingWidget listing={listing}></BookingWidget>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}