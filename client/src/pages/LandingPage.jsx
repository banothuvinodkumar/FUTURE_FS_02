import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import leadService from '../services/leadService';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '', source: 'Website' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await leadService.createLead(formData);
      toast.success('Thank you! Our team will contact you soon.');
      setFormData({ name: '', email: '', phone: '', company: '', message: '', source: 'Website' });
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden bg-slate-50 relative min-h-screen">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 blur-[120px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-400/30 blur-[120px] mix-blend-multiply animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-400/30 blur-[120px] mix-blend-multiply animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-md text-purple-700 text-sm font-semibold mb-6 border border-purple-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              The #1 Mini CRM for Modern Teams
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              Manage your leads with <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 animate-gradient-x">
                intelligent simplicity.
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Streamline your sales process, track analytics in real-time, and convert more prospects into paying customers with our beautiful platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-all duration-300">
                Pricing Plans
              </a>
              <a href="#analytics" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                View Analytics
              </a>
            </div>
          </motion.div>

          {/* Dashboard Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white/40 backdrop-blur-xl border border-white p-2 md:p-4 rounded-3xl shadow-2xl">
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-800">
                <div className="h-10 bg-slate-950 flex items-center px-4 space-x-2 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 h-[300px] md:h-[450px]">
                  {/* Mockup Analytics Content */}
                  <div className="col-span-1 space-y-4 hidden md:block">
                    <div className="h-8 w-24 bg-slate-800 rounded mb-8"></div>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-10 bg-slate-800/50 rounded-lg w-full"></div>
                    ))}
                  </div>
                  <div className="col-span-1 md:col-span-3 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col justify-end">
                          <div className="h-2 w-1/2 bg-slate-600 rounded mb-2"></div>
                          <div className="h-6 w-3/4 bg-slate-400 rounded"></div>
                        </div>
                      ))}
                    </div>
                    <div className="h-48 md:h-64 bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                       <div className="w-full h-full flex items-end space-x-2">
                         {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                           <div key={i} className="w-full bg-gradient-to-t from-violet-500 to-pink-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer" style={{ height: `${height}%` }}></div>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Powerful features, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">beautifully designed</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Everything you need to manage your customer relationships, without the clutter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Lead Tracking", desc: "Never lose a prospect again. Track every interaction and set reminders automatically.", color: "from-blue-400 to-indigo-500" },
              { title: "Smart Analytics", desc: "Gain insights into your sales pipeline with beautiful, easy-to-understand charts.", color: "from-violet-400 to-purple-500" },
              { title: "Team Collaboration", desc: "Share notes, assign tasks, and close deals faster together with your entire team.", color: "from-pink-400 to-rose-500" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl mb-8 bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-24 relative z-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Deep dive into your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Sales Analytics</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Make data-driven decisions with our comprehensive reporting and analytics dashboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Conversion Rates", desc: "Track how many leads turn into paying customers over time and identify bottlenecks.", color: "from-blue-400 to-indigo-500" },
              { title: "Lead Velocity", desc: "Measure the speed at which leads move through your sales pipeline.", color: "from-violet-400 to-purple-500" },
              { title: "Revenue Forecasting", desc: "Predict future revenue based on historical data and current pipeline value.", color: "from-pink-400 to-rose-500" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl mb-8 bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative z-10 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">transparent pricing</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Choose the perfect plan for your growing business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
              <div className="text-4xl font-black text-slate-900 mb-6">$0<span className="text-lg text-slate-500 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-600"><svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Up to 100 Leads</li>
                <li className="flex items-center text-slate-600"><svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Basic Analytics</li>
                <li className="flex items-center text-slate-600"><svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Email Support</li>
              </ul>
              <Link to="/login" state={{ mode: 'register' }} className="block w-full py-3 px-4 bg-slate-100 text-slate-700 text-center font-bold rounded-xl hover:bg-slate-200 transition-colors">Get Started</Link>
            </motion.div>
            {/* Pro */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl transform md:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
              <div className="text-4xl font-black text-white mb-6">$29<span className="text-lg text-slate-400 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-300"><svg className="w-5 h-5 text-pink-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Unlimited Leads</li>
                <li className="flex items-center text-slate-300"><svg className="w-5 h-5 text-pink-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Advanced Analytics</li>
                <li className="flex items-center text-slate-300"><svg className="w-5 h-5 text-pink-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Custom Automations</li>
                <li className="flex items-center text-slate-300"><svg className="w-5 h-5 text-pink-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Priority Support</li>
              </ul>
              <Link to="/login" state={{ mode: 'register' }} className="block w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-center font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">Start Free Trial</Link>
            </motion.div>
            {/* Enterprise */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-black text-slate-900 mb-6">$99<span className="text-lg text-slate-500 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-600"><svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Everything in Pro</li>
                <li className="flex items-center text-slate-600"><svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Dedicated Account Manager</li>
                <li className="flex items-center text-slate-600"><svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Custom Integrations</li>
              </ul>
              <a href="#contact" className="block w-full py-3 px-4 bg-slate-100 text-slate-700 text-center font-bold rounded-xl hover:bg-slate-200 transition-colors">Contact Sales</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative z-10 bg-slate-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-[-5%] w-96 h-96 bg-purple-300/20 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-blue-300/20 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-violet-600 font-bold tracking-wider uppercase text-sm mb-4 block"
            >
              Wall of Love
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
            >
              Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500">innovative teams</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              See how modern businesses are growing their revenue and streamlining their sales process with LeadFlow.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: 'Sarah Jenkins',
                role: 'Head of Sales',
                company: 'TechGrowth Startup',
                text: 'LeadFlow completely transformed our lead management. The simplicity of the CRM combined with powerful analytics helped us increase our conversion rate by 40% in just two months.',
                gradient: 'from-violet-500 to-fuchsia-500',
                initial: 'S'
              },
              {
                name: 'Marcus Chen',
                role: 'Managing Director',
                company: 'Elevate Digital Agency',
                text: "Finally, a CRM that doesn't feel like a chore to use. Our team productivity skyrocketed once we ditched our clunky old system. Tracking interactions and workflow improvements has never been this seamless.",
                gradient: 'from-blue-500 to-cyan-400',
                initial: 'M'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Growth Marketing',
                company: 'CloudSync SaaS',
                text: 'The analytics dashboard is a game-changer. Being able to visualize our pipeline and revenue forecasting accurately allows us to make data-driven decisions instantly.',
                gradient: 'from-pink-500 to-rose-400',
                initial: 'E'
              },
              {
                name: 'David Thompson',
                role: 'Principal Broker',
                company: 'Prime Real Estate',
                text: "In real estate, following up is everything. The smart reminders and beautiful interface mean my agents actually want to log their leads. It's elegant, fast, and highly effective.",
                gradient: 'from-amber-400 to-orange-500',
                initial: 'D'
              },
              {
                name: 'Jessica Lee',
                role: 'Account Director',
                company: 'Nexus Marketing Agency',
                text: 'We handle hundreds of leads across multiple campaigns. LeadFlow gives us the clarity we need. The team collaboration features keep everyone aligned and closing deals faster.',
                gradient: 'from-emerald-400 to-teal-500',
                initial: 'J'
              },
              {
                name: 'Robert Fitzgerald',
                role: 'Senior Partner',
                company: 'Apex Consulting Group',
                text: "What I love most is the sheer simplicity of the CRM. There's zero learning curve, yet it packs all the essential features we need to manage our high-ticket client relationships.",
                gradient: 'from-indigo-500 to-purple-500',
                initial: 'R'
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                className="relative group h-full"
              >
                {/* Gradient blur behind card on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Card */}
                <div className="relative h-full bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-white/80 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-purple-500/10 transition-all duration-300 flex flex-col">
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-slate-700 leading-relaxed font-medium mb-8 flex-grow">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center mt-auto pt-6 border-t border-slate-100">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0`}>
                      {testimonial.initial}
                    </div>
                    <div className="ml-4 overflow-hidden">
                      <h4 className="font-bold text-slate-900 truncate">{testimonial.name}</h4>
                      <p className="text-slate-500 text-sm font-medium truncate">{testimonial.role} @ <span className="text-slate-600">{testimonial.company}</span></p>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 relative z-10 px-6 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500">Touch</span></h2>
            <p className="text-lg text-slate-600">Fill out the form below and our team will get back to you shortly.</p>
          </div>
          {user ? (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                  <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow" placeholder="Your Company" />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-70">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          ) : (
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
              <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Login Required</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">Please log in or create an account to submit your details and get in touch with our team.</p>
              <button onClick={() => navigate('/login')} className="inline-block px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                Log in to Continue
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-purple-900/20"
          >
            <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[150%] bg-gradient-to-br from-violet-600 to-transparent blur-[100px] transform rotate-12 opacity-50"></div>
            <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[150%] bg-gradient-to-tl from-pink-500 to-transparent blur-[100px] transform -rotate-12 opacity-50"></div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10 tracking-tight">Ready to boost your sales?</h2>
            <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto relative z-10">Join thousands of companies who are already using Mini CRM to close deals faster and smarter.</p>
            <a href="#contact" className="inline-block px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 relative z-10">
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 relative z-10">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <p className="mb-4">Making customer relationship management beautiful, simple, and effective.</p>
          <p>&copy; {new Date().getFullYear()} MiniCRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;