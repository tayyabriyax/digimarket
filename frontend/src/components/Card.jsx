import { Link } from "react-router-dom";

function Card({ id, title, price, image }) {
    return (
        <div className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-blue-600 font-bold mt-2">{price} $</p>
                <Link to={`/asset/:${id}`}>
                    <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Card;
