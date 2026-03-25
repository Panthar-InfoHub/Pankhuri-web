"use client";

interface FloatingWhatsAppProps {
  link?: string;
}

export function FloatingWhatsApp({ link }: FloatingWhatsAppProps) {
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
      aria-label="Join our WhatsApp Community"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-5 h-5 fill-current text-white"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32C100.3 32 0 132.3 0 256C0 295.4 10.3 334 30 368.1L0 480l114.6-30c33.1 18.1 70.4 27.7 109.1 27.7h.1c123.6 0 223.9-100.3 223.9-223.9c0-59.3-23.1-115.1-65.1-157.1zm-157 325.3c-33.3 0-66-8.9-94.6-25.8L123 392l-67.2 17.6L73.5 344l-5.1-8.1c-18.5-29.4-28.2-63.3-28.2-98C40.2 147.1 122.5 64.9 224 64.9c49.2 0 95.3 19.2 130 53.9c34.8 34.7 54 80.8 54 130c.1 101.5-82.1 183.6-184.1 183.6zm101.1-138.6c-5.5-2.8-32.8-16.2-37.9-18s-8.8-2.8-12.5 2.8c-3.7 5.6-14.3 18-17.6 21.8s-6.5 4.2-12 1.4c-5.5-2.8-23.4-8.6-44.5-27.4c-16.4-14.6-27.5-32.7-30.7-38.2c-3.2-5.6-.3-8.6 2.5-11.4c2.5-2.5 5.5-6.5 8.3-9.7c2.8-3.2 3.7-5.6 5.6-9.3s.9-6.9-.5-9.7c-1.4-2.8-12.5-30.1-17.1-41.2c-4.5-11-9.1-9.3-12.5-9.5H164c-3.7 0-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s20 53.7 22.7 57.4c2.8 3.7 39.3 60 95.3 84.2c13.3 5.7 23.7 9.1 31.9 11.7c13.4 4.3 25.4 3.7 35 2.3c10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.4-2.3-5.1-3.7-10.6-6.5z" />
      </svg>
      <span className="hidden md:inline-block font-semibold text-sm">Join Community</span>
    </a>
  );
}
