import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";

export default function ListingPage(){
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [showAllImages, setShowAllImages] = useState(false);

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get(`/listings/${id}`).then(response => {
            setListing(response.data)
        })
    }, [id] )

    if (showAllImages) {
        return (
          <div className="absolute inset-0 bg-black text-white min-h-screen">
            <div className="bg-black p-8 grid gap-4">
            <div>
                <h2 className="text-3xl mr-48">Images of {listing.title} </h2>
                <button onClick={() => setShowAllImages(false)}  className="flex right-12 top-8 gap-1 py-2 px-4 rounded-2xl fixed bg-white text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                    close
                </button>
            </div>
            {listing?.images?.length > 0 && listing.images.map((image, index) => {
              return (
                <div key={index}>
                  <img className="w-full object-cover" src={"http://localhost:4000/uploads/" + image} alt="" />
                </div>
              );
            })}
            </div>
          </div>
        );
      }
      


    return (
        <>
            {listing && (
                <div>
                    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
                        <h1 className="text-3xl">{listing.title}</h1>
                        <a className="flex gap-1 my-3 block font-semibold underline" href={"https://maps.google.com?q="+ listing.address} target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {listing.address}
                        </a>
                        <div className="relative">
                        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                            <div>
                                {listing.images?.[0] && 
                                ( 
                                <div>
                                    <img onClick={() => setShowAllImages(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/" + listing.images?.[0]}></img>
                                </div>
                                )}
                            </div>
                            <div className="grid">
                                {listing.images?.[1] && 
                                ( <img onClick={() => setShowAllImages(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/" + listing.images?.[1]}></img>
                                )}
                                <div className="overflow-hidden">
                                    {listing.images?.[2] && 
                                    ( <img onClick={() => setShowAllImages(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/" + listing.images?.[2]}></img>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setShowAllImages(true)} className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        Show more</button>
                        </div>
                        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                        <div>
                                <div className="my-4">
                                    <h2 className="font-semibold text-2xl">Description</h2>
                                    {listing.description}
                                </div>
                                Checkin:{listing.checkIn} <br />
                                CheckOut: {listing.checkOut} <br />
                                max number guests {listing.maxGuests}
                            </div>
                            <div>
                               <BookingWidget listing={listing}></BookingWidget>
                            </div>
                            <div className="bg-white -mx-8 px-8 py-8">
                                <div>
                                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                                    <div className="mb-4 mt-1 text-sm text-gray-700 leading-4">{listing.extraInfo}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}