import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Globe,
  Bell,
  User,
  LogIn,
  UserPlus,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
  Newspaper,
  Users,
  PlayCircle,
  TrendingUp,
  Star,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Shield,
  Heart,
  MessageCircle,
  Share2,
  Download,
  ExternalLink,
  Layers,
  Grid,
  List,
  Home,
  Info,
  HelpCircle,
  Settings,
  BookMarked,
  PenTool,
  BarChart3,
  Trophy,
  Flame,
  Compass,
  Briefcase,
  Library,
  Video,
  Headphones,
  Wifi,
  CheckCircle,
  AlertCircle,
  XCircle,
  Send,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS — Navigation Data, Announcement Texts, Languages
   ═══════════════════════════════════════════════════════════════════ */

const ANNOUNCEMENT_MESSAGES = [
  "🎉 New Batch Starting — UPSC CSE 2027 Prelims Foundation Course — Enroll Now!",
  "📢 Free Current Affairs Webinar Every Saturday at 6PM — Don't Miss Out!",
  "🏆 Congratulations to Our 2025 Toppers — 47 Selections in Top 100!",
  "📚 Download Free NCERT Notes & Previous Year Papers — Limited Time Offer!",
  "🔥 Early Bird Discount — 30% Off on All Annual Packages — Use Code: SRIRAM30",
  "🌟 New Feature: AI-Powered Answer Writing Practice Now Available on LMS!",
  "📝 Mock Test Series 2027 — Registration Open — 50+ Full-Length Tests!",
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", label: "മലയാളം", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা", flag: "🇮🇳" },
];

const COURSES_MEGA_MENU = {
  featured: [
    {
      title: "UPSC CSE Complete",
      desc: "Comprehensive preparation for Civil Services Examination",
      icon: GraduationCap,
      badge: "Bestseller",
      badgeColor: "bg-amber-500",
      link: "/courses/upsc-cse",
    },
    {
      title: "IAS Foundation",
      desc: "Build strong fundamentals for UPSC preparation",
      icon: BookOpen,
      badge: "New",
      badgeColor: "bg-green-500",
      link: "/courses/ias-foundation",
    },
    {
      title: "Prelims Intensive",
      desc: "Focused crash course for Prelims domination",
      icon: Target,
      badge: "Popular",
      badgeColor: "bg-blue-500",
      link: "/courses/prelims-intensive",
    },
  ],
  categories: [
    {
      name: "General Studies",
      icon: Library,
      courses: [
        {
          title: "GS Paper I — History, Geography, Society",
          link: "/courses/gs1",
        },
        { title: "GS Paper II — Polity, Governance, IR", link: "/courses/gs2" },
        {
          title: "GS Paper III — Economy, Science, Environment",
          link: "/courses/gs3",
        },
        {
          title: "GS Paper IV — Ethics, Integrity, Aptitude",
          link: "/courses/gs4",
        },
      ],
    },
    {
      name: "Optional Subjects",
      icon: Layers,
      courses: [
        { title: "Political Science & IR", link: "/courses/optional/polsci" },
        { title: "Public Administration", link: "/courses/optional/pubad" },
        { title: "Sociology", link: "/courses/optional/sociology" },
        { title: "Geography", link: "/courses/optional/geography" },
        { title: "History", link: "/courses/optional/history" },
        { title: "Philosophy", link: "/courses/optional/philosophy" },
      ],
    },
    {
      name: "State PSC",
      icon: Briefcase,
      courses: [
        { title: "TSPSC Group-I", link: "/courses/state/tspsc" },
        { title: "APPSC Group-I", link: "/courses/state/appsc" },
        { title: "TNPSC Group-I", link: "/courses/state/tnpsc" },
        { title: "KPSC Prelims & Mains", link: "/courses/state/kpsc" },
      ],
    },
  ],
  quickStats: [
    { label: "Active Students", value: "25,000+", icon: Users },
    { label: "Courses Available", value: "120+", icon: BookOpen },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
    { label: "Expert Faculty", value: "85+", icon: Award },
  ],
};

const TEST_SERIES_MENU = [
  {
    title: "UPSC Prelims Test Series 2027",
    desc: "50+ Full-Length Mock Tests with Detailed Analysis",
    icon: FileText,
    badge: "Enrolling",
    link: "/test-series/prelims-2027",
    tests: 50,
    students: "12,000+",
  },
  {
    title: "UPSC Mains Test Series 2027",
    desc: "Sectional & Full-Length Tests with Expert Evaluation",
    icon: PenTool,
    badge: "Top Rated",
    link: "/test-series/mains-2027",
    tests: 32,
    students: "8,500+",
  },
  {
    title: "Current Affairs Monthly Tests",
    desc: "Stay Updated with Monthly CA Test Papers",
    icon: Newspaper,
    badge: "Monthly",
    link: "/test-series/current-affairs",
    tests: 12,
    students: "15,000+",
  },
  {
    title: "CSAT Practice Series",
    desc: "Arithmetic, Reasoning & Comprehension Tests",
    icon: BarChart3,
    badge: "Free",
    link: "/test-series/csat",
    tests: 20,
    students: "10,000+",
  },
  {
    title: "Optional Subject Mocks",
    desc: "Subject-wise Mock Tests for All Optionals",
    icon: Grid,
    badge: "New",
    link: "/test-series/optional",
    tests: 45,
    students: "6,200+",
  },
];

const RESOURCES_MENU = [
  {
    category: "Study Material",
    items: [
      {
        title: "NCERT Notes",
        icon: BookMarked,
        link: "/resources/ncert",
        desc: "Chapter-wise Summary Notes",
      },
      {
        title: "Previous Year Papers",
        icon: FileText,
        link: "/resources/pyq",
        desc: "Solved PYQs with Analysis",
      },
      {
        title: "Current Affairs Notes",
        icon: Newspaper,
        link: "/resources/ca-notes",
        desc: "Daily & Monthly Compilations",
      },
      {
        title: "Topper's Notes",
        icon: Trophy,
        link: "/resources/topper-notes",
        desc: "Notes from Top Rankers",
      },
    ],
  },
  {
    category: "Video Resources",
    items: [
      {
        title: "Free Lecture Videos",
        icon: Video,
        link: "/resources/videos",
        desc: "HD Quality Recorded Classes",
      },
      {
        title: "Webinar Recordings",
        icon: Headphones,
        link: "/resources/webinars",
        desc: "Expert Talk Recordings",
      },
      {
        title: "Quick Revision Videos",
        icon: PlayCircle,
        link: "/resources/revision",
        desc: "5-Min Topic Summaries",
      },
    ],
  },
  {
    category: "Practice",
    items: [
      {
        title: "Daily MCQ Practice",
        icon: CheckCircle,
        link: "/resources/daily-mcq",
        desc: "10 Questions Every Day",
      },
      {
        title: "Answer Writing Practice",
        icon: PenTool,
        link: "/resources/answer-writing",
        desc: "AI-Evaluated Answers",
      },
      {
        title: "Essay Practice",
        icon: FileText,
        link: "/resources/essays",
        desc: "Weekly Essay Topics",
      },
    ],
  },
];

const CURRENT_AFFAIRS_MENU = [
  {
    title: "Daily Current Affairs",
    icon: Calendar,
    link: "/current-affairs/daily",
    desc: "Updated Every Morning at 8 AM",
    isNew: true,
  },
  {
    title: "Monthly Compilations",
    icon: BookOpen,
    link: "/current-affairs/monthly",
    desc: "Consolidated Monthly PDF & Videos",
    isNew: false,
  },
  {
    title: "Editorial Analysis",
    icon: Newspaper,
    link: "/current-affairs/editorial",
    desc: "The Hindu & Indian Express Editorials",
    isNew: true,
  },
  {
    title: "PIB Summary",
    icon: FileText,
    link: "/current-affairs/pib",
    desc: "Government Press Information Bureau",
    isNew: false,
  },
  {
    title: "Yojana & Kurukshetra",
    icon: BookMarked,
    link: "/current-affairs/yojana",
    desc: "Magazine Summary & Analysis",
    isNew: false,
  },
  {
    title: "Weekly Quiz",
    icon: HelpCircle,
    link: "/current-affairs/quiz",
    desc: "Test Your Weekly CA Knowledge",
    isNew: true,
  },
];

const ABOUT_MENU = [
  {
    title: "About Sri Ram's IAS",
    icon: Info,
    link: "/about",
    desc: "Our Vision, Mission & Journey",
  },
  {
    title: "Our Faculty",
    icon: Users,
    link: "/faculty",
    desc: "Meet Our Expert Educators",
  },
  {
    title: "Our Results",
    icon: Trophy,
    link: "/results",
    desc: "Track Record of Excellence",
  },
  {
    title: "Testimonials",
    icon: MessageCircle,
    link: "/testimonials",
    desc: "What Our Students Say",
  },
  {
    title: "Blog",
    icon: PenTool,
    link: "/blog",
    desc: "Insights & Preparation Tips",
  },
  {
    title: "Contact Us",
    icon: Phone,
    link: "/contact",
    desc: "Get in Touch with Us",
  },
];

const MAIN_NAV_ITEMS = [
  { label: "Home", to: "/", icon: Home, hasDropdown: false },
  {
    label: "Courses",
    to: "/courses",
    icon: GraduationCap,
    hasDropdown: true,
    dropdownType: "mega",
  },
  {
    label: "Test Series",
    to: "/test-series",
    icon: FileText,
    hasDropdown: true,
    dropdownType: "test",
  },
  {
    label: "Current Affairs",
    to: "/current-affairs",
    icon: Newspaper,
    hasDropdown: true,
    dropdownType: "ca",
  },
  {
    label: "Free Resources",
    to: "/resources",
    icon: BookOpen,
    hasDropdown: true,
    dropdownType: "resources",
  },
  {
    label: "About",
    to: "/about",
    icon: Info,
    hasDropdown: true,
    dropdownType: "about",
  },
];

const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Batch Alert",
    message: "UPSC 2027 batch starts on April 1st",
    time: "2 hours ago",
    read: false,
    type: "info",
  },
  {
    id: 2,
    title: "Result Published",
    message: "Prelims Mock Test #23 results are out",
    time: "5 hours ago",
    read: false,
    type: "success",
  },
  {
    id: 3,
    title: "Offer Expiring",
    message: "30% discount ends in 24 hours",
    time: "1 day ago",
    read: true,
    type: "warning",
  },
  {
    id: 4,
    title: "New Video Uploaded",
    message: "GS Paper III — Economy lecture series",
    time: "2 days ago",
    read: true,
    type: "info",
  },
  {
    id: 5,
    title: "Assignment Due",
    message: "Submit Essay on National Education Policy",
    time: "3 days ago",
    read: true,
    type: "alert",
  },
];

const SEARCH_SUGGESTIONS = [
  "UPSC CSE 2027",
  "Indian Polity Notes",
  "Current Affairs Today",
  "Previous Year Papers",
  "Geography Optional",
  "Test Series Prelims",
  "Ethics Case Studies",
  "Economy Notes PDF",
  "NCERT Summary",
  "Answer Writing Tips",
  "Essay Topics",
  "Public Administration",
];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8 },
};

const megaMenuVariant = {
  hidden: { opacity: 0, y: -8, scaleY: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scaleY: 0.95,
    transition: { duration: 0.2 },
  },
};

const pulseGlow = {
  initial: { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(59, 130, 246, 0.4)",
      "0 0 0 12px rgba(59, 130, 246, 0)",
      "0 0 0 0 rgba(59, 130, 246, 0)",
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const shimmerAnimation = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 3, repeat: Infinity, ease: "linear" },
  },
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

/* ——— 1. Animated Logo ——— */
const AnimatedLogo = ({ scrolled }) => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-3 group relative z-50 cursor-pointer"
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 opacity-0 group-hover:opacity-40 blur-md"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Logo container */}
        <div
          className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white font-black shadow-lg transition-all duration-500 ${
            scrolled ? "w-10 h-10 text-sm" : "w-12 h-12 text-base"
          }`}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
            className="relative z-10"
          >
            SR
          </motion.span>
          {/* Inner shimmer */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ backgroundSize: "200% 100%" }}
            {...shimmerAnimation}
          />
        </div>
      </motion.div>

      {/* Text part */}
      <div className="flex flex-col">
        <motion.span
          className={`font-black tracking-wide bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 dark:from-blue-300 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent transition-all duration-500 leading-tight ${
            scrolled ? "text-lg" : "text-xl"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          SRIRAM
        </motion.span>
        <motion.span
          className={`font-bold tracking-[0.3em] text-blue-500 dark:text-blue-400 transition-all duration-500 leading-tight ${
            scrolled ? "text-[9px]" : "text-[10px]"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          IAS ACADEMY
        </motion.span>
      </div>

      {/* Decorative sparkle on hover */}
      <motion.div
        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      >
        <Sparkles className="w-4 h-4 text-amber-400" />
      </motion.div>
    </button>
  );
};

/* ——— 2. Scrolling Announcement Bar ——— */
const AnnouncementBar = ({ isVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 dark:from-blue-950 dark:via-indigo-950 dark:to-blue-950"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`announcement-particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-blue-300/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Shimmer line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div
            className="relative max-w-7xl mx-auto px-3 md:px-4 py-1 md:py-1.5 flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Animated icon */}
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mr-3 flex-shrink-0"
            >
              <Zap className="w-4 h-4 text-amber-400" />
            </motion.div>

            {/* Announcement text */}
            <div className="overflow-hidden h-6 flex items-center flex-1 justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-xs md:text-sm text-blue-100 font-medium whitespace-nowrap"
                >
                  {ANNOUNCEMENT_MESSAGES[currentIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="hidden md:flex items-center gap-1.5 ml-4 flex-shrink-0">
              {ANNOUNCEMENT_MESSAGES.map((_, i) => (
                <motion.button
                  key={`dot-${i}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-4 h-1.5 bg-amber-400"
                      : "w-1.5 h-1.5 bg-blue-400/40 hover:bg-blue-300/60"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.8 }}
              className="ml-3 p-0.5 rounded-full text-blue-300 hover:text-white hover:bg-blue-700/50 transition-colors flex-shrink-0"
              aria-label="Close announcements"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 3. Top Utility Bar ——— */
const TopUtilityBar = ({ isVisible }) => {
  const socialLinks = [
    { name: "Facebook", icon: "f", color: "hover:bg-blue-600", href: "#" },
    { name: "Twitter", icon: "𝕏", color: "hover:bg-sky-500", href: "#" },
    { name: "Instagram", icon: "📷", color: "hover:bg-pink-600", href: "#" },
    { name: "YouTube", icon: "▶", color: "hover:bg-red-600", href: "#" },
    { name: "Telegram", icon: "✈", color: "hover:bg-cyan-600", href: "#" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden lg:block bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 border-b border-blue-800/30"
        >
          <div className="max-w-7xl mx-auto px-4 py-1.5">
            <div className="flex items-center justify-between">
              {/* Left: Contact info */}
              <motion.div
                className="flex items-center gap-5"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.a
                  href="tel:+911234567890"
                  className="flex items-center gap-1.5 text-blue-200/80 hover:text-white text-xs group transition-colors"
                  variants={staggerItem}
                  whileHover={{ x: 2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0,
                      ease: "easeInOut",
                    }}
                  >
                    <Phone className="w-3 h-3 text-blue-400 group-hover:text-amber-400 transition-colors" />
                  </motion.div>
                  <span>+91 123-456-7890</span>
                </motion.a>

                <motion.span
                  className="text-blue-700/50 text-xs"
                  variants={staggerItem}
                >
                  |
                </motion.span>

                <motion.a
                  href="mailto:info@sriramsias.com"
                  className="flex items-center gap-1.5 text-blue-200/80 hover:text-white text-xs group transition-colors"
                  variants={staggerItem}
                  whileHover={{ x: 2 }}
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <Mail className="w-3 h-3 text-blue-400 group-hover:text-amber-400 transition-colors" />
                  </motion.div>
                  <span>info@sriramsias.com</span>
                </motion.a>

                <motion.span
                  className="text-blue-700/50 text-xs"
                  variants={staggerItem}
                >
                  |
                </motion.span>

                <motion.a
                  href="#"
                  className="flex items-center gap-1.5 text-blue-200/80 hover:text-white text-xs group transition-colors"
                  variants={staggerItem}
                  whileHover={{ x: 2 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1,
                      ease: "easeInOut",
                    }}
                  >
                    <MapPin className="w-3 h-3 text-blue-400 group-hover:text-amber-400 transition-colors" />
                  </motion.div>
                  <span>Delhi | Hyderabad | Bangalore</span>
                </motion.a>
              </motion.div>

              {/* Right: Social links only */}
              <div className="flex items-center gap-1.5">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`w-6 h-6 flex items-center justify-center rounded-full bg-blue-800/40 text-blue-300 text-[10px] ${social.color} hover:text-white transition-all duration-300`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.1 * i,
                      type: "spring",
                      stiffness: 500,
                    }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 4. Search Overlay ——— */
const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches] = useState([
    "UPSC Syllabus 2027",
    "Indian Polity",
    "Economy Notes",
  ]);
  const [trendingSearches] = useState([
    "UPSC 2027 Notification",
    "New Education Policy",
    "Budget 2026 Analysis",
  ]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    if (!isOpen) {
      setQuery("");
      setFilteredSuggestions([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = SEARCH_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setSelectedIndex(-1);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setQuery(filteredSuggestions[selectedIndex]);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 md:pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-blue-950/60 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`search-particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-blue-400/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Search panel */}
          <motion.div
            className="relative w-full max-w-2xl mx-4"
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Glow border */}
            <motion.div
              className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-50 blur-sm"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            />

            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-100 dark:border-blue-800/30">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Search className="w-5 h-5 text-blue-500" />
                </motion.div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search courses, notes, tests, current affairs..."
                  className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-base outline-none"
                />
                {query && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setQuery("")}
                    className="p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearch(query)}
                  className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Search
                </motion.button>
                <div className="hidden md:flex items-center justify-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800">
                  <span className="text-xs text-gray-500 font-mono">ESC</span>
                </div>
              </div>

              {/* Search content */}
              <div className="max-h-[50vh] overflow-y-auto">
                {/* Suggestions */}
                {filteredSuggestions.length > 0 && (
                  <motion.div
                    className="p-3"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <p className="px-2 py-1 text-[10px] font-semibold text-blue-500 uppercase tracking-wider">
                      Suggestions
                    </p>
                    {filteredSuggestions.map((suggestion, i) => (
                      <motion.button
                        key={suggestion}
                        variants={staggerItem}
                        onClick={() => handleSearch(suggestion)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          selectedIndex === i
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-blue-50/60 dark:hover:bg-blue-900/20"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <Search className="w-3.5 h-3.5 text-blue-400" />
                        <span className="flex-1 text-left">{suggestion}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Empty state with recent & trending */}
                {query.length === 0 && (
                  <div className="p-4 space-y-4">
                    {/* Recent searches */}
                    <div>
                      <p className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-semibold text-blue-500 uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        Recent Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, i) => (
                          <motion.button
                            key={term}
                            onClick={() => {
                              setQuery(term);
                              handleSearch(term);
                            }}
                            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Clock className="w-3 h-3 inline mr-1 opacity-50" />
                            {term}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Trending */}
                    <div>
                      <p className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
                        <Flame className="w-3 h-3" />
                        Trending Now
                      </p>
                      <div className="space-y-1">
                        {trendingSearches.map((term, i) => (
                          <motion.button
                            key={term}
                            onClick={() => {
                              setQuery(term);
                              handleSearch(term);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ x: 4 }}
                          >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[10px] font-bold">
                              {i + 1}
                            </span>
                            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                            <span className="flex-1 text-left">{term}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Quick links */}
                    <div>
                      <p className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-semibold text-blue-500 uppercase tracking-wider">
                        <Compass className="w-3 h-3" />
                        Quick Access
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            label: "All Courses",
                            icon: GraduationCap,
                            link: "/courses",
                          },
                          {
                            label: "Test Series",
                            icon: FileText,
                            link: "/test-series",
                          },
                          {
                            label: "Current Affairs",
                            icon: Newspaper,
                            link: "/current-affairs",
                          },
                          {
                            label: "Free Resources",
                            icon: BookOpen,
                            link: "/resources",
                          },
                        ].map((item, i) => (
                          <motion.button
                            key={item.label}
                            onClick={() => {
                              onClose();
                              navigate(item.link);
                            }}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 transition-all border border-blue-100/50 dark:border-blue-800/30"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.02, y: -1 }}
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* No results */}
                {query.length > 0 && filteredSuggestions.length === 0 && (
                  <motion.div
                    className="p-8 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Search className="w-8 h-8 text-blue-300" />
                    </motion.div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No results found for &quot;
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {query}
                      </span>
                      &quot;
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try different keywords or browse our categories
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 5. Notification Panel ——— */
const NotificationPanel = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "alert":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-500/10 border border-blue-100 dark:border-blue-800/50 overflow-hidden z-[100]"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </div>
              <button className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
                Mark all read
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {NOTIFICATIONS.map((notification) => (
                <motion.div
                  key={notification.id}
                  variants={staggerItem}
                  className={`px-4 py-3 border-b border-blue-50 dark:border-blue-900/20 cursor-pointer transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 ${
                    !notification.read
                      ? "bg-blue-50/30 dark:bg-blue-900/10"
                      : ""
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-t border-blue-100 dark:border-blue-800/30">
            <Link
              to="/notifications"
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              View All Notifications
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 6. Courses Mega Menu ——— */
const CoursesMegaMenu = ({ isOpen }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={megaMenuVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute left-0 right-0 top-full bg-white dark:bg-slate-900 rounded-b-2xl shadow-2xl shadow-blue-500/10 border-t-2 border-blue-500 overflow-hidden z-[90]"
          style={{ originY: 0 }}
        >
          {/* Decorative top line */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />

          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Left: Featured courses */}
              <div className="col-span-4">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <p className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-wider mb-3">
                    <Star className="w-3.5 h-3.5" />
                    Featured Courses
                  </p>
                  <div className="space-y-2">
                    {COURSES_MEGA_MENU.featured.map((course) => (
                      <motion.div key={course.title} variants={staggerItem}>
                        <Link
                          to={course.link}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 border border-transparent hover:border-blue-100 dark:hover:border-blue-800/30"
                        >
                          <motion.div
                            className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <course.icon className="w-5 h-5" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                {course.title}
                              </p>
                              <span
                                className={`px-1.5 py-0.5 ${course.badgeColor} text-white text-[9px] font-bold rounded-full`}
                              >
                                {course.badge}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                              {course.desc}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-blue-100 dark:border-blue-800/30">
                    {COURSES_MEGA_MENU.quickStats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/50 dark:bg-blue-900/10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                      >
                        <stat.icon className="w-3.5 h-3.5 text-blue-500" />
                        <div>
                          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                            {stat.value}
                          </p>
                          <p className="text-[9px] text-gray-500 dark:text-gray-400">
                            {stat.label}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Middle: Categories */}
              <div className="col-span-5 border-l border-r border-blue-100 dark:border-blue-800/30 px-6">
                <p className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-wider mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  Browse by Category
                </p>

                {/* Category tabs */}
                <div className="flex gap-2 mb-4">
                  {COURSES_MEGA_MENU.categories.map((cat, i) => (
                    <motion.button
                      key={cat.name}
                      onClick={() => setActiveCategory(i)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                        activeCategory === i
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <cat.icon className="w-3.5 h-3.5" />
                      {cat.name}
                    </motion.button>
                  ))}
                </div>

                {/* Course list */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-1"
                  >
                    {COURSES_MEGA_MENU.categories[activeCategory].courses.map(
                      (course) => (
                        <motion.div key={course.title} variants={staggerItem}>
                          <Link
                            to={course.link}
                            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-all duration-200"
                          >
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors"
                              whileHover={{ scale: 2 }}
                            />
                            <span className="flex-1">{course.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                          </Link>
                        </motion.div>
                      ),
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: CTA */}
              <div className="col-span-3">
                <motion.div
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-5 text-white"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 opacity-10">
                    <motion.div
                      className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white"
                      animate={{ scale: [1.2, 1, 1.2] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  <div className="relative">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3 backdrop-blur-sm"
                      {...floatingAnimation}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    <h4 className="text-base font-bold mb-1">
                      Free Demo Class
                    </h4>
                    <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                      Experience our teaching methodology. Book your free demo
                      class today!
                    </p>
                    <motion.button
                      className="w-full py-2 bg-white text-blue-700 rounded-lg text-sm font-bold shadow-lg hover:bg-blue-50 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      {...pulseGlow}
                    >
                      Book Now — Free
                    </motion.button>
                  </div>
                </motion.div>

                {/* View all link */}
                <motion.div
                  className="mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/courses"
                    className="group flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all"
                  >
                    View All Courses
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 7. Test Series Dropdown ——— */
const TestSeriesDropdown = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={megaMenuVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute left-0 right-0 top-full bg-white dark:bg-slate-900 rounded-b-2xl shadow-2xl shadow-blue-500/10 border-t-2 border-blue-500 overflow-hidden z-[90]"
          style={{ originY: 0 }}
        >
          <motion.div
            className="h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />

          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                Test Series & Mock Tests
              </p>
              <Link
                to="/test-series"
                className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-700 transition-colors"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {TEST_SERIES_MENU.map((test) => (
                <motion.div key={test.title} variants={staggerItem}>
                  <Link
                    to={test.link}
                    className="group block p-4 rounded-xl border border-blue-100 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-600/50 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 h-full"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <motion.div
                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                      >
                        <test.icon className="w-4 h-4" />
                      </motion.div>
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${
                          test.badge === "Free"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : test.badge === "New"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {test.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 mb-1 transition-colors">
                      {test.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {test.desc}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {test.tests} Tests
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {test.students}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 8. Current Affairs Dropdown ——— */
const CurrentAffairsDropdown = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={megaMenuVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute left-1/4 top-full w-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-500/10 border border-blue-100 dark:border-blue-800/50 overflow-hidden z-[90]"
          style={{ originY: 0 }}
        >
          <div className="p-1">
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-xl">
              <p className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <Newspaper className="w-3.5 h-3.5" />
                Current Affairs
              </p>
            </div>

            <motion.div
              className="p-2 space-y-0.5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {CURRENT_AFFAIRS_MENU.map((item) => (
                <motion.div key={item.title} variants={staggerItem}>
                  <Link
                    to={item.link}
                    className="group flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                  >
                    <motion.div
                      className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </p>
                        {item.isNew && (
                          <motion.span
                            className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[9px] font-bold rounded-full"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            NEW
                          </motion.span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 9. Resources Dropdown ——— */
const ResourcesDropdown = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={megaMenuVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute left-0 right-0 top-full bg-white dark:bg-slate-900 rounded-b-2xl shadow-2xl shadow-blue-500/10 border-t-2 border-blue-500 overflow-hidden z-[90]"
          style={{ originY: 0 }}
        >
          <motion.div
            className="h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />

          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                Free Resources
              </p>
              <Link
                to="/resources"
                className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-700 transition-colors"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {RESOURCES_MENU.map((section) => (
                <motion.div
                  key={section.category}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-5 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    {section.category}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <motion.div key={item.title} variants={staggerItem}>
                        <Link
                          to={item.link}
                          className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                        >
                          <motion.div
                            className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0 mt-0.5"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                          >
                            <item.icon className="w-3.5 h-3.5" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="mt-5 pt-5 border-t border-blue-100 dark:border-blue-800/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Download Free Study Material
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Get NCERT notes, PYQs, and more — 100% Free
                    </p>
                  </div>
                </div>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 10. About Dropdown ——— */
const AboutDropdown = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={megaMenuVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute right-0 top-full w-[420px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-500/10 border border-blue-100 dark:border-blue-800/50 overflow-hidden z-[90]"
          style={{ originY: 0 }}
        >
          <div className="p-1">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-xl">
              <p className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" />
                About Sri Ram&apos;s IAS
              </p>
            </div>

            <motion.div
              className="p-2 space-y-0.5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {ABOUT_MENU.map((item) => (
                <motion.div key={item.title} variants={staggerItem}>
                  <Link
                    to={item.link}
                    className="group flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                  >
                    <motion.div
                      className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats row */}
            <div className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Years Legacy", value: "15+" },
                  { label: "IAS Officers", value: "500+" },
                  { label: "Success Rate", value: "94%" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <p className="text-lg font-black">{stat.value}</p>
                    <p className="text-[10px] text-blue-200">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 11. Mobile Menu Drawer ——— */
const MobileDrawer = ({ isOpen, onClose }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  const mobileNavItems = [
    {
      label: "Home",
      icon: Home,
      to: "/",
      children: [],
    },
    {
      label: "Courses",
      icon: GraduationCap,
      to: "/courses",
      children: [
        {
          label: "UPSC CSE Complete",
          to: "/courses/upsc-cse",
          icon: GraduationCap,
        },
        {
          label: "IAS Foundation",
          to: "/courses/ias-foundation",
          icon: BookOpen,
        },
        {
          label: "Prelims Intensive",
          to: "/courses/prelims-intensive",
          icon: Target,
        },
        { label: "GS Paper I", to: "/courses/gs1", icon: BookMarked },
        { label: "GS Paper II", to: "/courses/gs2", icon: FileText },
        { label: "GS Paper III", to: "/courses/gs3", icon: BarChart3 },
        { label: "GS Paper IV — Ethics", to: "/courses/gs4", icon: Shield },
        { label: "Optional Subjects", to: "/courses/optional", icon: Layers },
        { label: "State PSC", to: "/courses/state", icon: Briefcase },
      ],
    },
    {
      label: "Test Series",
      icon: FileText,
      to: "/test-series",
      children: TEST_SERIES_MENU.map((t) => ({
        label: t.title,
        to: t.link,
        icon: t.icon,
      })),
    },
    {
      label: "Current Affairs",
      icon: Newspaper,
      to: "/current-affairs",
      children: CURRENT_AFFAIRS_MENU.map((c) => ({
        label: c.title,
        to: c.link,
        icon: c.icon,
      })),
    },
    {
      label: "Free Resources",
      icon: BookOpen,
      to: "/resources",
      children: RESOURCES_MENU.flatMap((s) =>
        s.items.map((it) => ({ label: it.title, to: it.link, icon: it.icon })),
      ),
    },
    {
      label: "About Us",
      icon: Info,
      to: "/about",
      children: ABOUT_MENU.map((a) => ({
        label: a.title,
        to: a.link,
        icon: a.icon,
      })),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white dark:bg-slate-900 z-[999] shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-blue-100 dark:border-blue-800/30 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-sm font-black">
                  SR
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    SRI RAM&apos;S IAS
                  </p>
                  <p className="text-[10px] text-blue-500 tracking-wider">
                    MENU
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Search bar */}
            <div className="px-4 py-3 border-b border-blue-100/50 dark:border-blue-800/20">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <Search className="w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {mobileNavItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={staggerItem}
                    className="mb-0.5"
                  >
                    {item.children.length > 0 ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedItem(
                              expandedItem === item.label ? null : item.label,
                            )
                          }
                          className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            expandedItem === item.label
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                              : "text-gray-700 dark:text-gray-300 hover:bg-blue-50/60 dark:hover:bg-blue-900/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-1.5 rounded-lg transition-colors ${
                                expandedItem === item.label
                                  ? "bg-blue-600 text-white"
                                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              }`}
                            >
                              <item.icon className="w-4 h-4" />
                            </div>
                            {item.label}
                          </div>
                          <motion.div
                            animate={{
                              rotate: expandedItem === item.label ? 90 : 0,
                            }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pl-6 pr-2 py-1 space-y-0.5">
                                {/* Main link */}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                  View All {item.label}
                                </button>
                                {item.children.map((child) => (
                                  <button
                                    key={child.label}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onClose();
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-colors"
                                  >
                                    <child.icon className="w-3.5 h-3.5 text-blue-400" />
                                    {child.label}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onClose();
                          if (item.to === "/")
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50/60 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          <item.icon className="w-4 h-4" />
                        </div>
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-blue-100 dark:border-blue-800/30 px-4 py-4 space-y-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10">
              {/* Auth buttons */}
              <div className="flex gap-2">
                \n{" "}
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </div>

              {/* Contact */}
              <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-gray-400 dark:text-gray-500">
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                  <Phone className="w-3 h-3" /> +91 123-456-7890
                </a>
                <span>|</span>
                <a
                  href="mailto:info@sriramsias.com"
                  className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                  <Mail className="w-3 h-3" /> info@sriramsias.com
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ——— 12. Desktop Nav Item with Hover ——— */
const DesktopNavItem = ({
  item,
  isActive,
  onHover,
  onLeave,
  activeDropdown,
}) => {
  const showDropdown = activeDropdown === item.label;

  return (
    <div
      className="relative"
      onMouseEnter={() => onHover(item.label)}
      onMouseLeave={onLeave}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          if (item.to === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
          isActive
            ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20"
            : "text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/60 dark:hover:bg-blue-900/10"
        }`}
      >
        <item.icon
          className={`w-4 h-4 transition-colors duration-300 ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-400 group-hover:text-blue-500"
          }`}
        />
        <span className="whitespace-nowrap">{item.label}</span>
        {item.hasDropdown && (
          <motion.div
            animate={{ rotate: showDropdown ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        )}

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute -bottom-[2px] left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            layoutId="activeNavIndicator"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        {/* Hover glow */}
        <motion.div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

/* ——— 13. Floating Particles Background ——— */
const FloatingParticles = ({ count = 15 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`header-particle-${i}`}
          className="absolute rounded-full bg-blue-400/5 dark:bg-blue-400/10"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -15 - Math.random() * 20, 0],
            x: [0, Math.random() * 10 - 5, 0],
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

/* ——— 14. Theme Toggle Button ——— */
const ThemeToggleButton = ({ themeMode, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="relative p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={
        themeMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
      }
    >
      <AnimatePresence mode="wait">
        {themeMode === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-4 h-4 text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-4 h-4 text-blue-600" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow:
            themeMode === "dark"
              ? [
                  "0 0 0 0 rgba(251, 191, 36, 0)",
                  "0 0 8px 2px rgba(251, 191, 36, 0.15)",
                  "0 0 0 0 rgba(251, 191, 36, 0)",
                ]
              : [
                  "0 0 0 0 rgba(37, 99, 235, 0)",
                  "0 0 8px 2px rgba(37, 99, 235, 0.15)",
                  "0 0 0 0 rgba(37, 99, 235, 0)",
                ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

/* ——— 15. Notification Button ——— */
const NotificationButton = ({ onClick, unreadCount }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: unreadCount > 0 ? [0, 15, -15, 10, -10, 0] : 0 }}
        transition={{
          duration: 0.6,
          repeat: unreadCount > 0 ? Infinity : 0,
          repeatDelay: 3,
        }}
      >
        <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </motion.div>
      {unreadCount > 0 && (
        <motion.span
          className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {unreadCount}
          </motion.span>
        </motion.span>
      )}
    </motion.button>
  );
};

/* ——— 16. Auth Buttons ——— */
const AuthButtons = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <motion.button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-sm font-medium text-blue-600 dark:text-blue-400"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
        <span className="hidden xl:inline">Dashboard</span>
      </motion.button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/login"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
        >
          <LogIn className="w-4 h-4" />
          <span className="hidden xl:inline">Login</span>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/register"
          className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            style={{ backgroundSize: "200% 100%" }}
            {...shimmerAnimation}
          />
          <UserPlus className="w-4 h-4 relative z-10" />
          <span className="relative z-10 whitespace-nowrap">Register</span>
        </Link>
      </motion.div>
    </div>
  );
};

/* ——— 17. Progress Bar ——— */
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 origin-left z-[9998]"
      style={{ scaleX }}
    />
  );
};

/* ——— 18. Animated Background for Main Header ——— */
const HeaderBackground = ({ scrolled }) => {
  return (
    <>
      {/* Glass morphism background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl"
            : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
        }`}
      />

      {/* Border bottom glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: scrolled
            ? "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)"
            : "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
        }}
      />

      {/* Animated gradient orbs - subtle background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-blue-400/5 dark:bg-blue-400/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-indigo-400/5 dark:bg-indigo-400/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <FloatingParticles count={12} />
    </>
  );
};

/* ——— 19. Keyboard Shortcut Indicator ——— */
const KbdShortcut = ({ keys }) => {
  return (
    <div className="hidden lg:flex items-center gap-0.5">
      {keys.map((key, i) => (
        <span key={i}>
          <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-mono rounded border border-gray-200 dark:border-gray-700">
            {key}
          </kbd>
          {i < keys.length - 1 && (
            <span className="text-gray-400 text-xs mx-0.5">+</span>
          )}
        </span>
      ))}
    </div>
  );
};

/* ——— 20. Quick Search Trigger Button ——— */
const SearchTrigger = ({ onClick, scrolled }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`hidden md:flex items-center gap-2 rounded-xl border border-blue-200/60 dark:border-blue-800/40 hover:border-blue-300 dark:hover:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-sm ${
        scrolled ? "px-3 py-1.5" : "px-4 py-2"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Search className="w-4 h-4 text-blue-400" />
      <span className="text-gray-400 dark:text-gray-500 hidden lg:inline">
        Search...
      </span>
      <KbdShortcut keys={["Ctrl", "K"]} />
    </motion.button>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN HEADER COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const themeMode = useSelector((state) => state.theme.mode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // State
  const [scrolled, setScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [showUtilityBar, setShowUtilityBar] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownTimeoutRef = useRef(null);
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  const unreadNotificationCount = NOTIFICATIONS.filter((n) => !n.read).length;

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 30);

      // Auto-hide announcement bar on scroll down
      if (currentY > 150) {
        setShowAnnouncement(false);
        setShowUtilityBar(false);
      } else {
        setShowAnnouncement(true);
        setShowUtilityBar(true);
      }

      // Keep header always visible
      setHeaderVisible(true);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut (Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close all menus and dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setNotificationsOpen(false);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleDropdownHover = useCallback((label) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  }, []);

  const handleThemeToggle = () => dispatch(toggleTheme());

  const isNavActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Entire header wrapper */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[990] w-full"
      >
        {/* 1. Announcement Bar */}
        <AnnouncementBar isVisible={showAnnouncement} />

        {/* 2. Top Utility Bar */}
        <TopUtilityBar isVisible={showUtilityBar} />

        {/* 3. Main Navigation Header */}
        <div className="relative">
          <HeaderBackground scrolled={scrolled} />

          <div className="relative max-w-7xl mx-auto px-3 md:px-4">
            <div
              className={`flex items-center justify-between transition-all duration-500 ${
                scrolled ? "py-1.5 md:py-2" : "py-2 md:py-3"
              }`}
            >
              {/* Left: Logo */}
              <AnimatedLogo scrolled={scrolled} />

              {/* Center: Desktop Navigation */}
              <nav
                className="hidden lg:flex items-center"
                role="navigation"
                aria-label="Main navigation"
              >
                <div
                  className="relative flex items-center gap-1"
                  onMouseLeave={handleDropdownLeave}
                >
                  {MAIN_NAV_ITEMS.map((item) => (
                    <DesktopNavItem
                      key={item.label}
                      item={item}
                      isActive={isNavActive(item.to)}
                      onHover={handleDropdownHover}
                      onLeave={() => {}}
                      activeDropdown={activeDropdown}
                    />
                  ))}

                  {/* Mega Menus Container */}
                  <CoursesMegaMenu isOpen={activeDropdown === "Courses"} />
                  <TestSeriesDropdown
                    isOpen={activeDropdown === "Test Series"}
                  />
                  <CurrentAffairsDropdown
                    isOpen={activeDropdown === "Current Affairs"}
                  />
                  <ResourcesDropdown
                    isOpen={activeDropdown === "Free Resources"}
                  />
                  <AboutDropdown isOpen={activeDropdown === "About"} />
                </div>
              </nav>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Notifications */}
                <div className="relative">
                  <NotificationButton
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    unreadCount={unreadNotificationCount}
                  />
                  <NotificationPanel
                    isOpen={notificationsOpen}
                    onClose={() => setNotificationsOpen(false)}
                  />
                </div>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden lg:flex">
                  <AuthButtons isAuthenticated={isAuthenticated} />
                </div>

                {/* Mobile Menu Toggle */}
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 90, scale: 0 }}
                      >
                        <X className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: -90, scale: 0 }}
                      >
                        <Menu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Spacer for fixed header */}
      <div
        className={`transition-all duration-500 ${
          showAnnouncement && showUtilityBar
            ? "h-[88px] lg:h-[150px]"
            : scrolled
              ? "h-[48px] lg:h-[56px]"
              : "h-[56px] lg:h-[68px]"
        }`}
      />

      {/* Additional components temporarily disabled for testing */}
      {/* <TrendingTopicsBar /> */}
      {/* <QuickAccessPanel /> */}
      {/* <BannerRibbon /> */}
      {/* <MobileBottomNav /> */}
      {/* <FloatingHelpWidget /> */}
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ADDITIONAL SUB-COMPONENTS — Trending, Quick Access, etc.
   ═══════════════════════════════════════════════════════════════════ */

/* ——— 21. Trending Topics Bar ——— */
const TrendingTopicsBar = () => {
  const [visible, setVisible] = useState(true);
  const topics = [
    { label: "UPSC 2027 Notification", hot: true },
    { label: "Budget 2026 Analysis", hot: true },
    { label: "Indian Economy Notes", hot: false },
    { label: "Polity Important Topics", hot: false },
    { label: "Geography Optional Strategy", hot: false },
    { label: "Ethics Case Studies", hot: true },
    { label: "Current Affairs March 2026", hot: true },
    { label: "CSAT Preparation Tips", hot: false },
    { label: "Essay Writing Guide", hot: false },
    { label: "Ancient History Notes", hot: false },
  ];

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-blue-900/10 border-b border-blue-100/30 dark:border-blue-800/20 overflow-hidden"
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] via-transparent to-indigo-500/[0.02]"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center gap-3">
          {/* Label */}
          <motion.div
            className="flex items-center gap-1.5 flex-shrink-0"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
            </motion.div>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden sm:inline">
              Trending
            </span>
          </motion.div>

          {/* Separator */}
          <div className="w-[1px] h-4 bg-blue-200/50 dark:bg-blue-700/30 flex-shrink-0" />

          {/* Scrolling topics */}
          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex items-center gap-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...topics, ...topics].map((topic, i) => (
                <Link
                  key={`trending-${i}`}
                  to={`/search?q=${encodeURIComponent(topic.label)}`}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-blue-900/20 border border-blue-100/50 dark:border-blue-800/20 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all whitespace-nowrap group flex-shrink-0"
                >
                  {topic.hot && (
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-orange-400"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {topic.label}
                  </span>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Close */}
          <motion.button
            onClick={() => setVisible(false)}
            className="flex-shrink-0 p-1 rounded-md hover:bg-blue-100/50 dark:hover:bg-blue-800/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ——— 22. Quick Access Floating Panel ——— */
const QuickAccessPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowPanel(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const quickActions = [
    {
      label: "Free Demo Class",
      icon: PlayCircle,
      to: "/demo",
      color: "from-green-500 to-emerald-600",
      desc: "Book a free trial session",
    },
    {
      label: "Download App",
      icon: Download,
      to: "/app",
      color: "from-blue-500 to-blue-600",
      desc: "Get our mobile app",
    },
    {
      label: "Talk to Counselor",
      icon: Phone,
      to: "/contact",
      color: "from-amber-500 to-orange-500",
      desc: "Free career guidance",
    },
    {
      label: "Join Telegram",
      icon: Send,
      to: "#",
      color: "from-cyan-500 to-cyan-600",
      desc: "Daily CA updates",
    },
    {
      label: "Today's CA",
      icon: Newspaper,
      to: "/current-affairs/daily",
      color: "from-purple-500 to-purple-600",
      desc: "Current affairs today",
    },
    {
      label: "Free Resources",
      icon: BookOpen,
      to: "/resources",
      color: "from-pink-500 to-rose-600",
      desc: "Notes, PYQs & more",
    },
  ];

  if (!showPanel) return null;

  return (
    <div ref={panelRef} className="fixed left-4 bottom-24 z-[950]">
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/30 flex items-center justify-center hover:from-blue-500 hover:to-indigo-600 transition-all"
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 90 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            {/* Pulse */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-blue-400/30"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-500/10 border border-blue-100 dark:border-blue-800/50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </motion.div>
                  <span className="text-sm font-bold">Quick Actions</span>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Actions list */}
            <div className="p-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {quickActions.map((action) => (
                  <motion.div key={action.label} variants={staggerItem}>
                    <Link
                      to={action.to}
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        className={`p-2 rounded-lg bg-gradient-to-br ${action.color} text-white shadow-sm`}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                      >
                        <action.icon className="w-4 h-4" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          {action.label}
                        </p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                          {action.desc}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Footer CTA */}
            <div className="px-3 pb-3">
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100/50 dark:border-blue-800/30"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </motion.div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    Limited Offer!
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                  Get 30% off on all annual plans. Use code: SRIRAM30
                </p>
                <Link
                  to="/courses"
                  className="flex items-center justify-center gap-1 w-full py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:from-blue-700 hover:to-indigo-700 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Explore Courses <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ——— 23. Animated Cursor Follower for Navigation ——— */
const NavCursorHighlight = ({ containerRef }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef, mouseX, mouseY]);

  return (
    <motion.div
      className="absolute w-32 h-32 rounded-full bg-blue-500/5 dark:bg-blue-400/5 pointer-events-none blur-xl"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
};

/* ——— 24. Live Student Count Badge ——— */
const LiveStudentCount = () => {
  const [count, setCount] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200/50 dark:border-green-800/30"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-green-500"
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="text-[11px] font-medium text-green-700 dark:text-green-400">
        {count.toLocaleString()} students online
      </span>
    </motion.div>
  );
};

/* ——— 25. Exam Countdown Timer ——— */
const ExamCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    // Prelims target: May 25, 2027
    const target = new Date("2027-05-25T09:30:00+05:30").getTime();

    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8 }}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
      </motion.div>
      <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400">
        Prelims 2027:
      </span>
      <div className="flex items-center gap-1">
        {[
          { val: timeLeft.days, label: "d" },
          { val: timeLeft.hours, label: "h" },
          { val: timeLeft.mins, label: "m" },
          { val: timeLeft.secs, label: "s" },
        ].map((unit) => (
          <span
            key={unit.label}
            className="text-[11px] font-bold text-amber-800 dark:text-amber-300"
          >
            {String(unit.val).padStart(2, "0")}
            <span className="text-amber-500/60 text-[9px]">{unit.label}</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/* ——— 26. Secondary Info Strip ——— */
const SecondaryInfoStrip = ({ scrolled }) => {
  if (scrolled) return null;

  return (
    <motion.div
      className="hidden xl:flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <LiveStudentCount />
      <ExamCountdown />
    </motion.div>
  );
};

/* ——— 27. Animated Banner Ribbon ——— */
const BannerRibbon = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25, delay: 3 }}
          className="fixed top-1/3 right-0 z-[950] max-w-[260px]"
        >
          <div className="relative bg-gradient-to-l from-blue-700 to-indigo-800 text-white rounded-l-2xl shadow-2xl shadow-blue-500/20 overflow-hidden">
            {/* Background sparkle */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`ribbon-sparkle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative px-4 py-3">
              <div className="flex items-start gap-3">
                <motion.div
                  className="p-2 rounded-lg bg-white/20 backdrop-blur-sm flex-shrink-0"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold">30% OFF All Courses!</p>
                  <p className="text-[10px] text-blue-200 mt-0.5">
                    Use code SRIRAM30 at checkout
                  </p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold text-amber-300 hover:text-amber-200 transition-colors"
                    onClick={() => setShow(false)}
                  >
                    Explore Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <motion.button
                  onClick={() => setShow(false)}
                  className="p-0.5 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                >
                  <X className="w-3.5 h-3.5 text-blue-200" />
                </motion.button>
              </div>
            </div>

            {/* Bottom shimmer */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ——— 28. Mobile Bottom Quick Nav ——— */
const MobileBottomNav = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY <= lastScrollY.current || currentY < 100);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { label: "Home", icon: Home, to: "/" },
    { label: "Courses", icon: GraduationCap, to: "/courses" },
    { label: "CA", icon: Newspaper, to: "/current-affairs" },
    { label: "Tests", icon: FileText, to: "/test-series" },
    { label: "Profile", icon: User, to: "/login" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="lg:hidden fixed bottom-0 left-0 right-0 z-[980] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-blue-100 dark:border-blue-800/30 safe-area-bottom"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-around px-2 py-1.5">
            {items.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all"
                >
                  {active && (
                    <motion.div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      layoutId="mobileNavActiveTab"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <motion.div
                    className={`p-1 rounded-lg transition-colors ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                    whileTap={{ scale: 0.85 }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  <span
                    className={`text-[9px] font-medium transition-colors ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

/* ——— 29. Accessibility Skip Nav Link ——— */
const SkipNavLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
};

/* ——— 30. Breadcrumb Trail (optional, can be used in layouts) ——— */
const BreadcrumbTrail = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <motion.nav
      className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 text-xs text-gray-500 dark:text-gray-400 bg-blue-50/30 dark:bg-blue-900/5 border-b border-blue-100/20 dark:border-blue-800/10"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-1.5">
        <Link
          to="/"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Home className="w-3 h-3" />
        </Link>
        {segments.map((segment, i) => {
          const path = "/" + segments.slice(0, i + 1).join("/");
          const label = segment
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" ");
          const isLast = i === segments.length - 1;

          return (
            <span key={path} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600" />
              {isLast ? (
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </motion.nav>
  );
};

/* ——— 31. Floating Help Widget ——— */
const FloatingHelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const faqs = [
    {
      q: "How do I start preparing for UPSC?",
      a: "Start with NCERT books, understand the syllabus, and join our Foundation course for structured guidance.",
    },
    {
      q: "What courses do you offer?",
      a: "We offer comprehensive UPSC CSE, State PSC, Optional subjects, and specialized test series courses.",
    },
    {
      q: "Is there a free trial available?",
      a: "Yes! You can book a free demo class and access our free resources section for study materials.",
    },
    {
      q: "How can I contact support?",
      a: "Call us at 1800-123-456 (toll-free) or email support@sriramsias.com. We're available 24/7.",
    },
  ];

  return (
    <div className="fixed bottom-6 right-20 z-[940]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-500/10 border border-blue-100 dark:border-blue-800/50 overflow-hidden mb-2"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <HelpCircle className="w-5 h-5" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold">Need Help?</p>
                  <p className="text-[10px] text-blue-200">
                    Quick answers to common questions
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ list */}
            <div className="p-3 max-h-72 overflow-y-auto">
              {selectedQuestion !== null ? (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="flex items-center gap-1 text-xs text-blue-500 mb-3 hover:text-blue-700 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 rotate-180" />
                    Back to questions
                  </button>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {faqs[selectedQuestion].q}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqs[selectedQuestion].a}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {faqs.map((faq, i) => (
                    <motion.button
                      key={i}
                      variants={staggerItem}
                      onClick={() => setSelectedQuestion(i)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span className="flex-1">{faq.q}</span>
                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-blue-50 dark:bg-blue-900/10 border-t border-blue-100 dark:border-blue-800/30">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Still need help? Contact us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all ${
          isOpen
            ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/30"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="help"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
            >
              <HelpCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Header;
