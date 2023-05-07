import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import Perks from "../Perks";
import ImageUploader from "../imageUploader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListingsPage(){
    const navigate = useNavigate();
    const { action } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);


    function addNewListing(e){
        e.preventDefault();
        axios.post("/listings", { title, address, images, description, perks, extraInfo, checkIn, checkOut, maxGuests })
        navigate("/account/listings")
    }
    
    return (
        <div>
            {action !== "new" && (
                <div className="text-center">
                    <Link to="/account/listings/new" className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new listing
                    </Link>
                </div>
            )}
            {action === "new" && (
                <div>
                    <form onSubmit={addNewListing}>
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
                        <label>Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"/>
                        <label>Images</label>
                        <ImageUploader images={images} onChange={setImages} />
                        <label>Description</label>
                        <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Description"/>
                        <label>Select perks</label>
                        <Perks selected={perks} onChange={setPerks}></Perks>
                        <label htmlFor="">Extra Info</label>
                        <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)}/>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <label htmlFor="">Check in time</label>
                                <input type="number" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="14:00"/>
                            </div>
                            <div>
                                <label htmlFor="">Check out time</label>
                                <input type="number" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="11"/>
                            </div>
                            <div>
                                <label htmlFor="">Max guests</label>
                                <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}/>
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    )

}