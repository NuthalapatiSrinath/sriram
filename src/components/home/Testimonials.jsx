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
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Trophy,
  Award,
  Heart,
  ThumbsUp,
  MessageCircle,
  Play,
  Pause,
  Shield,
  CheckCircle,
  Crown,
  Flame,
  BadgeCheck,
  MapPin,
  Calendar,
  BookOpen,
  Target,
  Brain,
  Zap,
  Video,
  Camera,
  Image,
  Filter,
  Grid3X3,
  BarChart3,
  TrendingUp,
  Verified,
  Share2,
  ExternalLink,
  Eye,
  PenLine,
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
   DATA — TESTIMONIALS CATEGORIES
   ═══════════════════════════════════════════════════════════════════ */

const TESTIMONIAL_CATEGORIES = [
  { id: "all", label: "All Reviews", count: 12 },
  { id: "toppers", label: "UPSC Toppers", count: 6 },
  { id: "students", label: "Current Students", count: 3 },
  { id: "parents", label: "Parents", count: 3 },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — TESTIMONIALS
   ═══════════════════════════════════════════════════════════════════ */

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sneha Pillai",
    rank: "AIR 3",
    year: 2025,
    service: "IAS",
    category: "toppers",
    avatar: "SP",
    location: "Chennai Center",
    course: "Foundation Batch",
    rating: 5,
    isFeatured: true,
    color: "from-amber-500 to-orange-600",
    quote:
      "SRIRAM IAS Academy transformed my entire approach to UPSC preparation. The 360° methodology, combined with the personal mentorship from retired IAS officers, gave me the clarity and confidence I needed. Their answer writing workshop alone improved my Mains score by 150+ marks. I cannot recommend them highly enough.",
    highlights: [
      "Answer Writing +150 marks",
      "Personal Mentorship",
      "360° Methodology",
    ],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 2,
    name: "Aarav Mehta",
    rank: "AIR 12",
    year: 2025,
    service: "IAS",
    category: "toppers",
    avatar: "AM",
    location: "Delhi Center",
    course: "Mains Booster",
    rating: 5,
    isFeatured: true,
    color: "from-blue-500 to-indigo-600",
    quote:
      "What differentiates SRIRAM from every other institute is the personal attention each student receives. My mentor — an ex-IAS officer — would review my answers every week and give detailed, constructive feedback. The mock interview sessions were incredibly realistic and prepared me superbly for the personality test.",
    highlights: ["Weekly 1-on-1 Reviews", "Mock Interviews", "Ex-IAS Mentors"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 3,
    name: "Priya Sharma",
    rank: "AIR 5",
    year: 2024,
    service: "IAS",
    category: "toppers",
    avatar: "PS",
    location: "Delhi Center",
    course: "Complete Foundation",
    rating: 5,
    isFeatured: true,
    color: "from-emerald-500 to-teal-600",
    quote:
      "I joined SRIRAM IAS as a complete beginner with zero knowledge about UPSC. Their structured 12-month program broke down the entire syllabus into manageable chunks. The daily current affairs, weekly tests, and monthly assessments kept me on track. Three attempts, and here I am — AIR 5!",
    highlights: [
      "Zero to Hero Journey",
      "Structured 12-Month Plan",
      "Daily + Weekly + Monthly Tests",
    ],
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: 4,
    name: "Rahul Desai",
    rank: "AIR 28",
    year: 2025,
    service: "IPS",
    category: "toppers",
    avatar: "RD",
    location: "Bangalore Center",
    course: "Hybrid Program",
    rating: 5,
    isFeatured: false,
    color: "from-purple-500 to-pink-600",
    quote:
      "Being a working professional, I needed a flexible coaching option. SRIRAM's hybrid model was perfect — quality classroom sessions on weekends and recorded lectures for weekdays. Their app's test platform allowed me to practice anytime, anywhere. The faculty's availability even after class hours showed their genuine commitment.",
    highlights: [
      "Hybrid Learning",
      "Working Professional Friendly",
      "24/7 App Access",
    ],
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    id: 5,
    name: "Ananya Singh",
    rank: "AIR 41",
    year: 2024,
    service: "IFS",
    category: "toppers",
    avatar: "AS",
    location: "Hyderabad Center",
    course: "Optional Coaching",
    rating: 5,
    isFeatured: false,
    color: "from-rose-500 to-red-600",
    quote:
      "The optional subject coaching at SRIRAM is unmatched. My Political Science optional scores jumped from 220 to 310 after just one batch. The faculty's understanding of UPSC marking trends and their ability to simplify complex theories made all the difference. Best investment of my UPSC journey.",
    highlights: [
      "Optional Score +90",
      "Subject Expert Faculty",
      "UPSC Trend Analysis",
    ],
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: 6,
    name: "Vikram Reddy",
    rank: "AIR 67",
    year: 2025,
    service: "IRS",
    category: "toppers",
    avatar: "VR",
    location: "Chennai Center",
    course: "Test Series",
    rating: 5,
    isFeatured: false,
    color: "from-cyan-500 to-blue-600",
    quote:
      "Even though I was preparing from another institute, I enrolled in SRIRAM's test series. The quality of questions, the detailed solutions, and the all-India ranking system were at a completely different level. Their Prelims test series predicted 60% of actual UPSC questions. Absolutely worth it!",
    highlights: [
      "60% Question Prediction",
      "All-India Ranking",
      "Detailed Solutions",
    ],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: 7,
    name: "Kavitha Menon",
    rank: null,
    year: null,
    service: null,
    category: "students",
    avatar: "KM",
    location: "Bangalore Center",
    course: "Foundation 2026",
    rating: 5,
    isFeatured: false,
    color: "from-indigo-500 to-violet-600",
    quote:
      "Currently in my 6th month at SRIRAM and I'm amazed at how my understanding of subjects has evolved. The faculty makes even the most complex topics like economics and science feel intuitive. The peer learning environment here is fantastic — study groups, group discussions, and debates every week!",
    highlights: ["Currently Enrolled", "Peer Learning", "Study Groups"],
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    id: 8,
    name: "Arjun Nair",
    rank: null,
    year: null,
    service: null,
    category: "students",
    avatar: "AN",
    location: "Delhi Center",
    course: "Prelims Intensive",
    rating: 5,
    isFeatured: false,
    color: "from-teal-500 to-green-600",
    quote:
      "The prelims intensive batch is incredibly well-structured. 3 months of focused preparation with daily MCQ practice, weekly full-length tests, and section-wise analysis. My test scores have gone from 55% to consistently above 85%. SRIRAM's CSAT workshop alone saved my prelims twice.",
    highlights: [
      "Score Improvement 55%→85%",
      "Daily MCQ Practice",
      "CSAT Workshop",
    ],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  },
  {
    id: 9,
    name: "Meera Joshi",
    rank: null,
    year: null,
    service: null,
    category: "students",
    avatar: "MJ",
    location: "Hyderabad Center",
    course: "Telugu Medium Batch",
    rating: 5,
    isFeatured: false,
    color: "from-amber-500 to-yellow-600",
    quote:
      "Finding quality UPSC coaching in Telugu medium was nearly impossible until I found SRIRAM's Hyderabad center. The faculty understands the challenges regional medium students face and provides targeted support. The bilingual study material is excellent. Feeling very confident about my preparation.",
    highlights: [
      "Telugu Medium Support",
      "Bilingual Material",
      "Regional Focus",
    ],
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    id: 10,
    name: "Dr. Suresh Mehta",
    rank: null,
    year: null,
    service: null,
    category: "parents",
    avatar: "DM",
    location: "Delhi Center",
    course: "Parent of AIR 12",
    rating: 5,
    isFeatured: false,
    color: "from-blue-500 to-sky-600",
    quote:
      "As a parent, my biggest concern was finding a coaching institute that truly cares about students. SRIRAM exceeded our expectations. Regular parent-teacher interactions, transparent fee structure, monthly progress reports, and the emotional support they provide during this stressful journey is remarkable.",
    highlights: [
      "Parent-Teacher Meetings",
      "Monthly Progress Reports",
      "Emotional Support",
    ],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
  },
  {
    id: 11,
    name: "Mrs. Lakshmi Pillai",
    rank: null,
    year: null,
    service: null,
    category: "parents",
    avatar: "LP",
    location: "Chennai Center",
    course: "Parent of AIR 3",
    rating: 5,
    isFeatured: false,
    color: "from-pink-500 to-rose-600",
    quote:
      "Sneha's success at UPSC is largely due to the incredible support system at SRIRAM. They didn't just teach her — they mentored her, motivated her during low phases, and celebrated every small victory. The holistic approach including yoga and stress management workshops truly sets them apart.",
    highlights: [
      "Holistic Approach",
      "Motivation Support",
      "Wellness Programs",
    ],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
  {
    id: 12,
    name: "Mr. Rajesh Kumar",
    rank: null,
    year: null,
    service: null,
    category: "parents",
    avatar: "RK",
    location: "Hyderabad Center",
    course: "Parent of Current Student",
    rating: 5,
    isFeatured: false,
    color: "from-emerald-500 to-green-600",
    quote:
      "We researched 15+ coaching institutes before choosing SRIRAM for our son. The scholarship program made quality coaching affordable for us. The discipline, the structured schedule, and the competitive environment they provide is exactly what UPSC preparation demands. Very satisfied with our choice.",
    highlights: [
      "Scholarship Support",
      "Structured Environment",
      "Competitive Atmosphere",
    ],
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&q=80",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA — REVIEW STATS
   ═══════════════════════════════════════════════════════════════════ */

const REVIEW_STATS = [
  { rating: 5, percentage: 85, count: 4250 },
  { rating: 4, percentage: 10, count: 500 },
  { rating: 3, percentage: 3, count: 150 },
  { rating: 2, percentage: 1, count: 50 },
  { rating: 1, percentage: 1, count: 50 },
];

const OVERALL_RATING = { average: 4.9, total: 5000, recommended: 98 };

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Particles
   ═══════════════════════════════════════════════════════════════════ */

const TestimonialParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={`test-p-${i}`}
        className="absolute rounded-full"
        style={{
          width: 2 + Math.random() * 5,
          height: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(59, 130, 246, ${0.06 + Math.random() * 0.1})`,
        }}
        animate={{
          y: [0, -25 - Math.random() * 35, 0],
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

const TestimonialParallax = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-16 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-amber-100/20 to-orange-100/20 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-16 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100/15 to-indigo-100/15 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute top-1/4 right-16 w-12 h-12 border-2 border-amber-200/20 rounded-xl"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-1/5 left-20 w-8 h-8 border-2 border-blue-200/15 rounded-full"
        style={{ rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-48 left-1/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-amber-200/25 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-1/3 w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-200/25 to-transparent"
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

const TestimonialSectionHeader = () => {
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
            <Star className="w-4 h-4 text-amber-600 fill-amber-400" />
          </motion.div>
          <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">
            Student Success Stories
          </span>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-rose-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-5 leading-tight"
      >
        <span className="block">What Our Students</span>
        <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Say About Us
        </span>
      </motion.h2>

      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Thousands of successful candidates, current students, and parents have
        shared their SRIRAM IAS experience. Here are some of the voices that
        define our legacy.
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
   SUB-COMPONENT: Overall Rating Card
   ═══════════════════════════════════════════════════════════════════ */

const OverallRatingCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-14"
    >
      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 p-8 lg:p-12 shadow-2xl shadow-blue-500/15">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left - Big Rating */}
          <motion.div
            variants={fadeInLeft}
            className="lg:w-1/3 text-center lg:text-left text-white"
          >
            <motion.div
              className="text-7xl lg:text-8xl font-black"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            >
              {OVERALL_RATING.average}
            </motion.div>
            <div className="flex items-center gap-1 justify-center lg:justify-start my-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-blue-200 text-lg font-semibold">
              {OVERALL_RATING.total.toLocaleString()} Reviews
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <ThumbsUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-bold text-green-300">
                {OVERALL_RATING.recommended}% Recommend
              </span>
            </div>
          </motion.div>

          {/* Middle - Bars */}
          <motion.div variants={fadeInUp} className="lg:w-1/3 w-full space-y-3">
            {REVIEW_STATS.map((stat, i) => (
              <motion.div
                key={stat.rating}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <span className="text-sm font-bold text-white w-4">
                  {stat.rating}
                </span>
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-400"
                    initial={{ width: 0 }}
                    animate={
                      isInView ? { width: `${stat.percentage}%` } : { width: 0 }
                    }
                    transition={{
                      duration: 1,
                      delay: 0.6 + i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
                <span className="text-xs text-blue-200 w-12 text-right">
                  {stat.count.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Trust Badges */}
          <motion.div
            variants={fadeInRight}
            className="lg:w-1/3 w-full space-y-3"
          >
            {[
              {
                icon: BadgeCheck,
                text: "Google Verified Reviews",
                color: "text-blue-300",
              },
              {
                icon: Shield,
                text: "100% Authentic Testimonials",
                color: "text-green-300",
              },
              {
                icon: Trophy,
                text: "Top Rated Coaching Institute",
                color: "text-yellow-300",
              },
              {
                icon: Award,
                text: "Education Excellence Award 2025",
                color: "text-amber-300",
              },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                <span className="text-sm font-semibold text-blue-100">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Featured Carousel
   ═══════════════════════════════════════════════════════════════════ */

const FeaturedCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const featured = TESTIMONIALS_DATA.filter((t) => t.isFeatured);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, featured.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };
  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % featured.length);
  };

  const current = featured[activeIndex];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="mb-14"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-2"
            whileHover={{ scale: 1.05 }}
          >
            <Crown className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">
              Featured Testimonials
            </span>
          </motion.div>
          <h3 className="text-2xl font-black text-gray-900">
            Topper <span className="text-blue-600">Success Stories</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </motion.button>
          <motion.button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-all"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-all"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl">
            <div className="flex flex-col lg:flex-row">
              {/* Left - Avatar & Info */}
              <div
                className={`lg:w-2/5 p-8 lg:p-10 bg-gradient-to-br ${current.color} text-white relative overflow-hidden`}
              >
                <motion.div
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/5"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm font-bold text-white/80 uppercase tracking-wider">
                      Featured Topper
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                    >
                      <img
                        src={current.image}
                        alt={current.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-black">{current.name}</h4>
                      <motion.div
                        className="px-3 py-1 rounded-full bg-white/20 text-sm font-bold inline-block mt-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {current.rank} — CSE {current.year}
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <GraduationCap className="w-4 h-4" />
                      <span>{current.service}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{current.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <BookOpen className="w-4 h-4" />
                      <span>{current.course}</span>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {current.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-full bg-white/15 text-white text-[10px] font-semibold"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Quote */}
              <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                <Quote className="w-10 h-10 text-blue-200 mb-4" />
                <p className="text-gray-700 text-lg leading-relaxed italic mb-6">
                  {current.quote}
                </p>

                <div className="flex items-center gap-3">
                  <motion.button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm border border-blue-100"
                    whileHover={{ scale: 1.03 }}
                  >
                    <Eye className="w-4 h-4" />
                    Full Interview
                  </motion.button>
                  <motion.button
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="h-1 bg-gray-100">
              <motion.div
                className={`h-full bg-gradient-to-r ${current.color}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                key={`bar-${activeIndex}-${isAutoPlaying}`}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {featured.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              setIsAutoPlaying(false);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-gradient-to-r from-blue-600 to-indigo-600" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Category Filter
   ═══════════════════════════════════════════════════════════════════ */

const TestimonialFilter = ({ activeFilter, onFilterChange }) => {
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
        {TESTIMONIAL_CATEGORIES.map((cat, index) => {
          const isActive = activeFilter === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onFilterChange(cat.id)}
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
   SUB-COMPONENT: Testimonial Card
   ═══════════════════════════════════════════════════════════════════ */

const TestimonialCard = ({ testimonial, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const shortQuote =
    testimonial.quote.length > 180
      ? testimonial.quote.substring(0, 180) + "..."
      : testimonial.quote;

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
      <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:border-blue-200/60">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Top accent */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${testimonial.color}`} />

        <div className="relative z-10 p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100 shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <h4 className="text-sm font-black text-gray-900">
                  {testimonial.name}
                </h4>
                {testimonial.rank ? (
                  <span
                    className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${testimonial.color} text-white text-[10px] font-bold`}
                  >
                    {testimonial.rank} — {testimonial.service}{" "}
                    {testimonial.year}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-gray-400">
                    {testimonial.course}
                  </span>
                )}
              </div>
            </div>
            <Quote className="w-6 h-6 text-blue-100" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          {/* Quote */}
          <p className="text-sm text-gray-600 leading-relaxed italic">
            "{isExpanded ? testimonial.quote : shortQuote}"
          </p>

          {testimonial.quote.length > 180 && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              whileHover={{ x: 3 }}
            >
              {isExpanded ? "Read Less" : "Read More"}
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            </motion.button>
          )}

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5">
            {testimonial.highlights.map((h) => (
              <span
                key={h}
                className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>{testimonial.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <motion.button
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all"
                whileHover={{ scale: 1.15 }}
              >
                <Heart className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all"
                whileHover={{ scale: 1.15 }}
              >
                <Share2 className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Scrolling Ticker
   ═══════════════════════════════════════════════════════════════════ */

const TestimonialTicker = () => {
  const items = [
    "⭐ 4.9/5 Average Rating",
    "✅ 5,000+ Verified Reviews",
    "👍 98% Recommend SRIRAM IAS",
    "🏆 AIR 1, 3, 5, 12 — Our Alumni",
    "💬 100% Authentic Testimonials",
    "📊 Google Verified 5-Star Institute",
    "🎓 Trusted by 35,000+ Students",
  ];

  return (
    <div className="mb-14 overflow-hidden py-3 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-2xl border border-amber-100/50 shadow-sm">
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
            <span className="text-amber-300">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: CTA
   ═══════════════════════════════════════════════════════════════════ */

const TestimonialCTA = () => {
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
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 p-10 lg:p-14 shadow-2xl shadow-orange-500/20">
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

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-white space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-black">
              Share Your SRIRAM Story
            </h3>
            <p className="text-orange-100 max-w-xl leading-relaxed">
              Are you a SRIRAM IAS alumni or current student? We'd love to hear
              your experience. Your story could inspire thousands of future
              aspirants.
            </p>
            <div className="flex items-center gap-3">
              {["Written Review", "Video Testimonial", "Success Interview"].map(
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
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-orange-700 font-bold shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <PenLine className="w-5 h-5" />
            Write Your Review
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

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTestimonials =
    activeFilter === "all"
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((t) => t.category === activeFilter);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-amber-50/20 overflow-hidden">
      <TestimonialParallax />
      <TestimonialParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <TestimonialSectionHeader />
        <TestimonialTicker />
        <OverallRatingCard />
        <FeaturedCarousel />

        <TestimonialFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Testimonials Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <TestimonialCTA />
      </div>
    </section>
  );
};

export default Testimonials;
