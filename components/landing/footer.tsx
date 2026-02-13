import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image src="/landing//logo.jpeg" alt="Pankhuri Logo" width={44} height={44} className="rounded-xl" />
              <span className="text-2xl font-bold">Pankhuri</span>
            </div>
            <p className="text-purple-200 leading-relaxed">
              Empowering women with skills that matter. Learn, grow, and shine with India&apos;s largest skill-based
              learning platform for women.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/AskPankhuri/"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/askpankhuri"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/askpankhuri"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="http://youtube.com/c/AskPankhuri"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Category
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Plans
                </Link>
              </li>
              <li>
                <Link href="/landing" className="text-purple-200 hover:text-pink-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {/* <li>
                <Link href="#" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-pink-400 transition-colors">
                  FAQs
                </Link>
              </li> */}
              <li>
                <Link href="/privacy-policy" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-pink-400 shrink-0 mt-0.5" />
                <span className="text-purple-200">support@pankhuri.co</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-pink-400 shrink-0 mt-0.5" />
                <span className="text-purple-200">+91 63661 32227</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-pink-400 shrink-0 mt-0.5" />
                <span className="text-purple-200">Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-12 pt-8 text-center text-purple-300 text-sm">
          <p>© 2025 Pankhuri. All rights reserved. Made with ❤️ for women everywhere.</p>
          <p className="mt-2 text-purple-400">
            Designed & Developed by{" "}
            <Link href="https://www.pantharinfohub.com/" target="_blank" className="font-semibold text-pink-400 hover:text-pink-300 transition-colors">
              Panthar Infohub Pvt. Ltd.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
