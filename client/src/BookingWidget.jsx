export default function BookingWidget({listing}){
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${listing.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                <div className="py-3 px-4">
                    <label>Check in:</label>
                    <input type="date"
                        />
                </div>
                <div className="py-3 px-4 border-l">
                    <label>Check out:</label>
                    <input type="date" />
                </div>
                </div>
                <div className="py-3 px-4 border-t">
                <label>Number of guests:</label>
                <input type="number"
                        />
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Your full name:</label>
                    <input type="text"
                    />
                    <label>Phone number:</label>
                    <input type="tel"
                    />
                </div>
            </div>
            <button className="primary mt-4">
                Book this place
            </button>
        </div>
    )
}