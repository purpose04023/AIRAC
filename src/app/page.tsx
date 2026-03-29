"use client";

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Terminal, 
  DollarSign, 
  Target, 
  Cpu, 
  Globe, 
  Zap,
  Briefcase,
  Play,
  Eye,
  Maximize2,
  Brain
} from 'lucide-react';

export default function Dashboard() {
  const [revenue, setRevenue] = useState(1240.50);
  const [status, setStatus] = useState({ active: false, health: 'OPTIMAL' });
  const [logs, setLogs] = useState<string[]>([]);
  const [visuals, setVisuals] = useState<{ screenshot: string | null; url: string }>({ screenshot: null, url: 'about:blank' });
  const [mind, setMind] = useState<{ thought: string; action: string }>({ thought: 'Awaiting initialization...', action: 'STBY' });
  const [approval, setApproval] = useState<{ active: boolean; type: string; data: string }>({ active: false, type: '', data: '' });
  const [activeMissions, setActiveMissions] = useState([
    { id: 1, platform: 'Upwork', title: 'React Performance Audit', status: 'In Progress', progress: 65 },
    { id: 2, platform: 'Freelancer', title: 'Python Scraper Dev', status: 'Bidding', progress: 10 },
    { id: 3, platform: 'Fiverr', title: 'AI Integration Script', status: 'Analyzing', progress: 40 },
  ]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/aria/status');
        const data = await res.json();
        setLogs(data.logs);
        setStatus(data.status);
        if (data.visuals) setVisuals(data.visuals);
        if (data.mind) setMind(data.mind);
        if (data.approval) setApproval(data.approval);
      } catch (err) {
        console.error('Failed to fetch status:', err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleWakeUp = async () => {
    await fetch('/api/aria/status', {
      method: 'POST',
      body: JSON.stringify({ action: 'WAKE_UP' }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const handleRunMission = async () => {
    await fetch('/api/aria/status', {
      method: 'POST',
      body: JSON.stringify({ action: 'RUN_MISSION', query: 'React Developer' }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const handleApproval = async (approved: boolean) => {
    await fetch('/api/aria/status', {
      method: 'POST',
      body: JSON.stringify({ action: approved ? 'APPROVE' : 'REJECT' }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center glass-card p-6 border-b-0">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-tr from-[#00f2ff] to-[#bc00ff] flex items-center justify-center ${status.active ? 'animate-pulse' : ''}`}>
            <Cpu className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter neon-text">ARIA v1.0.4</h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold flex items-center">
              <span className={`w-2 h-2 ${status.active ? 'bg-green-500 animate-ping' : 'bg-red-500'} rounded-full mr-2`} />
              {status.active ? 'Autonomous Mode: ACTIVE' : 'Status: STANDBY'}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="glass-card px-4 py-2 flex items-center space-x-2 border-[#00f2ff]/30">
            <Globe className="w-4 h-4 text-[#00f2ff]" />
            <span className="text-sm font-mono text-[#00f2ff]">SECURE: PROXY-72</span>
          </div>
          {!status.active ? (
            <button onClick={handleWakeUp} className="cyber-button px-6 py-2 rounded-lg text-sm flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>WAKE UP</span>
            </button>
          ) : (
            <button onClick={handleRunMission} className="cyber-button px-6 py-2 rounded-lg text-sm">
              NEW MISSION
            </button>
          )}
        </div>
      </header>

      {/* Hero Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign />} label="TOTAL REVENUE" value={`$${revenue.toLocaleString()}`} color="text-green-400" />
        <StatCard icon={<Target />} label="SUCCESS RATE" value="98.2%" color="text-[#00f2ff]" />
        <StatCard icon={<Activity />} label="MISSIONS COMPLETED" value="142" color="text-[#bc00ff]" />
        <StatCard icon={<Zap />} label="AGENT EFFICIENCY" value="94.8%" color="text-orange-400" />
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Missions */}
        <div className="lg:col-span-2 glass-card p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-[#00f2ff]" />
              <span>ACTIVE MISSIONS</span>
            </h2>
            <span className="text-xs text-gray-500 font-mono">LIVE FEED</span>
          </div>
          
          <div className="space-y-4">
            {activeMissions.map((mission) => (
              <div key={mission.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00f2ff]/30 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00f2ff] px-2 py-0.5 rounded bg-[#00f2ff]/10">
                      {mission.platform}
                    </span>
                    <h3 className="font-semibold mt-1">{mission.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-gray-400">{mission.status}</span>
                    <div className="text-lg font-bold text-[#00f2ff]">{mission.progress}%</div>
                  </div>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00f2ff] to-[#bc00ff] transition-all duration-1000"
                    style={{ width: `${mission.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Console & Visuals Sidebar */}
        <div className="space-y-8 flex flex-col h-full lg:col-span-1">
          {/* Agent Mind (Thoughts) */}
          <div className="glass-card p-6 border-l-4 border-[#bc00ff] bg-gradient-to-r from-[#bc00ff]/5 to-transparent">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-[#bc00ff]" />
              <h2 className="text-xl font-bold">AGENT MIND</h2>
            </div>
            <div className="space-y-4">
              <div className="p-3 rounded bg-black/40 border border-white/5 font-mono text-[11px] leading-relaxed text-gray-300">
                <span className="text-[#bc00ff] mr-2">&gt; THOUGHT:</span>
                {mind.thought}
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-[#bc00ff]/10 border border-[#bc00ff]/30">
                <span className="text-[10px] font-bold text-[#bc00ff] uppercase tracking-widest">Next Action:</span>
                <span className="text-xs font-mono font-bold text-white">{mind.action}</span>
              </div>
            </div>
          </div>

          {/* Agent Visuals (The Eyes) */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <Eye className="w-5 h-5 text-[#00f2ff]" />
                <span>AGENT VISUALS</span>
              </h2>
              <Maximize2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white" />
            </div>
            
            <div className="relative aspect-video rounded-lg bg-black/60 border border-white/10 overflow-hidden group">
              {visuals.screenshot ? (
                <img 
                  src={`data:image/jpeg;base64,${visuals.screenshot}`} 
                  alt="Agent View" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 space-y-2">
                  <Globe className="w-8 h-8 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Awaiting Visual Stream</span>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-md border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-gray-400 truncate max-w-[150px]">{visuals.url}</span>
                <span className="text-[9px] font-mono text-[#00f2ff] animate-pulse">LIVE</span>
              </div>
            </div>
          </div>

          {/* Console / Log */}
          <div className="glass-card p-6 space-y-4 flex flex-col flex-grow min-h-[300px]">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-[#bc00ff]" />
            <span>CORE LOG</span>
          </h2>
          <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-gray-400 flex-grow space-y-2 overflow-y-auto max-h-[600px]">
            {logs.length === 0 ? (
              <div className="text-gray-600 animate-pulse italic">Awaiting brain synchronization...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="flex space-x-2">
                  <span className="text-[#bc00ff] shrink-0">[{log.substring(1, 9)}]</span>
                  <span className="text-gray-300">{log.substring(11)}</span>
                </div>
              ))
            )}
            <div className="animate-pulse flex space-x-1 mt-4">
              <div className="w-1 h-1 bg-[#00f2ff] rounded-full" />
              <div className="w-1 h-1 bg-[#00f2ff] rounded-full" />
              <div className="w-1 h-1 bg-[#00f2ff] rounded-full" />
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Approval Overlay */}
      {approval.active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
          <div className="glass-card max-w-md w-full p-8 border-t-4 border-[#00f2ff] space-y-6 animate-in zoom-in duration-300">
            <div className="flex items-center space-x-3 text-[#00f2ff]">
              <Zap className="w-6 h-6" />
              <h2 className="text-2xl font-bold tracking-tighter">ACTION REQUIRED</h2>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              ARIA is requesting authorization to execute a critical action:
              <br/>
              <span className="font-mono text-[#00f2ff] mt-2 block bg-white/5 p-2 rounded">
                [{approval.type.toUpperCase()}] {approval.data}
              </span>
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleApproval(false)}
                className="px-6 py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-bold transition-all"
              >
                ABORT
              </button>
              <button 
                onClick={() => handleApproval(true)}
                className="cyber-button px-6 py-3 rounded-xl font-bold"
              >
                AUTHORIZE
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="glass-card p-6 space-y-2 hover:translate-y-[-4px] transition-all">
      <div className={`p-2 w-fit rounded-lg bg-white/5 ${color}`}>
        {icon}
      </div>
      <p className="text-xs font-bold text-gray-500 tracking-widest">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
