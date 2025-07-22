
export default function HelpCenter() {
  const categories = [
    {
      title: "Getting Started",
      icon: "🚀",
      articles: [
        "How to use SuntynAI tools",
        "Understanding file formats",
        "Processing limitations",
        "Security and privacy"
      ]
    },
    {
      title: "PDF Tools",
      icon: "📄",
      articles: [
        "Merge multiple PDFs",
        "Split PDF documents", 
        "Convert PDF to images",
        "Extract text from PDFs"
      ]
    },
    {
      title: "Image Processing",
      icon: "🖼️",
      articles: [
        "Background removal techniques",
        "Image format conversion",
        "Resize and optimize images",
        "Advanced image editing"
      ]
    },
    {
      title: "Audio & Video",
      icon: "🎵",
      articles: [
        "Audio format conversion",
        "Video processing tools",
        "Audio enhancement features",
        "Batch processing options"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Find answers to your questions and learn how to maximize your productivity with SuntynAI's professional tools.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles, tutorials, or guides..."
                className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-800/70">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.articles.map((article, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 text-sm">
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-8 border border-purple-500/30">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-white mb-4">Documentation</h3>
            <p className="text-slate-300 mb-4">Comprehensive guides and API documentation for developers and advanced users.</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
              View Docs
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 rounded-2xl p-8 border border-cyan-500/30">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-4">Live Support</h3>
            <p className="text-slate-300 mb-4">Get instant help from our technical support team through live chat.</p>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
              Start Chat
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl p-8 border border-green-500/30">
            <div className="text-3xl mb-4">🎥</div>
            <h3 className="text-xl font-bold text-white mb-4">Video Tutorials</h3>
            <p className="text-slate-300 mb-4">Step-by-step video guides showing how to use every tool effectively.</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
              Watch Videos
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Is SuntynAI completely free to use?",
                answer: "Yes, all 85+ AI tools are completely free with no hidden charges, subscriptions, or registration requirements."
              },
              {
                question: "How secure is my data when using SuntynAI?",
                answer: "Your files are processed with enterprise-grade security and automatically deleted within 1 hour. We never store or analyze your content."
              },
              {
                question: "What file formats are supported?",
                answer: "We support 50+ file formats including PDF, DOC, JPG, PNG, MP3, MP4, and many specialized government document formats."
              },
              {
                question: "Can I use SuntynAI for commercial purposes?",
                answer: "Yes, SuntynAI can be used for both personal and commercial projects without any restrictions."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
