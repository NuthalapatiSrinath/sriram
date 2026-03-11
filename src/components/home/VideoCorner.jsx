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
  Play,
  Pause,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Star,
  ThumbsUp,
  Heart,
  Share2,
  BookOpen,
  GraduationCap,
  Award,
  Trophy,
  Users,
  Filter,
  Grid3X3,
  BarChart3,
  TrendingUp,
  Calendar,
  Target,
  Zap,
  Crown,
  BadgeCheck,
  CheckCircle,
  Flame,
  ExternalLink,
  Volume2,
  VolumeX,
  Maximize2,
  ListVideo,
  Tv,
  Video,
  Youtube,
  MonitorPlay,
  PlayCircle,
  CirclePlay,
  Clapperboard,
  Film,
  Radio,
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
   DATA — VIDEO CATEGORIES
   ═══════════════════════════════════════════════════════════════════ */

const VIDEO_CATEGORIES = [
  { id: "all", label: "All Videos", icon: Grid3X3, count: 12 },
  { id: "lectures", label: "Free Lectures", icon: MonitorPlay, count: 4 },
  { id: "toppers", label: "Topper Interviews", icon: Trophy, count: 3 },
  { id: "strategy", label: "Strategy & Tips", icon: Target, count: 3 },
  { id: "current", label: "Current Affairs", icon: Radio, count: 2 },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — VIDEOS
   ═══════════════════════════════════════════════════════════════════ */

const VIDEOS_DATA = [
  {
    id: 1,
    title: "Complete Indian Polity — Laxmikanth Summary in 4 Hours",
    category: "lectures",
    thumbnail:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    duration: "4:12:30",
    views: "2.4M",
    likes: "98K",
    date: "2 weeks ago",
    instructor: "Dr. Ramesh Iyer",
    rating: 4.9,
    isFeatured: true,
    isNew: true,
    color: "from-blue-500 to-indigo-600",
    tags: ["Polity", "GS-II", "Laxmikanth", "Prelims"],
    description:
      "Master the entire Indian Polity syllabus with this comprehensive 4-hour lecture covering all 80+ chapters of Laxmikanth with UPSC-relevant insights.",
  },
  {
    id: 2,
    title: "AIR 3 Sneha Pillai — My UPSC Journey & Study Plan",
    category: "toppers",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    duration: "52:18",
    views: "1.8M",
    likes: "85K",
    date: "1 week ago",
    instructor: "Sneha Pillai (AIR 3)",
    rating: 4.9,
    isFeatured: true,
    isNew: true,
    color: "from-amber-500 to-orange-600",
    tags: ["Topper Interview", "Strategy", "AIR 3", "2025"],
    description:
      "Hear directly from AIR 3 Sneha Pillai about her preparation strategy, daily routine, book list, and how SRIRAM IAS helped her achieve her dream.",
  },
  {
    id: 3,
    title: "Economy — Union Budget 2025-26 Complete Analysis",
    category: "current",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    duration: "2:35:40",
    views: "1.2M",
    likes: "62K",
    date: "3 days ago",
    instructor: "Prof. Sunita Deshpande",
    rating: 4.9,
    isFeatured: true,
    isNew: true,
    color: "from-emerald-500 to-teal-600",
    tags: ["Economy", "Budget", "Current Affairs", "GS-III"],
    description:
      "Detailed UPSC-focused analysis of Union Budget 2025-26 covering all key allocations, schemes, and expected questions for Prelims & Mains.",
  },
  {
    id: 4,
    title: "How to Write a 250-Word Answer in 15 Minutes",
    category: "strategy",
    thumbnail:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    duration: "38:22",
    views: "980K",
    likes: "52K",
    date: "5 days ago",
    instructor: "Dr. Priya Nambiar",
    rating: 4.8,
    isFeatured: false,
    isNew: false,
    color: "from-purple-500 to-pink-600",
    tags: ["Answer Writing", "Mains", "Strategy", "Tips"],
    description:
      "Learn the SRIRAM framework for writing structured, high-scoring 250-word answers within the 15-minute time limit for UPSC Mains.",
  },
  {
    id: 5,
    title: "International Relations — India's Foreign Policy 2025",
    category: "lectures",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    duration: "3:15:45",
    views: "750K",
    likes: "41K",
    date: "1 month ago",
    instructor: "Brig. Vikram Singh (Retd.)",
    rating: 4.8,
    isFeatured: false,
    isNew: false,
    color: "from-rose-500 to-red-600",
    tags: ["IR", "GS-II", "Foreign Policy", "Geopolitics"],
    description:
      "A strategic deep-dive into India's foreign policy, covering bilateral relations, multilateral forums, neighborhood policy, and Indo-Pacific strategy.",
  },
  {
    id: 6,
    title: "CSAT — Crack Comprehension Passages in 2 Minutes",
    category: "strategy",
    thumbnail:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
    duration: "45:15",
    views: "1.1M",
    likes: "58K",
    date: "2 weeks ago",
    instructor: "Prof. Anand Sharma",
    rating: 4.9,
    isFeatured: false,
    isNew: false,
    color: "from-cyan-500 to-blue-600",
    tags: ["CSAT", "Comprehension", "Prelims", "Techniques"],
    description:
      "Master the art of solving CSAT comprehension passages quickly with proven techniques that have helped thousands clear the CSAT cutoff.",
  },
  {
    id: 7,
    title: "AIR 12 Aarav Mehta — Working Professional to IAS",
    category: "toppers",
    thumbnail:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    duration: "1:05:30",
    views: "890K",
    likes: "47K",
    date: "3 weeks ago",
    instructor: "Aarav Mehta (AIR 12)",
    rating: 4.8,
    isFeatured: false,
    isNew: false,
    color: "from-indigo-500 to-violet-600",
    tags: ["Topper", "Working Professional", "AIR 12", "Motivation"],
    description:
      "Inspiring story of Aarav Mehta who cracked UPSC while working full-time. Learn his time management secrets and preparation strategy.",
  },
  {
    id: 8,
    title: "Ethics Case Studies — Top 20 for Mains 2025",
    category: "lectures",
    thumbnail:
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&q=80",
    duration: "2:48:20",
    views: "650K",
    likes: "38K",
    date: "1 month ago",
    instructor: "Dr. Priya Nambiar",
    rating: 4.9,
    isFeatured: false,
    isNew: false,
    color: "from-teal-500 to-green-600",
    tags: ["Ethics", "GS-IV", "Case Studies", "Mains"],
    description:
      "Solve the top 20 most important ethics case studies expected in UPSC Mains 2025 with the SRIRAM structured approach.",
  },
  {
    id: 9,
    title: "Geography Optional — Physical Geography Complete",
    category: "lectures",
    thumbnail:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80",
    duration: "5:30:15",
    views: "420K",
    likes: "25K",
    date: "2 months ago",
    instructor: "Dr. Sanjay Gupta",
    rating: 4.8,
    isFeatured: false,
    isNew: false,
    color: "from-yellow-500 to-amber-600",
    tags: ["Geography", "Optional", "Physical Geo", "Paper I"],
    description:
      "Complete Physical Geography coverage for Optional Paper I including geomorphology, climatology, oceanography, and biogeography.",
  },
  {
    id: 10,
    title: "AIR 41 Ananya Singh — Optional Strategy That Works",
    category: "toppers",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    duration: "48:55",
    views: "560K",
    likes: "32K",
    date: "1 month ago",
    instructor: "Ananya Singh (AIR 41)",
    rating: 4.8,
    isFeatured: false,
    isNew: false,
    color: "from-pink-500 to-rose-600",
    tags: ["Optional", "Strategy", "AIR 41", "Pol Science"],
    description:
      "AIR 41 Ananya Singh shares how she scored 310/500 in Political Science optional with SRIRAM's structured preparation method.",
  },
  {
    id: 11,
    title: "Monthly Current Affairs — May 2025 Complete Revision",
    category: "current",
    thumbnail:
      "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&q=80",
    duration: "3:20:10",
    views: "780K",
    likes: "43K",
    date: "4 days ago",
    instructor: "Prof. Sunita Deshpande",
    rating: 4.9,
    isFeatured: false,
    isNew: true,
    color: "from-blue-500 to-sky-600",
    tags: ["Current Affairs", "May 2025", "Monthly", "Revision"],
    description:
      "Complete May 2025 current affairs revision covering all UPSC-relevant national and international events, government schemes, and reports.",
  },
  {
    id: 12,
    title: "Prelims 2025 — Last 30 Days Strategy & Revision Plan",
    category: "strategy",
    thumbnail:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=80",
    duration: "55:40",
    views: "1.5M",
    likes: "72K",
    date: "1 week ago",
    instructor: "Dr. Ramesh Iyer",
    rating: 4.9,
    isFeatured: false,
    isNew: true,
    color: "from-emerald-600 to-green-700",
    tags: ["Prelims", "Strategy", "Last 30 Days", "Revision"],
    description:
      "The ultimate 30-day game plan for UPSC Prelims 2025. Day-wise schedule, subject priority, revision strategy, and test-taking tips from India's top faculty.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — CHANNEL STATS
   ═══════════════════════════════════════════════════════════════════ */

const CHANNEL_STATS = [
  {
    icon: PlayCircle,
    value: "500+",
    label: "Free Videos",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Eye,
    value: "50M+",
    label: "Total Views",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Users,
    value: "1.2M",
    label: "Subscribers",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: ThumbsUp,
    value: "5M+",
    label: "Total Likes",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    value: "1,000+",
    label: "Hours of Content",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
    color: "from-cyan-500 to-blue-500",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Particles
   ═══════════════════════════════════════════════════════════════════ */

const VideoParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={`vid-p-${i}`}
        className="absolute rounded-full"
        style={{
          width: 2 + Math.random() * 5,
          height: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(239, 68, 68, ${0.05 + Math.random() * 0.08})`,
        }}
        animate={{
          y: [0, -25 - Math.random() * 30, 0],
          x: [0, Math.random() * 10 - 5, 0],
          opacity: [0, 0.5, 0],
          scale: [0.5, 1.2, 0.5],
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

const VideoParallax = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -170]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-16 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-red-100/15 to-orange-100/15 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/15 to-indigo-100/15 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute top-1/4 right-20 w-10 h-10 border-2 border-red-200/15 rounded-lg"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-16 w-8 h-8 border-2 border-blue-200/15 rounded-full"
        style={{ rotate: rotate2 }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: SectionHeader
   ═══════════════════════════════════════════════════════════════════ */

const VideoSectionHeader = () => {
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
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-gradient-to-br from-red-100 to-orange-100 blur-3xl opacity-30"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div variants={staggerItem} className="inline-block mb-5">
        <motion.div
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/60 shadow-lg shadow-red-100/40"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PlayCircle className="w-4 h-4 text-red-600" />
          </motion.div>
          <span className="text-sm font-bold text-red-700 uppercase tracking-wider">
            Video Learning Hub
          </span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-5 leading-tight"
      >
        <span className="block">Video</span>
        <span className="block bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
          Corner
        </span>
      </motion.h2>

      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Access 500+ free video lectures, topper interviews, strategy sessions,
        and current affairs analysis — all crafted by India's top UPSC faculty.
      </motion.p>

      <motion.div
        variants={staggerItem}
        className="flex items-center justify-center gap-2 mt-6"
      >
        <motion.div
          className="h-1 w-12 rounded-full bg-red-300"
          initial={{ width: 0 }}
          animate={isInView ? { width: 48 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.div
          className="h-1.5 w-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.div
          className="h-1 w-12 rounded-full bg-orange-300"
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

const VideoStatsBar = () => {
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
        {CHANNEL_STATS.map((stat, i) => (
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
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-2 bg-gradient-to-br ${stat.color} shadow-lg`}
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
   SUB-COMPONENT: Category Filter
   ═══════════════════════════════════════════════════════════════════ */

const VideoCategoryFilter = ({ activeCategory, onCategoryChange }) => {
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
        {VIDEO_CATEGORIES.map((cat, index) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 shadow-sm"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.07 + 0.2 }}
            >
              <cat.icon className="w-4 h-4" />
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
   SUB-COMPONENT: Featured Video
   ═══════════════════════════════════════════════════════════════════ */

const FeaturedVideo = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <div
        className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Thumbnail */}
          <div className="lg:w-3/5 relative overflow-hidden cursor-pointer group">
            <motion.img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-64 lg:h-80 object-cover"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Play Overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-red-500/40"
                whileHover={{ scale: 1.15 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
            </motion.div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {video.isNew && (
                <motion.span
                  className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  NEW
                </motion.span>
              )}
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1">
                <Crown className="w-3 h-3 text-yellow-400" />
                Featured
              </span>
            </div>

            {/* Duration */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-sm font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {video.duration}
            </div>

            {/* Views */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-xs flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.views}
              </span>
              <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-xs flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                {video.likes}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-2/5 p-8 flex flex-col justify-center space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-black text-gray-900 leading-tight">
              {video.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              {video.description}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${video.color} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {video.instructor.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">
                    {video.instructor}
                  </p>
                  <p className="text-[10px] text-gray-400">{video.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">
                  {video.rating}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <motion.button
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-sm shadow-lg shadow-red-500/20"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                Watch Now
              </motion.button>
              <motion.button
                className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <Heart className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Video Card
   ═══════════════════════════════════════════════════════════════════ */

const VideoCard = ({ video, index }) => {
  const [isHovered, setIsHovered] = useState(false);
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
      whileHover={{ y: -8 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:border-red-200/50">
        {/* Thumbnail */}
        <div className="relative overflow-hidden cursor-pointer">
          <motion.img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-44 object-cover"
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-red-600/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.2 }}
              animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Play className="w-6 h-6 text-white ml-0.5" />
            </motion.div>
          </motion.div>

          {video.isNew && (
            <motion.span
              className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              NEW
            </motion.span>
          )}

          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h4 className="text-sm font-black text-gray-900 leading-tight line-clamp-2 group-hover:text-red-700 transition-colors">
            {video.title}
          </h4>

          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-br ${video.color} flex items-center justify-center text-white text-[9px] font-bold`}
            >
              {video.instructor.charAt(0)}
            </div>
            <span className="text-xs text-gray-500 font-semibold truncate">
              {video.instructor}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div className="flex items-center gap-3 text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.views}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                {video.likes}
              </span>
            </div>
            <span className="text-[10px] text-gray-400">{video.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Scrolling Ticker
   ═══════════════════════════════════════════════════════════════════ */

const VideoTicker = () => {
  const items = [
    "▶️ 500+ Free Video Lectures",
    "👀 50M+ Total Views",
    "📺 1.2M YouTube Subscribers",
    "⭐ 4.9/5 Avg Video Rating",
    "🎓 Top UPSC Faculty Online",
    "📱 Watch Anytime, Anywhere",
    "🔴 Live Classes Every Week",
  ];

  return (
    <div className="mb-14 overflow-hidden py-3 bg-gradient-to-r from-red-50 via-white to-orange-50 rounded-2xl border border-red-100/50 shadow-sm">
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
            <span className="text-red-300">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: CTA
   ═══════════════════════════════════════════════════════════════════ */

const VideoCTA = () => {
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
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 p-10 lg:p-14 shadow-2xl shadow-red-500/15">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <motion.div
          className="absolute top-6 right-6 w-24 h-24 rounded-full bg-white/10"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-white space-y-4">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Youtube className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-black">
              Subscribe to Our Channel
            </h3>
            <p className="text-orange-100 max-w-xl leading-relaxed">
              Get daily video lectures, current affairs analysis, topper
              interviews, and strategy tips delivered straight to your feed.
              Join 1.2 million learners!
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {["Daily Uploads", "Live Classes", "Community Posts"].map(
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

          <div className="flex flex-col gap-3">
            <motion.button
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-red-700 font-bold shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayCircle className="w-5 h-5" />
              Subscribe Now
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
            <motion.button
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-white/30 text-white font-bold"
              whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.6)" }}
            >
              <ListVideo className="w-4 h-4" />
              Browse All Playlists
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const VideoCorner = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredVideos =
    activeCategory === "all"
      ? VIDEOS_DATA
      : VIDEOS_DATA.filter((v) => v.category === activeCategory);

  const featuredVideos = filteredVideos.filter((v) => v.isFeatured);
  const regularVideos = filteredVideos.filter((v) => !v.isFeatured);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-red-50/20 overflow-hidden">
      <VideoParallax />
      <VideoParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <VideoSectionHeader />
        <VideoTicker />
        <VideoStatsBar />

        <VideoCategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Featured Videos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`videos-${activeCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {featuredVideos.length > 0 && (
              <div className="space-y-6 mb-8">
                {featuredVideos.map((video) => (
                  <FeaturedVideo key={video.id} video={video} />
                ))}
              </div>
            )}

            {/* Regular Videos Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularVideos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <VideoCTA />
      </div>
    </section>
  );
};

export default VideoCorner;
