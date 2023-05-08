import Perks from "../components/Perks";
import ImageUploader from "../components/ImageUploader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";


export default function ListingFormPage(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [rooms, setRooms] = useState(1);
    const [type, setType] = useState("");
    const [address, setAddress] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);

    useEffect(() => {
      if (!id) {
        return;
      }

      axios.get("/listings/" + id)
        .then(response => {
          const { data } = response;
          setTitle(data.title);
          setCity(data.city);
          setType(data.type);
          setRooms(data.rooms);
          setAddress(data.address);
          setImages(data.images);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);
          setPrice(data.price);
        })
        }, [id]);

    async function handleSaveListing(e) {
        e.preventDefault();
        const listingData = {
          title, city, address, type, rooms, images, description,perks,
            extraInfo, checkIn, checkOut, maxGuests, price
        };
      
        try {
          if (id) {
            await axios.put("/listings", { id, ...listingData });
          } else {
            await axios.post("/listings", listingData);
          }
        
          navigate("/account/listings");
        } catch (error) {
          if (error.response?.data?.error) {
            const errorMessage = error.response.data.error;
            alert(errorMessage);
          } else {
            alert(error);
          }
        }
      }

    return (
                <div>
                    <AccountNav />
                    <form onSubmit={handleSaveListing}>
                        <label>Kort Titel</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
                        <label>Addresse</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"/>
                        <label>By</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"/>
                        <label>Boligtype</label>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                          <option value="">Select type</option>
                          <option value="Værelse">Værelse</option>
                          <option value="Lejlighed">Lejlighed</option>
                          <option value="Gæstehus">Gæstehus</option>
                          <option value="Minihus">Minihus</option>
                        </select>
                        <label>Images</label>
                        <ImageUploader images={images} onChange={setImages} />
                        <label>Description</label>
                        <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Description"/>
                        <label>Select perks</label>
                        <Perks selected={perks} onChange={setPerks}></Perks>
                        <label htmlFor="">Extra Info</label>
                        <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)}/>
                        <div className="grid gap-2 grid-cols-2 md-grid-cols-4">
                            <div>
                                <label htmlFor="">Check in time</label>
                                <input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="14:00"/>
                            </div>
                            <div>
                                <label htmlFor="">Check out time</label>
                                <input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="11"/>
                            </div>
                            <div>
                                <label htmlFor="">Max gæster</label>
                                <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="">Price pr. Night</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="">Antal rum</label>
                                <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)}/>
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
    )
}