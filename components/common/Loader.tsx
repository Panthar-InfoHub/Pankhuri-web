export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-accent/30 rounded-full blur-xl animate-pulse"></div>

        <div className="relative w-16 h-16">
          {/* Main spin ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/10"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary border-r-accent animate-spin"></div>

          {/* Inner pulsating dot */}
          <div className="absolute inset-2 bg-linear-to-tr from-primary to-accent rounded-full animate-pulse opacity-80 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Loading text with slight animation */}
      <span className="mt-6 text-sm font-bold text-primary tracking-[0.2em] uppercase animate-pulse">
        Loading...
      </span>
    </div>
  )
}
