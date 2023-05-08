export default function ListingImg({ listing, index = 0, className = null }) {
  if (listing && listing.images?.length) {
    if (!className) {
      className = "w-full h-full object-cover";
    }

    return (
      <img
        className={className}
        src={"http://localhost:4000/uploads/" + listing.images[index]}
        alt=""
      />
    );
  }

  return null;
}