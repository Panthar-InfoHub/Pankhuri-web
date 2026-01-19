import Image from "next/image"

export function CertificateSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#8B1D7C" }}>
            Certify your Learning
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete the courses, and request your course completion certificate
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl">
            <Image
              src="/landing/certificate.jpg"
              alt="Pankhuri Certificate of Participation"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
