import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadAssets } from "../lib/slices/assetSlice";

function UploadAsset() {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("art");
    const [image, setImage] = useState([]);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(prev => [...prev, file]);
            console.log(file)
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(uploadAssets({ title, description, price, category, image }));
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload New Asset</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2 font-semibold">Asset Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-600 border rounded-lg p-2"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-4 w-full h-64 object-cover rounded-lg shadow"
                        />
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter asset title"
                        required
                        className="w-full border px-4 py-2 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your asset..."
                        rows="4"
                        required
                        className="w-full border px-4 py-2 rounded-lg"
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Price (USD)</label>
                    <input
                        type="number"
                        min="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                        className="w-full border px-4 py-2 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border px-4 py-2 rounded-lg"
                    >
                        <option value="art">Art</option>
                        <option value="music">Music</option>
                        <option value="3d">3D Models</option>
                        <option value="ebook">Ebooks</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    Upload Asset
                </button>
            </form>
        </div>
    );
}

export default UploadAsset;
