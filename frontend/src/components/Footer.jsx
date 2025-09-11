function Footer() {
    return (
        <footer className="bg-gray-100 py-6 mt-8">
            <div className="container mx-auto text-center text-gray-600">
                © {new Date().getFullYear()} DigiMarket. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
