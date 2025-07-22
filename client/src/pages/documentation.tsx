
export default function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive technical documentation for developers integrating SuntynAI's powerful tools into their applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 sticky top-8">
              <h3 className="text-lg font-bold text-white mb-4">Documentation</h3>
              <nav className="space-y-2">
                {[
                  "Getting Started",
                  "Authentication",
                  "PDF API Endpoints",
                  "Image Processing API",
                  "Audio/Video API",
                  "Government Tools API",
                  "Error Handling",
                  "Rate Limits",
                  "SDKs & Libraries",
                  "Webhooks"
                ].map((item, index) => (
                  <a key={index} href="#" className="block text-slate-400 hover:text-purple-400 transition-colors duration-300 py-1">
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {/* API Overview */}
              <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">API Overview</h2>
                <p className="text-slate-300 mb-6">
                  SuntynAI provides a comprehensive REST API that allows developers to integrate our 85+ AI tools 
                  directly into their applications. Our API is designed for high performance, reliability, and ease of use.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-purple-400 font-semibold mb-2">Base URL</h4>
                    <code className="text-slate-300 text-sm">https://api.suntynai.com/v1</code>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">Rate Limit</h4>
                    <code className="text-slate-300 text-sm">1000 requests/hour</code>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">Response Format</h4>
                    <code className="text-slate-300 text-sm">JSON</code>
                  </div>
                </div>
              </section>

              {/* Authentication */}
              <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Authentication</h2>
                <p className="text-slate-300 mb-6">
                  All API requests require authentication using an API key. Include your API key in the Authorization header.
                </p>
                
                <div className="bg-slate-900/70 rounded-lg p-4 mb-6">
                  <h4 className="text-purple-400 font-semibold mb-3">Example Request</h4>
                  <pre className="text-slate-300 text-sm overflow-x-auto">
{`curl -X POST https://api.suntynai.com/v1/pdf/merge \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "files=@document1.pdf" \\
  -F "files=@document2.pdf"`}
                  </pre>
                </div>
              </section>

              {/* Code Examples */}
              <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">PDF Merge (JavaScript)</h3>
                    <div className="bg-slate-900/70 rounded-lg p-4">
                      <pre className="text-slate-300 text-sm overflow-x-auto">
{`const formData = new FormData();
formData.append('files', file1);
formData.append('files', file2);

const response = await fetch('https://api.suntynai.com/v1/pdf/merge', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
console.log(result.download_url);`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Image Background Removal (Python)</h3>
                    <div className="bg-slate-900/70 rounded-lg p-4">
                      <pre className="text-slate-300 text-sm overflow-x-auto">
{`import requests

url = "https://api.suntynai.com/v1/image/remove-background"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
files = {"image": open("input.jpg", "rb")}

response = requests.post(url, headers=headers, files=files)
result = response.json()

print(f"Processed image: {result['download_url']}")`}
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Error Handling */}
              <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Error Handling</h2>
                <p className="text-slate-300 mb-6">
                  Our API uses standard HTTP response codes to indicate success or failure of requests.
                </p>
                
                <div className="space-y-4">
                  {[
                    { code: "200", status: "OK", description: "Request successful" },
                    { code: "400", status: "Bad Request", description: "Invalid request parameters" },
                    { code: "401", status: "Unauthorized", description: "Invalid or missing API key" },
                    { code: "429", status: "Too Many Requests", description: "Rate limit exceeded" },
                    { code: "500", status: "Internal Server Error", description: "Server processing error" }
                  ].map((error, index) => (
                    <div key={index} className="flex items-center space-x-4 bg-slate-900/50 rounded-lg p-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        error.code === '200' ? 'bg-green-600/20 text-green-400' :
                        error.code.startsWith('4') ? 'bg-orange-600/20 text-orange-400' :
                        'bg-red-600/20 text-red-400'
                      }`}>
                        {error.code}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{error.status}</div>
                        <div className="text-slate-400 text-sm">{error.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
