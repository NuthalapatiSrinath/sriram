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
  Shield,
  Award,
  Users,
  GraduationCap,
  Trophy,
  BookOpen,
  Star,
  Target,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Zap,
  Heart,
  Clock,
  Globe,
  Video,
  Monitor,
  Headphones,
  MessageCircle,
  Brain,
  Lightbulb,
  PenLine,
  BarChart3,
  TrendingUp,
  Flame,
  Crown,
  BadgeCheck,
  FileText,
  Calendar,
  Timer,
  Compass,
  Layers,
  LayoutGrid,
  Fingerprint,
  WandSparkles,
  RefreshCcw,
  Eye,
  ThumbsUp,
  Handshake,
  Milestone,
  Puzzle,
  Rocket,
  CircleDot,
  Download,
  Phone,
  MapPin,
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
   DATA — REASONS
   ═══════════════════════════════════════════════════════════════════ */

const REASONS = [
  {
    id: 1,
    icon: Crown,
    title: "20+ Years of Excellence",
    subtitle: "Since 2005",
    description:
      "Two decades of unmatched track record in UPSC coaching. Consistently producing toppers and maintaining the highest selection ratio in the industry.",
    stats: { value: "20+", label: "Years" },
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    highlights: [
      "Founded by IAS officers",
      "Pioneer in structured coaching",
      "Evolved with changing UPSC patterns",
    ],
  },
  {
    id: 2,
    icon: Trophy,
    title: "Highest Selection Rate",
    subtitle: "Industry Leading",
    description:
      "Our selection-to-enrollment ratio consistently outperforms every other institute. 1 in every 4 students who complete our program clears Prelims.",
    stats: { value: "25%", label: "Success Rate" },
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    highlights: [
      "405+ total UPSC selections",
      "Toppers in all categories",
      "Multiple AIR 1 holders",
    ],
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "Expert Faculty Panel",
    subtitle: "88+ Specialists",
    description:
      "Our faculty includes retired IAS/IPS officers, subject matter experts from premier institutions, and award-winning educators with deep UPSC insight.",
    stats: { value: "88+", label: "Faculty" },
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    highlights: [
      "Ex-IAS/IPS officers on board",
      "PhD holders from top universities",
      "Average 15+ years teaching experience",
    ],
  },
  {
    id: 4,
    icon: Brain,
    title: "Proven Methodology",
    subtitle: "6-Stage Framework",
    description:
      "Our proprietary SRIRAM 360° methodology covers conceptual clarity, answer writing, current affairs integration, test practice, revision, and mentoring.",
    stats: { value: "360°", label: "Approach" },
    color: "from-purple-500 to-pink-600",
    bg: "bg-purple-50",
    highlights: [
      "Structured 12-month program",
      "Adaptive learning paths",
      "AI-powered test analytics",
    ],
  },
  {
    id: 5,
    icon: BookOpen,
    title: "Comprehensive Study Material",
    subtitle: "2,500+ Resources",
    description:
      "In-house curated study material updated annually, covering every topic in the UPSC syllabus. No need for any additional books or coaching.",
    stats: { value: "2.5K+", label: "Resources" },
    color: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
    highlights: [
      "Updated every year",
      "Covers entire UPSC syllabus",
      "Digital + printed formats",
    ],
  },
  {
    id: 6,
    icon: Target,
    title: "Personalized Mentorship",
    subtitle: "1:15 Mentor Ratio",
    description:
      "Every student is assigned a dedicated mentor who tracks progress, provides feedback, reviews answers, and creates customized study plans.",
    stats: { value: "1:15", label: "Ratio" },
    color: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    highlights: [
      "Weekly 1-on-1 sessions",
      "Progress dashboard",
      "Customized study schedule",
    ],
  },
  {
    id: 7,
    icon: Monitor,
    title: "Hybrid Learning Model",
    subtitle: "Online + Offline",
    description:
      "Seamless integration of offline classroom teaching with online recorded lectures, live doubt sessions, and digital test series accessible from anywhere.",
    stats: { value: "24/7", label: "Access" },
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-50",
    highlights: [
      "Live + recorded lectures",
      "Mobile app for learning",
      "Cloud-based test platform",
    ],
  },
  {
    id: 8,
    icon: Handshake,
    title: "Affordable & Transparent",
    subtitle: "No Hidden Fees",
    description:
      "Quality education shouldn't be expensive. Our fees are among the most competitive with zero hidden charges, and we offer generous scholarships.",
    stats: { value: "40%", label: "Below Market" },
    color: "from-teal-500 to-green-600",
    bg: "bg-teal-50",
    highlights: [
      "EMI options available",
      "Merit scholarships up to 100%",
      "Free resources for all",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — COMPARISON TABLE
   ═══════════════════════════════════════════════════════════════════ */

const COMPARISON_FEATURES = [
  {
    feature: "Years of Experience",
    sriram: "20+ Years",
    others: "5-10 Years",
    icon: Clock,
  },
  {
    feature: "Selection Rate",
    sriram: "25%+",
    others: "5-10%",
    icon: TrendingUp,
  },
  {
    feature: "Faculty Strength",
    sriram: "88+ Experts",
    others: "15-30",
    icon: GraduationCap,
  },
  {
    feature: "Mentor-Student Ratio",
    sriram: "1:15",
    others: "1:50+",
    icon: Users,
  },
  {
    feature: "Study Material",
    sriram: "2,500+ Resources",
    others: "Limited",
    icon: BookOpen,
  },
  {
    feature: "Test Series",
    sriram: "60+ Full Mocks",
    others: "15-25",
    icon: PenLine,
  },
  {
    feature: "Online Access",
    sriram: "24/7 Platform",
    others: "Limited Hours",
    icon: Globe,
  },
  {
    feature: "Personal Mentoring",
    sriram: "Weekly 1-on-1",
    others: "Rare/None",
    icon: MessageCircle,
  },
  {
    feature: "Answer Evaluation",
    sriram: "Within 48 Hours",
    others: "1-2 Weeks",
    icon: FileText,
  },
  {
    feature: "Scholarship",
    sriram: "Up to 100%",
    others: "5-15%",
    icon: Award,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — STUDENT NUMBERS
   ═══════════════════════════════════════════════════════════════════ */

const WHY_STATS = [
  {
    value: "35,000+",
    label: "Students Trained",
    icon: Users,
    color: "text-blue-600",
  },
  {
    value: "405+",
    label: "UPSC Selections",
    icon: Trophy,
    color: "text-amber-600",
  },
  {
    value: "88+",
    label: "Expert Faculty",
    icon: GraduationCap,
    color: "text-emerald-600",
  },
  {
    value: "4.9/5",
    label: "Student Rating",
    icon: Star,
    color: "text-purple-600",
  },
  { value: "20+", label: "Years Legacy", icon: Shield, color: "text-rose-600" },
  {
    value: "4",
    label: "Pan India Centers",
    icon: MapPin,
    color: "text-cyan-600",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — TESTIMONIALS MINI
   ═══════════════════════════════════════════════════════════════════ */

const WHY_TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    rank: "AIR 12",
    year: 2025,
    quote:
      "The personalized mentorship at SRIRAM was a game-changer. My mentor's weekly feedback improved my answer writing score by 40%.",
    avatar: "AM",
  },
  {
    name: "Priya Sharma",
    rank: "AIR 5",
    year: 2024,
    quote:
      "What sets SRIRAM apart is their 360° methodology. Every aspect of preparation is covered — from Prelims MCQs to Interview grooming.",
    avatar: "PS",
  },
  {
    name: "Rahul Desai",
    rank: "AIR 28",
    year: 2025,
    quote:
      "The hybrid model allowed me to continue working while preparing. The recorded lectures and 24/7 test platform were invaluable.",
    avatar: "RD",
  },
  {
    name: "Sneha Pillai",
    rank: "AIR 3",
    year: 2024,
    quote:
      "Their study material is so comprehensive that I didn't need a single extra book. The monthly current affairs magazine is pure gold.",
    avatar: "SP",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Particles
   ═══════════════════════════════════════════════════════════════════ */

const WhyParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={`why-p-${i}`}
        className="absolute rounded-full"
        style={{
          width: 2 + Math.random() * 5,
          height: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(59, 130, 246, ${0.06 + Math.random() * 0.1})`,
        }}
        animate={{
          y: [0, -28 - Math.random() * 32, 0],
          x: [0, Math.random() * 12 - 6, 0],
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

const WhyParallax = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -240]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-20 -right-24 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-100/20 to-indigo-100/20 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-1/3 -left-16 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-100/15 to-teal-100/15 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-20 w-12 h-12 border-2 border-blue-200/20 rounded-xl"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute top-1/5 left-16 w-8 h-8 border-2 border-indigo-200/15 rounded-full"
        style={{ rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-52 right-1/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-200/25 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-36 left-1/3 w-36 h-[1px] bg-gradient-to-r from-transparent via-indigo-200/25 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Section Header
   ═══════════════════════════════════════════════════════════════════ */

const WhySectionHeader = () => {
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
            <Shield className="w-4 h-4 text-blue-600" />
          </motion.div>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            The SRIRAM Difference
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
        <span className="block">Why Choose</span>
        <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          SRIRAM IAS Academy
        </span>
      </motion.h2>

      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        For over two decades, SRIRAM IAS has been the trusted name in civil
        services preparation. Here's what makes us the preferred choice of
        India's brightest aspirants.
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
   SUB-COMPONENT: Stats Bar
   ═══════════════════════════════════════════════════════════════════ */

const WhyStatsBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14"
    >
      {WHY_STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={staggerItem}
          whileHover={{ y: -6, scale: 1.04 }}
          className="group"
        >
          <div className="relative p-4 rounded-2xl bg-white border border-gray-100 shadow-lg text-center transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-200/60 overflow-hidden">
            <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500" />
            <div className="relative z-10">
              <motion.div
                className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-2"
                whileHover={{ rotate: [0, -10, 10, 0] }}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </motion.div>
              <motion.p
                className="text-xl font-black text-gray-900"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.3 + index * 0.08, type: "spring" }}
              >
                {stat.value}
              </motion.p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
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
   SUB-COMPONENT: Reason Card
   ═══════════════════════════════════════════════════════════════════ */

const ReasonCard = ({ reason, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div
        className={`relative h-full rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:border-blue-200/60`}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Top accent */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${reason.color}`} />

        <div className="relative z-10 p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <motion.div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            >
              <reason.icon className="w-7 h-7 text-white" />
            </motion.div>

            <motion.div
              className={`px-3 py-1.5 rounded-xl ${reason.bg} text-center`}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.08 + 0.3, type: "spring" }}
            >
              <span className="block text-lg font-black text-gray-900">
                {reason.stats.value}
              </span>
              <span className="block text-[10px] font-semibold text-gray-500 uppercase">
                {reason.stats.label}
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {reason.subtitle}
            </span>
            <h4 className="text-lg font-black text-gray-900 mt-1 group-hover:text-blue-700 transition-colors">
              {reason.title}
            </h4>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            {reason.description}
          </p>

          {/* Highlights */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-1">
                  {reason.highlights.map((h, i) => (
                    <motion.div
                      key={h}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            whileHover={{ x: 3 }}
          >
            <Eye className="w-3.5 h-3.5" />
            {isExpanded ? "Show Less" : "Learn More"}
            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Comparison Table
   ═══════════════════════════════════════════════════════════════════ */

const ComparisonTable = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

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
          <BarChart3 className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-bold text-indigo-700 uppercase tracking-wider">
            Side-by-Side Comparison
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          SRIRAM IAS <span className="text-blue-600">vs Others</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          See how we compare with other coaching institutes on key parameters
          that matter most.
        </p>
      </motion.div>

      <div className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl">
        {/* Table Header */}
        <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="p-5 font-bold text-sm">Feature</div>
          <div className="p-5 font-bold text-sm text-center border-l border-white/10">
            <span className="flex items-center justify-center gap-2">
              <Crown className="w-4 h-4 text-yellow-300" />
              SRIRAM IAS
            </span>
          </div>
          <div className="p-5 font-bold text-sm text-center border-l border-white/10">
            Others
          </div>
        </div>

        {/* Table Rows */}
        {COMPARISON_FEATURES.map((row, index) => (
          <motion.div
            key={row.feature}
            className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t border-gray-100 hover:bg-blue-50/30 transition-colors`}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.06 }}
          >
            <div className="p-4 flex items-center gap-2.5">
              <row.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-700">
                {row.feature}
              </span>
            </div>
            <div className="p-4 text-center border-l border-gray-100">
              <span className="text-sm font-bold text-blue-700 flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {row.sriram}
              </span>
            </div>
            <div className="p-4 text-center border-l border-gray-100">
              <span className="text-sm text-gray-500">{row.others}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Mini Testimonials
   ═══════════════════════════════════════════════════════════════════ */

const MiniTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WHY_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-14"
    >
      <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-800 shadow-2xl shadow-blue-500/15 p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left */}
          <motion.div
            variants={fadeInLeft}
            className="lg:w-2/5 text-white space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <ThumbsUp className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold text-blue-200 uppercase tracking-wider">
                What Toppers Say
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-black leading-tight">
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                India's Best
              </span>
            </h3>

            <p className="text-blue-100 leading-relaxed">
              Don't just take our word — hear from our successful candidates who
              cracked UPSC with SRIRAM.
            </p>

            <div className="flex items-center gap-2">
              {WHY_TESTIMONIALS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full ${i === activeIndex ? "bg-yellow-400" : "bg-white/20"}`}
                  animate={i === activeIndex ? { scale: [1, 1.4, 1] } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: i === activeIndex ? Infinity : 0,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div variants={fadeInRight} className="lg:w-3/5 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-white text-base leading-relaxed italic">
                    "{WHY_TESTIMONIALS[activeIndex].quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-black text-sm shadow-lg">
                      {WHY_TESTIMONIALS[activeIndex].avatar}
                    </div>
                    <div>
                      <p className="text-white font-bold">
                        {WHY_TESTIMONIALS[activeIndex].name}
                      </p>
                      <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 text-xs font-bold">
                        {WHY_TESTIMONIALS[activeIndex].rank} — CSE{" "}
                        {WHY_TESTIMONIALS[activeIndex].year}
                      </span>
                    </div>
                  </div>
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
   SUB-COMPONENT: CTA
   ═══════════════════════════════════════════════════════════════════ */

const WhyCTA = () => {
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
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h3 className="text-3xl lg:text-4xl font-black text-white">
            Ready to Start Your IAS Journey?
          </h3>
          <p className="text-blue-100 text-base leading-relaxed">
            Join SRIRAM IAS Academy today and give your UPSC preparation the
            competitive edge it deserves. Enroll now and become part of India's
            most successful coaching legacy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-bold shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="w-5 h-5" />
              Enroll Now
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold border border-white/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              Talk to Counsellor
            </motion.button>
          </div>

          <p className="text-[10px] text-blue-300/50">
            Limited seats available for March 2026 batch. Scholarship test on
            25th March.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const WhyChooseSriram = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/20 to-gray-50 overflow-hidden">
      <WhyParallax />
      <WhyParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <WhySectionHeader />
        <WhyStatsBar />

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {REASONS.map((reason, index) => (
            <ReasonCard key={reason.id} reason={reason} index={index} />
          ))}
        </div>

        <ComparisonTable />
        <MiniTestimonials />
        <WhyCTA />
      </div>
    </section>
  );
};

export default WhyChooseSriram;
