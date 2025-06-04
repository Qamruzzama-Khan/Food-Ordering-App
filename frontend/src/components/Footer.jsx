const Footer = () => {
  return (
    <footer className="bg-orange-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h1 className="text-2xl font-bold text-orange-600">FoodExpress</h1>
          <p className="mt-2 text-sm">
            Delivering your favorite meals at lightning speed. Quick, affordable, and reliable food delivery near you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-orange-500 mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/" className="hover:underline">Menu</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="font-semibold text-orange-500 mb-2">Support</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">FAQs</a></li>
            <li><a href="/" className="hover:underline">Help Center</a></li>
            <li><a href="/" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold text-orange-500 mb-2">Contact Us</h2>
          <p className="text-sm">Email: support@foodexpress.com</p>
          <p className="text-sm mt-1">Phone: +91 98765 43210</p>
          <p className="text-sm mt-1">Location: Nashik, India</p>
        </div>
      </div>

      <div className="border-t border-orange-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FoodExpress. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
