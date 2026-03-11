import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  GraduationCap,
  Star,
  Award,
  Trophy,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Target,
  Brain,
  Zap,
  Heart,
  Crown,
  Shield,
  BadgeCheck,
  CheckCircle,
  Play,
  Quote,
  Briefcase,
  Flame,
  MessageCircle,
  Grid3X3,
  BarChart3,
  TrendingUp,
  Filter,
  Eye,
  Share2,
  ExternalLink,
  Lightbulb,
  Medal,
  Layers,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -70 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 70 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ═══════════════════════════════════════════════════════════════════
   DATA — DEPARTMENTS
   ═══════════════════════════════════════════════════════════════════ */

const DEPARTMENTS = [
  { id: "all", label: "All Faculty", icon: Users, count: 12 },
  { id: "gs", label: "General Studies", icon: BookOpen, count: 4 },
  { id: "optional", label: "Optional Subjects", icon: Layers, count: 3 },
  { id: "csat", label: "CSAT & Aptitude", icon: Brain, count: 2 },
  { id: "interview", label: "Interview Panel", icon: Briefcase, count: 3 },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — EXPERTS
   ═══════════════════════════════════════════════════════════════════ */

const EXPERTS_DATA = [
  {
    id: 1,
    name: "Dr. Ramesh Iyer",
    title: "Director & Chief Faculty",
    department: "gs",
    specialization: "Indian Polity & Governance",
    qualification: "M.A. Political Science (JNU), Ph.D. Public Administration",
    experience: "25+ Years",
    studentsGuided: "12,000+",
    toppersMentored: "180+",
    rating: 4.9,
    reviews: 850,
    isFeatured: true,
    color: "from-blue-500 to-indigo-600",
    bgLight: "from-blue-50 to-indigo-50",
    avatar: "RI",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    achievements: [
      "Author of 5 bestselling UPSC books",
      "Trained AIR 1, 3, 5 toppers",
      "Ex-consultant to UPSC",
      "Recipient of National Teaching Excellence Award",
    ],
    subjects: ["Indian Polity", "Governance", "Constitution", "Social Justice"],
    quote:
      "My mission is to create not just IAS officers, but ethical leaders who will transform India.",
  },
  {
    id: 2,
    name: "Prof. Sunita Deshpande",
    title: "Head of GS Faculty",
    department: "gs",
    specialization: "Indian Economy & Development",
    qualification: "M.A. Economics (DSE), B.Ed",
    experience: "18+ Years",
    studentsGuided: "8,500+",
    toppersMentored: "120+",
    rating: 4.9,
    reviews: 720,
    isFeatured: true,
    color: "from-emerald-500 to-teal-600",
    bgLight: "from-emerald-50 to-teal-50",
    avatar: "SD",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    achievements: [
      "Former RBI Research Fellow",
      "Published 200+ editorial analyses",
      "Budget analysis featured on national TV",
      "NITI Aayog panel member",
    ],
    subjects: [
      "Indian Economy",
      "Economic Survey",
      "Budget Analysis",
      "Development Issues",
    ],
    quote:
      "Economics is not about memorizing data — it's about understanding the story behind every number.",
  },
  {
    id: 3,
    name: "Brig. Vikram Singh (Retd.)",
    title: "Senior GS Faculty",
    department: "gs",
    specialization: "International Relations & Security",
    qualification: "M.Phil Defence Studies, MSc Strategic Studies (UK)",
    experience: "22+ Years",
    studentsGuided: "7,000+",
    toppersMentored: "90+",
    rating: 4.8,
    reviews: 610,
    isFeatured: true,
    color: "from-amber-500 to-orange-600",
    bgLight: "from-amber-50 to-orange-50",
    avatar: "VS",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    achievements: [
      "Decorated Army Brigadier",
      "UN Peacekeeping veteran",
      "Defence analyst on 3 news channels",
      "Author: 'India's Strategic Vision 2047'",
    ],
    subjects: [
      "International Relations",
      "Internal Security",
      "Defence",
      "Geopolitics",
    ],
    quote:
      "Understanding global affairs is not optional — it defines how India shapes the 21st century.",
  },
  {
    id: 4,
    name: "Dr. Priya Nambiar",
    title: "GS & Ethics Faculty",
    department: "gs",
    specialization: "Ethics, Integrity & Aptitude",
    qualification: "Ph.D. Philosophy (BHU), M.A. Psychology",
    experience: "14+ Years",
    studentsGuided: "6,000+",
    toppersMentored: "75+",
    rating: 4.9,
    reviews: 560,
    isFeatured: false,
    color: "from-purple-500 to-pink-600",
    bgLight: "from-purple-50 to-pink-50",
    avatar: "PN",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    achievements: [
      "Ethics Paper average score: 130+",
      "Author: 'Ethics Made Simple'",
      "Thinkers & philosophers workshop creator",
      "Mindfulness & exam stress counselor",
    ],
    subjects: ["Ethics", "Integrity", "Emotional Intelligence", "Case Studies"],
    quote:
      "Ethics isn't a paper to be cracked — it's a way of life that UPSC wants to see in future administrators.",
  },
  {
    id: 5,
    name: "Dr. Arjun Reddy",
    title: "Head of Optional Faculty",
    department: "optional",
    specialization: "Political Science & IR Optional",
    qualification: "Ph.D. Political Science (HCU), MA IR (JNU)",
    experience: "16+ Years",
    studentsGuided: "5,500+",
    toppersMentored: "95+",
    rating: 4.9,
    reviews: 490,
    isFeatured: false,
    color: "from-rose-500 to-red-600",
    bgLight: "from-rose-50 to-red-50",
    avatar: "AR",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    achievements: [
      "Optional average score: 310/500",
      "Created SRIRAM's Optional Framework",
      "Published political analyst",
      "Mentored 15 optional toppers",
    ],
    subjects: [
      "Political Science",
      "International Relations",
      "Political Theory",
      "Indian Politics",
    ],
    quote:
      "The right optional can make or break your UPSC rank. I ensure it makes it.",
  },
  {
    id: 6,
    name: "Prof. Kavitha Menon",
    title: "History & Sociology Faculty",
    department: "optional",
    specialization: "History Optional",
    qualification: "M.A. History (DU), M.Phil Ancient India",
    experience: "12+ Years",
    studentsGuided: "4,200+",
    toppersMentored: "60+",
    rating: 4.8,
    reviews: 380,
    isFeatured: false,
    color: "from-cyan-500 to-blue-600",
    bgLight: "from-cyan-50 to-blue-50",
    avatar: "KV",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    achievements: [
      "History average score: 280/500",
      "Archaeological survey consultant",
      "Author: 'Indian History Timeline'",
      "Created visual history learning method",
    ],
    subjects: [
      "Ancient India",
      "Medieval India",
      "Modern India",
      "World History",
    ],
    quote:
      "History repeats itself, including in UPSC questions. I make sure my students are always ahead of the pattern.",
  },
  {
    id: 7,
    name: "Dr. Sanjay Gupta",
    title: "Pub Ad & Geography Faculty",
    department: "optional",
    specialization: "Public Administration Optional",
    qualification: "IAS (Retd.), Ph.D. Public Policy",
    experience: "20+ Years",
    studentsGuided: "9,000+",
    toppersMentored: "135+",
    rating: 4.9,
    reviews: 680,
    isFeatured: false,
    color: "from-indigo-500 to-violet-600",
    bgLight: "from-indigo-50 to-violet-50",
    avatar: "SG",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    achievements: [
      "Former IAS officer (28 years service)",
      "Pub Ad average score: 320/500",
      "Mentored most Pub Ad toppers nationally",
      "Practical governance perspective expert",
    ],
    subjects: [
      "Public Administration",
      "Administrative Theory",
      "Indian Administration",
      "Governance",
    ],
    quote:
      "Having served as IAS for almost 3 decades, I bring the insider perspective to optional preparation.",
  },
  {
    id: 8,
    name: "Prof. Anand Sharma",
    title: "CSAT & Reasoning Expert",
    department: "csat",
    specialization: "CSAT, Logical Reasoning & Comprehension",
    qualification: "B.Tech (IIT-B), MBA (IIM-A)",
    experience: "10+ Years",
    studentsGuided: "15,000+",
    toppersMentored: "200+",
    rating: 4.8,
    reviews: 920,
    isFeatured: false,
    color: "from-teal-500 to-green-600",
    bgLight: "from-teal-50 to-green-50",
    avatar: "AN",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    achievements: [
      "99.5 percentile in CAT",
      "CSAT clearance rate: 99.2%",
      "Shortcut techniques creator",
      "YouTube: 500K+ subscribers",
    ],
    subjects: [
      "Logical Reasoning",
      "Comprehension",
      "Math & Data",
      "Decision Making",
    ],
    quote:
      "CSAT is the gatekeeper of UPSC. I ensure no dream is killed at the prelims stage.",
  },
  {
    id: 9,
    name: "Dr. Meera Joshi",
    title: "CSAT & Data Analysis Faculty",
    department: "csat",
    specialization: "Quantitative Aptitude & Data Interpretation",
    qualification: "M.Sc Mathematics (CMI), B.Ed",
    experience: "8+ Years",
    studentsGuided: "6,000+",
    toppersMentored: "80+",
    rating: 4.8,
    reviews: 340,
    isFeatured: false,
    color: "from-yellow-500 to-amber-600",
    bgLight: "from-yellow-50 to-amber-50",
    avatar: "MJ",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    achievements: [
      "95%+ students clear CSAT cutoff",
      "Math anxiety specialist",
      "Created '50 must-know CSAT patterns'",
      "Bilingual teaching (Hindi + English)",
    ],
    subjects: [
      "Quantitative Aptitude",
      "Data Interpretation",
      "Basic Numeracy",
      "Problem Solving",
    ],
    quote:
      "Math phobia ends here. My students go from fearing numbers to mastering them in 30 days.",
  },
  {
    id: 10,
    name: "Shri R.K. Rao, IAS (Retd.)",
    title: "Chief Interview Panelist",
    department: "interview",
    specialization: "Personality Test & Mock Interviews",
    qualification: "IAS (Retd. - Additional Secretary Level)",
    experience: "30+ Years",
    studentsGuided: "5,000+",
    toppersMentored: "150+",
    rating: 4.9,
    reviews: 430,
    isFeatured: false,
    color: "from-blue-600 to-purple-600",
    bgLight: "from-blue-50 to-purple-50",
    avatar: "RR",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&q=80",
    achievements: [
      "30+ years in Indian Administrative Service",
      "UPSC Board member (5 years)",
      "Conducted 3,000+ mock interviews",
      "Average interview score of panelists: 200+",
    ],
    subjects: [
      "Personality Test",
      "Current Affairs Discussion",
      "DAF Analysis",
      "Body Language",
    ],
    quote:
      "I've been on both sides of the interview table. That perspective is invaluable for aspirants.",
  },
  {
    id: 11,
    name: "Dr. Neha Kapoor",
    title: "Interview & Soft Skills Trainer",
    department: "interview",
    specialization: "Communication & Personality Development",
    qualification: "Ph.D. Communication Studies, Certified Life Coach",
    experience: "12+ Years",
    studentsGuided: "4,500+",
    toppersMentored: "70+",
    rating: 4.8,
    reviews: 310,
    isFeatured: false,
    color: "from-pink-500 to-fuchsia-600",
    bgLight: "from-pink-50 to-fuchsia-50",
    avatar: "NK",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    achievements: [
      "Corporate trainer turned UPSC coach",
      "TEDx speaker on effective communication",
      "Author: 'Own Your Interview'",
      "Stress management & confidence building expert",
    ],
    subjects: [
      "Communication Skills",
      "DAF Preparation",
      "Stress Management",
      "Confidence Building",
    ],
    quote:
      "The interview is where preparation meets personality. I help students showcase their authentic best.",
  },
  {
    id: 12,
    name: "Amb. Suresh Patel (Retd.)",
    title: "Senior Interview Panelist",
    department: "interview",
    specialization: "Foreign Policy & Diplomatic Analysis",
    qualification: "IFS (Retd.), Former Ambassador to UN",
    experience: "28+ Years",
    studentsGuided: "3,500+",
    toppersMentored: "55+",
    rating: 4.9,
    reviews: 270,
    isFeatured: false,
    color: "from-emerald-600 to-green-700",
    bgLight: "from-emerald-50 to-green-50",
    avatar: "SP",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    achievements: [
      "Former Ambassador to 3 countries",
      "UN General Assembly delegate",
      "Mock interview panelist since 2010",
      "Specializes in IFS aspirant prep",
    ],
    subjects: [
      "Foreign Policy",
      "Diplomacy",
      "Global Governance",
      "Interview Strategy",
    ],
    quote:
      "A good diplomat listens more than speaks. The same applies to a UPSC interview — know when to listen, pause, and respond.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — STATS
   ═══════════════════════════════════════════════════════════════════ */

const FACULTY_STATS = [
  {
    icon: Users,
    value: "88+",
    label: "Expert Faculty",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: GraduationCap,
    value: "25+",
    label: "IAS/IPS/IFS Retd Officers",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Trophy,
    value: "1,500+",
    label: "Toppers Mentored",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    value: "50+",
    label: "Published Authors",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Calendar,
    value: "15+",
    label: "Avg Years Experience",
    color: "from-cyan-500 to-blue-500",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Particles
   ═══════════════════════════════════════════════════════════════════ */

const ExpertParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(22)].map((_, i) => (
      <motion.div
        key={`exp-p-${i}`}
        className="absolute rounded-full"
        style={{
          width: 2 + Math.random() * 5,
          height: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(59, 130, 246, ${0.05 + Math.random() * 0.1})`,
        }}
        animate={{
          y: [0, -30 - Math.random() * 30, 0],
          x: [0, Math.random() * 10 - 5, 0],
          opacity: [0, 0.5, 0],
          scale: [0.5, 1.3, 0.5],
        }}
        transition={{
          duration: 5 + Math.random() * 6,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Parallax
   ═══════════════════════════════════════════════════════════════════ */

const ExpertParallax = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-20 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/20 to-indigo-100/20 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-100/15 to-teal-100/15 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute top-1/3 left-10 w-10 h-10 border-2 border-blue-200/15 rounded-xl"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-16 w-8 h-8 border-2 border-emerald-200/15 rounded-full"
        style={{ rotate: rotate2 }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: SectionHeader
   ═══════════════════════════════════════════════════════════════════ */

const ExpertSectionHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="text-center mb-16 relative"
    >
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-40"
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div variants={staggerItem} className="inline-block mb-5">
        <motion.div
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 shadow-lg shadow-blue-100/40"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <motion.div
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <GraduationCap className="w-4 h-4 text-blue-600" />
          </motion.div>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            Meet Our Faculty
          </span>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Award className="w-4 h-4 text-amber-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-5 leading-tight"
      >
        <span className="block">Our Teaching</span>
        <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Experts
        </span>
      </motion.h2>

      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Learn from the best minds in UPSC coaching — IAS/IPS/IFS officers, Ph.D.
        scholars, and subject matter experts with decades of teaching and
        mentoring excellence.
      </motion.p>

      <motion.div
        variants={staggerItem}
        className="flex items-center justify-center gap-2 mt-6"
      >
        <motion.div
          className="h-1 w-12 rounded-full bg-blue-300"
          initial={{ width: 0 }}
          animate={isInView ? { width: 48 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.div
          className="h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.div
          className="h-1 w-12 rounded-full bg-indigo-300"
          initial={{ width: 0 }}
          animate={isInView ? { width: 48 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: StatsBar
   ═══════════════════════════════════════════════════════════════════ */

const ExpertStatsBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-14"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {FACULTY_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            className="relative group"
            custom={i}
          >
            <div className="rounded-2xl bg-white border border-gray-100 p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <motion.div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-2 bg-gradient-to-br ${stat.color} shadow-lg shadow-blue-200/30`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div
                  className="text-2xl font-black text-gray-900"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Department Filter
   ═══════════════════════════════════════════════════════════════════ */

const DepartmentFilter = ({ activeDept, onDeptChange }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-10"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        {DEPARTMENTS.map((dept, index) => {
          const isActive = activeDept === dept.id;
          return (
            <motion.button
              key={dept.id}
              onClick={() => onDeptChange(dept.id)}
              className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.07 + 0.2 }}
            >
              <dept.icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{dept.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
              >
                {dept.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Featured Expert Card (larger)
   ═══════════════════════════════════════════════════════════════════ */

const FeaturedExpertCard = ({ expert }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-blue-200/60">
        <div className="flex flex-col lg:flex-row">
          {/* Left Gradient Panel */}
          <div
            className={`lg:w-2/5 p-8 bg-gradient-to-br ${expert.color} text-white relative overflow-hidden`}
          >
            <motion.div
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-300" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Featured Expert
                </span>
              </div>

              <div className="flex items-center gap-4">
                <motion.div
                  className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <h4 className="text-xl font-black">{expert.name}</h4>
                  <span className="text-sm text-white/80">{expert.title}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Target className="w-4 h-4" />
                  <span>{expert.specialization}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <GraduationCap className="w-4 h-4" />
                  <span>{expert.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{expert.experience} Experience</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-white/80">
                  {expert.rating} ({expert.reviews})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center px-2 py-2 rounded-xl bg-white/10">
                  <span className="block text-lg font-black">
                    {expert.experience}
                  </span>
                  <span className="text-[9px] text-white/60">Experience</span>
                </div>
                <div className="text-center px-2 py-2 rounded-xl bg-white/10">
                  <span className="block text-lg font-black">
                    {expert.studentsGuided}
                  </span>
                  <span className="text-[9px] text-white/60">Students</span>
                </div>
                <div className="text-center px-2 py-2 rounded-xl bg-white/10">
                  <span className="block text-lg font-black">
                    {expert.toppersMentored}
                  </span>
                  <span className="text-[9px] text-white/60">Toppers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:w-3/5 p-8 space-y-5">
            <div>
              <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Achievements
              </h5>
              <div className="space-y-2">
                {expert.achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{ach}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Subjects
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {expert.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <Quote className="w-6 h-6 text-blue-200 mb-2" />
              <p className="text-sm text-gray-600 italic leading-relaxed">
                "{expert.quote}"
              </p>
            </div>

            <motion.button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm border border-blue-100"
              whileHover={{ scale: 1.03, x: 3 }}
            >
              <Eye className="w-4 h-4" />
              View Full Profile
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Normal Expert Card
   ═══════════════════════════════════════════════════════════════════ */

const ExpertCard = ({ expert, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group perspective-1000"
    >
      <div
        className="relative h-full min-h-[420px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 180 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -180 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="h-full rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl hover:border-blue-200/50 transition-all duration-500 cursor-pointer">
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${expert.color}`}
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-blue-100 shadow-md"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                    >
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-gray-900 truncate">
                        {expert.name}
                      </h4>
                      <p className="text-xs text-blue-600 font-semibold">
                        {expert.title}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {expert.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.round(expert.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      {expert.rating} ({expert.reviews})
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <span className="block text-sm font-black text-gray-900">
                        {expert.experience}
                      </span>
                      <span className="text-[9px] text-gray-400">
                        Experience
                      </span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <span className="block text-sm font-black text-gray-900">
                        {expert.studentsGuided}
                      </span>
                      <span className="text-[9px] text-gray-400">Students</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <span className="block text-sm font-black text-gray-900">
                        {expert.toppersMentored}
                      </span>
                      <span className="text-[9px] text-gray-400">Toppers</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {expert.subjects.slice(0, 3).map((sub) => (
                      <span
                        key={sub}
                        className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold"
                      >
                        {sub}
                      </span>
                    ))}
                    {expert.subjects.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 text-[10px] font-semibold">
                        +{expert.subjects.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="text-[10px] text-gray-400">
                      Tap to see more
                    </span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -180 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 180 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div
                className={`h-full rounded-2xl bg-gradient-to-br ${expert.color} overflow-hidden shadow-xl cursor-pointer p-6 text-white`}
              >
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-black">{expert.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                      Tap to flip back
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      Achievements
                    </h5>
                    <div className="space-y-1.5">
                      {expert.achievements.map((ach, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-300 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-white/80">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      In Their Words
                    </h5>
                    <p className="text-xs text-white/80 italic leading-relaxed">
                      "{expert.quote}"
                    </p>
                  </div>

                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-bold self-start"
                    whileHover={{ scale: 1.03 }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Full Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Scrolling Ticker
   ═══════════════════════════════════════════════════════════════════ */

const ExpertTicker = () => {
  const items = [
    "🎓 88+ Expert Faculty",
    "⭐ 4.9/5 Faculty Rating",
    "🏅 25+ IAS/IPS/IFS Officers",
    "📚 50+ Published Authors",
    "🏆 1,500+ Toppers Mentored",
    "💡 15+ Avg Years Experience",
    "🌍 Faculty from JNU, DU, IIT, IIM",
  ];

  return (
    <div className="mb-14 overflow-hidden py-3 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-2xl border border-blue-100/50 shadow-sm">
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: [0, -1800] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold text-gray-600 flex items-center gap-2"
          >
            {item}
            <span className="text-blue-300">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: CTA
   ═══════════════════════════════════════════════════════════════════ */

const ExpertCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mt-14"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 p-10 lg:p-14 shadow-2xl shadow-blue-500/15">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-white space-y-4">
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-black">
              Learn from the Best
            </h3>
            <p className="text-blue-200 max-w-xl leading-relaxed">
              Join SRIRAM IAS Academy and get mentored by India's finest UPSC
              faculty. Book a free demo class and experience the difference.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {["Free Demo Class", "Meet the Faculty", "Scholarship Test"].map(
                (item, i) => (
                  <motion.span
                    key={item}
                    className="px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {item}
                  </motion.span>
                ),
              )}
            </div>
          </div>
          <motion.button
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-bold shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-5 h-5" />
            Book Free Demo
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const TeachingExperts = () => {
  const [activeDept, setActiveDept] = useState("all");

  const filteredExperts =
    activeDept === "all"
      ? EXPERTS_DATA
      : EXPERTS_DATA.filter((e) => e.department === activeDept);

  const featuredExperts = filteredExperts.filter((e) => e.isFeatured);
  const regularExperts = filteredExperts.filter((e) => !e.isFeatured);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
      <ExpertParallax />
      <ExpertParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ExpertSectionHeader />
        <ExpertTicker />
        <ExpertStatsBar />

        <DepartmentFilter
          activeDept={activeDept}
          onDeptChange={setActiveDept}
        />

        {/* Featured Experts */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`featured-${activeDept}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {featuredExperts.length > 0 && (
              <div className="space-y-6 mb-8">
                {featuredExperts.map((expert) => (
                  <FeaturedExpertCard key={expert.id} expert={expert} />
                ))}
              </div>
            )}

            {/* Regular Experts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularExperts.map((expert, index) => (
                <ExpertCard key={expert.id} expert={expert} index={index} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <ExpertCTA />
      </div>
    </section>
  );
};

export default TeachingExperts;
