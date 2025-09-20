import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "../lib/slices/assetSlice";

function Marketplace() {
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("low_to_high");

    useEffect(() => {
        dispatch(fetchAssets({ name: search, category, price: sort }));
    }, [search, category, sort])

    const assets = useSelector(state => state.asset.assets);
    const assetData = useSelector(state => state.asset.assetData);

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
                        <option value="">All Categories</option>
                        <option value="art">Art</option>
                        <option value="music">Music</option>
                        <option value="3dmodel">3D Models</option>
                        <option value="ebook">Ebooks</option>
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border px-4 py-2 rounded-lg"
                    >
                        <option value="low_to_high">Price: Low to High</option>
                        <option value="high_to_low">Price: High to Low</option>
                    </select>
                </div>
            </section>

            <section>
                {assets.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {assets.map(asset => (
                            <Card key={asset._id} id={asset.id} title={asset.title} price={asset.price} image={asset.assetImage[0]} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No assets found.</p>
                )}
            </section>

            {
                assetData.hasMore &&
                <div className="text-center">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Load More
                    </button>
                </div>
            }
        </div>
    );
}

export default Marketplace;
