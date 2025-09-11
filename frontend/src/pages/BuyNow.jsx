import { useState } from "react";

function BuyNow() {
    const asset = {
        id: 1,
        title: "Abstract Digital Art",
        price: 25,
        seller: "john_doe",
    };

    const [buyerName, setBuyerName] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");

    const handlePurchase = (e) => {
        e.preventDefault();
        console.log({ buyerName, buyerEmail, paymentMethod, asset });
        alert("Purchase completed (stubbed)!");
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8">
            <div className="border-b pb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Checkout: {asset.title}
                </h1>
                <p className="text-gray-600">Seller: {asset.seller}</p>
                <p className="text-xl font-semibold mt-2">${asset.price}</p>
            </div>

            <form onSubmit={handlePurchase} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold">Full Name</label>
                    <input
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full border px-4 py-2 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Email</label>
                    <input
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full border px-4 py-2 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full border px-4 py-2 rounded-lg"
                    >
                        <option value="card">Credit / Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="crypto">Crypto (future)</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                >
                    Confirm Purchase
                </button>
            </form>
        </div>
    );
}

export default BuyNow;
