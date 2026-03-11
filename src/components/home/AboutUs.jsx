import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import {
  Award,
  BookOpen,
  Users,
  Target,
  GraduationCap,
  Star,
  Trophy,
  Heart,
  Lightbulb,
  Shield,
  Globe,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Crown,
  BadgeCheck,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Video,
  FileText,
  Headphones,
  Monitor,
  BarChart3,
  Flame,
  Eye,
  MessageCircle,
  ChevronRight,
  Play,
  Quote,
  Landmark,
  Scale,
  Compass,
  Sun,
  Rocket,
  Gem,
  Handshake,
  Brain,
  Megaphone,
  Flag,
  Infinity,
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

const rotateIn = {
  hidden: { opacity: 0, rotate: -15, scale: 0.8 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
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

const staggerItemLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerItemRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};

/* ═══════════════════════════════════════════════════════════════════
   DATA - MILESTONES TIMELINE
   ═══════════════════════════════════════════════════════════════════ */

const MILESTONES = [
  {
    year: "2005",
    title: "The Beginning",
    description:
      "SRIRAM IAS Academy was founded with a vision to transform UPSC coaching in India. Started with just 30 students and 3 faculty members in a single classroom.",
    icon: Rocket,
    color: "from-blue-500 to-indigo-600",
    stat: "30 Students",
  },
  {
    year: "2008",
    title: "First Major Success",
    description:
      "Our first batch produced 12 UPSC selections including 3 in top 50 ranks. This proved our unique teaching methodology was effective.",
    icon: Trophy,
    color: "from-amber-500 to-orange-600",
    stat: "12 Selections",
  },
  {
    year: "2012",
    title: "Expansion & Growth",
    description:
      "Expanded to 3 centers across India - Delhi, Chennai, and Bangalore. Introduced our comprehensive foundation course for the first time.",
    icon: Building2,
    color: "from-emerald-500 to-teal-600",
    stat: "3 Centers",
  },
  {
    year: "2016",
    title: "Digital Revolution",
    description:
      "Launched online learning platform, making quality UPSC preparation accessible to students across India, even in remote areas.",
    icon: Monitor,
    color: "from-purple-500 to-pink-600",
    stat: "Online Launch",
  },
  {
    year: "2019",
    title: "500+ Selections Milestone",
    description:
      "Crossed the landmark of 500+ total UPSC CSE selections. Became one of India's most trusted IAS coaching institutes.",
    icon: Crown,
    color: "from-cyan-500 to-blue-600",
    stat: "500+ Selections",
  },
  {
    year: "2023",
    title: "AI-Powered Learning",
    description:
      "Integrated AI-based personalized learning, adaptive test series, and smart analytics to revolutionize UPSC preparation.",
    icon: Brain,
    color: "from-rose-500 to-red-600",
    stat: "AI Integration",
  },
  {
    year: "2026",
    title: "Present & Beyond",
    description:
      "Today we serve 50,000+ students with 6 centers, 100+ faculty, and the most comprehensive UPSC preparation ecosystem in India.",
    icon: Infinity,
    color: "from-indigo-500 to-violet-600",
    stat: "50K+ Students",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - CORE VALUES
   ═══════════════════════════════════════════════════════════════════ */

const CORE_VALUES = [
  {
    icon: Compass,
    title: "Integrity First",
    description:
      "We uphold the highest standards of honesty and transparency in everything we do — from teaching to results.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for nothing less than the best in education, mentoring, and student outcomes every single day.",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    icon: Heart,
    title: "Student-Centric",
    description:
      "Every decision, every course, every resource is designed keeping the student's success as the ultimate priority.",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly evolve our teaching methods, embracing technology, and new pedagogical approaches.",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    icon: Handshake,
    title: "Inclusivity",
    description:
      "Quality UPSC preparation should be accessible to all. We offer scholarships and flexible payment plans.",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    icon: Shield,
    title: "Accountability",
    description:
      "We take responsibility for our students' journey, providing unwavering support from enrollment to selection.",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - LEADERSHIP TEAM
   ═══════════════════════════════════════════════════════════════════ */

const LEADERSHIP_TEAM = [
  {
    name: "Sri Ram Sharma",
    role: "Founder & Chief Mentor",
    tagline: "IAS (Retd.), AIR 3 - UPSC CSE 1992",
    description:
      "With over 30 years of experience in civil services and education, Sri Ram Sir has personally mentored 200+ IAS/IPS officers. His vision of making quality education accessible drives the academy's mission.",
    avatar: "SR",
    gradient: "from-blue-600 to-indigo-700",
    specializations: [
      "General Studies",
      "Ethics & Governance",
      "Interview Preparation",
    ],
    achievements: [
      "30+ Years in Civil Services Education",
      "Authored 12 bestselling UPSC books",
      "Government Education Advisor",
    ],
  },
  {
    name: "Dr. Priya Krishnamurthy",
    role: "Academic Director",
    tagline: "Ph.D. Political Science, JNU | 18+ years in UPSC coaching",
    description:
      "Dr. Priya heads the academic department, designing curriculum, training faculty, and ensuring our courses remain the gold standard in UPSC preparation.",
    avatar: "PK",
    gradient: "from-purple-600 to-pink-700",
    specializations: [
      "Polity & Governance",
      "International Relations",
      "Mains Answer Writing",
    ],
    achievements: [
      "Trained 50+ faculty members",
      "Developed proprietary answer-writing framework",
      "Published 8 academic papers",
    ],
  },
  {
    name: "Vikram Rathore",
    role: "Director - Strategy & Operations",
    tagline: "IRS (Retd.), MBA ISB Hyderabad",
    description:
      "Vikram brings strategic vision and operational excellence. He oversees all centers, ensures quality consistency, and drives the technology integration roadmap.",
    avatar: "VR",
    gradient: "from-emerald-600 to-teal-700",
    specializations: [
      "Economy & Finance",
      "Test Series Strategy",
      "Student Analytics",
    ],
    achievements: [
      "Launched AI-powered test analytics",
      "Expanded to 6 centers nationally",
      "Built partnership with 20+ universities",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - KEY NUMBERS
   ═══════════════════════════════════════════════════════════════════ */

const KEY_NUMBERS = [
  {
    value: "21+",
    label: "Years of Excellence",
    icon: Calendar,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    value: "500+",
    label: "UPSC Selections",
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    value: "50K+",
    label: "Students Trained",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    value: "100+",
    label: "Expert Faculty",
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    value: "6",
    label: "Pan India Centers",
    icon: MapPin,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    value: "95%",
    label: "Student Satisfaction",
    icon: Heart,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - APPROACH / METHODOLOGY
   ═══════════════════════════════════════════════════════════════════ */

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Foundation Building",
    description:
      "We start by building a strong conceptual foundation through structured lectures, comprehensive notes, and NCERTs mastery. No shortcuts, only solid understanding.",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    details: [
      "NCERT Foundation Program",
      "Concept Clarity Sessions",
      "Subject-wise Building Blocks",
      "Daily Reading Plans",
    ],
  },
  {
    step: "02",
    title: "Strategic Answer Writing",
    description:
      "Master the art of writing crisp, structured, and scoring answers. Our proprietary SRIRAM Framework ensures you never miss key points in any answer.",
    icon: FileText,
    color: "from-emerald-500 to-teal-600",
    details: [
      "SRIRAM Answer Framework",
      "Daily Writing Practice",
      "Peer Review System",
      "Model Answer Analysis",
    ],
  },
  {
    step: "03",
    title: "Test & Analyze",
    description:
      "Regular testing with AI-powered analytics helps identify strengths and weaknesses. Our adaptive test series evolves with your preparation level.",
    icon: BarChart3,
    color: "from-purple-500 to-pink-600",
    details: [
      "AI-Powered Analytics",
      "Adaptive Mock Tests",
      "Performance Tracking",
      "Weak Area Identification",
    ],
  },
  {
    step: "04",
    title: "Current Affairs Integration",
    description:
      "Daily current affairs sessions seamlessly integrated with static syllabus. Our unique mapping technique connects news to UPSC questions.",
    icon: Globe,
    color: "from-amber-500 to-orange-600",
    details: [
      "Daily CA Sessions",
      "News-Syllabus Mapping",
      "Monthly Compilations",
      "Editorial Discussions",
    ],
  },
  {
    step: "05",
    title: "Revision & Consolidation",
    description:
      "Structured revision through spaced repetition, revision tests, and mind-maps. Our 90-day revision plan ensures nothing is forgotten before the exam.",
    icon: Brain,
    color: "from-cyan-500 to-blue-600",
    details: [
      "Spaced Repetition System",
      "Quick Revision Notes",
      "Mind Map Library",
      "90-Day Rev Plan",
    ],
  },
  {
    step: "06",
    title: "Interview Excellence",
    description:
      "Comprehensive personality test preparation with mock interviews conducted by retired civil servants and subject experts.",
    icon: Megaphone,
    color: "from-rose-500 to-red-600",
    details: [
      "Mock Interview Panels",
      "Body Language Training",
      "DAF Analysis",
      "Current Affairs Discussion",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Floating Particles
   ═══════════════════════════════════════════════════════════════════ */

const AboutParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={`about-particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 6,
            height: 2 + Math.random() * 6,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(59, 130, 246, ${0.08 + Math.random() * 0.12})`,
          }}
          animate={{
            y: [0, -25 - Math.random() * 35, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.3, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 7,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Parallax Decorations
   ═══════════════════════════════════════════════════════════════════ */

const AboutParallaxDecor = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -270]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/20 to-indigo-100/20 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-100/20 to-pink-100/20 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 w-14 h-14 border-2 border-blue-200/20 rounded-xl"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute top-1/4 left-20 w-8 h-8 border-2 border-indigo-200/20 rounded-full"
        style={{ rotate: rotate2 }}
      />
      <motion.div
        className="absolute bottom-60 left-1/3 w-48 h-[1px] bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-80 right-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div className="absolute bottom-20 right-20 grid grid-cols-4 gap-2.5 opacity-15">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.7, 1.2, 0.7] }}
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

const AboutSectionHeader = () => {
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
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Landmark className="w-4 h-4 text-blue-600" />
          </motion.div>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            About Our Academy
          </span>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-5 leading-tight"
      >
        <span className="block">Know About</span>
        <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          SRIRAM IAS Academy
        </span>
      </motion.h2>

      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        For over two decades, we have been shaping the future of India by
        mentoring thousands of aspirants into becoming distinguished civil
        servants.
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
   SUB-COMPONENT: Hero Story Section
   ═══════════════════════════════════════════════════════════════════ */

const AboutHeroStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-20"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 shadow-2xl shadow-blue-500/20">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <motion.div
          className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/5 backdrop-blur-sm"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/5"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex flex-col lg:flex-row items-center gap-10 p-8 lg:p-14">
          {/* Left - Founder Card */}
          <motion.div variants={fadeInLeft} className="lg:w-2/5 flex-shrink-0">
            <div className="relative">
              {/* Glow behind */}
              <motion.div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-400 opacity-30 blur-2xl"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center space-y-4">
                <motion.div
                  className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-black ring-4 ring-white/20 shadow-xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0.1)",
                      "0 0 30px 10px rgba(255,255,255,0.1)",
                      "0 0 0 0 rgba(255,255,255,0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  SR
                </motion.div>
                <div>
                  <h4 className="text-xl font-black text-white">
                    Sri Ram Sharma
                  </h4>
                  <p className="text-blue-200 text-sm font-medium">
                    Founder & Chief Mentor
                  </p>
                  <p className="text-blue-300/70 text-xs mt-1">
                    IAS (Retd.) | AIR 3 — UPSC CSE 1992
                  </p>
                </div>
                <div className="pt-2">
                  <motion.div
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Quote className="w-8 h-8 text-blue-300/50 absolute -top-3 -left-2" />
                    <p className="text-sm text-blue-100 italic leading-relaxed px-4">
                      "Education is not just about clearing exams — it is about
                      building the leaders who will shape tomorrow's India. At
                      SRIRAM IAS, we don't just teach, we transform."
                    </p>
                  </motion.div>
                </div>
                <div className="flex items-center justify-center gap-4 pt-3">
                  {[
                    { value: "30+", label: "Years" },
                    { value: "200+", label: "Mentored IAS" },
                    { value: "12", label: "Books" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <p className="text-lg font-black text-white">{s.value}</p>
                      <p className="text-[10px] text-blue-300/60 uppercase">
                        {s.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Story */}
          <motion.div
            variants={fadeInRight}
            className="flex-1 text-white space-y-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <Flag className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-bold text-amber-200">
                Our Story Since 2005
              </span>
            </motion.div>

            <h3 className="text-3xl lg:text-4xl font-black leading-tight">
              Transforming Aspirants into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                Nation Builders
              </span>
            </h3>

            <div className="space-y-4 text-blue-100 leading-relaxed">
              <p>
                SRIRAM IAS Academy was born in 2005 from a simple yet powerful
                belief: every aspirant deserves access to world-class UPSC
                coaching, regardless of their background. What started as a
                small coaching center in Delhi with 30 passionate students has
                grown into one of India's most trusted IAS preparation
                institutes.
              </p>
              <p>
                Over the past 21 years, we have helped{" "}
                <span className="font-bold text-white">500+ students</span>{" "}
                achieve their dream of joining the Indian Civil Services. Our
                alumni serve as IAS, IPS, IFS, and IRS officers across the
                country, making a difference in governance and public service.
              </p>
              <p>
                Today, with{" "}
                <span className="font-bold text-white">6 centers</span>,{" "}
                <span className="font-bold text-white">
                  100+ expert faculty
                </span>
                , and a cutting-edge online platform, we continue to evolve,
                innovate, and lead the way in UPSC preparation.
              </p>
            </div>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              {[
                "Est. 2005",
                "6 Centers",
                "100+ Faculty",
                "50K+ Students",
                "500+ Selections",
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-blue-200 border border-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4" />
                Watch Our Story
              </motion.button>
              <motion.button
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet Our Team
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Key Numbers Counter Section
   ═══════════════════════════════════════════════════════════════════ */

const AnimatedCounter = ({ value, isInView }) => {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericPart = value.replace(/[^0-9]/g, "");
    const suffix = value.replace(/[0-9]/g, "");
    const target = parseInt(numericPart, 10);
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }
    let current = 0;
    const stepTime = Math.max(15, Math.floor(1500 / target));
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setDisplayValue(`${current}${suffix}`);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span>{displayValue}</span>;
};

const KeyNumbersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-20"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {KEY_NUMBERS.map((item, index) => (
          <motion.div
            key={item.label}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.05 }}
            className="relative group"
          >
            <div
              className={`relative p-5 rounded-2xl ${item.bg} border border-gray-100 shadow-lg shadow-blue-50/30 overflow-hidden text-center transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-200`}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500" />
              <div className="relative z-10">
                <motion.div
                  className="mx-auto w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md mb-3"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </motion.div>
                <p className={`text-2xl font-black ${item.color}`}>
                  <AnimatedCounter value={item.value} isInView={isInView} />
                </p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                  {item.label}
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
   SUB-COMPONENT: Core Values Section
   ═══════════════════════════════════════════════════════════════════ */

const CoreValuesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-20"
    >
      <motion.div variants={staggerItem} className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Gem className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-bold text-indigo-700 uppercase tracking-wider">
            What We Stand For
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Our Core <span className="text-blue-600">Values</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          These six pillars define who we are and guide every decision at SRIRAM
          IAS Academy.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CORE_VALUES.map((val, index) => (
          <motion.div
            key={val.title}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
          >
            <div
              className={`relative h-full p-7 rounded-2xl ${val.bgColor} border ${val.borderColor} shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl`}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${val.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${val.color} flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <val.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h4 className="text-lg font-black text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {val.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
              {/* Decorative corner */}
              <motion.div
                className={`absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br ${val.color} opacity-10`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Journey Timeline (Milestones)
   ═══════════════════════════════════════════════════════════════════ */

const JourneyTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-20"
    >
      <motion.div variants={staggerItem} className="text-center mb-12">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">
            Our Journey
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          21 Years of <span className="text-blue-600">Excellence</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Key milestones that shaped SRIRAM IAS Academy into what it is today.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200 hidden lg:block" />

        <div className="space-y-8 lg:space-y-0">
          {MILESTONES.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={milestone.year}
                variants={isLeft ? staggerItemLeft : staggerItemRight}
                className={`relative flex flex-col lg:flex-row items-center ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} lg:mb-0 mb-4`}
              >
                {/* Content */}
                <div
                  className={`w-full lg:w-5/12 ${isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"}`}
                >
                  <motion.div
                    className="p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div
                      className={`flex items-center gap-3 mb-3 ${isLeft ? "lg:justify-end" : ""}`}
                    >
                      <motion.div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-md`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <milestone.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}
                        >
                          {milestone.year}
                        </span>
                        <h4 className="text-lg font-black text-gray-900">
                          {milestone.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {milestone.description}
                    </p>
                    <motion.span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${milestone.color} text-white text-xs font-bold shadow-sm`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Sparkles className="w-3 h-3" />
                      {milestone.stat}
                    </motion.span>
                  </motion.div>
                </div>

                {/* Center Circle */}
                <motion.div
                  className="hidden lg:flex w-2/12 justify-center relative z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white text-xs font-black ring-4 ring-white shadow-xl`}
                  >
                    {milestone.year.slice(-2)}
                  </div>
                </motion.div>

                {/* Empty Space (opposite side) */}
                <div className="hidden lg:block w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Our Methodology Section
   ═══════════════════════════════════════════════════════════════════ */

const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-20"
    >
      <motion.div variants={staggerItem} className="text-center mb-12">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Rocket className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">
            Our Approach
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          The SRIRAM <span className="text-blue-600">Methodology</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          A proven 6-step framework that has consistently produced UPSC toppers
          for over two decades.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Step Selector */}
        <div className="lg:col-span-4 space-y-3">
          {METHODOLOGY_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              variants={staggerItemLeft}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                activeStep === index
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25"
                  : "bg-white text-gray-700 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200"
              }`}
              whileHover={{ x: activeStep === index ? 0 : 5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activeStep === index
                    ? "bg-white/20"
                    : `bg-gradient-to-br ${step.color}`
                }`}
                animate={activeStep === index ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <step.icon
                  className={`w-6 h-6 ${activeStep === index ? "text-white" : "text-white"}`}
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold ${activeStep === index ? "text-blue-200" : "text-gray-400"}`}
                  >
                    STEP {step.step}
                  </span>
                </div>
                <p className="font-bold text-sm truncate">{step.title}</p>
              </div>
              {activeStep === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Active Step Detail */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${METHODOLOGY_STEPS[activeStep].color} p-8 lg:p-10 text-white shadow-2xl`}
              >
                {/* Decorative */}
                <motion.div
                  className="absolute top-6 right-6 w-28 h-28 rounded-full bg-white/10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/5"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10 space-y-6">
                  {/* Step Badge */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {(() => {
                        const StepIcon = METHODOLOGY_STEPS[activeStep].icon;
                        return <StepIcon className="w-8 h-8 text-white" />;
                      })()}
                    </motion.div>
                    <div>
                      <span className="text-sm font-bold text-white/60 uppercase tracking-wider">
                        Step {METHODOLOGY_STEPS[activeStep].step} of 06
                      </span>
                      <h4 className="text-2xl lg:text-3xl font-black">
                        {METHODOLOGY_STEPS[activeStep].title}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/90 text-base leading-relaxed max-w-2xl">
                    {METHODOLOGY_STEPS[activeStep].description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {METHODOLOGY_STEPS[activeStep].details.map((detail, i) => (
                      <motion.div
                        key={detail}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255,255,255,0.15)",
                        }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                        <span className="text-sm font-semibold">{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Steps Dots */}
                  <div className="flex items-center gap-2 pt-3">
                    {METHODOLOGY_STEPS.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === activeStep
                            ? "w-10 bg-white"
                            : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                        whileHover={{ scale: 1.3 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Leadership Team
   ═══════════════════════════════════════════════════════════════════ */

const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-20"
    >
      <motion.div variants={staggerItem} className="text-center mb-12">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Crown className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">
            Leadership
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Meet Our <span className="text-blue-600">Visionaries</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          The experienced leaders who drive our mission of transforming UPSC
          aspirants into civil servants.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {LEADERSHIP_TEAM.map((leader, index) => (
          <motion.div
            key={leader.name}
            variants={staggerItem}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="relative h-full rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-blue-200">
              {/* Card glow on hover */}
              <motion.div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-sm" />

              {/* Gradient Header */}
              <div
                className={`relative h-36 bg-gradient-to-r ${leader.gradient} overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <motion.div
                  className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              </div>

              {/* Avatar - overlapping header */}
              <div className="flex justify-center -mt-14 relative z-10">
                <motion.div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${leader.gradient} flex items-center justify-center text-white text-3xl font-black ring-4 ring-white shadow-xl`}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59,130,246,0.1)",
                      "0 0 20px 8px rgba(59,130,246,0.15)",
                      "0 0 0 0 rgba(59,130,246,0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {leader.avatar}
                </motion.div>
              </div>

              {/* Body */}
              <div className="p-6 pt-4 text-center space-y-4">
                <div>
                  <h4 className="text-xl font-black text-gray-900 group-hover:text-blue-700 transition-colors">
                    {leader.name}
                  </h4>
                  <p className="text-sm font-bold text-blue-600">
                    {leader.role}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{leader.tagline}</p>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {leader.description}
                </p>

                {/* Specializations */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Specializations
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {leader.specializations.map((spec) => (
                      <motion.span
                        key={spec}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100"
                        whileHover={{ scale: 1.1 }}
                      >
                        {spec}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2 pt-2">
                  {leader.achievements.map((ach, i) => (
                    <motion.div
                      key={ach}
                      className="flex items-center gap-2 text-left"
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500">{ach}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Vision & Mission Block
   ═══════════════════════════════════════════════════════════════════ */

const VisionMission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const items = [
    {
      icon: Eye,
      title: "Our Vision",
      content:
        "To be India's most impactful IAS coaching institution — producing not just civil servants, but visionary leaders who transform governance and serve the nation with integrity, compassion, and innovation.",
      gradient: "from-blue-600 to-indigo-700",
      lightBg: "bg-blue-50",
    },
    {
      icon: Target,
      title: "Our Mission",
      content:
        "To democratize access to world-class UPSC preparation through innovative pedagogy, technology-driven learning, and unwavering commitment to every student's success, regardless of their socio-economic background.",
      gradient: "from-indigo-600 to-purple-700",
      lightBg: "bg-indigo-50",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-20"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            variants={index === 0 ? fadeInLeft : fadeInRight}
            whileHover={{ y: -5 }}
            className="group"
          >
            <div
              className={`relative h-full rounded-3xl overflow-hidden bg-gradient-to-br ${item.gradient} p-8 lg:p-10 text-white shadow-2xl transition-all duration-500 group-hover:shadow-3xl`}
            >
              {/* Background */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <motion.div
                className="absolute top-6 right-6 w-24 h-24 rounded-full bg-white/10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity, delay: index * 2 }}
              />

              <div className="relative z-10 space-y-5">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-black">
                  {item.title}
                </h3>
                <p className="text-white/90 text-base leading-relaxed">
                  {item.content}
                </p>

                <motion.div
                  className="h-1 w-20 rounded-full bg-white/30"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 80 } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: CTA Block
   ═══════════════════════════════════════════════════════════════════ */

const AboutCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 p-10 lg:p-14 text-center shadow-2xl shadow-blue-500/20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <motion.div
          className="absolute top-6 left-6 w-20 h-20 rounded-full bg-white/5"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white/5"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="relative z-10 space-y-6">
          <motion.div
            className="inline-block"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto shadow-xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h3 className="text-3xl lg:text-4xl font-black text-white">
            Ready to Begin Your IAS Journey?
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Join 50,000+ aspirants who chose SRIRAM IAS Academy as their trusted
            partner in UPSC preparation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              className="flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-blue-700 font-bold text-lg shadow-xl"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="w-5 h-5" />
              Explore Courses
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
              <Phone className="w-5 h-5" />
              Contact Us
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN ABOUT US COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const AboutUs = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/20 to-gray-50 overflow-hidden">
      <AboutParallaxDecor />
      <AboutParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <AboutSectionHeader />
        <AboutHeroStory />
        <KeyNumbersSection />
        <VisionMission />
        <CoreValuesSection />
        <JourneyTimeline />
        <MethodologySection />
        <LeadershipSection />
        <AboutCTA />
      </div>
    </section>
  );
};

export default AboutUs;
