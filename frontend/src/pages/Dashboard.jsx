import { useState } from "react";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("users");

    const stats = {
        users: 120,
        assets: 58,
        sales: 230,
    };

    const users = [
        { id: 1, username: "john_doe", email: "john@example.com", role: "user" },
        { id: 2, username: "admin123", email: "admin@example.com", role: "admin" },
    ];

    const assets = [
        { id: 1, title: "Abstract Art", price: "$25", owner: "john_doe" },
        { id: 2, title: "Lo-fi Track", price: "$15", owner: "musicman" },
    ];

    return (
        <div className="space-y-12">
            <section className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">{stats.users}</h3>
                    <p className="text-gray-500">Users</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">{stats.assets}</h3>
                    <p className="text-gray-500">Assets</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">{stats.sales}</h3>
                    <p className="text-gray-500">Sales</p>
                </div>
            </section>

            <section>
                <div className="flex gap-6 border-b">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`pb-2 px-4 ${activeTab === "users"
                            ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                            : "text-gray-500 hover:text-blue-600"
                            }`}
                    >
                        Manage Users
                    </button>
                    <button
                        onClick={() => setActiveTab("assets")}
                        className={`pb-2 px-4 ${activeTab === "assets"
                            ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                            : "text-gray-500 hover:text-blue-600"
                            }`}
                    >
                        Manage Assets
                    </button>
                </div>

                <div className="mt-6">
                    {activeTab === "users" ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">Username</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Role</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-t">
                                            <td className="px-4 py-2">{user.username}</td>
                                            <td className="px-4 py-2">{user.email}</td>
                                            <td className="px-4 py-2 capitalize">{user.role}</td>
                                            <td className="px-4 py-2 space-x-2">
                                                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                                    Delete
                                                </button>
                                                {user.role !== "admin" && (
                                                    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                                        Ban
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Price</th>
                                        <th className="px-4 py-2">Owner</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assets.map((asset) => (
                                        <tr key={asset.id} className="border-t">
                                            <td className="px-4 py-2">{asset.title}</td>
                                            <td className="px-4 py-2">{asset.price}</td>
                                            <td className="px-4 py-2">{asset.owner}</td>
                                            <td className="px-4 py-2 space-x-2">
                                                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                                    Delete
                                                </button>
                                                <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                                                    Approve
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
