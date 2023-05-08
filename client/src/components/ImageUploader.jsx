import { useState } from "react";
import axios from "axios"

export default function imageUploader({images, onChange}) {
    const [imageUrl, setImageUrl] = useState("");

    async function addImageByUrl(e){
        e.preventDefault();
        const { data: filename} = await axios.post("/upload-by-url", { link: imageUrl})
        onChange(prev => {
            return [...prev, filename];
        })
        setImageUrl("");
    }

    function uploadImage(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append("images", files[i]);
        }
        axios
          .post("/upload", data, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(response => {
            const { data: filenames } = response;
            onChange(prev => [...prev, ...filenames]);
          })
      }

      function removeImage(e, filename){
        e.preventDefault();
        onChange([...images.filter(image => image !== filename)]);
      }

      function selectMainImage(e, filename){
        e.preventDefault();
        onChange([filename, ...images.filter(image => image !== filename)])
      }

    return(
        <>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Add using a link"
                />
                <button onClick={addImageByUrl} className="bg-gray-200 px-4 rounded-2xl">
                    Add&nbsp;image
                </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {images.length > 0 && images.map((link, index) => (
                    <div className="h-32 flex relative" key={index}>
                        <img className="rounded-2xl w-full object-cover position-center" src={"http://localhost:4000/uploads/" + link} alt="" />
                        <button onClick={(e) => removeImage(e, link)} className="cursor-pointer bottom-1 right-1 transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <button onClick={(e) => selectMainImage(e, link)} className="cursor-pointer transparent bottom-1 left-1">
                        {link === images[0] ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                            ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            )}
                        </button>
                    </div>
                ))}
                <label className="h-32 flex items-center gap-2 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
                    <input type="file" name="images" multiple className="hidden" onChange={uploadImage} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}