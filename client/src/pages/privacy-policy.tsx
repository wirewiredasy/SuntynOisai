
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-400 mb-12">Last updated: January 2025</p>

          <div className="space-y-12 text-slate-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Privacy</h2>
              <p className="leading-relaxed">
                At SuntynAI, your privacy is our top priority. We believe that powerful AI tools should never 
                compromise your personal data. This privacy policy explains how we collect, use, and protect 
                your information when you use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data We Collect</h2>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Files You Upload</h3>
                  <p>We temporarily process your files to provide our AI services. All files are automatically deleted within 1 hour of processing completion.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Usage Analytics</h3>
                  <p>We collect anonymous usage statistics to improve our services. This includes tool usage patterns, error rates, and performance metrics.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Technical Information</h3>
                  <p>Basic technical data like IP address, browser type, and device information for security and optimization purposes.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Protect Your Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">🔐 End-to-End Encryption</h3>
                  <p>All data transmission is encrypted using industry-standard SSL/TLS protocols.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">🗑️ Automatic Deletion</h3>
                  <p>Files are automatically deleted from our servers within 1 hour of processing.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">🏢 Secure Infrastructure</h3>
                  <p>Our servers are hosted in secure, certified data centers with 24/7 monitoring.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">🔍 No Data Mining</h3>
                  <p>We never analyze, store, or use your file content for any purpose other than processing.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Right to know what personal information we collect</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Right to delete your personal information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Right to opt-out of analytics collection</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Right to data portability</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at <span className="text-purple-400">privacy@suntynai.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
