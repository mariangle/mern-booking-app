import Perks from "../Perks";
import ImageUploader from "../ImageUploader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";


export default function ListingFormPage(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get("/listings/"+id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setImages(data.images);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
        })
    }, [id])

    function handleSaveListing(e){
        e.preventDefault();
        const listingData = {
            title, address, images, description, 
                perks, extraInfo, checkIn, checkOut, maxGuests 
        }
        if (id){
            axios.put("/listings", { 
                id, ...listingData
            })
        } else {
            axios.post("/listings", listingData)
        }
        navigate("/account/listings")
        console.log(listingData)

    }

    return (
                <div>
                    <AccountNav />
                    <form onSubmit={handleSaveListing}>
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
                                <input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="14:00"/>
                            </div>
                            <div>
                                <label htmlFor="">Check out time</label>
                                <input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="11"/>
                            </div>
                            <div>
                                <label htmlFor="">Max guests</label>
                                <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}/>
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
    )
}