import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Pankhuri
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Empowering learners worldwide with world-class education.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-6 text-base">Explore</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  Courses
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  Categories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-6 text-base">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-6 text-base">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            &copy; 2026 Designed and Developed By{" "}
            <Link
              className="text-gray-700 hover:text-purple-500 font-semibold transition-colors duration-200"
              href="https://www.pantharinfohub.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Panthar InfoHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
} 
