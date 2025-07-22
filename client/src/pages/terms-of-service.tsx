
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-slate-400 mb-12">Last updated: January 2025</p>

          <div className="space-y-12 text-slate-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using SuntynAI services, you accept and agree to be bound by the terms 
                and provision of this agreement. These terms apply to all users of our AI tools and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                <p className="leading-relaxed">
                  SuntynAI provides 85+ AI-powered tools for processing documents, images, audio, video, and 
                  government-related tasks. Our services are provided free of charge with a commitment to 
                  user privacy and data security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use Policy</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">You may use our services to:</h3>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Process personal and business documents</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Enhance and modify images and media files</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Generate documents for legitimate purposes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Use tools for educational and research purposes</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">You may NOT use our services to:</h3>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Process illegal, harmful, or malicious content</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Violate intellectual property rights</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Generate fake documents or misleading content</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400">✗</span>
                    <span>Attempt to reverse engineer or exploit our systems</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
              <p className="leading-relaxed">
                We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. 
                We reserve the right to modify, suspend, or discontinue any aspect of our services 
                with reasonable notice to users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                <p className="leading-relaxed">
                  SuntynAI is provided "as is" without warranties of any kind. We shall not be liable 
                  for any direct, indirect, incidental, special, or consequential damages resulting 
                  from the use of our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Continued use of our services after changes constitutes 
                acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="leading-relaxed">
                For questions about these terms, please contact us at 
                <span className="text-purple-400"> legal@suntynai.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
