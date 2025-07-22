
export default function Status() {
  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.98%",
      responseTime: "142ms"
    },
    {
      name: "PDF Processing",
      status: "operational", 
      uptime: "99.96%",
      responseTime: "2.3s"
    },
    {
      name: "Image Processing",
      status: "operational",
      uptime: "99.99%", 
      responseTime: "1.8s"
    },
    {
      name: "Audio/Video Processing",
      status: "operational",
      uptime: "99.94%",
      responseTime: "4.1s"
    },
    {
      name: "Government Tools",
      status: "operational",
      uptime: "99.97%",
      responseTime: "1.2s"
    },
    {
      name: "File Storage",
      status: "operational", 
      uptime: "100%",
      responseTime: "89ms"
    }
  ];

  const incidents = [
    {
      date: "2025-01-20",
      title: "PDF Processing Latency Increase",
      status: "resolved",
      description: "Users experienced slower PDF processing times due to increased load. Issue resolved by scaling processing capacity."
    },
    {
      date: "2025-01-18", 
      title: "Image Upload Timeout Issues",
      status: "resolved",
      description: "Some users encountered timeouts when uploading large image files. Fixed by optimizing upload handling."
    },
    {
      date: "2025-01-15",
      title: "Scheduled Maintenance - Database Optimization",
      status: "completed",
      description: "Planned maintenance to optimize database performance. All services remained available during maintenance."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'outage':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'outage':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            System Status
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time status and performance metrics for all SuntynAI services and infrastructure.
          </p>
        </div>

        {/* Overall Status */}
        <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 rounded-2xl p-8 border border-green-500/30 mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <h2 className="text-2xl font-bold text-white">All Systems Operational</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">99.97%</div>
              <div className="text-slate-300">Overall Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">1.8s</div>
              <div className="text-slate-300">Avg Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-slate-300">Monitoring</div>
            </div>
          </div>
        </div>

        {/* Service Status */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Service Status</h2>
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            {services.map((service, index) => (
              <div key={index} className={`p-6 ${index !== services.length - 1 ? 'border-b border-slate-700/50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${getStatusDot(service.status)}`}></div>
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="text-slate-400 text-sm">Uptime</div>
                      <div className="text-white font-semibold">{service.uptime}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-sm">Response Time</div>
                      <div className="text-white font-semibold">{service.responseTime}</div>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <span className={`font-semibold capitalize ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl mb-3">📈</div>
              <div className="text-2xl font-bold text-cyan-400 mb-2">2.4M</div>
              <div className="text-slate-400 text-sm">Files Processed Today</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-2xl font-bold text-purple-400 mb-2">142ms</div>
              <div className="text-slate-400 text-sm">Avg API Response</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl mb-3">🌍</div>
              <div className="text-2xl font-bold text-green-400 mb-2">12</div>
              <div className="text-slate-400 text-sm">Global Regions</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl mb-3">🔒</div>
              <div className="text-2xl font-bold text-orange-400 mb-2">100%</div>
              <div className="text-slate-400 text-sm">Uptime SLA</div>
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Recent Incidents</h2>
          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{incident.title}</h3>
                    <p className="text-slate-400 text-sm">{incident.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    incident.status === 'resolved' ? 'bg-green-600/20 text-green-400' :
                    incident.status === 'completed' ? 'bg-blue-600/20 text-blue-400' :
                    'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {incident.status}
                  </span>
                </div>
                <p className="text-slate-300">{incident.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subscribe to Updates */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl p-8 border border-purple-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-slate-300 mb-6">Subscribe to status updates and maintenance notifications</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-l-lg text-white"
            />
            <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-3 rounded-r-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
