import { useParams } from "react-router-dom";
import Card from "../components/Card";

function AssetDetails() {
    const { id } = useParams();

    const asset = {
        id,
        title: "Digital Artwork #1",
        description:
            "A beautiful abstract digital painting in high resolution. Perfect for collectors and enthusiasts.",
        price: "$25",
        image: "https://via.placeholder.com/600x400",
        category: "art",
        owner: {
            username: "artlover",
            avatar: "https://via.placeholder.com/100",
        },
    };

    const similarAssets = [
        { id: 2, title: "Digital Artwork #2", price: "$30", image: "https://via.placeholder.com/300" },
        { id: 3, title: "Digital Artwork #3", price: "$20", image: "https://via.placeholder.com/300" },
        { id: 4, title: "Digital Artwork #4", price: "$40", image: "https://via.placeholder.com/300" },
    ];

    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={asset.image}
                        alt={asset.title}
                        className="w-full h-auto rounded-xl shadow"
                    />
                </div>

                <div className="flex flex-col space-y-6">
                    <h1 className="text-3xl font-bold text-gray-800">{asset.title}</h1>
                    <p className="text-gray-600">{asset.description}</p>
                    <p className="text-2xl font-semibold text-blue-600">{asset.price}</p>

                    <div className="flex items-center gap-4">
                        <img
                            src={asset.owner.avatar}
                            alt={asset.owner.username}
                            className="w-12 h-12 rounded-full border"
                        />
                        <div>
                            <p className="font-semibold">{asset.owner.username}</p>
                            <p className="text-sm text-gray-500">Creator</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                            Buy Now
                        </button>
                        <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">You may also like</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {similarAssets.map((item) => (
                        <Card key={item.id} title={item.title} price={item.price} image={item.image} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default AssetDetails;
