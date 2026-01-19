import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Makeup Artist",
    image: "/landing/review/indian-woman-professional-makeup-artist-portrait.jpg",
    content:
      "Pankhuri transformed my passion into a profession. I now run my own bridal makeup business and earn ₹50,000+ monthly!",
    rating: 5,
  },
  {
    name: "Anjali Patel",
    role: "Home Baker",
    image: "/landing/review/indian-woman-baker-smiling-portrait.jpg",
    content:
      "The baking course was incredible! I learned everything from scratch and now my cakes are in demand for every celebration in my locality.",
    rating: 5,
  },
  {
    name: "Meera Reddy",
    role: "Yoga Instructor",
    image: "/landing/review/indian-woman-yoga-teacher-portrait.jpg",
    content:
      "Thanks to Pankhuri's yoga certification, I now conduct morning batches for 30+ students. The community support is amazing!",
    rating: 5,
  },
  {
    name: "Kavitha Nair",
    role: "Mehndi Artist",
    image: "/landing/review/indian-woman-mehndi-artist-portrait.jpg",
    content:
      "I never imagined I could earn from mehndi designs. Now I'm booked for weddings months in advance. Forever grateful to Pankhuri!",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real women, real transformations. See how Pankhuri changed their lives.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-6 relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-pink-200" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-75" />
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">&quot;{testimonial.content}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
