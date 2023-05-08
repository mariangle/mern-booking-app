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
                <div className="inner">
                    <div className="bg-white p-4 rounded-xl border">
                        <div className="border px-4 py-6 rounded-md mb-4 custom-gradient">
                            <h1 className="text-3xl font-semibold">{listing.title}</h1>
                            <AddressLink>{listing.address}, {listing.city}</AddressLink>
                        </div>
                        <ListingGallery listing={listing}/>
                        <div className="mt-4 flex gap-4">
                            <div>
                            <div className="border p-4 rounded-md mb-4">
                                    <h2 className="font-semibold text-xl">Om Stedet</h2>
                                    {listing.description}
                                </div>
                                <div className="border p-4 rounded-md mb-4">
                                    <h2 className="font-semibold text-xl">Det skal du vide</h2>
                                        <div className="grid grid-cols-3">
                                            <div> Indtjekning: {listing.checkIn}</div>
                                            <div> Udtjekning: {listing.checkOut}</div>
                                            <div> Max gæster: {listing.maxGuests}
                                        </div>
                                    </div>
                                </div>
                                <div className="border p-4 rounded-md mb-4">
                                    <h2 className="font-semibold text-xl">Det tilbyder denne bolig</h2>
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