import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Mail, Phone, Building, Globe, Calendar, Clock, Trash2, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import leadService from '../services/leadService';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const data = await leadService.getLeadById(id);
      setLead(data);
    } catch (error) {
      toast.error('Failed to load lead details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updated = await leadService.updateLead(id, { status: newStatus });
      setLead(updated);
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    
    try {
      const updated = await leadService.updateLead(id, { note: noteText });
      setLead(updated);
      setNoteText('');
      toast.success('Note added successfully');
    } catch (error) {
      toast.error('Failed to add note');
    }
  };

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-3 min-w-[250px]">
        <p className="font-bold text-red-600 text-lg">Delete Lead?</p>
        <p className="text-sm text-slate-700 font-medium">Are you sure you want to delete <span className="text-red-700 font-bold">{lead.name}</span>?</p>
        <div className="flex justify-end gap-3 mt-3">
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 bg-white rounded-xl transition-colors border border-slate-300"
          >
            Cancel
          </button>
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await leadService.deleteLead(id);
                toast.success('Lead deleted successfully');
                navigate('/dashboard');
              } catch (error) {
                toast.error('Failed to delete lead');
              }
            }} 
            className="px-4 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-lg shadow-red-500/30"
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: Infinity, id: 'delete-confirm', style: { backgroundColor: '#fff1f2', border: '1px solid #fecdd3' } });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-[100] flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-400/20 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] rounded-full bg-pink-400/20 blur-[120px] mix-blend-multiply"></div>
      </div>

      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <header className="h-20 bg-white/40 backdrop-blur-xl border-b border-white/40 flex items-center px-6 lg:px-10 sticky top-0 z-30">
          <Link to="/dashboard" className="flex items-center text-slate-500 hover:text-violet-600 transition-colors font-medium bg-white/50 px-4 py-2 rounded-full border border-white hover:shadow-sm">
            <ChevronLeft size={20} className="mr-1" /> Back to Dashboard
          </Link>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Lead Info Card */}
              <div className="bg-white/60 backdrop-blur-xl border border-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 border-b border-slate-100 pb-8">
                  <div className="h-20 w-20 shrink-0 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold text-3xl shadow-lg shadow-violet-500/30">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 break-words">{lead.name}</h1>
                    <p className="text-slate-500 text-lg flex items-center mt-1"><Building size={18} className="mr-2" /> {lead.company || 'Independent'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3 text-slate-600"><Mail className="text-violet-500 mt-1" size={20} /><div><p className="text-sm font-semibold text-slate-900 mb-1">Email</p><a href={`mailto:${lead.email}`} className="hover:text-violet-600">{lead.email}</a></div></div>
                  <div className="flex items-start space-x-3 text-slate-600"><Phone className="text-violet-500 mt-1" size={20} /><div><p className="text-sm font-semibold text-slate-900 mb-1">Phone</p><a href={`tel:${lead.phone}`} className="hover:text-violet-600">{lead.phone}</a></div></div>
                  <div className="flex items-start space-x-3 text-slate-600"><Globe className="text-violet-500 mt-1" size={20} /><div><p className="text-sm font-semibold text-slate-900 mb-1">Source</p><p>{lead.source}</p></div></div>
                  <div className="flex items-start space-x-3 text-slate-600"><Calendar className="text-violet-500 mt-1" size={20} /><div><p className="text-sm font-semibold text-slate-900 mb-1">Created Date</p><p>{new Date(lead.createdAt).toLocaleDateString()}</p></div></div>
                </div>
              </div>

              {/* User Message Card */}
              {lead.message && (
                <div className="bg-white/60 backdrop-blur-xl border border-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center"><MessageSquare size={20} className="mr-2 text-violet-500" /> User Message</h2>
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm relative">
                    <div className="absolute top-4 left-4 text-violet-200">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    </div>
                    <p className="text-slate-700 whitespace-pre-wrap pl-8 relative z-10 italic font-medium">{lead.message}</p>
                  </div>
                </div>
              )}

              {/* Notes Card */}
              <div className="bg-white/60 backdrop-blur-xl border border-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center"><Clock size={20} className="mr-2 text-violet-500" /> Follow-up Notes</h2>
                <form onSubmit={handleAddNote} className="mb-8">
                  <textarea 
                    value={noteText} onChange={(e) => setNoteText(e.target.value)} 
                    placeholder="Add a new follow-up note..." 
                    className="w-full px-5 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none h-32 mb-4" 
                    required
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                      <Send size={18} /> Save Note Internally
                    </button>
                    <button type="button" onClick={(e) => { if (!noteText.trim()) return toast.error('Please write a note first.'); const subject = encodeURIComponent('Following up on your inquiry'); const body = encodeURIComponent(`Hi ${lead.name},\n\n${noteText}\n\nBest regards,\nAdmin Team`); window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`; handleAddNote(e); }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-medium rounded-xl shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-all">
                      <Mail size={18} /> Save & Email User
                    </button>
                  </div>
                </form>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {lead.notes && lead.notes.length > 0 ? (
                    [...lead.notes].reverse().map((note, idx) => (
                      <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-slate-700 mb-3">{note.text}</p>
                        <div className="flex items-center text-xs font-medium text-slate-400"><Clock size={12} className="mr-1.5" />{new Date(note.createdAt).toLocaleString()}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-slate-500">No follow-up notes added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Status Update Card */}
              <div className="bg-white/60 backdrop-blur-xl border border-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Lead Status</h3>
                <select 
                  value={lead.status} 
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 font-bold cursor-pointer focus:outline-none appearance-none text-center shadow-sm transition-colors
                    ${lead.status === 'New' ? 'border-blue-200 text-blue-600 bg-blue-50 focus:border-blue-500' : 
                      lead.status === 'Contacted' ? 'border-orange-200 text-orange-600 bg-orange-50 focus:border-orange-500' : 
                      'border-green-200 text-green-600 bg-green-50 focus:border-green-500'}`}
                >
                  <option value="New">🔵 New Lead</option>
                  <option value="Contacted">🟠 Contacted</option>
                  <option value="Converted">🟢 Converted</option>
                </select>
              </div>

              {/* Actions Card */}
              <div className="bg-white/60 backdrop-blur-xl border border-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border-t-4 border-t-red-500">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Danger Zone</h3>
                <p className="text-sm text-slate-500 mb-6">Permanently remove this lead and all associated notes.</p>
                <button onClick={handleDelete} className="w-full flex items-center justify-center py-3 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-colors border border-red-100 group">
                  <Trash2 size={18} className="mr-2 group-hover:animate-bounce" /> Delete Lead
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default LeadDetails;