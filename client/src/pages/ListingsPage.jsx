import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios"

export default function ListingsPage(){
    const { action } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);

    async function addImageByUrl(e){
        e.preventDefault();
        const { data: filename} = await axios.post("/upload-by-url", { link: imageUrl})
        setImages(prev => {
            return [...prev, filename];
        })
        setImageUrl("");
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
                    <form>
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
                        <label>Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"/>
                        <h2>Images</h2>
                        <div className="flex gap-2">
                            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Add using a link" />
                            <button onClick={addImageByUrl} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;image</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {images.length > 0 && images.map(link => (
                                <div>
                                    <img className="rounded-2xl" src={"http://localhost:4000/uploads/"+link} alt="" />
                                </div>
                            ))}
                            <button className="flex items-center gap-2 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </button>
                        </div>
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