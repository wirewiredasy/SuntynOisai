
export default function Careers() {
  const positions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / Global",
      type: "Full-time",
      description: "Lead the development of next-generation AI processing systems and machine learning algorithms."
    },
    {
      title: "Product Manager - AI Tools",
      department: "Product",
      location: "Remote / Global", 
      type: "Full-time",
      description: "Drive product strategy and roadmap for our comprehensive AI tools platform."
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote / Global",
      type: "Full-time", 
      description: "Scale our global infrastructure to handle millions of AI processing requests."
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote / Global",
      type: "Full-time",
      description: "Create intuitive and beautiful interfaces for complex AI-powered workflows."
    }
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Market-leading compensation packages with equity participation"
    },
    {
      icon: "🏥", 
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance coverage"
    },
    {
      icon: "🌍",
      title: "Remote First",
      description: "Work from anywhere with flexible hours and autonomous culture"
    },
    {
      icon: "📚",
      title: "Learning Budget",
      description: "Annual budget for conferences, courses, and professional development"
    },
    {
      icon: "⏰",
      title: "Flexible Time Off",
      description: "Unlimited PTO policy with mandatory minimum vacation days"
    },
    {
      icon: "🚀",
      title: "Cutting-edge Tech",
      description: "Work with the latest AI technologies and experimental frameworks"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Build the future of AI-powered productivity tools with a passionate team of innovators and engineers.
          </p>
        </div>

        {/* Company Culture */}
        <section className="mb-16">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why SuntynAI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Mission Driven</h3>
                <p className="text-slate-400">Democratizing AI tools to empower creators and businesses worldwide</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-3">Fast Growth</h3>
                <p className="text-slate-400">Join a rapidly scaling platform processing millions of files monthly</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-white mb-3">Innovation First</h3>
                <p className="text-slate-400">Push the boundaries of what's possible with AI and machine learning</p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {positions.map((position, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-purple-400">📍 {position.location}</span>
                      <span className="text-cyan-400">🏢 {position.department}</span>
                      <span className="text-green-400">⏰ {position.type}</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 mt-4 md:mt-0">
                    Apply Now
                  </button>
                </div>
                <p className="text-slate-300">{position.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl p-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Apply</h4>
              <p className="text-slate-400 text-sm">Submit your application and resume</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Screen</h4>
              <p className="text-slate-400 text-sm">Initial phone/video screening call</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Interview</h4>
              <p className="text-slate-400 text-sm">Technical and cultural fit interviews</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Offer</h4>
              <p className="text-slate-400 text-sm">Welcome to the team!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
