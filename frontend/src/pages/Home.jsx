import { Link } from "react-router-dom";
import Card from "../components/Card";

function Home() {
    return (
        <div className="space-y-16">
            <section className="text-center py-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-md">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                    Discover & Trade Digital Assets
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                    Buy, sell, and showcase unique digital creations. Powered by MERN today, blockchain tomorrow.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/marketplace"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                    >
                        Explore Marketplace
                    </Link>
                    <Link
                        to="/upload"
                        className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50"
                    >
                        Upload Asset
                    </Link>
                </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-white shadow rounded-xl hover:shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">📤 Easy Uploads</h3>
                    <p className="text-gray-600">
                        List your digital assets in just a few clicks and reach buyers worldwide.
                    </p>
                </div>
                <div className="p-6 bg-white shadow rounded-xl hover:shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">🔒 Secure Payments</h3>
                    <p className="text-gray-600">
                        Safe and reliable transactions via Stripe or crypto (coming soon).
                    </p>
                </div>
                <div className="p-6 bg-white shadow rounded-xl hover:shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">🌍 Global Marketplace</h3>
                    <p className="text-gray-600">
                        Connect with creators and collectors across the globe.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">🔥 Popular Assets</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <Card
                        title="Digital Artwork #1"
                        price="$25"
                        image="https://via.placeholder.com/300"
                    />
                    <Card
                        title="Music Track"
                        price="$15"
                        image="https://via.placeholder.com/300"
                    />
                    <Card
                        title="Ebook"
                        price="$10"
                        image="https://via.placeholder.com/300"
                    />
                    <Card
                        title="3D Model"
                        price="$40"
                        image="https://via.placeholder.com/300"
                    />
                </div>
            </section>

            <section className="text-center py-12 bg-blue-50 rounded-2xl shadow">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Ready to Start Selling?
                </h2>
                <p className="text-gray-600 mb-6">
                    Join our growing community of creators and buyers today.
                </p>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    Sign Up Now
                </Link>
            </section>
        </div>
    );
}

export default Home;
