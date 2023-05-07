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
                    <div className="h-32 flex" key={index}>
                        <img className="rounded-2xl w-full object-cover position-center" src={"http://localhost:4000/uploads/" + link} alt="" />
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