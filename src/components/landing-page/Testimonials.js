import Image from "next/image"

const testimonials = [
  {
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/placeholder.svg?height=100&width=100",
    quote: "DocsAI has revolutionized how we manage our documentation. It's a game-changer!",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer at InnovateTech",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The AI-powered querying system has saved us countless hours. Highly recommended!",
  },
  {
    name: "Mike Johnson",
    role: "Product Manager at FutureSoft",
    image: "/placeholder.svg?height=100&width=100",
    quote: "DocsAI's intelligent chat feature has improved our team's productivity tenfold.",
  },
]

export const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

