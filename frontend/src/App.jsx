import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import AssetDetails from "./pages/AssetDetails";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import UploadAsset from "./pages/UploadAsset";
import BuyNow from "./pages/BuyNow";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-6 mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/asset/:id" element={<AssetDetails />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadAsset />} />
            <Route path="/checkout" element={<BuyNow />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
