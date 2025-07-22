
export default function Security() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Security & Compliance
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Enterprise-grade security measures and compliance standards to protect your data and ensure regulatory adherence.
          </p>
        </div>

        <div className="space-y-16">
          {/* Security Overview */}
          <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Security Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🔐",
                  title: "End-to-End Encryption",
                  description: "TLS 1.3 encryption for all data in transit with AES-256 for data at rest"
                },
                {
                  icon: "🏢",
                  title: "SOC 2 Compliant",
                  description: "Type II SOC 2 certification ensuring the highest security standards"
                },
                {
                  icon: "🌍",
                  title: "Global Infrastructure",
                  description: "Multi-region deployment with redundant security monitoring"
                },
                {
                  icon: "🛡️",
                  title: "Zero Trust Architecture",
                  description: "Every request verified and authenticated before processing"
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Protection */}
          <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Data Protection Standards</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Privacy by Design</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">Automatic file deletion within 1 hour</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">No permanent storage of user content</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">Zero data mining or content analysis</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">GDPR and CCPA compliance</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Technical Safeguards</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">Advanced threat detection systems</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">Real-time security monitoring</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">Multi-factor authentication for admin access</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">Regular security audits and penetration testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Compliance Certifications */}
          <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Compliance Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "ISO 27001",
                  description: "Information Security Management System certification",
                  badge: "🏆"
                },
                {
                  name: "SOC 2 Type II",
                  description: "Service Organization Control 2 compliance verification",
                  badge: "🛡️"
                },
                {
                  name: "GDPR",
                  description: "General Data Protection Regulation compliance",
                  badge: "🌍"
                },
                {
                  name: "CCPA",
                  description: "California Consumer Privacy Act compliance",
                  badge: "🔒"
                },
                {
                  name: "HIPAA Ready",
                  description: "Healthcare data protection standards alignment",
                  badge: "🏥"
                },
                {
                  name: "PCI DSS",
                  description: "Payment Card Industry Data Security Standard",
                  badge: "💳"
                }
              ].map((cert, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                  <div className="text-3xl mb-3">{cert.badge}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                  <p className="text-slate-400 text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Security Contact */}
          <section className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl p-8 border border-purple-500/30">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Security Contact</h2>
              <p className="text-slate-300 mb-6">
                If you discover a security vulnerability, please report it responsibly through our security team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-1">Security Email</h4>
                  <p className="text-purple-400">security@suntynai.com</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-1">PGP Key</h4>
                  <p className="text-cyan-400">Download Public Key</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
