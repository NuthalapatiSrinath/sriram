import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Trophy,
  ArrowRight,
  CheckCircle,
  Sparkles,
  GraduationCap,
  Calendar,
  Video,
  FileText,
  Target,
  Award,
  TrendingUp,
  Zap,
  ChevronRight,
  Play,
  Download,
  Heart,
  Share2,
  Eye,
  MessageCircle,
  BarChart3,
  Layers,
  Globe,
  BookMarked,
  Briefcase,
  Shield,
  Flame,
  Crown,
  BadgeCheck,
  Timer,
  Percent,
  IndianRupee,
  Monitor,
  Headphones,
  Lightbulb,
  Map,
  Newspaper,
  PenTool,
  School,
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

const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
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

const pulseGlow = {
  initial: { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(59, 130, 246, 0.3)",
      "0 0 20px 10px rgba(59, 130, 246, 0)",
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 8, repeat: Infinity, ease: "linear" },
  },
};

/* ═══════════════════════════════════════════════════════════════════
   COURSE CATEGORIES
   ═══════════════════════════════════════════════════════════════════ */

const COURSE_CATEGORIES = [
  {
    id: "all",
    label: "All Courses",
    icon: Layers,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "foundation",
    label: "Foundation",
    icon: School,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "prelims",
    label: "Prelims",
    icon: Target,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "mains",
    label: "Mains",
    icon: PenTool,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "optional",
    label: "Optional",
    icon: BookMarked,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "test-series",
    label: "Test Series",
    icon: BarChart3,
    color: "from-red-500 to-rose-600",
  },
  {
    id: "current-affairs",
    label: "Current Affairs",
    icon: Newspaper,
    color: "from-indigo-500 to-violet-600",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   COURSES DATA
   ═══════════════════════════════════════════════════════════════════ */

const COURSES_DATA = [
  {
    id: 1,
    title: "UPSC CSE 2-Year Integrated Foundation Course",
    shortTitle: "Foundation Course",
    category: "foundation",
    description:
      "Complete end-to-end preparation covering Prelims, Mains & Interview with India's top faculty. Build a rock-solid foundation for your UPSC journey.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    price: 85000,
    originalPrice: 125000,
    discount: 32,
    duration: "24 Months",
    lectures: "1200+",
    students: "8,500+",
    rating: 4.9,
    reviews: 2340,
    language: "English & Hindi",
    mode: "Online + Offline",
    level: "Beginner to Advanced",
    startDate: "March 15, 2026",
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-500",
    gradient: "from-blue-600 via-blue-700 to-indigo-700",
    features: [
      "Complete GS Coverage (Paper I - IV)",
      "CSAT Preparation Module",
      "Daily Answer Writing Practice",
      "Weekly Current Affairs Classes",
      "Monthly Full-Length Mock Tests",
      "Personality Test (Interview) Guidance",
      "24/7 Doubt Resolution Support",
      "Personal Mentor Assigned",
    ],
    highlights: [
      { icon: Video, text: "1200+ Video Lectures" },
      { icon: FileText, text: "500+ Study Notes" },
      { icon: Target, text: "50+ Mock Tests" },
      { icon: Users, text: "8,500+ Students" },
    ],
    instructors: [
      { name: "Dr. Rajesh Kumar", role: "GS Expert", exp: "20+ years" },
      { name: "Prof. Anita Sharma", role: "History Faculty", exp: "15+ years" },
    ],
    topperCount: 120,
  },
  {
    id: 2,
    title: "UPSC Prelims Crash Course 2027",
    shortTitle: "Prelims Crash",
    category: "prelims",
    description:
      "Intensive 6-month prelims preparation with daily MCQ practice, mock tests, and strategic approach to clear the cutoff with confidence.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    price: 35000,
    originalPrice: 55000,
    discount: 36,
    duration: "6 Months",
    lectures: "450+",
    students: "12,000+",
    rating: 4.8,
    reviews: 3120,
    language: "English & Hindi",
    mode: "Online",
    level: "Intermediate",
    startDate: "April 1, 2026",
    badge: "Most Popular",
    badgeColor: "from-blue-500 to-indigo-500",
    gradient: "from-emerald-600 via-green-700 to-teal-600",
    features: [
      "Complete Prelims Syllabus Coverage",
      "Daily 50 MCQ Practice Sets",
      "Bi-Weekly Full Mock Tests",
      "Previous Year Analysis (2010-2025)",
      "CSAT Strategy & Tricks",
      "Current Affairs Monthly Digest",
      "Cut-off Strategy Sessions",
      "Last Month Revision Capsule",
    ],
    highlights: [
      { icon: Video, text: "450+ Video Lectures" },
      { icon: FileText, text: "200+ Practice Sets" },
      { icon: Target, text: "30+ Mock Tests" },
      { icon: Users, text: "12,000+ Students" },
    ],
    instructors: [
      { name: "Vikram Mehta", role: "Prelims Strategist", exp: "18+ years" },
      { name: "Dr. Sneha Nair", role: "Polity Expert", exp: "12+ years" },
    ],
    topperCount: 250,
  },
  {
    id: 3,
    title: "Mains Answer Writing Masterclass",
    shortTitle: "Mains Writing",
    category: "mains",
    description:
      "Master the art of answer writing with expert evaluation, model answers, and personalized feedback to score 500+ in UPSC Mains.",
    image:
      "https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=800&q=80",
    price: 42000,
    originalPrice: 65000,
    discount: 35,
    duration: "8 Months",
    lectures: "600+",
    students: "5,200+",
    rating: 4.9,
    reviews: 1850,
    language: "English & Hindi",
    mode: "Online + Offline",
    level: "Intermediate to Advanced",
    startDate: "March 20, 2026",
    badge: "Top Rated",
    badgeColor: "from-purple-500 to-pink-500",
    gradient: "from-purple-600 via-violet-700 to-indigo-700",
    features: [
      "Daily Answer Writing (GS I-IV + Essay)",
      "Personal Evaluation by Ex-IAS Officers",
      "Model Answer Bank (5000+ Answers)",
      "Essay Writing Workshops",
      "Ethics Case Study Practice",
      "Topper's Answer Copy Analysis",
      "Optional Subject Integration Tips",
      "Pre-Mains Booster Module",
    ],
    highlights: [
      { icon: PenTool, text: "600+ Practice Sessions" },
      { icon: FileText, text: "5000+ Model Answers" },
      { icon: Award, text: "Expert Evaluation" },
      { icon: Users, text: "5,200+ Students" },
    ],
    instructors: [
      {
        name: "Smt. Kavitha Raj (IAS Retd.)",
        role: "Mains Expert",
        exp: "25+ years",
      },
      { name: "Dr. Arun Patel", role: "Essay Specialist", exp: "14+ years" },
    ],
    topperCount: 95,
  },
  {
    id: 4,
    title: "Geography Optional - Complete Course",
    shortTitle: "Geography Optional",
    category: "optional",
    description:
      "Score 300+ in Geography Optional with comprehensive coverage including physical, human, and Indian geography with map practice.",
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
    price: 38000,
    originalPrice: 58000,
    discount: 34,
    duration: "12 Months",
    lectures: "500+",
    students: "3,800+",
    rating: 5.0,
    reviews: 980,
    language: "English & Hindi",
    mode: "Online + Offline",
    level: "Beginner to Advanced",
    startDate: "April 5, 2026",
    badge: "Highest Rated",
    badgeColor: "from-emerald-500 to-green-500",
    gradient: "from-cyan-600 via-blue-700 to-indigo-700",
    features: [
      "Physical Geography (Geomorphology, Climatology)",
      "Human Geography Complete Module",
      "Indian Geography In-Depth",
      "World Regional Geography",
      "Map Work & Diagram Practice",
      "Previous Year Answer Analysis",
      "Topper's Strategy Sessions",
      "Revision Notes & Atlas Guidance",
    ],
    highlights: [
      { icon: Map, text: "500+ Map Exercises" },
      { icon: FileText, text: "350+ Study Notes" },
      { icon: Target, text: "25+ Mock Tests" },
      { icon: Users, text: "3,800+ Students" },
    ],
    instructors: [
      {
        name: "Prof. Deepak Sharma",
        role: "Geography Expert",
        exp: "22+ years",
      },
      { name: "Dr. Meera Singh", role: "Map Specialist", exp: "16+ years" },
    ],
    topperCount: 75,
  },
  {
    id: 5,
    title: "All India UPSC Prelims Test Series 2027",
    shortTitle: "Prelims Test Series",
    category: "test-series",
    description:
      "India's most comprehensive test series with 40+ full-length tests, detailed analysis, and All India Ranking to benchmark your preparation.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    price: 12000,
    originalPrice: 20000,
    discount: 40,
    duration: "4 Months",
    lectures: "100+",
    students: "25,000+",
    rating: 4.8,
    reviews: 5670,
    language: "English & Hindi",
    mode: "Online",
    level: "All Levels",
    startDate: "Feb 1, 2026",
    badge: "40% OFF",
    badgeColor: "from-red-500 to-rose-500",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    features: [
      "40+ Full-Length Prelims Mock Tests",
      "Subject-wise Sectional Tests (80+)",
      "CSAT Practice Tests (20+)",
      "All India Ranking & Percentile",
      "Detailed Solution & Analysis",
      "Performance Analytics Dashboard",
      "Previous Year Paper Discussion",
      "Doubt Clearing Sessions Weekly",
    ],
    highlights: [
      { icon: BarChart3, text: "40+ Full Mock Tests" },
      { icon: Target, text: "80+ Sectional Tests" },
      { icon: TrendingUp, text: "All India Ranking" },
      { icon: Users, text: "25,000+ Students" },
    ],
    instructors: [{ name: "Team SRIRAM IAS", role: "Expert Panel", exp: "" }],
    topperCount: 400,
  },
  {
    id: 6,
    title: "Daily Current Affairs & Monthly Magazine",
    shortTitle: "Current Affairs",
    category: "current-affairs",
    description:
      "Stay ahead with daily current affairs analysis, monthly magazine, and UPSC-focused editorial discussions by expert faculty.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168d3c?w=800&q=80",
    price: 8000,
    originalPrice: 15000,
    discount: 47,
    duration: "12 Months",
    lectures: "365+",
    students: "18,000+",
    rating: 4.7,
    reviews: 4230,
    language: "English & Hindi",
    mode: "Online",
    level: "All Levels",
    startDate: "Ongoing",
    badge: "47% OFF",
    badgeColor: "from-violet-500 to-purple-500",
    gradient: "from-indigo-600 via-violet-700 to-purple-700",
    features: [
      "Daily Current Affairs Video (30 mins)",
      "Monthly Consolidated Magazine (PDF)",
      "Editorial Analysis & Discussion",
      "PIB / Yojana / Kurukshetra Summary",
      "Subject-wise Current Affairs Mapping",
      "Prelims Focused MCQs Daily",
      "Mains Answer Hints with CA",
      "Yearly Compilation (Jan-Dec)",
    ],
    highlights: [
      { icon: Newspaper, text: "365+ Daily Videos" },
      { icon: FileText, text: "12 Monthly Magazines" },
      { icon: Lightbulb, text: "Editorial Analysis" },
      { icon: Users, text: "18,000+ Students" },
    ],
    instructors: [
      { name: "Suresh Babu", role: "CA Expert", exp: "10+ years" },
      { name: "Priya Menon", role: "Editorial Analyst", exp: "8+ years" },
    ],
    topperCount: 180,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   COURSE STATS
   ═══════════════════════════════════════════════════════════════════ */

const COURSE_STATS = [
  {
    label: "Active Courses",
    value: "50+",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    label: "Video Lectures",
    value: "5000+",
    icon: Video,
    color: "text-purple-500",
  },
  {
    label: "Study Materials",
    value: "2000+",
    icon: FileText,
    color: "text-emerald-500",
  },
  {
    label: "Happy Students",
    value: "50,000+",
    icon: Users,
    color: "text-amber-500",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Floating Particles Background
   ═══════════════════════════════════════════════════════════════════ */

const CourseSectionParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`course-particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 5,
            height: 2 + Math.random() * 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(59, 130, 246, ${0.1 + Math.random() * 0.15})`,
          }}
          animate={{
            y: [0, -20 - Math.random() * 40, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0, 0.5, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Animated Section Header
   ═══════════════════════════════════════════════════════════════════ */

const SectionHeader = () => {
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
      {/* Decorative Background Element */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Badge */}
      <motion.div variants={staggerItem} className="inline-block mb-5">
        <motion.div
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 shadow-lg shadow-blue-100/40"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
          </motion.div>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            Our Premium Courses
          </span>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={staggerItem}
        className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-5 leading-tight"
      >
        <span className="block">Explore Our</span>
        <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          UPSC Courses
        </span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Handcrafted by India's finest educators and UPSC toppers. Choose the
        path that aligns with your preparation stage and start your journey
        towards civil services.
      </motion.p>

      {/* Decorative Underline */}
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
   SUB-COMPONENT: Course Stats Banner
   ═══════════════════════════════════════════════════════════════════ */

const CourseStatsBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
    >
      {COURSE_STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={staggerItem}
          whileHover={{ y: -5, scale: 1.03 }}
          className="relative group"
        >
          <div className="relative p-5 rounded-2xl bg-white border border-blue-100/60 shadow-lg shadow-blue-50/50 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-200">
            {/* Hover bg effect */}
            <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500" />

            <div className="relative z-10 flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shadow-md"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </motion.div>
              <div>
                <motion.p
                  className="text-2xl font-black text-gray-900"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Category Filter Tabs
   ═══════════════════════════════════════════════════════════════════ */

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-12"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        {COURSE_CATEGORIES.map((cat, index) => {
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
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <cat.icon
                className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500"}`}
              />
              <span className="whitespace-nowrap">{cat.label}</span>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 -z-10"
                  layoutId="activeCategoryBg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Course Rating Stars
   ═══════════════════════════════════════════════════════════════════ */

const RatingStars = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: "spring" }}
          >
            <Star
              className={`w-4 h-4 ${
                i < fullStars
                  ? "fill-amber-400 text-amber-400"
                  : i === fullStars && hasHalfStar
                    ? "fill-amber-200 text-amber-400"
                    : "fill-gray-200 text-gray-200"
              }`}
            />
          </motion.div>
        ))}
      </div>
      <span className="text-sm font-bold text-gray-800">{rating}</span>
      <span className="text-xs text-gray-400">
        ({reviews.toLocaleString()} reviews)
      </span>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Price Display
   ═══════════════════════════════════════════════════════════════════ */

const PriceDisplay = ({ price, originalPrice, discount }) => {
  return (
    <div className="flex items-end gap-3">
      <motion.div
        className="flex items-center gap-1"
        whileHover={{ scale: 1.05 }}
      >
        <IndianRupee className="w-5 h-5 text-gray-900" />
        <span className="text-3xl font-black text-gray-900">
          {price.toLocaleString()}
        </span>
      </motion.div>
      <div className="flex items-center gap-2 pb-1">
        <span className="text-sm text-gray-400 line-through">
          ₹{originalPrice.toLocaleString()}
        </span>
        <motion.span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Percent className="w-3 h-3" />
          {discount}% OFF
        </motion.span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Course Feature List
   ═══════════════════════════════════════════════════════════════════ */

const CourseFeatureList = ({ features, isExpanded }) => {
  const displayFeatures = isExpanded ? features : features.slice(0, 4);

  return (
    <motion.div
      className="space-y-2"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {displayFeatures.map((feature, i) => (
        <motion.div
          key={feature}
          variants={staggerItem}
          className="flex items-start gap-2.5 group"
        >
          <motion.div
            className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="w-3 h-3 text-white" />
          </motion.div>
          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
            {feature}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Course Highlight Chips
   ═══════════════════════════════════════════════════════════════════ */

const CourseHighlights = ({ highlights }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {highlights.map((h, i) => (
        <motion.div
          key={h.text}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.05, x: 5 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50"
        >
          <h.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="text-xs font-semibold text-blue-700">{h.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Course Card (Main Card)
   ═══════════════════════════════════════════════════════════════════ */

const CourseCard = ({ course, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative h-full rounded-3xl bg-white border border-gray-100 shadow-xl shadow-blue-50/50 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-100/60 group-hover:border-blue-200/60 group-hover:-translate-y-2">
        {/* Card Glow Effect */}
        <motion.div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />

        {/* Course Image Section */}
        <div className="relative h-52 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${course.image})` }}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${course.gradient} opacity-70`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge */}
          <motion.div
            className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${course.badgeColor} text-white text-xs font-bold shadow-lg`}
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
          >
            <Flame className="w-3 h-3" />
            {course.badge}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col gap-2"
            initial={{ x: 50, opacity: 0 }}
            animate={isHovered ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-lg ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
            </motion.button>
            <motion.button
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-lg"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium">
                <Clock className="w-3 h-3" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium">
                <Video className="w-3 h-3" />
                {course.lectures} Lectures
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium">
                <Monitor className="w-3 h-3" />
                {course.mode}
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative p-6 space-y-4">
          {/* Category & Level */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
              {course.category.replace("-", " ")}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {course.level}
            </span>
          </div>

          {/* Title */}
          <motion.h3 className="text-lg font-black text-gray-900 leading-snug group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
            {course.title}
          </motion.h3>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Rating & Students */}
          <div className="flex items-center justify-between">
            <RatingStars rating={course.rating} reviews={course.reviews} />
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Users className="w-3.5 h-3.5" />
              <span className="font-semibold">{course.students}</span>
            </div>
          </div>

          {/* Highlights */}
          <CourseHighlights highlights={course.highlights} />

          {/* Features (Expandable) */}
          <div>
            <motion.button
              onClick={() => setShowFeatures(!showFeatures)}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors mb-2"
              whileHover={{ x: 3 }}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {showFeatures ? "Hide Features" : "View All Features"}
              <motion.div animate={{ rotate: showFeatures ? 90 : 0 }}>
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {showFeatures && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <CourseFeatureList features={course.features} isExpanded />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center gap-3 py-3 border-t border-gray-100">
            <div className="flex -space-x-2">
              {course.instructors.map((inst, i) => (
                <motion.div
                  key={inst.name}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm"
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  title={inst.name}
                >
                  {inst.name.charAt(0)}
                </motion.div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate">
                {course.instructors[0].name}
                {course.instructors.length > 1 &&
                  ` +${course.instructors.length - 1} more`}
              </p>
              <p className="text-[10px] text-gray-400">
                {course.instructors[0].role}
                {course.instructors[0].exp && ` • ${course.instructors[0].exp}`}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-bold text-gray-700">
                {course.topperCount}
              </span>
              <span className="text-gray-400">Toppers</span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="space-y-4 pt-2">
            <PriceDisplay
              price={course.price}
              originalPrice={course.originalPrice}
              discount={course.discount}
            />

            <div className="flex items-center gap-3">
              <motion.button
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <GraduationCap className="w-4 h-4" />
                Enroll Now
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-xl border-2 border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Preview course"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Start Date & Language */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  Starts:{" "}
                  <span className="font-semibold text-gray-600">
                    {course.startDate}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>{course.language}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Featured Course Banner
   ═══════════════════════════════════════════════════════════════════ */

const FeaturedCourseBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const course = COURSES_DATA[0]; // Foundation course as featured

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-14"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 shadow-2xl shadow-blue-500/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-white/5"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-5">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
              variants={fadeInLeft}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Crown className="w-4 h-4 text-amber-300" />
              </motion.div>
              <span className="text-sm font-bold text-amber-200">
                Featured Course - Best Seller
              </span>
            </motion.div>

            <motion.h3
              className="text-3xl lg:text-4xl font-black leading-tight"
              variants={fadeInLeft}
            >
              {course.title}
            </motion.h3>

            <motion.p
              className="text-blue-100 text-base leading-relaxed max-w-xl"
              variants={fadeInLeft}
            >
              {course.description}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap items-center gap-6"
              variants={fadeInLeft}
            >
              {[
                { icon: Users, label: course.students, sub: "Students" },
                { icon: Star, label: `${course.rating}/5`, sub: "Rating" },
                { icon: Clock, label: course.duration, sub: "Duration" },
                {
                  icon: Trophy,
                  label: `${course.topperCount}+`,
                  sub: "Toppers",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.sub}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">
                      {stat.label}
                    </p>
                    <p className="text-[10px] text-blue-300/80">{stat.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Price & CTA */}
            <motion.div
              className="flex flex-wrap items-center gap-5 pt-3"
              variants={fadeInLeft}
            >
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-white">
                  ₹{course.price.toLocaleString()}
                </span>
                <span className="text-lg text-blue-300/60 line-through pb-1">
                  ₹{course.originalPrice.toLocaleString()}
                </span>
                <motion.span
                  className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {course.discount}% OFF
                </motion.span>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GraduationCap className="w-5 h-5" />
                  Enroll Now
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Info Card */}
          <motion.div
            className="w-full lg:w-80 flex-shrink-0"
            variants={fadeInRight}
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-green-400" />
                What You'll Get
              </h4>
              <div className="space-y-3">
                {[
                  { icon: Video, text: `${course.lectures} Video Lectures` },
                  { icon: FileText, text: "500+ Study Notes & PDFs" },
                  { icon: Target, text: "50+ Full Mock Tests" },
                  { icon: Headphones, text: "24/7 Doubt Support" },
                  { icon: Users, text: "Personal Mentor Assigned" },
                  { icon: Download, text: "Downloadable Resources" },
                  { icon: Shield, text: "Money Back Guarantee" },
                  { icon: Calendar, text: `Starts ${course.startDate}` },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-blue-200" />
                    </div>
                    <span className="text-sm text-blue-100">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Course Comparison Table
   ═══════════════════════════════════════════════════════════════════ */

const CourseComparisonStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      name: "Live Classes",
      foundation: true,
      prelims: true,
      mains: true,
      optional: true,
    },
    {
      name: "Recorded Lectures",
      foundation: true,
      prelims: true,
      mains: true,
      optional: true,
    },
    {
      name: "Mock Tests",
      foundation: true,
      prelims: true,
      mains: true,
      optional: false,
    },
    {
      name: "Answer Writing",
      foundation: true,
      prelims: false,
      mains: true,
      optional: true,
    },
    {
      name: "Personal Mentor",
      foundation: true,
      prelims: false,
      mains: true,
      optional: false,
    },
    {
      name: "Current Affairs",
      foundation: true,
      prelims: true,
      mains: true,
      optional: false,
    },
    {
      name: "Interview Prep",
      foundation: true,
      prelims: false,
      mains: false,
      optional: false,
    },
    {
      name: "Study Material",
      foundation: true,
      prelims: true,
      mains: true,
      optional: true,
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-14"
    >
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-xl shadow-blue-50/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-center">
          <h3 className="text-xl font-black text-white flex items-center justify-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Compare Our Course Plans
          </h3>
          <p className="text-blue-200 text-sm mt-1">
            Find the perfect course for your preparation stage
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-5 py-3 text-center text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Foundation
                </th>
                <th className="px-5 py-3 text-center text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Prelims
                </th>
                <th className="px-5 py-3 text-center text-xs font-bold text-purple-600 uppercase tracking-wider">
                  Mains
                </th>
                <th className="px-5 py-3 text-center text-xs font-bold text-cyan-600 uppercase tracking-wider">
                  Optional
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feat, i) => (
                <motion.tr
                  key={feat.name}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <td className="px-5 py-3 text-sm font-medium text-gray-700">
                    {feat.name}
                  </td>
                  {[
                    feat.foundation,
                    feat.prelims,
                    feat.mains,
                    feat.optional,
                  ].map((has, j) => (
                    <td key={j} className="px-5 py-3 text-center">
                      <motion.div
                        className="inline-flex"
                        whileHover={{ scale: 1.3 }}
                      >
                        {has ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                            <div className="w-2 h-0.5 bg-gray-400 rounded-full" />
                          </div>
                        )}
                      </motion.div>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Row */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">
                Not sure which course fits?{" "}
                <span className="font-bold text-blue-700">
                  Talk to our counselor
                </span>
              </span>
            </div>
            <motion.button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-4 h-4" />
              Get Free Counseling
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Why Choose Our Courses
   ═══════════════════════════════════════════════════════════════════ */

const WhyChooseOurCourses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const reasons = [
    {
      icon: GraduationCap,
      title: "Expert Faculty",
      description:
        "Learn from IAS/IPS officers, top educators with 15-25 years of experience in UPSC coaching.",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Target,
      title: "Result Oriented",
      description:
        "500+ selections in UPSC CSE with consistent results year after year since 2005.",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Material",
      description:
        "Curated study notes, practice workbooks, and revision materials covering entire UPSC syllabus.",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock doubt resolution via chat, phone, and dedicated mentor support system.",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Monitor,
      title: "Hybrid Learning",
      description:
        "Flexible online + offline mode. Access classes from anywhere, anytime with recorded lectures.",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50",
    },
    {
      icon: Shield,
      title: "Money Back Guarantee",
      description:
        "Not satisfied? Get a full refund within 7 days of enrollment. No questions asked.",
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-14"
    >
      {/* Section Title */}
      <motion.div variants={staggerItem} className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Zap className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-bold text-indigo-700 uppercase tracking-wider">
            Why Our Courses Stand Out
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Built for Your <span className="text-blue-600">Success</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Every course is designed with one goal - getting you closer to your
          dream of becoming a civil servant.
        </p>
      </motion.div>

      {/* Reasons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
          >
            <div
              className={`relative h-full p-6 rounded-2xl ${reason.bgColor} border border-gray-100 shadow-lg transition-all duration-300 group-hover:shadow-xl overflow-hidden`}
            >
              {/* Hover Gradient Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <reason.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Title */}
                <h4 className="text-lg font-black text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {reason.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
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
   SUB-COMPONENT: Course CTA Section
   ═══════════════════════════════════════════════════════════════════ */

const CourseCTA = () => {
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
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 p-10 lg:p-14 text-center shadow-2xl shadow-blue-500/20">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <motion.div
          className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white/5"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-white/5"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto shadow-xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h3 className="text-3xl lg:text-4xl font-black text-white">
            Can't Decide? We'll Help You Choose!
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Book a free 30-minute counseling session with our UPSC experts and
            get a personalized study plan tailored to your strengths and
            timeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              className="flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-blue-700 font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              Book Free Counseling
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download Brochure
            </motion.button>
          </div>

          <p className="text-blue-300/60 text-xs mt-4">
            🎯 Use code <span className="font-bold text-white">SRIRAM2026</span>{" "}
            for additional 10% off on any course
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Scrolling Course Ticker
   ═══════════════════════════════════════════════════════════════════ */

const CourseScrollTicker = () => {
  const tickerItems = [
    "🎓 Foundation Course - 32% OFF",
    "📚 Prelims Crash Course Starting April",
    "✍️ Mains Answer Writing Masterclass",
    "🌍 Geography Optional - Score 300+",
    "📊 All India Test Series - 40% OFF",
    "📰 Daily Current Affairs Program",
    "🏆 500+ Selections in UPSC CSE",
    "💡 Free Demo Class Available",
  ];

  return (
    <div className="mb-14 overflow-hidden py-3 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-2xl border border-blue-100/50 shadow-sm">
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: [0, -2000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
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
   SUB-COMPONENT: Parallax Background Decoration
   ═══════════════════════════════════════════════════════════════════ */

const ParallaxDecoration = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large Circle */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100/30 to-indigo-100/30 blur-3xl"
        style={{ y: y1 }}
      />

      {/* Medium Circle */}
      <motion.div
        className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-gradient-to-br from-purple-100/25 to-pink-100/25 blur-3xl"
        style={{ y: y2 }}
      />

      {/* Small Rotating Element */}
      <motion.div
        className="absolute bottom-40 right-20 w-10 h-10 border-2 border-blue-200/30 rounded-lg"
        style={{ rotate }}
      />

      {/* Dots Grid */}
      <div className="absolute top-20 left-10 grid grid-cols-5 gap-3 opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient Lines */}
      <motion.div
        className="absolute top-60 right-40 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-80 left-40 w-32 h-[1px] bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COURSES COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef(null);

  const filteredCourses =
    activeCategory === "all"
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Parallax Background */}
      <ParallaxDecoration />

      {/* Particles */}
      <CourseSectionParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader />

        {/* Course Stats Banner */}
        <CourseStatsBanner />

        {/* Scrolling Ticker */}
        <CourseScrollTicker />

        {/* Featured Course Banner */}
        <FeaturedCourseBanner />

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Course Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <BookOpen className="w-16 h-16 text-blue-300" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                No courses found in this category
              </h3>
              <p className="text-gray-400 mb-4">
                Try selecting a different category or view all courses
              </p>
              <motion.button
                onClick={() => setActiveCategory("all")}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Courses
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Comparison */}
        <CourseComparisonStrip />

        {/* Why Choose Our Courses */}
        <WhyChooseOurCourses />

        {/* CTA Section */}
        <CourseCTA />
      </div>
    </section>
  );
};

export default Courses;
