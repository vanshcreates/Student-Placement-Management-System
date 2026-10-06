import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, DollarSign, 
  Calendar, GraduationCap, Building2, ChevronRight, 
  CheckCircle2, Clock, X, Briefcase 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// --- MOCK DATA ---
const INITIAL_DRIVES = [
  {
    id: 1,
    company: "Google",
    role: "Software Development Engineer",
    logo: "https://www.google.com/favicon.ico",
    ctc: "32 - 45 LPA",
    type: "Full Time",
    location: "Bangalore / Hyderabad",
    eligibleBatch: "2025 / 2026",
    minCgpa: 8.0,
    deadline: "2026-10-15",
    status: "Active",
    applied: false,
    eligible: true,
    description: "Looking for strong foundational knowledge in Data Structures, Algorithms, System Design, and Problem Solving.",
    process: ["Online Assessment", "Technical Interview I", "Technical Interview II", "HR / Googliness Round"]
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Support Engineer / SWE",
    logo: "https://www.microsoft.com/favicon.ico",
    ctc: "28 - 36 LPA",
    type: "Full Time + Intern",
    location: "Noida / Hyderabad",
    eligibleBatch: "2025",
    minCgpa: 7.5,
    deadline: "2026-10-10",
    status: "Closing Soon",
    applied: true,
    eligible: true,
    description: "Develop scalable cloud services, distributed systems, and collaborative web platforms on Azure.",
    process: ["Online Coding Test", "Technical Interview 1", "Technical Interview 2", "AA Round"]
  }
];

const CTC_DISTRIBUTION = [
  { range: '< 10 LPA', count: 8 },
  { range: '10 - 20 LPA', count: 18 },
  { range: '20 - 30 LPA', count: 12 },
  { range: '30+ LPA', count: 6 },
];

const DRIVE_STATUS_DATA = [
  { name: 'Active', value: 12, color: '#15803d' },
  { name: 'Closing Soon', value: 4, color: '#ca8a04' },
  { name: 'Completed', value: 15, color: '#475569' },
];

// --- REACT COMPONENT ---
const Drives=() =>{
  // 1. React State Hooks
  const [drives, setDrives] = useState(INITIAL_DRIVES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedDrive, setSelectedDrive] = useState(null);

  // 2. Helper Handlers
  const filteredDrives = drives.filter((drive) => {
    const matchesSearch = drive.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          drive.role.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'Eligible') return matchesSearch && drive.eligible;
    if (filterType === 'Applied') return matchesSearch && drive.applied;
    return matchesSearch;
  });

  const handleApply = (id) => {
    setDrives((prev) =>
      prev.map((d) => (d.id === id ? { ...d, applied: true } : d))
    );
    if (selectedDrive?.id === id) {
      setSelectedDrive((prev) => ({ ...prev, applied: true }));
    }
  };

  // 3. JSX Return Render
  return (
    <div className="min-h-screen bg-[#f3f4f0] text-gray-800 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0c2a21]">Placement Drives</h1>
            <p className="text-gray-600 mt-1">Explore ongoing placement opportunities and status.</p>
          </div>
        </div>

        {/* Recharts Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-[#0c2a21] mb-4">CTC Ranges Offered</h3>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CTC_DISTRIBUTION}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1e4d3b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-[#0c2a21] mb-2">Drive Status</h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={DRIVE_STATUS_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={65}>
                    {DRIVE_STATUS_DATA.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Drives List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDrives.map((drive) => (
            <div key={drive.id} className="bg-white p-5 rounded-xl border border-gray-200 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">{drive.company}</h3>
                <span className="text-xs px-2.5 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                  {drive.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#0c2a21]">{drive.role}</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>CTC:</strong> {drive.ctc}</p>
                <p><strong>Location:</strong> {drive.location}</p>
              </div>
              <div className="pt-2 flex justify-between items-center border-t border-gray-100">
                <button onClick={() => setSelectedDrive(drive)} className="text-xs p-1.5 font-semibold text-[#0c2a21]">
                  View Details
                </button>
                <button style={{border:'none'}}
                  onClick={() => handleApply(drive.id)}
                  disabled={drive.applied}
                  className="px-3 py-1.5 text-xs green-bg-container text-white rounded-lg disabled:bg-gray-300"
                >
                  {drive.applied ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
export default Drives