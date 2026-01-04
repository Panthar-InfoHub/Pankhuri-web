import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 text-white border-0">
            Go Home
          </Button>
        </Link>
      </div>
    </main>
  )
}
