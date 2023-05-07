import { useState } from "react";
import { useParams } from "react-router-dom"

export default function BookingPage(){
    const { id } = useParams();
    conts [ booking, setBooking] = useState(null);

    useEffect(() => {
        
    }, [id] )
    return (
        <div>
            id is {id}
        </div>
    )
}