import { Brain, Zap, Database, MessageSquare, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: <Brain className="h-8 w-8 text-blue-400" />,
    title: "AI-Powered Analysis",
    description: "Advanced AI models process and understand your documentation.",
  },
  {
    icon: <Database className="h-8 w-8 text-purple-400" />,
    title: "Smart Storage",
    description: "Efficiently store and index all your documentation.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-green-400" />,
    title: "Intelligent Chat",
    description: "Natural conversation interface for quick answers.",
  },
  {
    icon: <Shield className="h-8 w-8 text-red-400" />,
    title: "Secure & Private",
    description: "Your data is encrypted and protected.",
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-400" />,
    title: "Lightning Fast",
    description: "Get instant responses to your queries.",
  },
  {
    icon: <Clock className="h-8 w-8 text-pink-400" />,
    title: "24/7 Available",
    description: "Access your documentation anytime, anywhere.",
  },
]

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

