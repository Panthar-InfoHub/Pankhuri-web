export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
      </div>
    </div>
  )
}
