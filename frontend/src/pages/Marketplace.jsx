import { useState } from "react";
import Card from "../components/Card";

function Marketplace() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("latest");

    const assets = [
        { id: 1, title: "Digital Painting", price: "$30", image: "https://via.placeholder.com/300", category: "art" },
        { id: 2, title: "Lo-fi Beat", price: "$15", image: "https://via.placeholder.com/300", category: "music" },
        { id: 3, title: "3D Character Model", price: "$50", image: "https://via.placeholder.com/300", category: "3d" },
        { id: 4, title: "Ebook: Learn MERN", price: "$20", image: "https://via.placeholder.com/300", category: "ebook" },
    ];

    const filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "all" || asset.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-10">
            <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search assets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full md:w-1/3"
                />

                <div className="flex gap-4">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border px-4 py-2 rounded-lg"
                    >
                        <option value="all">All Categories</option>
                        <option value="art">Art</option>
                        <option value="music">Music</option>
                        <option value="3d">3D Models</option>
                        <option value="ebook">Ebooks</option>
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border px-4 py-2 rounded-lg"
                    >
                        <option value="latest">Latest</option>
                        <option value="priceLowHigh">Price: Low to High</option>
                        <option value="priceHighLow">Price: High to Low</option>
                    </select>
                </div>
            </section>

            <section>
                {filteredAssets.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredAssets.map(asset => (
                            <Card key={asset.id} id={asset.id} title={asset.title} price={asset.price} image={asset.image} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No assets found.</p>
                )}
            </section>

            <div className="text-center">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Load More
                </button>
            </div>
        </div>
    );
}

export default Marketplace;
