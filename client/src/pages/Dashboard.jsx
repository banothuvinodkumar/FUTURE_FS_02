import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, BarChart3, Settings, 
  Menu, Search, Bell, X, TrendingUp, UserPlus, 
  PhoneCall, CheckCircle, Filter, Trash2, Eye, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import toast from 'react-hot-toast';
import leadService from '../services/leadService';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#2563eb', '#f97316', '#22c55e']; // Blue, Orange, Green

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  // Modal States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  
  useEffect(() => {
    if (user && user.isAdmin) {
      fetchLeads();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchLeads = async () => {
    try {
      const data = await leadService.getLeads();
      setLeads(data);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async () => {
    try {
      await leadService.deleteLead(leadToDelete._id);
      toast.success('Lead deleted successfully');
      setIsDeleteOpen(false);
      fetchLeads();
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const currentLeads = filteredLeads.slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage);

  // Analytics
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const convertedLeads = leads.filter(l => l.status === 'Converted').length;

  const rawStatusData = [
    { name: 'New', value: newLeads },
    { name: 'Contacted', value: contactedLeads },
    { name: 'Converted', value: convertedLeads },
  ].filter(d => d.value > 0);
  const statusData = rawStatusData.length > 0 ? rawStatusData : [{ name: 'No Data', value: 1 }];

  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map(m => ({ name: m, leads: 0, converted: 0 }));
    leads.forEach(lead => {
      const date = new Date(lead.createdAt);
      data[date.getMonth()].leads += 1;
      if (lead.status === 'Converted') data[date.getMonth()].converted += 1;
    });
    const currentMonth = new Date().getMonth();
    let startMonth = currentMonth - 5;
    if (startMonth < 0) startMonth = 0;
    const result = data.slice(startMonth, currentMonth + 1);
    return result.length > 0 ? result : [{ name: months[currentMonth], leads: 0, converted: 0 }];
  };
  const monthlyData = getMonthlyData();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  if (user && !user.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
          <X size={40} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Access Denied</h1>
        <p className="text-slate-500 mt-2 mb-8 max-w-md">You must be an administrator to view the CRM dashboard and manage leads.</p>
        <Link to="/" className="px-8 py-3 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30">Return Home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex h-screen bg-slate-50 overflow-hidden font-sans"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-400/20 blur-[120px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-400/20 blur-[120px] mix-blend-multiply animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] mix-blend-multiply animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
              onClick={() => setIsDeleteOpen(false)} 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm relative z-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                <Trash2 size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Lead?</h2>
              <p className="text-slate-500 mb-8">Are you sure you want to delete <span className="font-semibold text-slate-700">{leadToDelete?.name}</span>? This action cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">Cancel</button>
                <button onClick={handleDeleteLead} className="flex-1 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-white/80 backdrop-blur-2xl border-r border-white/40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
      <div className="flex flex-col h-full">
        <div className="p-6 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-500">
            MiniCRM.
          </div>
          <button className="lg:hidden text-slate-500 hover:text-slate-800" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
            <X size={24} />
          </button>
        </div>

        <nav className="px-4 mt-6 space-y-2 flex-1">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', id: 'Dashboard' },
            { icon: Users, label: 'Leads', id: 'Leads' },
            { icon: BarChart3, label: 'Analytics', id: 'Analytics' },
            { icon: Settings, label: 'Settings', id: 'Settings' },
          ].map((item, idx) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={idx}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                  isActive 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30' 
                    : 'text-slate-600 hover:bg-white/60 hover:text-violet-600 hover:shadow-sm'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 mt-auto border-t border-slate-200/50">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white/40 backdrop-blur-xl border-b border-white/40 flex items-center justify-between px-4 sm:px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center flex-1 mr-4">
            <button 
              className="lg:hidden mr-2 sm:mr-4 p-2 rounded-xl bg-white/50 text-slate-600 hover:bg-white transition-colors shrink-0"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center relative w-full max-w-md">
              <Search className="absolute left-3 sm:left-4 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 bg-white/50 border border-white/60 focus:border-violet-300 rounded-full w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm backdrop-blur-sm placeholder-slate-400 text-slate-700 text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <button className="relative p-2.5 rounded-full bg-white/50 text-slate-600 hover:bg-white hover:text-violet-600 transition-all shadow-sm" aria-label="Notifications">
              <Bell size={20} />
              {leads.length > 0 && <><span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full animate-ping"></span><span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></span></>}
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 p-[2px] shadow-lg shadow-violet-500/30 cursor-pointer hover:scale-105 transition-transform">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-500">{user?.name?.charAt(0) || 'U'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-8"
          >
            <div className="flex justify-between items-end">
              <div className="w-full">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">{activeTab}</h1>
                <p className="text-slate-500">Welcome back! Here is your latest CRM data.</p>
              </div>
            </div>

            {/* Analytics Cards */}
            {(activeTab === 'Dashboard' || activeTab === 'Analytics') && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Leads', value: leads.length, icon: TrendingUp, color: 'from-indigo-500 to-cyan-400', shadow: 'shadow-indigo-500/20' },
                  { title: 'New Leads', value: newLeads, icon: UserPlus, color: 'from-blue-500 to-blue-400', shadow: 'shadow-blue-500/20' },
                  { title: 'Contacted', value: contactedLeads, icon: PhoneCall, color: 'from-orange-500 to-amber-400', shadow: 'shadow-orange-500/20' },
                  { title: 'Converted', value: convertedLeads, icon: CheckCircle, color: 'from-emerald-500 to-teal-400', shadow: 'shadow-emerald-500/20' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon size={24} />
                      </div>
                    </div>
                    <h3 className="text-slate-500 font-medium mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Charts Section */}
            {(activeTab === 'Dashboard' || activeTab === 'Analytics') && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Area Chart */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Lead Acquisition & Conversion</h3>
                  <div className="h-[300px] w-full min-w-0">
                    <ResponsiveContainer width="99%" height="100%">
                      <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorConverted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Area type="monotone" dataKey="leads" name="Total Leads" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                        <Area type="monotone" dataKey="converted" name="Converted" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorConverted)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Pie Chart */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Lead Status</h3>
                  <div className="h-[250px] w-full flex items-center justify-center min-w-0">
                    <ResponsiveContainer width="99%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          itemStyle={{ color: '#334155', fontWeight: 500 }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-4 mt-2">
                    {leads.length > 0 ? (
                      statusData.map((entry, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                          <span className="text-slate-600 font-medium">{entry.name}</span>
                        </div>
                      ))
                    ) : (<span className="text-slate-400 text-sm">No leads created yet</span>)}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Table Section */}
            {(activeTab === 'Dashboard' || activeTab === 'Leads') && (
              <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-slate-900">Recent Leads</h3>
                  
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <select 
                        className="pl-9 pr-8 py-2 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-500/20 text-sm font-medium text-slate-600 appearance-none shadow-sm cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="All">All Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-500 text-sm font-medium border-b border-slate-100">
                        <th className="py-4 px-4 sm:px-6 md:px-8">Name</th>
                        <th className="py-4 px-4 sm:px-6 md:px-8 hidden sm:table-cell">Email & Phone</th>
                        <th className="py-4 px-4 sm:px-6 md:px-8 hidden md:table-cell">Source</th>
                        <th className="py-4 px-4 sm:px-6 md:px-8 hidden lg:table-cell">Created Date</th>
                        <th className="py-4 px-4 sm:px-6 md:px-8">Status</th>
                        <th className="py-4 px-4 sm:px-6 md:px-8 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/50">
                      {loading ? (
                        [...Array(5)].map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            <td className="py-4 px-4 sm:px-6 md:px-8"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                            <td className="py-4 px-4 sm:px-6 md:px-8 hidden sm:table-cell"><div className="h-4 bg-slate-200 rounded w-32 mb-2"></div><div className="h-3 bg-slate-100 rounded w-24"></div></td>
                            <td className="py-4 px-4 sm:px-6 md:px-8 hidden md:table-cell"><div className="h-4 bg-slate-200 rounded w-16"></div></td>
                            <td className="py-4 px-4 sm:px-6 md:px-8 hidden lg:table-cell"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                            <td className="py-4 px-4 sm:px-6 md:px-8"><div className="h-6 bg-slate-200 rounded-full w-20"></div></td>
                            <td className="py-4 px-4 sm:px-6 md:px-8 text-right"><div className="h-8 bg-slate-200 rounded w-16 ml-auto"></div></td>
                          </tr>
                        ))
                      ) : currentLeads.length > 0 ? (
                        currentLeads.map((lead) => (
                          <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="py-4 px-4 sm:px-6 md:px-8">
                              <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm shadow-inner border border-white">
                                  {lead.name.charAt(0).toUpperCase()}
                                </div>
                              <div className="max-w-[120px] sm:max-w-none truncate">
                                  <Link to={`/leads/${lead._id}`} className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">{lead.name}</Link>
                                  <p className="text-sm text-slate-500">{lead.company || 'No Company'}</p>
                                </div>
                              </div>
                            </td>
                          <td className="py-4 px-4 sm:px-6 md:px-8 hidden sm:table-cell">
                              <p className="text-slate-900 text-sm font-medium">{lead.email}</p>
                              <p className="text-slate-500 text-sm">{lead.phone}</p>
                            </td>
                          <td className="py-4 px-4 sm:px-6 md:px-8 hidden md:table-cell text-slate-600 text-sm font-medium">
                              {lead.source}
                            </td>
                          <td className="py-4 px-4 sm:px-6 md:px-8 hidden lg:table-cell text-slate-600 text-sm">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                          <td className="py-4 px-4 sm:px-6 md:px-8">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border
                                ${lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                  lead.status === 'Contacted' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                                  'bg-green-50 text-green-600 border-green-100'}`}
                              >
                                {lead.status === 'New' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>}
                                {lead.status === 'Contacted' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></span>}
                                {lead.status === 'Converted' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>}
                                {lead.status}
                              </span>
                            </td>
                          <td className="py-4 px-4 sm:px-6 md:px-8 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Link to={`/leads/${lead._id}`} className="text-slate-400 hover:text-violet-600 transition-colors p-2 hover:bg-violet-50 rounded-lg" title="View Details" aria-label="View lead details">
                                  <Eye size={18} />
                                </Link>
                                <button onClick={() => {setLeadToDelete(lead); setIsDeleteOpen(true);}} className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg" title="Delete Lead" aria-label="Delete lead">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="py-16 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-500">
                              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Users size={32} className="text-slate-400" />
                              </div>
                              <p className="text-lg font-medium text-slate-700">No leads found</p>
                              <p className="text-sm mb-6">Try adjusting your search filters.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-slate-100/50 flex items-center justify-between bg-slate-50/30">
                    <span className="text-sm text-slate-500 font-medium">
                      Showing {(currentPage - 1) * leadsPerPage + 1} to {Math.min(currentPage * leadsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-white transition-colors bg-white/50"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-white transition-colors bg-white/50"
                        aria-label="Next page"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Settings Section */}
            {activeTab === 'Settings' && (
              <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 text-center py-20">
                <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Settings Overview</h2>
                <p className="text-slate-500 max-w-md mx-auto">Admin configuration options and settings will be available here in a future update.</p>
              </motion.div>
            )}
            
            {/* Bottom spacer */}
            <div className="h-6"></div>
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default Dashboard;