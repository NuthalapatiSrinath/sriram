import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Newspaper,
  Globe,
  TrendingUp,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Download,
  FileText,
  Eye,
  Star,
  Bookmark,
  Share2,
  MessageCircle,
  Zap,
  Target,
  Award,
  Flame,
  Crown,
  Trophy,
  Users,
  GraduationCap,
  Shield,
  Search,
  Filter,
  Grid3X3,
  List,
  Play,
  Headphones,
  Video,
  PenLine,
  ClipboardList,
  Brain,
  Lightbulb,
  BarChart3,
  PieChart,
  Map,
  Landmark,
  Scale,
  Gavel,
  Banknote,
  Leaf,
  Microscope,
  Cpu,
  Heart,
  Compass,
  RefreshCcw,
  Bell,
  ExternalLink,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Podcast,
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
   DATA — CATEGORIES
   ═══════════════════════════════════════════════════════════════════ */

const CA_CATEGORIES = [
  { id: "all", label: "All Topics", icon: Globe, count: 24, color: "blue" },
  {
    id: "polity",
    label: "Polity & Governance",
    icon: Landmark,
    count: 5,
    color: "indigo",
  },
  {
    id: "economy",
    label: "Economy",
    icon: Banknote,
    count: 4,
    color: "emerald",
  },
  {
    id: "environment",
    label: "Environment",
    icon: Leaf,
    count: 3,
    color: "green",
  },
  {
    id: "science",
    label: "Science & Tech",
    icon: Cpu,
    count: 4,
    color: "purple",
  },
  {
    id: "international",
    label: "International",
    icon: Globe,
    count: 4,
    color: "rose",
  },
  { id: "security", label: "Security", icon: Shield, count: 2, color: "amber" },
  {
    id: "social",
    label: "Social Issues",
    icon: Heart,
    count: 2,
    color: "pink",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — CURRENT AFFAIRS ARTICLES
   ═══════════════════════════════════════════════════════════════════ */

const CA_ARTICLES = [
  {
    id: 1,
    title: "Union Budget 2026-27: Key Highlights & UPSC Relevance",
    summary:
      "Comprehensive analysis of Union Budget with focus on fiscal policy, sector allocations, tax reforms, and how aspirants should prepare related questions.",
    category: "economy",
    date: "March 10, 2026",
    readTime: "12 min",
    views: "15.2K",
    isPremium: false,
    isNew: true,
    tags: ["Budget", "Fiscal Policy", "Economy"],
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
  },
  {
    id: 2,
    title: "India's Digital Public Infrastructure: UPI, Aadhaar & Beyond",
    summary:
      "How India's DPI stack is transforming governance and becoming a global model. Analysis of recent developments and their significance for UPSC.",
    category: "science",
    date: "March 9, 2026",
    readTime: "8 min",
    views: "12.8K",
    isPremium: false,
    isNew: true,
    tags: ["Technology", "Governance", "Digital India"],
    difficulty: "Advanced",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  {
    id: 3,
    title: "One Nation One Election: Constitutional Amendment Analysis",
    summary:
      "Deep dive into the proposed simultaneous elections bill, its constitutional implications, committee recommendations, and potential impact on federalism.",
    category: "polity",
    date: "March 8, 2026",
    readTime: "15 min",
    views: "18.5K",
    isPremium: false,
    isNew: false,
    tags: ["Constitution", "Elections", "Federalism"],
    difficulty: "Advanced",
    image:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&q=80",
  },
  {
    id: 4,
    title: "COP31 & India's Updated NDCs: Climate Diplomacy",
    summary:
      "India's climate commitments, green hydrogen mission progress, and key takeaways from latest climate negotiations for UPSC preparation.",
    category: "environment",
    date: "March 7, 2026",
    readTime: "10 min",
    views: "9.3K",
    isPremium: false,
    isNew: false,
    tags: ["Climate", "International", "Environment"],
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1611273426858-450d8e80e916?w=400&q=80",
  },
  {
    id: 5,
    title: "India-US Strategic Partnership: Defence & Trade Update",
    summary:
      "Recent developments in India-US bilateral relations, defence agreements, trade dynamics, and implications for India's foreign policy approach.",
    category: "international",
    date: "March 6, 2026",
    readTime: "11 min",
    views: "11.1K",
    isPremium: false,
    isNew: false,
    tags: ["Foreign Policy", "Defence", "Bilateral"],
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80",
  },
  {
    id: 6,
    title: "Delimitation Commission & Reservation Policy Debate",
    summary:
      "Analysis of the upcoming delimitation exercise post-2026 freeze period, its impact on political representation and reservation dynamics.",
    category: "polity",
    date: "March 5, 2026",
    readTime: "14 min",
    views: "20.4K",
    isPremium: false,
    isNew: false,
    tags: ["Delimitation", "Representation", "Constitution"],
    difficulty: "Advanced",
    image:
      "https://images.unsplash.com/photo-1575320181282-9afab399332c?w=400&q=80",
  },
  {
    id: 7,
    title: "Semiconductor Manufacturing in India: Progress Report",
    summary:
      "Status update on India's semiconductor fab projects, the CHIPS Act parallels, supply chain developments, and their strategic significance.",
    category: "science",
    date: "March 4, 2026",
    readTime: "9 min",
    views: "8.7K",
    isPremium: false,
    isNew: false,
    tags: ["Technology", "Manufacturing", "Economy"],
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
  },
  {
    id: 8,
    title: "Internal Security: Left Wing Extremism Update 2026",
    summary:
      "Analysis of current LWE scenario, government strategy, surrender policies, development initiatives, and role of technology in combating extremism.",
    category: "security",
    date: "March 3, 2026",
    readTime: "13 min",
    views: "7.5K",
    isPremium: false,
    isNew: false,
    tags: ["Security", "LWE", "Internal Security"],
    difficulty: "Advanced",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400&q=80",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — DAILY QUIZ QUESTIONS
   ═══════════════════════════════════════════════════════════════════ */

const DAILY_QUIZ = [
  {
    id: 1,
    question:
      "Which of the following statements about the Fiscal Responsibility and Budget Management (FRBM) Act is correct?",
    options: [
      "It was enacted in 2005",
      "It aims to eliminate revenue deficit",
      "It applies only to the Central Government",
      "It was recommended by the 14th Finance Commission",
    ],
    correct: 1,
    explanation:
      "The FRBM Act, 2003 aims to eliminate the revenue deficit and reduce the fiscal deficit to a manageable level.",
    topic: "Economy",
  },
  {
    id: 2,
    question: "The 'Writ of Habeas Corpus' can be issued against:",
    options: [
      "Private individuals only",
      "Government authorities only",
      "Both private individuals and government authorities",
      "Only the judiciary",
    ],
    correct: 2,
    explanation:
      "Habeas Corpus can be issued against both private individuals and government authorities to produce a detained person before the court.",
    topic: "Polity",
  },
  {
    id: 3,
    question:
      "Which mission is associated with India's green hydrogen initiative?",
    options: [
      "National Solar Mission",
      "National Green Hydrogen Mission",
      "National Bioenergy Programme",
      "FAME India Scheme",
    ],
    correct: 1,
    explanation:
      "The National Green Hydrogen Mission was launched in 2023 to make India a global hub for production and export of green hydrogen.",
    topic: "Environment",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — MONTHLY COMPILATIONS
   ═══════════════════════════════════════════════════════════════════ */

const MONTHLY_COMPILATIONS = [
  {
    month: "February 2026",
    pages: 145,
    articles: 82,
    downloads: "12.5K",
    isLatest: true,
  },
  {
    month: "January 2026",
    pages: 138,
    articles: 78,
    downloads: "14.2K",
    isLatest: false,
  },
  {
    month: "December 2025",
    pages: 152,
    articles: 91,
    downloads: "15.8K",
    isLatest: false,
  },
  {
    month: "November 2025",
    pages: 141,
    articles: 85,
    downloads: "13.1K",
    isLatest: false,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — LEARNING FORMATS
   ═══════════════════════════════════════════════════════════════════ */

const LEARNING_FORMATS = [
  {
    icon: FileText,
    title: "Daily Articles",
    description:
      "6-8 curated articles daily with UPSC relevance analysis and mains answer hints.",
    color: "from-blue-500 to-indigo-600",
    count: "2,400+",
  },
  {
    icon: Play,
    title: "Video Analysis",
    description:
      "15-min daily video breakdown of top news with expert faculty commentary.",
    color: "from-purple-500 to-pink-600",
    count: "800+",
  },
  {
    icon: Podcast,
    title: "Audio Podcasts",
    description:
      "Listen on-the-go with our 10-min daily current affairs podcast series.",
    color: "from-emerald-500 to-teal-600",
    count: "600+",
  },
  {
    icon: PenLine,
    title: "MCQ Practice",
    description:
      "50+ new MCQs weekly linked to current events for Prelims preparation.",
    color: "from-amber-500 to-orange-600",
    count: "5,000+",
  },
  {
    icon: ClipboardList,
    title: "Mains Questions",
    description:
      "Daily mains answer writing practice with model answers from toppers.",
    color: "from-rose-500 to-red-600",
    count: "1,200+",
  },
  {
    icon: Download,
    title: "Monthly PDFs",
    description:
      "Comprehensive monthly compilations with topic-wise segregation for revision.",
    color: "from-cyan-500 to-blue-600",
    count: "36+",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Particles
   ═══════════════════════════════════════════════════════════════════ */

const CAParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(28)].map((_, i) => (
      <motion.div
        key={`ca-p-${i}`}
        className="absolute rounded-full"
        style={{
          width: 2 + Math.random() * 5,
          height: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(59, 130, 246, ${0.06 + Math.random() * 0.1})`,
        }}
        animate={{
          y: [0, -30 - Math.random() * 30, 0],
          x: [0, Math.random() * 14 - 7, 0],
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
   SUB-COMPONENT: Parallax Background
   ═══════════════════════════════════════════════════════════════════ */

const CAParallax = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-16 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/25 to-indigo-100/25 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-1/3 -left-16 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-100/20 to-teal-100/20 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-20 w-14 h-14 border-2 border-blue-200/20 rounded-xl"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute top-1/5 left-16 w-10 h-10 border-2 border-indigo-200/15 rounded-full"
        style={{ rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-40 right-1/3 w-44 h-[1px] bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Section Header
   ═══════════════════════════════════════════════════════════════════ */

const CASectionHeader = () => {
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
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Newspaper className="w-4 h-4 text-blue-600" />
          </motion.div>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            Free Resources
          </span>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-5 leading-tight"
      >
        <span className="block">Start Your Preparation</span>
        <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Free Current Affairs
        </span>
      </motion.h2>

      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Stay ahead of the competition with our daily curated current affairs —
        articles, videos, quizzes, and monthly compilations — all crafted by
        UPSC experts, completely free.
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
          className="h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
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
   SUB-COMPONENT: Stats Ticker
   ═══════════════════════════════════════════════════════════════════ */

const StatsTicker = () => {
  const stats = [
    "📰 2,400+ Daily Articles Published",
    "🎥 800+ Video Analyses",
    "🎙️ 600+ Podcast Episodes",
    "📝 5,000+ MCQ Questions",
    "📄 Monthly PDF Compilations",
    "🆓 100% Free Access for All",
    "⭐ Trusted by 50,000+ Aspirants",
    "🏆 Used by 200+ UPSC Toppers",
  ];

  return (
    <div className="mb-14 overflow-hidden py-3 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-2xl border border-blue-100/50 shadow-sm">
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: [0, -2000] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...stats, ...stats, ...stats].map((item, i) => (
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
   SUB-COMPONENT: Category Filter
   ═══════════════════════════════════════════════════════════════════ */

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-10"
    >
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {CA_CATEGORIES.map((cat, index) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <cat.icon
                className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500"}`}
              />
              <span className="whitespace-nowrap">{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
              >
                {cat.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Article Card
   ═══════════════════════════════════════════════════════════════════ */

const ArticleCard = ({ article, index, isFeatured = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  const categoryData = CA_CATEGORIES.find((c) => c.id === article.category);

  if (isFeatured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group mb-10"
      >
        <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-900/40 to-transparent" />

              {/* Badges */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                {article.isNew && (
                  <motion.span
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    NEW
                  </motion.span>
                )}
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                  {categoryData?.label}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 text-white">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {article.views}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                  {article.difficulty}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 font-semibold">
                  {article.category.toUpperCase()}
                </span>
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-500 mb-5 leading-relaxed">
                {article.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold"
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <BookOpen className="w-4 h-4" />
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bookmark className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-200/60">
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image})` }}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-2">
            {article.isNew && (
              <motion.span
                className="px-2 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                NEW
              </motion.span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
              {categoryData?.label}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute top-3 right-3 flex flex-col gap-1.5"
            initial={{ x: 40, opacity: 0 }}
            animate={isHovered ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30"
              whileHover={{ scale: 1.15 }}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30"
              whileHover={{ scale: 1.15 }}
            >
              <Share2 className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">
              {article.difficulty}
            </span>
            <span className="text-[10px] text-gray-400">{article.date}</span>
          </div>

          <h4 className="text-sm font-black text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
            {article.title}
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 text-[10px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.button
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors mt-1"
            whileHover={{ x: 3 }}
          >
            Read Article <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Daily Quiz Section
   ═══════════════════════════════════════════════════════════════════ */

const DailyQuizSection = () => {
  const [activeQ, setActiveQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const currentQ = DAILY_QUIZ[activeQ];

  const handleOptionSelect = (idx) => {
    if (showAnswer) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setShowAnswer(true);
  };

  const handleNextQ = () => {
    setActiveQ((prev) => (prev + 1) % DAILY_QUIZ.length);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-14"
    >
      <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-800 to-purple-800 shadow-2xl shadow-blue-500/15 p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Left Info */}
          <motion.div
            variants={fadeInLeft}
            className="lg:w-2/5 text-white space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <Brain className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold text-blue-200 uppercase tracking-wider">
                Daily Quiz Challenge
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-black leading-tight">
              Test Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                Knowledge
              </span>{" "}
              Daily
            </h3>

            <p className="text-blue-100 leading-relaxed">
              Practice with 3 fresh questions daily, based on the latest current
              affairs. Track your progress and build consistency.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Target, text: "50+ MCQs/Week" },
                { icon: BarChart3, text: "Performance Track" },
                { icon: Brain, text: "Topic-wise Analysis" },
                { icon: Trophy, text: "Leaderboard" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <item.icon className="w-4 h-4 text-blue-300 flex-shrink-0" />
                  <span className="text-xs font-semibold text-blue-100">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-blue-300">
                Question {activeQ + 1} of {DAILY_QUIZ.length}
              </span>
              <div className="flex gap-1">
                {DAILY_QUIZ.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${i === activeQ ? "bg-yellow-400" : "bg-white/20"}`}
                    animate={i === activeQ ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Quiz */}
          <motion.div variants={fadeInRight} className="lg:w-3/5 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQ}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 space-y-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-yellow-400/20 text-yellow-300 text-xs font-bold">
                    {currentQ.topic}
                  </span>
                  <span className="text-xs text-blue-300">Q{activeQ + 1}</span>
                </div>

                <p className="text-white font-bold text-base leading-relaxed">
                  {currentQ.question}
                </p>

                <div className="space-y-2.5">
                  {currentQ.options.map((opt, i) => {
                    let optionStyle =
                      "bg-white/5 border-white/15 text-blue-100 hover:bg-white/10";
                    if (selectedOption === i && !showAnswer) {
                      optionStyle =
                        "bg-blue-500/30 border-blue-400/50 text-white";
                    }
                    if (showAnswer && i === currentQ.correct) {
                      optionStyle =
                        "bg-green-500/30 border-green-400/50 text-green-200";
                    }
                    if (
                      showAnswer &&
                      selectedOption === i &&
                      i !== currentQ.correct
                    ) {
                      optionStyle =
                        "bg-red-500/30 border-red-400/50 text-red-200";
                    }

                    return (
                      <motion.button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        className={`w-full text-left px-4 py-3 rounded-xl border ${optionStyle} transition-all duration-300 text-sm font-medium`}
                        whileHover={!showAnswer ? { scale: 1.01, x: 3 } : {}}
                        whileTap={!showAnswer ? { scale: 0.99 } : {}}
                      >
                        <span className="font-bold mr-2">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                        {showAnswer && i === currentQ.correct && (
                          <CheckCircle className="w-4 h-4 inline ml-2 text-green-400" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-xl bg-blue-500/10 border border-blue-400/20 p-4"
                    >
                      <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">
                        Explanation
                      </p>
                      <p className="text-sm text-blue-100">
                        {currentQ.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3">
                  {!showAnswer ? (
                    <motion.button
                      onClick={handleCheckAnswer}
                      disabled={selectedOption === null}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm ${selectedOption !== null ? "bg-white text-blue-700 shadow-lg" : "bg-white/20 text-white/40 cursor-not-allowed"}`}
                      whileHover={
                        selectedOption !== null ? { scale: 1.03 } : {}
                      }
                      whileTap={selectedOption !== null ? { scale: 0.97 } : {}}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Check Answer
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleNextQ}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-lg"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Next Question <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Learning Formats Grid
   ═══════════════════════════════════════════════════════════════════ */

const LearningFormatsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-14"
    >
      <motion.div variants={staggerItem} className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Layers className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-bold text-indigo-700 uppercase tracking-wider">
            Multiple Learning Formats
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Learn the Way <span className="text-blue-600">You Prefer</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          From detailed articles to quick video summaries, practice MCQs to
          audio podcasts — choose what works best for you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {LEARNING_FORMATS.map((fmt, index) => (
          <motion.div
            key={fmt.title}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
          >
            <div className="relative h-full p-6 rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-200/60">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${fmt.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${fmt.color} flex items-center justify-center shadow-md`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  >
                    <fmt.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-bold">
                    {fmt.count}
                  </span>
                </div>
                <h4 className="text-sm font-black text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {fmt.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {fmt.description}
                </p>
                <motion.button
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 mt-3 hover:text-blue-800 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Monthly Compilations
   ═══════════════════════════════════════════════════════════════════ */

const MonthlyCompilations = () => {
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
      <motion.div variants={staggerItem} className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-3"
          whileHover={{ scale: 1.05 }}
        >
          <Download className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">
            Free Downloads
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Monthly <span className="text-blue-600">Compilations</span>
        </h3>
        <p className="text-gray-500 max-w-xl mx-auto">
          Download comprehensive month-wise PDF compilations for quick revision.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {MONTHLY_COMPILATIONS.map((comp, index) => (
          <motion.div
            key={comp.month}
            variants={staggerItem}
            whileHover={{ y: -6, scale: 1.03 }}
            className="group"
          >
            <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200/60">
              {comp.isLatest && (
                <motion.div
                  className="absolute -top-1 -right-1 px-3 py-1 rounded-bl-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LATEST
                </motion.div>
              )}

              <div className="text-center space-y-3">
                <motion.div
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                >
                  <FileText className="w-8 h-8 text-white" />
                </motion.div>

                <h4 className="text-sm font-black text-gray-900">
                  {comp.month}
                </h4>

                <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
                  <span>{comp.pages} pages</span>
                  <span>•</span>
                  <span>{comp.articles} articles</span>
                </div>

                <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                  <Download className="w-3 h-3" />
                  <span>{comp.downloads} downloads</span>
                </div>

                <motion.button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: CTA
   ═══════════════════════════════════════════════════════════════════ */

const CACTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 p-10 lg:p-14 shadow-2xl shadow-blue-500/20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <motion.div
          className="absolute top-6 left-6 w-24 h-24 rounded-full bg-white/5"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-white/5"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg mx-auto">
              <Bell className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h3 className="text-3xl lg:text-4xl font-black text-white">
            Never Miss a Current Affairs Update
          </h3>
          <p className="text-blue-100 text-base leading-relaxed">
            Subscribe to our free daily newsletter and get curated current
            affairs, quiz questions, and study materials delivered directly to
            your inbox every morning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40 transition-colors"
            />
            <motion.button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-xl whitespace-nowrap"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Bell className="w-4 h-4" />
              Subscribe Free
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          <p className="text-[10px] text-blue-300/50">
            50,000+ aspirants already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const CurrentAffairs = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles =
    activeCategory === "all"
      ? CA_ARTICLES
      : CA_ARTICLES.filter((a) => a.category === activeCategory);

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 overflow-hidden">
      <CAParallax />
      <CAParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <CASectionHeader />
        <StatsTicker />
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Featured Article */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`featured-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {featured && (
              <ArticleCard article={featured} index={0} isFeatured />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`grid-${activeCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14"
          >
            {rest.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        <DailyQuizSection />
        <LearningFormatsGrid />
        <MonthlyCompilations />
        <CACTA />
      </div>
    </section>
  );
};

export default CurrentAffairs;
