import { useState, useRef, useEffect, useCallback } from "react";
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
  Award,
  Trophy,
  Star,
  Crown,
  Medal,
  Users,
  TrendingUp,
  Target,
  GraduationCap,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  BadgeCheck,
  CheckCircle,
  Flame,
  Heart,
  Quote,
  MapPin,
  Calendar,
  BookOpen,
  BarChart3,
  Lightbulb,
  Share2,
  Eye,
  MessageCircle,
  ChevronLeft,
  Play,
  ThumbsUp,
  Flag,
  Rocket,
  Gem,
  Shield,
  PartyPopper,
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
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
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

/* ═══════════════════════════════════════════════════════════════════
   DATA - YEAR-WISE SELECTION STATS
   ═══════════════════════════════════════════════════════════════════ */

const YEARLY_STATS = [
  { year: "2018", total: 42, topTen: 3, topFifty: 8, topHundred: 15 },
  { year: "2019", total: 56, topTen: 4, topFifty: 11, topHundred: 22 },
  { year: "2020", total: 63, topTen: 5, topFifty: 14, topHundred: 28 },
  { year: "2021", total: 71, topTen: 6, topFifty: 16, topHundred: 32 },
  { year: "2022", total: 78, topTen: 7, topFifty: 19, topHundred: 38 },
  { year: "2023", total: 85, topTen: 8, topFifty: 22, topHundred: 41 },
  { year: "2024", total: 92, topTen: 9, topFifty: 25, topHundred: 45 },
  { year: "2025", total: 98, topTen: 10, topFifty: 28, topHundred: 50 },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - TOPPERS
   ═══════════════════════════════════════════════════════════════════ */

const TOPPERS = [
  {
    id: 1,
    name: "Aishwarya Verma",
    rank: "AIR 1",
    year: "2025",
    service: "IAS",
    state: "Rajasthan",
    photo: "AV",
    gradient: "from-amber-500 to-orange-600",
    quote:
      "SRIRAM IAS Academy didn't just prepare me for the exam — they prepared me for public service. The mentorship, the study material, and the answer writing practice were unmatched. Forever grateful!",
    subject: "Sociology Optional",
    attempts: "1st Attempt",
    marks: "1087/2025",
    bgGlow: "bg-amber-500",
  },
  {
    id: 2,
    name: "Rajiv Mehta",
    rank: "AIR 3",
    year: "2025",
    service: "IAS",
    state: "Delhi",
    photo: "RM",
    gradient: "from-blue-500 to-indigo-600",
    quote:
      "The structured approach at SRIRAM IAS — especially the 6-step methodology — helped me stay organized throughout my preparation. The test series was a game-changer for my prelims strategy.",
    subject: "Geography Optional",
    attempts: "1st Attempt",
    marks: "1062/2025",
    bgGlow: "bg-blue-500",
  },
  {
    id: 3,
    name: "Priya Nair",
    rank: "AIR 5",
    year: "2025",
    service: "IAS",
    state: "Kerala",
    photo: "PN",
    gradient: "from-emerald-500 to-teal-600",
    quote:
      "From daily current affairs to mock interviews, every aspect of my preparation was guided by SRIRAM IAS. Special thanks to the Ethics team for helping me score 130+ in Ethics paper!",
    subject: "Public Admin Optional",
    attempts: "2nd Attempt",
    marks: "1045/2025",
    bgGlow: "bg-emerald-500",
  },
  {
    id: 4,
    name: "Vikrant Singh",
    rank: "AIR 8",
    year: "2025",
    service: "IPS",
    state: "UP",
    photo: "VS",
    gradient: "from-purple-500 to-pink-600",
    quote:
      "The personal mentorship program at SRIRAM IAS was pivotal for my success. My mentor helped me identify my weaknesses early and create a targeted study plan. Can't recommend enough!",
    subject: "History Optional",
    attempts: "1st Attempt",
    marks: "1028/2025",
    bgGlow: "bg-purple-500",
  },
  {
    id: 5,
    name: "Sneha Chatterjee",
    rank: "AIR 12",
    year: "2025",
    service: "IAS",
    state: "West Bengal",
    photo: "SC",
    gradient: "from-cyan-500 to-blue-600",
    quote:
      "As a working professional, the online classes and recorded lectures were my lifeline. The flexibility of the hybrid mode allowed me to prepare without leaving my job. Truly grateful!",
    subject: "Sociology Optional",
    attempts: "2nd Attempt",
    marks: "1015/2025",
    bgGlow: "bg-cyan-500",
  },
  {
    id: 6,
    name: "Arjun Desai",
    rank: "AIR 15",
    year: "2025",
    service: "IFS",
    state: "Gujarat",
    photo: "AD",
    gradient: "from-rose-500 to-red-600",
    quote:
      "The answer writing bootcamp transformed my mains preparation completely. Learning the SRIRAM framework helped me structure answers that stood out. Scored 500+ in GS papers alone!",
    subject: "Geography Optional",
    attempts: "1st Attempt",
    marks: "998/2025",
    bgGlow: "bg-rose-500",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - SELECTION HIGHLIGHTS
   ═══════════════════════════════════════════════════════════════════ */

const SELECTION_HIGHLIGHTS = [
  {
    value: "585+",
    label: "Total UPSC Selections",
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    value: "10",
    label: "In Top 10 (2025)",
    icon: Crown,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    value: "28",
    label: "In Top 50 (2025)",
    icon: Award,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    value: "98",
    label: "Total Selections (2025)",
    icon: GraduationCap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    value: "50",
    label: "In Top 100 (2025)",
    icon: Star,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  {
    value: "8",
    label: "Consecutive Years Record",
    icon: Flame,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - SERVICE-WISE BREAKDOWN
   ═══════════════════════════════════════════════════════════════════ */

const SERVICE_BREAKDOWN = [
  {
    service: "IAS",
    count: 320,
    percentage: 55,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-500",
  },
  {
    service: "IPS",
    count: 115,
    percentage: 20,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500",
  },
  {
    service: "IFS",
    count: 65,
    percentage: 11,
    color: "from-purple-500 to-pink-600",
    bg: "bg-purple-500",
  },
  {
    service: "IRS",
    count: 50,
    percentage: 8,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-500",
  },
  {
    service: "Others",
    count: 35,
    percentage: 6,
    color: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-500",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Particles
   ═══════════════════════════════════════════════════════════════════ */

const CelebratingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`celebrate-p-${i}`}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 5,
            height: 2 + Math.random() * 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 3 === 0
                ? `rgba(234, 179, 8, ${0.08 + Math.random() * 0.12})`
                : `rgba(59, 130, 246, ${0.07 + Math.random() * 0.1})`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.7, 0],
            scale: [0.4, 1.4, 0.4],
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
   SUB-COMPONENT: Parallax Background
   ═══════════════════════════════════════════════════════════════════ */

const CelebratingParallax = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-amber-100/15 to-orange-100/15 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100/15 to-indigo-100/15 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-16 w-12 h-12 border-2 border-amber-200/20 rounded-xl"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute top-1/4 left-16 w-8 h-8 border-2 border-blue-200/20 rounded-full"
        style={{ rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-40 right-1/3 w-44 h-[1px] bg-gradient-to-r from-transparent via-amber-200/30 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-32 left-10 grid grid-cols-4 gap-3 opacity-10">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-amber-400"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Section Header
   ═══════════════════════════════════════════════════════════════════ */

const CelebratingSectionHeader = () => {
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
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 blur-3xl opacity-40"
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div variants={staggerItem} className="inline-block mb-5">
        <motion.div
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 shadow-lg shadow-amber-100/40"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Trophy className="w-4 h-4 text-amber-600" />
          </motion.div>
          <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">
            Our Pride & Glory
          </span>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Crown className="w-4 h-4 text-amber-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-5 leading-tight"
      >
        <span className="block">Celebrating Our Successful</span>
        <span className="block bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Selections in UPSC
        </span>
      </motion.h2>

      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Every year, our students make us proud by securing top ranks in UPSC
        Civil Services Examination. Here we celebrate their extraordinary
        achievements and the journey that made it possible.
      </motion.p>

      <motion.div
        variants={staggerItem}
        className="flex items-center justify-center gap-2 mt-6"
      >
        <motion.div
          className="h-1 w-12 rounded-full bg-amber-300"
          initial={{ width: 0 }}
          animate={isInView ? { width: 48 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.div
          className="h-1.5 w-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
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
   SUB-COMPONENT: Selection Highlights Stats
   ═══════════════════════════════════════════════════════════════════ */

const AnimatedNumber = ({ value, isInView }) => {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!isInView) return;
    const num = value.replace(/[^0-9]/g, "");
    const suffix = value.replace(/[0-9]/g, "");
    const target = parseInt(num, 10);
    if (isNaN(target)) {
      setDisplay(value);
      return;
    }
    let curr = 0;
    const stepTime = Math.max(15, Math.floor(1200 / target));
    const step = Math.max(1, Math.floor(target / 50));
    const timer = setInterval(() => {
      curr += step;
      if (curr >= target) {
        curr = target;
        clearInterval(timer);
      }
      setDisplay(`${curr}${suffix}`);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span>{display}</span>;
};

const SelectionHighlightsStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
    >
      {SELECTION_HIGHLIGHTS.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={staggerItem}
          whileHover={{ y: -8, scale: 1.05 }}
          className="group"
        >
          <div
            className={`relative p-5 rounded-2xl ${stat.bg} border ${stat.border} shadow-lg overflow-hidden text-center transition-all duration-300 group-hover:shadow-xl`}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-br from-white/0 to-amber-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/50 transition-all duration-500" />
            <div className="relative z-10">
              <motion.div
                className="mx-auto w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md mb-3"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </motion.div>
              <p className={`text-2xl font-black ${stat.color}`}>
                <AnimatedNumber value={stat.value} isInView={isInView} />
              </p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Grand Toppers Showcase (Carousel)
   ═══════════════════════════════════════════════════════════════════ */

const TopperShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const nextTopper = () =>
    setActiveIndex((prev) => (prev + 1) % TOPPERS.length);
  const prevTopper = () =>
    setActiveIndex((prev) => (prev - 1 + TOPPERS.length) % TOPPERS.length);

  useEffect(() => {
    const timer = setInterval(nextTopper, 6000);
    return () => clearInterval(timer);
  }, []);

  const topper = TOPPERS[activeIndex];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-16"
    >
      <motion.div variants={staggerItem} className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Crown className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">
            Our Champions
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Meet Our{" "}
          <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Top Rankers
          </span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          The inspiring stories behind India's future leaders.
        </p>
      </motion.div>

      {/* Main Topper Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 shadow-2xl shadow-blue-500/15">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/5"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/5"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={topper.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12"
          >
            {/* Left - Avatar & Rank */}
            <div className="lg:w-1/3 flex-shrink-0 text-center space-y-4">
              <div className="relative inline-block">
                {/* Glow */}
                <motion.div
                  className={`absolute -inset-4 rounded-full ${topper.bgGlow} opacity-20 blur-2xl`}
                  animate={{
                    opacity: [0.15, 0.3, 0.15],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className={`relative w-36 h-36 rounded-full bg-gradient-to-br ${topper.gradient} flex items-center justify-center text-white text-5xl font-black ring-4 ring-white/20 shadow-2xl`}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0.1)",
                      "0 0 40px 15px rgba(255,255,255,0.1)",
                      "0 0 0 0 rgba(255,255,255,0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {topper.photo}
                </motion.div>
                {/* Rank Badge */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg shadow-xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {topper.rank}
                </motion.div>
              </div>

              <motion.div className="space-y-1 pt-4">
                <h4 className="text-2xl font-black text-white">
                  {topper.name}
                </h4>
                <div className="flex items-center justify-center gap-2 text-blue-200">
                  <BadgeCheck className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-semibold">
                    {topper.service} — UPSC CSE {topper.year}
                  </span>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <div className="flex justify-center gap-3 pt-2">
                {[
                  { label: "Attempt", value: topper.attempts },
                  { label: "Subject", value: topper.subject.split(" ")[0] },
                  { label: "Marks", value: topper.marks },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10"
                  >
                    <p className="text-xs text-blue-300/70">{s.label}</p>
                    <p className="text-sm font-bold text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Testimonial */}
            <div className="flex-1 text-white space-y-5">
              <motion.div className="relative">
                <Quote className="w-10 h-10 text-amber-400/30 absolute -top-4 -left-2" />
                <p className="text-lg text-blue-100 italic leading-relaxed pl-8 pr-4">
                  "{topper.quote}"
                </p>
              </motion.div>

              <div className="flex items-center gap-4 pl-8">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-blue-300" />
                  <span className="text-sm text-blue-200">{topper.state}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-blue-300" />
                  <span className="text-sm text-blue-200">
                    {topper.subject}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-300" />
                  <span className="text-sm text-blue-200">{topper.year}</span>
                </div>
              </div>

              {/* Success tags */}
              <div className="flex flex-wrap gap-2 pl-8">
                {[
                  "Dedicated Mentor",
                  "Answer Writing Master",
                  "Test Series Topper",
                  "Current Affairs Expert",
                ].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200 border border-white/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="relative flex items-center justify-between px-8 pb-6">
          <div className="flex items-center gap-2">
            {TOPPERS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-10 bg-amber-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={prevTopper}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={nextTopper}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Toppers Grid Cards
   ═══════════════════════════════════════════════════════════════════ */

const ToppersGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-16"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPPERS.map((topper, index) => (
          <motion.div
            key={topper.id}
            variants={staggerItem}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group"
          >
            <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-amber-200/60">
              <motion.div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-sm" />

              {/* Header */}
              <div
                className={`relative h-24 bg-gradient-to-r ${topper.gradient} overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <motion.div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {topper.rank}
                </motion.div>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-green-300" />
                  <span className="text-white text-xs font-semibold">
                    {topper.service} — {topper.year}
                  </span>
                </div>
              </div>

              {/* Avatar overlapping */}
              <div className="flex justify-center -mt-10 relative z-10">
                <motion.div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${topper.gradient} flex items-center justify-center text-white text-2xl font-black ring-4 ring-white shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                >
                  {topper.photo}
                </motion.div>
              </div>

              {/* Body */}
              <div className="p-5 pt-3 text-center space-y-3">
                <div>
                  <h4 className="text-lg font-black text-gray-900 group-hover:text-blue-700 transition-colors">
                    {topper.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {topper.state} • {topper.subject}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs">
                  <span className="px-2 py-1 rounded-lg bg-green-50 text-green-700 font-bold border border-green-100">
                    {topper.attempts}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-100">
                    {topper.marks}
                  </span>
                </div>

                <motion.p className="text-sm text-gray-500 italic leading-relaxed line-clamp-3">
                  "{topper.quote.substring(0, 120)}..."
                </motion.p>

                <motion.button
                  className="flex items-center gap-1.5 mx-auto text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  Read Full Story
                  <ChevronRight className="w-3.5 h-3.5" />
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
   SUB-COMPONENT: Year-wise Selection Chart
   ═══════════════════════════════════════════════════════════════════ */

const YearWiseChart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const maxTotal = Math.max(...YEARLY_STATS.map((s) => s.total));

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-16"
    >
      <motion.div variants={staggerItem} className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            Growth Trajectory
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Year-wise <span className="text-blue-600">Selection Trend</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Consistent growth in selections year after year — proof of our
          commitment.
        </p>
      </motion.div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-xl p-6 lg:p-8">
        {/* Chart */}
        <div className="flex gap-3 lg:gap-5 h-72">
          {YEARLY_STATS.map((stat, index) => {
            const heightPercent = (stat.total / maxTotal) * 100;
            return (
              <motion.div
                key={stat.year}
                className="flex-1 flex flex-col items-center justify-end gap-2 h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.08 }}
              >
                {/* Value */}
                <motion.span
                  className="text-sm font-black text-blue-700"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.08 }}
                >
                  {stat.total}
                </motion.span>

                {/* Bar */}
                <motion.div
                  className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-indigo-500 relative group cursor-pointer"
                  initial={{ height: 0 }}
                  animate={
                    isInView ? { height: `${heightPercent}%` } : { height: 0 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-36 p-3 rounded-xl bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl z-20 pointer-events-none">
                    <p className="font-bold text-center mb-1">
                      {stat.year} Selections
                    </p>
                    <div className="space-y-0.5 text-gray-300">
                      <p>
                        Top 10:{" "}
                        <span className="text-amber-400 font-bold">
                          {stat.topTen}
                        </span>
                      </p>
                      <p>
                        Top 50:{" "}
                        <span className="text-blue-400 font-bold">
                          {stat.topFifty}
                        </span>
                      </p>
                      <p>
                        Top 100:{" "}
                        <span className="text-green-400 font-bold">
                          {stat.topHundred}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-transparent via-white/10 to-white/20"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </motion.div>

                {/* Year Label */}
                <span className="text-xs font-bold text-gray-500">
                  {stat.year}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            <span className="text-xs text-gray-500 font-medium">Top 10</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
            <span className="text-xs text-gray-500 font-medium">Top 50</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            <span className="text-xs text-gray-500 font-medium">Top 100</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
            <span className="text-xs text-gray-500 font-medium">Total</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Service-wise Breakdown
   ═══════════════════════════════════════════════════════════════════ */

const ServiceBreakdown = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-16"
    >
      <motion.div variants={staggerItem} className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Shield className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">
            Service Distribution
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Selections by <span className="text-blue-600">Services</span>
        </h3>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-4">
        {SERVICE_BREAKDOWN.map((svc, index) => (
          <motion.div
            key={svc.service}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.05 }}
            className="group"
          >
            <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg text-center overflow-hidden transition-all duration-300 group-hover:shadow-xl">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${svc.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Circular Progress */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={
                        isInView
                          ? {
                              strokeDashoffset:
                                2 * Math.PI * 42 * (1 - svc.percentage / 100),
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        delay: 0.3 + index * 0.2,
                        ease: "easeOut",
                      }}
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black text-gray-800">
                      {svc.percentage}%
                    </span>
                  </div>
                </div>

                <h4
                  className={`text-lg font-black bg-gradient-to-r ${svc.color} bg-clip-text text-transparent`}
                >
                  {svc.service}
                </h4>
                <p className="text-sm font-bold text-gray-600">
                  {svc.count} Officers
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
   SUB-COMPONENT: Scrolling Success Ticker
   ═══════════════════════════════════════════════════════════════════ */

const SuccessTicker = () => {
  const items = [
    "🏆 AIR 1 — Aishwarya Verma (IAS 2025)",
    "🥈 AIR 3 — Rajiv Mehta (IAS 2025)",
    "🥉 AIR 5 — Priya Nair (IAS 2025)",
    "⭐ AIR 8 — Vikrant Singh (IPS 2025)",
    "✨ AIR 12 — Sneha Chatterjee (IAS 2025)",
    "🎯 AIR 15 — Arjun Desai (IFS 2025)",
    "🔥 98 Total Selections in 2025",
    "👑 10 in Top 10 Ranks",
    "💎 585+ Total UPSC Selections Since 2005",
  ];

  return (
    <div className="mb-16 overflow-hidden py-3 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-2xl border border-amber-100/50 shadow-sm">
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: [0, -2500] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold text-gray-600 flex items-center gap-2"
          >
            {item}
            <span className="text-amber-300">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: CTA Section
   ═══════════════════════════════════════════════════════════════════ */

const CelebratingCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-10 lg:p-14 text-center shadow-2xl shadow-orange-500/20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <motion.div
          className="absolute top-6 left-6 w-24 h-24 rounded-full bg-white/10"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-white/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="relative z-10 space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto shadow-xl">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h3 className="text-3xl lg:text-4xl font-black text-white">
            Your Name Could Be Next!
          </h3>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Join thousands who turned their IAS dream into reality with SRIRAM
            IAS Academy. Start your journey today and write your own success
            story.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              className="flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-orange-700 font-bold text-lg shadow-xl"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="w-5 h-5" />
              Start Your Preparation
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
              <Play className="w-5 h-5" />
              Watch Success Stories
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

const CelebratingSelections = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-amber-50/20 overflow-hidden">
      <CelebratingParallax />
      <CelebratingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <CelebratingSectionHeader />
        <SelectionHighlightsStats />
        <SuccessTicker />
        <TopperShowcase />
        <ToppersGrid />
        <YearWiseChart />
        <ServiceBreakdown />
        <CelebratingCTA />
      </div>
    </section>
  );
};

export default CelebratingSelections;
