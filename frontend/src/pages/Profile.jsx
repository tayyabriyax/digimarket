import { useParams } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card";

function Profile() {
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState("listed");

    const user = {
        username,
        avatar: "https://via.placeholder.com/150",
        bio: "Digital artist & content creator. Sharing my works with the world.",
        stats: {
            listed: 5,
            purchased: 3,
        },
    };

    const listedAssets = [
        { id: 1, title: "Abstract Art #1", price: "$25", image: "https://via.placeholder.com/300" },
        { id: 2, title: "3D Model Pack", price: "$40", image: "https://via.placeholder.com/300" },
    ];

    const purchasedAssets = [
        { id: 3, title: "Lo-fi Music Loop", price: "$15", image: "https://via.placeholder.com/300" },
        { id: 4, title: "Ebook: Learn React", price: "$20", image: "https://via.placeholder.com/300" },
    ];

    return (
        <div className="space-y-12">
            <section className="flex flex-col items-center text-center space-y-4">
                <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-32 h-32 rounded-full border shadow"
                />
                <h1 className="text-3xl font-bold text-gray-800">@{user.username}</h1>
                <p className="text-gray-600 max-w-xl">{user.bio}</p>

                <div className="flex gap-6 mt-4">
                    <div className="text-center">
                        <p className="text-xl font-bold">{user.stats.listed}</p>
                        <p className="text-gray-500">Listed</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold">{user.stats.purchased}</p>
                        <p className="text-gray-500">Purchased</p>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex justify-center gap-6 border-b">
                    <button
                        onClick={() => setActiveTab("listed")}
                        className={`pb-2 px-4 ${activeTab === "listed"
                                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                                : "text-gray-500 hover:text-blue-600"
                            }`}
                    >
                        Listed Assets
                    </button>
                    <button
                        onClick={() => setActiveTab("purchased")}
                        className={`pb-2 px-4 ${activeTab === "purchased"
                                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                                : "text-gray-500 hover:text-blue-600"
                            }`}
                    >
                        Purchased Assets
                    </button>
                </div>

                <div className="mt-8">
                    {activeTab === "listed" ? (
                        listedAssets.length > 0 ? (
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {listedAssets.map((asset) => (
                                    <Card key={asset.id} title={asset.title} price={asset.price} image={asset.image} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No listed assets yet.</p>
                        )
                    ) : purchasedAssets.length > 0 ? (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {purchasedAssets.map((asset) => (
                                <Card key={asset.id} title={asset.title} price={asset.price} image={asset.image} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No purchased assets yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Profile;
