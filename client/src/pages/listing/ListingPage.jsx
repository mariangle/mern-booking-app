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
        })
    }, [id] )

    return (
        <>
            {listing && (
                <div className="inner">
                    <div className="bg-white">
                        <div className="pb-6 rounded-md">
                            <h1 className="text-3xl font-semibold">{listing.title}</h1>
                            <AddressLink>{listing.address}, {listing.city}</AddressLink>
                        </div>
                        <ListingGallery listing={listing}/>
                        <div className="mt-4 flex justify-between gap-4">
                            <div className="w-full">
                            <div className="rounded-md py-4 border-b ">
                                    <h2 className="font-semibold text-xl py-2">Om dette sted</h2>
                                    {listing.description}
                                </div>
                                <div className="rounded-md py-4 border-b">
                                    <h2 className="font-semibold text-xl py-2">Det skal du vide</h2>
                                        <div className="grid grid-cols-3">
                                            <div> Indtjekning: <br /> {listing.checkIn}</div>
                                            <div> Udtjekning:<br /> {listing.checkOut}</div>
                                            <div> Max gæster:<br /> {listing.maxGuests}
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md py-4 border-b">
                                    <h2 className="font-semibold text-xl py-2">Det tilbyder denne bolig</h2>
                                    <div className="flex gap-2">
                                        {listing.perks.map((perk) => (
                                            <div key={perk} className="border p-2 bg-primary text-white">
                                            {perk}
                                            </div>
                                        ))}
                                    </div>
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