
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get in touch with our team for support, partnerships, or any questions about SuntynAI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Send us a message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="First Name" className="bg-slate-700/50 border-slate-600 text-white" />
                <Input placeholder="Last Name" className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
              <Input placeholder="Email Address" type="email" className="bg-slate-700/50 border-slate-600 text-white" />
              <Input placeholder="Subject" className="bg-slate-700/50 border-slate-600 text-white" />
              <textarea 
                placeholder="Your message..."
                rows={6}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 resize-none"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Email Support</h4>
                    <p className="text-slate-300">support@suntynai.com</p>
                    <p className="text-slate-400 text-sm">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Business Inquiries</h4>
                    <p className="text-slate-300">business@suntynai.com</p>
                    <p className="text-slate-400 text-sm">Partnerships & Enterprise</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🏢</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Headquarters</h4>
                    <p className="text-slate-300">Bangalore, Karnataka, India</p>
                    <p className="text-slate-400 text-sm">Global AI Innovation Hub</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Quick Support</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                  📚 Help Center & Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                  💬 Live Chat Support
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                  🔧 Technical Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
