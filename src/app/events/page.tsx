'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { X, Info, Users, Phone, Zap, ArrowRight, ShieldCheck, Star, Search, Ticket, Layers, CheckCircle2, AlertCircle, Calendar, Trophy, Coins } from 'lucide-react';

// --- SHARED CONTACTS ---
const GENERAL_CONTACTS = [
  'Kavyasri - 9360472535',
  'Padmapriya - 8807798794',
  'Jithesh - 8754020480'
];



// --- TECH EVENTS ---
const TECH_EVENTS = [
  { 
    id: 'poster-presentation', 
    name: 'Poster Presentation', 
    description: 'Encourages concise and visually impactful communication of ideas, research concepts, and engineering innovations. Participants present well-structured posters highlighting objectives, methodology, and key findings.', 
    is_technical: true, 
    is_flagship: true, 
    team_size: '1 to 5',
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop', 
    themes: [
      'AI/ML in Chemical/Allied Engineering',
      'Waste to wealth and Circular Economy',
      'Process safety, risk and disaster prevention',
      'Carbon Capture and utilization',
      'Environmental and sustainable development',
      'Modelling and Simulation in Process Engineering',
      'Catalysis and Reaction Engineering',
      'Green Chemistry and Engineering',
      'Alternative energy sources and storage',
      'Advanced Materials and Nanotechnology'
    ]
  },
  { 
    id: 'paper-presentation', 
    name: 'Paper Presentation', 
    description: 'A platform for students and researchers to showcase innovative ideas and technical expertise. Present original research, review studies, or case analyses related to emerging trends in engineering.', 
    is_technical: true, 
    is_flagship: true, 
    team_size: '1 to 5',
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop',
    themes: [
      'AI/ML in Chemical/Allied Engineering',
      'Waste to wealth and Circular Economy',
      'Process safety, risk and disaster prevention',
      'Carbon Capture and utilization',
      'Environmental and sustainable development',
      'Modelling and Simulation in Process Engineering',
      'Catalysis and Reaction Engineering',
      'Green Chemistry and Engineering',
      'Alternative energy sources and storage',
      'Advanced Materials and Nanotechnology'
    ]
  },
  { 
    id: 'reverse-engineering', 
    name: 'Reverse Engineering', 
    description: 'Chemical Product Analysis: Test your understanding of chemical formulation. Analyze a commonly used chemical product and identify its constituent ingredients based on chemical knowledge.', 
    is_technical: true, 
    is_flagship: false, 
    team_size: '1 to 3',
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop',
    themes: [
      'Sustainable & Green Chemical Engineering',
      'Process Design, Optimization & Safety',
      'Advanced Materials & Polymer Engineering',
      'Biochemical & Pharmaceutical Engineering',
      'Water, Wastewater & Environmental Engineering',
      'Energy, Fuels & Emerging Technologies',
      'Digitalization & AI in Chemical Engineering'
    ]
  },
  { 
    id: 'thesis-to-technology', 
    name: 'Thesis to Technology', 
    description: 'Transform academic thesis and projects into industry-relevant technologies. Showcase how research outcomes can be converted into usable products, processes, or prototypes.', 
    is_technical: true, 
    is_flagship: false, 
    team_size: '1 to 3',
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop',
    themes: [
      'Sustainable & Green Chemical Engineering',
      'Energy & Thermal Engineering Technologies',
      'Chemical Process Design & Optimization',
      'Environmental Engineering & Pollution Control',
      'Food, Pharmaceutical & Biochemical Technologies',
      'Nanotechnology & Sensors',
      'Safety, Reliability & Risk Engineering'
    ]
  },
  { 
    id: 'technical-quiz', 
    name: 'Technical Quiz', 
    description: 'A fast-paced, buzzer-based technical quiz designed to test conceptual clarity, analytical thinking, and advanced knowledge in core and emerging areas of Chemical Engineering.', 
    is_technical: true, 
    is_flagship: false, 
    team_size: '1 to 3',
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2670&auto=format&fit=crop',
    themes: [],
    sections: [
      {
        title: "Event Format",
        items: [
          "Buzzer-Based Quiz",
          "Total Duration: 60 Minutes",
          "Team Size: 1 to 3 Members",
          "Registration Fee: ₹99 per head"
        ]
      },
      {
        title: "Quiz Structure & Topics",
        content: "The quiz consists of 7 technical themes, each with 3 sets of increasing difficulty (Easy → Twisted Fundamentals → Advanced Knowledge):",
        isOrdered: true,
        items: [
          "Sustainable & Green Chemical Engineering",
          "Process Design, Optimization & Safety",
          "Advanced Materials & Polymer Engineering",
          "Biochemical & Pharmaceutical Engineering",
          "Water, Wastewater & Environmental Engineering",
          "Energy, Fuels & Emerging Technologies",
          "Digitalization & AI in Chemical Engineering"
        ]
      },
      {
        title: "Scoring Highlights",
        items: [
          "Level 1 (Easy): +10 Points",
          "Level 2 (Twisted Fundamental): +20 Points",
          "Level 3 (Advanced): +30 Points",
          "Set Master Bonus: +10 Points for answering all 3 in a set",
          "Negative Marking: –10 points for every 4 wrong answers"
        ]
      },
      {
        title: "Prize Pool",
        items: [
          "1st Prize – ₹600",
          "2nd Prize – ₹300",
          "3rd Prize – ₹200"
        ]
      },
      {
        title: "RULES & REGULATIONS",
        isHeader: true
      },
      {
        title: "Buzzer & Interrupt Rules",
        items: [
          "Teams may buzz at any time, even before the question is completed.",
          "If a team buzzes early, the quiz master will stop reading immediately.",
          "The team must answer based only on what has been read so far."
        ]
      },
      {
        title: "Answering & Timing Rules",
        items: [
          "After buzzing, the team has 5 seconds to begin their answer.",
          "If no team buzzes within 15 seconds after the full question is read, the quiz master will reveal the answer and move on.",
          "Only one answer is allowed per team per question."
        ]
      },
      {
        title: "Conduct & Fair Play",
        items: [
          "No use of mobile phones, smartwatches, or internet-enabled devices during the quiz.",
          "Teams must not discuss answers loudly after buzzing.",
          "Any form of cheating or misconduct will lead to immediate disqualification."
        ]
      }
    ]
  },
];

const WORKSHOP_DAY_NON_TECH = [
  { id: 'nt-triangle-rush', name: 'Triangle Rush', description: 'A fast-paced coordination and strategy challenge. Race against time to complete triangular patterns.', is_technical: false, is_flagship: false, contacts: GENERAL_CONTACTS, image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2670&auto=format&fit=crop' },
  { id: 'nt-flip-catch', name: 'Flip and Catch', description: 'Test your reflexes and hand-eye coordination. Flip, catch, and score in this thrilling skill-based game.', is_technical: false, is_flagship: false, contacts: GENERAL_CONTACTS, image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop' },
  { id: 'nt-colour-confusion', name: 'Colour Confusion', description: 'A mind-bending challenge where colours and words collide. Beat the confusion and emerge victorious.', is_technical: false, is_flagship: false, contacts: GENERAL_CONTACTS, image_url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2670&auto=format&fit=crop' },
  { id: 'nt-typing-sprint', name: 'Typing Sprint', description: 'Speed and accuracy on the keys. Race against the clock in this typing challenge.', is_technical: false, is_flagship: false, contacts: GENERAL_CONTACTS, image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop' },
  { id: 'nt-drip-drop-fill', name: 'Drip Drop Fill', description: 'Precision and patience combine. Fill the target with careful drips and drops.', is_technical: false, is_flagship: false, contacts: GENERAL_CONTACTS, image_url: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=2670&auto=format&fit=crop' },
  { id: 'nt-snap-it', name: 'Snap It', description: 'Capture the moment. A photography and quick-draw challenge that rewards the sharpest eye.', is_technical: false, is_flagship: false, contacts: GENERAL_CONTACTS, image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2670&auto=format&fit=crop' },
  { id: 'nt-flash-pen', name: 'Flash and Pen', description: 'Memory meets speed. Observe the flash, then put pen to paper before time runs out.', is_technical: false, is_flagship: false, contacts: GENERAL_CONTACTS, image_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop' },
  { id: 'nt-hoop-hop', name: 'Hoop Hop Showdown', description: 'Agility and fun in one. Navigate through hoops and hop your way to the finish.', is_technical: false, is_flagship: false, contacts: GENERAL_CONTACTS, image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2670&auto=format&fit=crop' },
];

const NON_TECH_EVENTS = [
  {
    id: 'nt-cup-match',
    name: 'Cup Match Challenge',
    description: 'A high-speed observation challenge. Match the cups to the pattern faster than your opponent.',
    is_technical: false,
    is_flagship: false,
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1620330541783-c21532f1469e?q=80&w=2670&auto=format&fit=crop',
    sections: [
      { title: "Day 2 Details", items: ["Time: Morning to 1 PM", "Entry Fee: ₹10"] },
      { title: "Golden Ticket Offer", content: "Access all 5 Day-2 games for ₹45" }
    ]
  },
  {
    id: 'nt-spin-paper',
    name: 'Spin with Paper',
    description: 'A delicate balance and focus testing activity using simple paper mechanics.',
    is_technical: false,
    is_flagship: false,
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2668&auto=format&fit=crop',
    sections: [
      { title: "Day 2 Details", items: ["Time: Morning to 1 PM", "Entry Fee: ₹10"] }
    ]
  },
  {
    id: 'nt-build-balance',
    name: 'Build It and Balance It',
    description: 'Engineering meets fun. Construct a pyramid structure and keep it balanced against the odds.',
    is_technical: false,
    is_flagship: false,
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2670&auto=format&fit=crop',
    sections: [
      { title: "Day 2 Details", items: ["Time: Morning to 1 PM", "Entry Fee: ₹10"] }
    ]
  },
  {
    id: 'nt-treasure-hunt',
    name: 'Treasure Hunt Game',
    description: 'The ultimate adventure. Solve cryptic clues, navigate the campus, and locate the hidden treasure.',
    is_technical: false,
    is_flagship: true,
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=2670&auto=format&fit=crop',
    sections: [
      { title: "Day 2 Details", items: ["Time: Morning to 1 PM", "Entry Fee: ₹15"] }
    ]
  },
  {
    id: 'nt-sing-it',
    name: 'Sing It Out',
    description: 'For the music lovers. Identify songs from snippets or complete the missing lyrics to win.',
    is_technical: false,
    is_flagship: false,
    contacts: GENERAL_CONTACTS,
    image_url: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2670&auto=format&fit=crop',
    sections: [
      { title: "Day 2 Details", items: ["Time: Morning to 1 PM", "Entry Fee: ₹10"] }
    ]
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [userRegistrations, setUserRegistrations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'non-technical'>('all');
  const router = useRouter();

  const allEvents = [...TECH_EVENTS, ...NON_TECH_EVENTS];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' ||
                           (activeCategory === 'technical' && event.is_technical) ||
                           (activeCategory === 'non-technical' && !event.is_technical);
    return matchesSearch && matchesCategory;
  });

  const filteredTech = filteredEvents.filter(e => e.is_technical);
  const filteredNonTech = filteredEvents.filter(e => !e.is_technical);

  const filteredWorkshopDay = WORKSHOP_DAY_NON_TECH.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const showWorkshopSection = activeCategory === 'all' || activeCategory === 'non-technical';
    return showWorkshopSection && matchesSearch;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchData(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async (uid: string) => {
    try {
      const profileDoc = await getDoc(doc(db, 'profiles', uid));
      if (profileDoc.exists()) {
        const data = profileDoc.data();
        setProfile(data);

        const qReg = query(collection(db, 'event_registrations'), where('user_id', '==', uid));
        const regSnapshot = await getDocs(qReg);
        const currentRegs = regSnapshot.docs.map(doc => doc.data().event_id);
        setUserRegistrations(currentRegs);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EAB308]/10 rounded-full blur-[160px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 tracking-[0.4em] uppercase mb-6">
             <Zap className="w-3 h-3 fill-blue-400" /> AAVISHKAR'26_PROTOCOL
          </div>
          <h1 className="text-5xl md:text-8xl font-bold font-display text-white mb-6 tracking-tighter uppercase">
            EVENT <span className="text-[#EAB308]">LIST</span>
          </h1>
          <p className="text-slate-400 font-sans text-base md:text-xl max-w-2xl mx-auto font-medium mb-10">
            Explore technical and non-technical frontiers. Flagship events are mandatory for Tier 2 & 3.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/tickets')}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#EAB308] px-8 py-4 text-sm font-bold font-mono tracking-widest text-[#020617] shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Ticket className="w-5 h-5" /> GET_ACCESS_PASS
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700" />
          </motion.button>
           {/* ================= TIER INFORMATION CARDS ================= */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
  {[
    {
      tier: "TIER 3 – Bronze",
      prices: { other: "₹299 incl. GST", cit: "₹250 (No GST)" },
      details: [
        "2 Tech + 2 Non-Tech",
        "Includes 1 Tech & 1 Non-Tech Flagship",
      ],
      color: "border-amber-500/30 bg-amber-500/5",
    },
    {
      tier: "TIER 2 – Silver",
      prices: { other: "₹499 incl. GST", cit: "₹420 (No GST)" },
      details: [
        "3 Tech + 3 Non-Tech",
        "Includes 1 Tech & 1 Non-Tech Flagship",
      ],
      color: "border-slate-400/30 bg-slate-400/5",
    },
    {
      tier: "TIER 1 – Gold",
      prices: { other: "₹699 incl. GST", cit: "₹590 (No GST)" },
      details: [
        "All 5 Tech + 5 Non-Tech",
        "All Flagship events included",
      ],
      color: "border-[#ea580c]/30 bg-[#ea580c]/5",
    },
  ].map((item, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + idx * 0.1 }}
      className={`p-8 rounded-[32px] border ${item.color} backdrop-blur-xl text-center group hover:border-[#EAB308] transition-all duration-500`}
    >
      <h3 className="text-white font-black mb-3 font-display uppercase tracking-widest text-xs opacity-60">
        {item.tier}
      </h3>

      {/* Prices */}
      <div className="mb-6 space-y-1">
        <p className="text-[#EAB308] font-black text-3xl font-display">
          {item.prices.other}
        </p>
        <p className="text-slate-400 text-xs uppercase tracking-wider font-mono">
          CIT: {item.prices.cit}
        </p>
      </div>

      {/* Details */}
      <ul className="text-slate-400 text-xs space-y-3 text-left w-full border-t border-white/10 pt-6 font-mono uppercase tracking-wider">
        {item.details.map((d, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#EAB308] shrink-0" />
            {d}
          </li>
        ))}
      </ul>
    </motion.div>
  ))}
</div>

       


        </motion.div>

        

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16"
        >
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#EAB308] transition-colors" />
            <input 
              type="text"
              placeholder="SEARCH_FOR_EVENTS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#EAB308]/50 focus:bg-white/[0.05] transition-all font-mono text-sm"
            />
          </div>
          
          <div className="flex items-center p-1 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl">
            {(['all', 'technical', 'non-technical'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#EAB308] text-slate-900 shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.replace('-', '_')}
              </button>
            ))}
          </div>
        </motion.div>

        {filteredTech.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold font-display text-white uppercase tracking-tight flex items-center gap-4">
                <span className="text-[#EAB308] text-lg font-mono">01/</span>
                TECHNICAL EVENTS
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 via-blue-500/10 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredTech.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={() => setSelectedEvent(event)}
                  isRegistered={userRegistrations.includes(event.id)}
                />
              ))}
            </div>
          </section>
        )}

        {filteredNonTech.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold font-display text-white uppercase tracking-tight flex items-center gap-4">
                <span className="text-blue-400 text-lg font-mono">02/</span>
                NON-TECHNICAL EVENTS
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#EAB308]/50 via-[#EAB308]/10 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredNonTech.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={() => setSelectedEvent(event)}
                  isRegistered={userRegistrations.includes(event.id)}
                />
              ))}
            </div>
          </section>
        )}

        {filteredWorkshopDay.length > 0 && (
          <section>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold font-display text-white uppercase tracking-tight flex items-center gap-4">
                <span className="text-[#EAB308] text-lg font-mono">03/</span>
                DAY 1 – WORKSHOP (13 FEB)
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 via-cyan-500/10 to-transparent" />
            </div>
            <p className="text-slate-400 text-sm font-sans mb-8 max-w-2xl">
              These 8 non-technical events run in parallel with the one-day workshop on 13th February. Register via the Workshop page.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredWorkshopDay.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={() => setSelectedEvent(event)}
                  isRegistered={userRegistrations.includes(event.id)}
                />
              ))}
            </div>
          </section>
        )}

        {filteredTech.length === 0 && filteredNonTech.length === 0 && filteredWorkshopDay.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/[0.03] border border-white/10 mb-8">
              <Search className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">NO_ENTITIES_FOUND</h3>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em]">SYSTEM_ERROR: SEARCH_QUERY_RETURNED_NULL</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EventCard({ event, onClick, isRegistered }: { event: any, onClick: () => void, isRegistered: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 aspect-[4/5] shadow-2xl transition-all hover:border-blue-500/30"
    >
      <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-white/10 rounded-tl-xl group-hover:border-[#EAB308]/50 transition-colors" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-white/10 rounded-br-xl group-hover:border-[#EAB308]/50 transition-colors" />
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={event.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"} 
          className="h-full w-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
          alt={event.name}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
      <div className="absolute bottom-10 left-10 right-10 z-10">
        {event.is_flagship && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-600/20 border border-blue-600/30 px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-blue-400">
            <ShieldCheck size={12} /> FLAGSHIP EVENT
          </div>
        )}
        <h3 className="text-3xl font-bold font-display text-white group-hover:text-[#EAB308] transition-colors mb-3 uppercase tracking-tight">{event.name}</h3>
        <p className="text-sm text-slate-400 line-clamp-2 font-sans font-medium mb-6">{event.description}</p>
        <div className="flex items-center gap-2 text-[#EAB308] font-mono text-[10px] font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          VIEW DETAILS <ArrowRight size={14} />
        </div>
      </div>
      {isRegistered && (
        <div className="absolute top-8 right-8 rounded-full bg-blue-600 p-2.5 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] z-20">
          <CheckCircle2 size={18} />
        </div>
      )}
    </motion.div>
  );
}

function EventModal({ event, onClose }: { event: any, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-[40px] bg-[#020617] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 rounded-full bg-white/5 backdrop-blur-xl p-3 text-white hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/10 shadow-xl"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* LEFT SIDE: FULL IMAGE DISPLAY */}
          <div className="w-full md:w-5/12 relative h-[300px] md:h-auto bg-black flex items-center justify-center p-4">
            <img 
              src={event.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"} 
              className="w-full h-full object-contain"
              alt={event.name}
            />
          </div>

          {/* RIGHT SIDE: SCROLLABLE CONTENT */}
          <div className="flex flex-1 flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar max-h-[60vh] md:max-h-[90vh]">
            <div className="mb-8">
              {event.is_flagship && (
                <div className="mb-4 inline-flex items-center gap-3 rounded-xl bg-blue-600/10 border border-blue-600/20 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-blue-400">
                  <Star className="w-4 h-4 text-[#EAB308]" /> FLAGSHIP_PROTOCOL
                </div>
              )}
              <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6 uppercase tracking-tighter leading-none">
                {event.name}
              </h2>
              
              <div className="space-y-8">
                {/* 
                  LOGIC SWITCH: 
                  If 'sections' exist (Technical Quiz & Non-Tech), display them structured.
                  Otherwise, display standard description.
                */}
                {event.sections ? (
                  <>
                    <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                        <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                            <Info size={16} /> EVENT DESCRIPTION
                        </h4>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-medium">{event.description}</p>
                    </div>

                    <div className="space-y-8">
                        {event.sections.map((section: any, idx: number) => (
                        <div key={idx} className={`${section.isHeader ? 'pt-6 border-t border-white/10' : ''}`}>
                            {section.title && (
                            <h4 className={`font-mono font-bold text-[#EAB308] uppercase tracking-[0.2em] mb-3 flex items-center gap-2 ${section.isHeader ? 'text-lg' : 'text-xs'}`}>
                                {section.isHeader && <AlertCircle size={18} />} {section.title}
                            </h4>
                            )}
                            
                            {section.content && (
                            <p className="text-slate-300 text-sm leading-relaxed mb-3">{section.content}</p>
                            )}

                            {section.items && (
                            <ul className={`space-y-2 ${section.isOrdered ? 'list-decimal pl-5' : 'list-none'}`}>
                                {section.items.map((item: string, i: number) => (
                                <li key={i} className={`text-slate-300 text-sm ${!section.isOrdered ? 'flex items-start gap-2' : ''}`}>
                                    {!section.isOrdered && <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />}
                                    <span>{item}</span>
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        ))}
                    </div>
                  </>
                ) : (
                  // STANDARD DESCRIPTION (For all other events)
                  <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                    <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                      <Info size={16} /> EVENT DESCRIPTION
                    </h4>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-medium">{event.description}</p>
                  </div>
                )}

                {/* Themes Section (Only if themes exist and NOT technical quiz/non-tech since they have structure) */}
                {event.themes && event.themes.length > 0 && !event.sections && (
                  <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                    <h4 className="text-[10px] font-mono font-bold text-[#EAB308] uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                      <Layers size={16} /> EVENT THEMES
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {event.themes.map((theme: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm group">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>
                          <span className="group-hover:text-white transition-colors">{theme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {!event.sections && (
                    <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                      <h4 className="text-[10px] font-mono font-bold text-[#EAB308] uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                        <Users size={16} /> TEAM SIZE
                      </h4>
                      <p className="text-white text-lg font-bold tracking-tight">
                        {event.team_size ? `${event.team_size.toUpperCase()} MEMBERS` : 'MAX 3-5 MEMBERS'}
                      </p>
                    </div>
                  )}
                  
                  {/* CONTACT SECTION */}
                  <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                    <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                      <Phone size={16} /> CONTACT
                    </h4>
                    <div className="space-y-2">
                      {event.contacts ? (
                        event.contacts.map((contact: string, idx: number) => (
                          <p key={idx} className="text-white text-base font-bold tracking-tight border-b border-white/5 last:border-0 pb-1 last:pb-0">
                            {contact}
                          </p>
                        ))
                      ) : (
                        <p className="text-white text-lg font-bold tracking-tight">Contact Coordinator</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}