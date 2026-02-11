import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

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
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
          What Our <span className="text-purple-600">Students</span> Say
        </h2>
        <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
          Join thousands of successful learners who have transformed their careers and passions through Pankhuri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative p-8 border-zinc-100 shadow-xl shadow-zinc-200/50 rounded-3xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Quote size={80} className="text-zinc-900" />
            </div>

            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-zinc-600 mb-8 leading-relaxed text-lg font-light italic">
              "{testimonial.content}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                {testimonial.name[0]}
              </div>
              <div>
                <p className="text-zinc-900 font-bold">{testimonial.name}</p>
                <p className="text-zinc-500 text-sm font-medium">{testimonial.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

