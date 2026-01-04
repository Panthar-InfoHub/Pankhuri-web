import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Beauty Enthusiast",
      content:
        "Pankhuri courses completely transformed my makeup skills. The content is world-class and instructors are amazing!",
      rating: 5,
    },
    {
      name: "Arjun Patel",
      role: "Wellness Coach",
      content:
        "The skincare course helped me start my own beauty business. Highly recommend Pankhuri to anyone serious about learning.",
      rating: 5,
    },
    {
      name: "Neha Gupta",
      role: "Professional Makeup Artist",
      content:
        "Best investment I made for my career growth. The projects and real-world examples are incredibly helpful.",
      rating: 5,
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">What Our Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-[#1a1a1a] border-gray-800 p-6 shadow-md">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.content}</p>
            <div>
              <p className="text-white font-semibold">{testimonial.name}</p>
              <p className="text-gray-400 text-sm">{testimonial.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
