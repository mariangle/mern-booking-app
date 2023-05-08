import { useState } from "react";
import Image from "./Image";

export default function ListingGallery({listing}){
    const [showAllImages, setShowAllImages] = useState(false);

    if (showAllImages) {
        return (
          <div className="absolute inset-0 bg-black text-white min-h-screen z-50">
            <div className="bg-black p-8 grid gap-4 ">
            <div>
                <h2 className="text-3xl mr-48">Images of {listing.title} </h2>
                <button onClick={() => setShowAllImages(false)}  className="flex right-12 top-8 gap-1 py-2 px-4 rounded-xl fixed bg-white text-black">
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
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-md overflow-hidden">
            <div>
                {listing.images?.[0] && (
                <div>
                    <Image onClick={() => setShowAllImages(true)} className="aspect-square cursor-pointer object-cover w-full h-full" src={listing.images[0]} alt=""/>
                </div>
                )}
            </div>
            <div className="grid">
                {listing.images?.[1] && (
                <Image onClick={() => setShowAllImages(true)} className="aspect-square cursor-pointer object-cover w-full h-full" src={listing.images[1]} alt=""/>
                )}
                <div className="overflow-hidden">
                {listing.images?.[2] && (
                    <Image onClick={() => setShowAllImages(true)} className="aspect-square cursor-pointer object-cover relative top-2 w-full h-full" src={listing.images[2]} alt=""/>
                )}
                </div>
            </div>
            </div>
            <button onClick={() => setShowAllImages(true)} className="flex gap-1 absolute bottom-2 right-2 transparent">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
            </svg>
            Vis alle billeder
            </button>
        </div>
    )
}