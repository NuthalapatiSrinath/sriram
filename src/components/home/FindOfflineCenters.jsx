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
  MapPin,
  Navigation,
  Phone,
  Mail,
  Clock,
  Users,
  Star,
  Building2,
  Globe,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle,
  GraduationCap,
  BookOpen,
  Video,
  Target,
  Trophy,
  Calendar,
  Shield,
  Headphones,
  Monitor,
  Zap,
  MessageCircle,
  ExternalLink,
  Map,
  Compass,
  Locate,
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Share2,
  Wifi,
  Coffee,
  Car,
  Train,
  Accessibility,
  Library,
  Printer,
  Tv2,
  Wind,
  Landmark,
  Award,
  BadgeCheck,
  Flame,
  Crown,
  Eye,
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
   DATA - CENTERS
   ═══════════════════════════════════════════════════════════════════ */

const CENTERS_DATA = [
  {
    id: 1,
    name: "SRIRAM IAS - Old Rajinder Nagar",
    shortName: "Old Rajinder Nagar",
    city: "New Delhi",
    state: "Delhi",
    region: "north",
    flagship: true,
    established: "2005",
    address:
      "25/18, Old Rajinder Nagar, Near Karol Bagh Metro Station, New Delhi - 110060",
    phone: ["+91 11 2874 5612", "+91 98100 54321"],
    email: "delhi.orn@sriramias.com",
    timing: "Mon - Sat: 8:00 AM - 8:00 PM | Sunday: 9:00 AM - 5:00 PM",
    students: "15,000+",
    faculty: "35+",
    selections: "200+",
    rating: 4.9,
    reviews: 2340,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gradient: "from-blue-600 to-indigo-700",
    badge: "Flagship Center",
    badgeColor: "from-amber-500 to-orange-500",
    mapUrl: "https://maps.google.com",
    courses: [
      "Foundation",
      "Prelims",
      "Mains",
      "Optional",
      "Test Series",
      "Interview",
    ],
    amenities: [
      "AC Classrooms",
      "Library",
      "WiFi",
      "Cafeteria",
      "Parking",
      "Smart Boards",
      "Discussion Rooms",
      "Printing",
    ],
    transport: [
      "Karol Bagh Metro - 5 min walk",
      "NDLS Railway Station - 3 km",
      "IGI Airport - 16 km",
    ],
    highlights: [
      "India's #1 rated IAS coaching center",
      "Personal mentorship by ex-IAS officers",
      "State-of-the-art smart classrooms",
      "In-house library with 50,000+ books",
    ],
  },
  {
    id: 2,
    name: "SRIRAM IAS - Chennai",
    shortName: "Chennai Center",
    city: "Chennai",
    state: "Tamil Nadu",
    region: "south",
    flagship: false,
    established: "2012",
    address: "No. 42, Anna Salai, Nandanam, Chennai - 600035",
    phone: ["+91 44 2434 5678"],
    email: "chennai@sriramias.com",
    timing: "Mon - Sat: 8:30 AM - 7:30 PM | Sunday: 9:00 AM - 3:00 PM",
    students: "8,000+",
    faculty: "20+",
    selections: "90+",
    rating: 4.8,
    reviews: 1240,
    image:
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=800&q=80",
    gradient: "from-purple-600 to-pink-700",
    badge: "South India's Best",
    badgeColor: "from-purple-500 to-pink-500",
    mapUrl: "https://maps.google.com",
    courses: ["Foundation", "Prelims", "Mains", "Optional", "Test Series"],
    amenities: [
      "AC Classrooms",
      "Library",
      "WiFi",
      "Smart Boards",
      "Parking",
      "Cafeteria",
    ],
    transport: [
      "Nandanam Metro - 3 min walk",
      "Chennai Central - 8 km",
      "Chennai Airport - 15 km",
    ],
    highlights: [
      "Tamil & English medium classes",
      "Strong focus on TNPSC + UPSC combo",
      "Weekend batches for working professionals",
      "Dedicated optional subject faculty",
    ],
  },
  {
    id: 3,
    name: "SRIRAM IAS - Bangalore",
    shortName: "Bangalore Center",
    city: "Bangalore",
    state: "Karnataka",
    region: "south",
    flagship: false,
    established: "2014",
    address: "3rd Floor, Brigade Tower, MG Road, Bangalore - 560001",
    phone: ["+91 80 4123 4567"],
    email: "bangalore@sriramias.com",
    timing: "Mon - Sat: 8:00 AM - 8:00 PM | Sunday: 9:00 AM - 4:00 PM",
    students: "6,500+",
    faculty: "18+",
    selections: "70+",
    rating: 4.7,
    reviews: 980,
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    gradient: "from-cyan-600 to-blue-700",
    badge: "Tech Hub Center",
    badgeColor: "from-cyan-500 to-blue-500",
    mapUrl: "https://maps.google.com",
    courses: ["Foundation", "Prelims", "Mains", "Test Series"],
    amenities: [
      "AC Classrooms",
      "Library",
      "WiFi",
      "Smart Boards",
      "Discussion Rooms",
    ],
    transport: [
      "MG Road Metro - 2 min walk",
      "Bangalore City Station - 5 km",
      "Airport - 35 km",
    ],
    highlights: [
      "Popular among IT professionals",
      "Evening & weekend flexible batches",
      "Integrated KPSC + UPSC preparation",
      "Modern tech-enabled classrooms",
    ],
  },
  {
    id: 4,
    name: "SRIRAM IAS - Hyderabad",
    shortName: "Hyderabad Center",
    city: "Hyderabad",
    state: "Telangana",
    region: "south",
    flagship: false,
    established: "2017",
    address: "Plot 67, Ameerpet, Near Metro Pillar 328, Hyderabad - 500016",
    phone: ["+91 40 2371 4589"],
    email: "hyderabad@sriramias.com",
    timing: "Mon - Sat: 8:00 AM - 7:30 PM | Sunday: 9:00 AM - 3:00 PM",
    students: "5,000+",
    faculty: "15+",
    selections: "45+",
    rating: 4.7,
    reviews: 720,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    gradient: "from-rose-600 to-red-700",
    badge: "Growing Fast",
    badgeColor: "from-rose-500 to-red-500",
    mapUrl: "https://maps.google.com",
    courses: ["Foundation", "Prelims", "Mains", "Test Series"],
    amenities: [
      "AC Classrooms",
      "Library",
      "WiFi",
      "Smart Boards",
      "Cafeteria",
    ],
    transport: ["Ameerpet Metro - 4 min walk", "Secunderabad Station - 7 km"],
    highlights: [
      "Telugu & English medium available",
      "Strong TSPSC + UPSC integration",
      "Rapidly growing community",
      "Scholarship programs for meritorious students",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - REGION FILTERS
   ═══════════════════════════════════════════════════════════════════ */

const REGION_FILTERS = [
  { id: "all", label: "All Centers", icon: Globe, count: 4 },
  { id: "north", label: "North India", icon: Landmark, count: 1 },
  { id: "south", label: "South India", icon: MapPin, count: 3 },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA - AMENITY ICONS MAP
   ═══════════════════════════════════════════════════════════════════ */

const AMENITY_ICON_MAP = {
  "AC Classrooms": Wind,
  Library: Library,
  WiFi: Wifi,
  Cafeteria: Coffee,
  Parking: Car,
  "Smart Boards": Tv2,
  "Discussion Rooms": MessageCircle,
  Printing: Printer,
};

/* ═══════════════════════════════════════════════════════════════════
   DATA - CENTER STATS
   ═══════════════════════════════════════════════════════════════════ */

const CENTER_STATS = [
  {
    value: "4",
    label: "Pan India Centers",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    value: "35K+",
    label: "Students Enrolled",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    value: "88+",
    label: "Expert Faculty",
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    value: "405+",
    label: "UPSC Selections",
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Particles
   ═══════════════════════════════════════════════════════════════════ */

const CenterParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={`center-p-${i}`}
        className="absolute rounded-full"
        style={{
          width: 2 + Math.random() * 5,
          height: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(59, 130, 246, ${0.07 + Math.random() * 0.1})`,
        }}
        animate={{
          y: [0, -25 - Math.random() * 35, 0],
          x: [0, Math.random() * 15 - 7.5, 0],
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

const CenterParallax = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-20 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/20 to-indigo-100/20 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-100/15 to-teal-100/15 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-16 w-12 h-12 border-2 border-blue-200/20 rounded-xl"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute top-1/5 left-20 w-8 h-8 border-2 border-indigo-200/20 rounded-full"
        style={{ rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-60 right-1/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-200/25 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-1/3 w-32 h-[1px] bg-gradient-to-r from-transparent via-indigo-200/25 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div className="absolute bottom-16 right-16 grid grid-cols-4 gap-2.5 opacity-12">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
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

const CenterSectionHeader = () => {
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
            <MapPin className="w-4 h-4 text-blue-600" />
          </motion.div>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            Visit Us Near You
          </span>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Navigation className="w-4 h-4 text-indigo-600" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-5 leading-tight"
      >
        <span className="block">Find Our</span>
        <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Offline Centers
        </span>
      </motion.h2>

      <motion.p
        variants={staggerItem}
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Experience world-class UPSC coaching at our state-of-the-art centers
        across India. Visit the one nearest to you and kickstart your IAS
        preparation journey.
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
   SUB-COMPONENT: Center Stats Bar
   ═══════════════════════════════════════════════════════════════════ */

const CenterStatsBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
    >
      {CENTER_STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={staggerItem}
          whileHover={{ y: -6, scale: 1.03 }}
          className="group"
        >
          <div
            className={`relative p-5 rounded-2xl ${stat.bg} border border-gray-100 shadow-lg overflow-hidden text-center transition-all duration-300 group-hover:shadow-xl`}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500" />
            <div className="relative z-10 flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </motion.div>
              <div className="text-left">
                <motion.p
                  className="text-2xl font-black text-gray-900"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
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
   SUB-COMPONENT: Region Filter
   ═══════════════════════════════════════════════════════════════════ */

const RegionFilter = ({ activeRegion, onRegionChange }) => {
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
        {REGION_FILTERS.map((region, index) => {
          const isActive = activeRegion === region.id;
          return (
            <motion.button
              key={region.id}
              onClick={() => onRegionChange(region.id)}
              className={`relative group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 + 0.2 }}
            >
              <region.icon
                className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500"}`}
              />
              <span className="whitespace-nowrap">{region.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
              >
                {region.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: India Map Visualization
   ═══════════════════════════════════════════════════════════════════ */

const IndiaMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // City positions matching the accurate India map coordinates
  const cityPins = [
    { city: "Delhi", x: "30%", y: "14%", count: 1, color: "bg-blue-500" },
    { city: "Hyderabad", x: "48%", y: "52%", count: 1, color: "bg-rose-500" },
    { city: "Bangalore", x: "45%", y: "65%", count: 1, color: "bg-cyan-500" },
    { city: "Chennai", x: "56%", y: "66%", count: 1, color: "bg-purple-500" },
  ];

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
          {/* Map Visual */}
          <motion.div variants={fadeInLeft} className="lg:w-1/2 relative">
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
              {/* India Map using actual SVG path data */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Real India Map Path - sourced from geographic data */}
                  <motion.path
                    d="M 213.22 21.84 Q 214.98 21.95 216.73 22.10 Q 228.98 23.46 237.94 32.40 Q 243.78 38.27 246.82 46.30 Q 248.89 51.68 249.84 57.47 Q 250.30 60.38 250.52 63.34 Q 250.89 68.73 250.61 74.13 Q 250.19 82.26 248.09 90.05 Q 246.87 94.64 245.15 99.04 Q 242.09 106.86 237.71 113.93 Q 235.22 117.87 232.37 121.57 Q 226.59 128.99 219.65 135.14 Q 207.40 145.90 193.26 153.65 Q 187.47 156.86 181.41 159.51 Q 172.50 163.36 163.11 165.89 Q 157.78 167.36 152.33 168.27 Q 145.19 169.47 137.95 169.75 Q 133.61 169.92 129.27 169.69 Q 122.04 169.32 114.95 167.73 Q 110.73 166.81 106.61 165.47 Q 99.71 163.32 93.14 160.22 Q 83.99 156.07 75.60 150.53 Q 70.72 147.37 66.11 143.85 Q 58.25 138.07 51.26 131.28 Q 46.22 126.38 41.65 120.99 Q 35.09 113.40 29.66 105.07 Q 26.46 100.15 23.66 94.97 Q 19.31 87.00 16.09 78.50 Q 14.19 73.57 12.71 68.50 Q 10.52 61.17 9.28 53.60 Q 8.61 49.49 8.30 45.33 Q 7.89 39.70 8.07 34.06 Q 8.18 30.58 8.58 27.13 Q 9.21 21.86 10.52 16.74 Q 11.41 13.24 12.64 9.85 Q 14.69 4.41 17.62 -0.51 L 19.43 0.38 Q 21.65 1.43 23.81 2.61 Q 28.45 5.11 32.86 8.07 Q 41.76 14.04 49.74 21.35 Q 54.39 25.61 58.71 30.22 Q 64.51 36.45 69.75 43.18 Q 73.31 47.77 76.55 52.61 Q 81.28 59.80 85.32 67.45 Q 87.90 72.48 90.15 77.68 Q 93.29 84.97 95.70 92.58 Q 97.31 97.76 98.50 103.06 Q 100.17 110.39 101.08 117.89 Q 101.69 123.11 101.84 128.37 Q 102.04 135.75 101.38 143.10 Q 101.00 147.45 100.25 151.75 Q 98.97 159.19 96.74 166.39 Q 95.39 171.04 93.69 175.58 Q 91.17 182.29 87.92 188.67 Q 86.03 192.43 83.89 196.06 Q 80.46 201.93 76.50 207.45 Q 74.29 210.50 71.94 213.45 Q 67.15 219.39 61.85 224.84 Q 59.48 227.28 56.99 229.61 Q 51.94 234.32 46.52 238.62 Q 43.54 240.95 40.45 243.14 Q 34.18 247.56 27.52 251.36 Q 23.92 253.41 20.21 255.24 Q 12.70 258.92 4.87 261.82 L 2.98 262.51 Q 2.78 261.34 2.62 260.17 Q 2.13 256.91 1.93 253.62 Q 1.62 248.62 1.93 243.63 Q 2.14 240.33 2.65 237.07 Q 3.52 231.70 5.05 226.51 Q 6.10 222.98 7.47 219.56 Q 9.72 213.88 12.68 208.54 Q 14.46 205.36 16.49 202.33 Q 20.58 196.21 25.38 190.67 Q 28.24 187.38 31.35 184.32 Q 37.63 178.13 44.60 172.73 Q 48.41 169.78 52.43 167.10 Q 60.52 161.70 69.20 157.43 Q 73.88 155.15 78.74 153.24 Q 88.51 149.39 98.73 146.93 Q 103.93 145.68 109.22 144.84 Q 119.85 143.13 130.64 143.09 Q 136.02 143.07 141.38 143.64 Q 151.99 144.77 162.27 147.76 Q 167.37 149.24 172.35 151.17 Q 182.35 155.04 191.73 160.39 Q 196.37 163.04 200.80 166.03 Q 209.70 172.03 217.77 179.13 Q 221.76 182.65 225.50 186.42 Q 232.95 194.01 239.44 202.37 Q 242.66 206.53 245.60 210.87 Q 251.51 219.58 256.38 228.93 Q 258.80 233.57 260.93 238.35 Q 265.20 247.96 268.25 258.05 Q 269.77 263.09 270.86 268.24 Q 272.62 276.46 273.33 284.87 Q 273.72 289.66 273.65 294.46 Q 273.54 301.80 272.46 309.06 Q 271.88 313.00 271.01 316.89 Q 269.27 324.70 266.47 332.20 Q 265.07 335.93 263.44 339.58 Q 260.17 346.88 256.07 353.73 Q 253.81 357.50 251.31 361.13 Q 246.29 368.41 240.53 375.15 Q 237.42 378.79 234.08 382.23 Q 227.36 389.13 219.98 395.31 Q 216.01 398.63 211.86 401.73 Q 203.49 407.98 194.48 413.28 Q 189.71 416.08 184.77 418.60 Q 174.84 423.65 164.39 427.60 Q 159.14 429.59 153.77 431.30 Q 143.00 434.72 131.96 437.04 Q 126.42 438.20 120.82 439.02 Q 109.62 440.66 98.32 441.17 Q 92.68 441.42 87.03 441.30 Q 75.74 441.07 64.53 439.67 Q 58.92 438.97 53.36 437.96 Q 42.24 436.02 31.39 432.93 Q 26.21 431.46 21.13 429.70 Q 10.93 426.18 1.24 421.60 L 0.00 420.94 L 0.61 419.79 Q 2.70 415.90 5.14 412.21 Q 9.99 404.84 15.85 398.24 Q 18.79 394.91 21.98 391.79 Q 28.39 385.50 35.48 379.99 Q 39.06 377.21 42.80 374.66 Q 50.32 369.52 58.37 365.23 Q 62.45 363.06 66.67 361.15 Q 75.14 357.31 83.99 354.37 Q 88.45 352.89 93.00 351.68 Q 102.11 349.25 111.44 347.86 Q 116.13 347.17 120.85 346.86 Q 130.31 346.23 139.78 346.80 Q 144.50 347.09 149.19 347.73 Q 158.59 348.99 167.75 351.49 Q 172.35 352.74 176.87 354.28 Q 185.93 357.38 194.60 361.48 Q 199.00 363.55 203.25 365.89 Q 211.79 370.60 219.76 376.21 Q 223.71 379.00 227.47 382.04 Q 235.02 388.15 241.89 395.00 Q 245.29 398.39 248.49 401.97 Q 255.02 409.29 260.60 417.29 Q 263.36 421.25 265.87 425.37 Q 270.91 433.63 274.99 442.50 Q 276.99 446.87 278.71 451.36 Q 282.16 460.36 284.49 469.74 Q 285.64 474.39 286.48 479.12 Q 287.96 487.21 288.42 495.43 L 288.54 497.85 L 286.13 498.05 Q 281.93 498.41 277.72 498.44 Q 269.31 498.49 260.94 497.57 Q 256.75 497.11 252.59 496.38 Q 244.27 494.93 236.15 492.65 Q 231.99 491.48 227.92 490.04 Q 219.77 487.16 211.95 483.53 Q 207.98 481.68 204.12 479.60 Q 196.39 475.43 189.04 470.55 Q 185.34 468.10 181.78 465.46 Q 174.65 460.16 168.00 454.25 Q 164.66 451.29 161.50 448.15 Q 155.17 441.86 149.48 435.05 Q 146.62 431.63 143.96 428.06 Q 138.64 420.90 133.99 413.30 Q 131.69 409.54 129.58 405.67 Q 125.36 397.91 121.81 389.78 Q 120.08 385.76 118.54 381.66 Q 115.48 373.44 113.24 365.00 Q 112.14 360.81 111.27 356.57 Q 109.54 348.09 108.67 339.46 Q 108.24 335.15 108.07 330.82 Q 107.73 322.17 108.31 313.54 Q 108.60 309.23 109.20 304.96 Q 110.40 296.40 112.49 288.01 Q 113.53 283.80 114.85 279.66 Q 117.49 271.37 121.02 263.38 Q 122.77 259.37 124.76 255.47 Q 128.76 247.66 133.53 240.28 Q 135.92 236.58 138.53 233.01 Q 143.77 225.86 149.71 219.23 Q 152.69 215.91 155.85 212.74 Q 162.21 206.35 169.15 200.58 Q 172.65 197.67 176.33 194.99 Q 183.72 189.60 191.63 184.97 Q 195.63 182.63 199.78 180.51 Q 208.10 176.26 216.84 172.84 Q 221.26 171.12 225.78 169.67 Q 234.85 166.77 244.23 164.86 Q 248.94 164.00 253.69 163.44 Q 263.21 162.37 272.78 162.38 Q 277.57 162.38 282.34 162.78 Q 291.89 163.57 301.31 165.52 Q 306.04 166.49 310.71 167.76 Q 319.99 170.30 329.00 173.85 Q 333.47 175.61 337.85 177.60 Q 346.61 181.59 355.00 186.45 Q 359.17 188.87 363.24 191.47 Q 371.37 196.70 379.00 202.63 Q 382.80 205.59 386.48 208.70 Q 393.83 214.92 400.64 221.73 L 400.00 222.85 Q 397.97 225.94 395.72 228.87 Q 391.20 234.75 386.06 240.11 Q 383.47 242.78 380.75 245.33 Q 375.27 250.47 369.38 255.11 Q 366.41 257.45 363.33 259.65 Q 357.14 264.07 350.60 268.00 Q 347.30 270.00 343.91 271.85 Q 337.11 275.55 330.02 278.69 Q 326.45 280.27 322.81 281.69 Q 315.52 284.53 308.01 286.73 Q 304.24 287.85 300.43 288.81 Q 292.79 290.73 284.98 291.88 Q 281.07 292.46 277.13 292.82 Q 269.25 293.53 261.32 293.42 Q 257.36 293.36 253.40 293.09 Q 245.49 292.55 237.64 291.24 Q 233.71 290.59 229.82 289.71 Q 222.04 287.95 214.47 285.45 Q 210.68 284.20 206.96 282.74 Q 199.52 279.81 192.38 276.19 Q 188.81 274.36 185.34 272.36 Q 178.40 268.33 171.81 263.74 Q 168.51 261.43 165.34 259.00 Q 158.99 254.10 153.00 248.74 Q 149.99 245.98 147.13 243.11 Q 141.40 237.31 136.09 231.17 Q 133.42 228.09 130.90 224.89 Q 125.84 218.45 121.23 211.69 Q 118.92 208.29 116.77 204.81 Q 112.47 197.82 108.76 190.54 Q 106.91 186.92 105.23 183.23 Q 101.87 175.83 99.14 168.21 Q 97.78 164.42 96.60 160.57 Q 94.25 152.85 92.59 144.96 Q 91.76 141.02 91.13 137.05 Q 89.88 129.10 89.39 121.07 Q 89.14 117.05 89.13 113.02 Q 89.11 104.96 90.02 96.96 Q 90.48 92.96 91.19 88.99 Q 92.61 81.05 94.87 73.31 Q 96.01 69.44 97.38 65.64 Q 100.14 57.99 103.71 50.64 Q 105.51 47.00 107.53 43.46 Q 111.61 36.34 116.39 29.62 Q 118.79 26.27 121.40 23.06 Q 126.66 16.59 132.56 10.68 Q 135.52 7.72 138.66 4.95 Q 145.00 -0.55 151.90 -5.35 L 153.53 -6.38 L 154.69 -4.84 Q 156.57 -2.33 158.60 0.02 Q 162.68 4.72 167.20 9.01 Q 169.47 11.16 171.86 13.20 Q 176.67 17.30 181.82 20.99 Q 184.43 22.86 187.14 24.58 Q 192.59 28.05 198.34 31.06 Q 201.24 32.58 204.21 33.96 Q 210.18 36.73 216.40 38.97 L 218.56 39.76 L 217.85 37.58 Q 216.75 34.22 215.49 30.92 Q 212.99 24.31 210.09 17.88 Q 208.64 14.67 207.10 11.50 Q 204.01 5.15 200.59 -1.03 L 199.47 -3.05 L 201.60 -3.48 Q 205.28 -4.20 209.01 -4.58 Q 216.49 -5.36 224.02 -4.88 Q 227.78 -4.64 231.52 -4.14 Q 238.99 -3.14 246.32 -1.29 Q 250.00 -0.36 253.62 0.80 Q 260.88 3.12 267.85 6.23 Q 271.33 7.79 274.71 9.57 Q 281.47 13.14 287.85 17.36 Q 291.04 19.47 294.14 21.73 Q 300.34 26.25 306.16 31.27 Q 309.07 33.78 311.87 36.41 Q 317.49 41.69 322.67 47.40 Q 325.25 50.26 327.71 53.22 Q 332.64 59.15 337.07 65.48 Q 339.28 68.63 341.37 71.87 Q 345.55 78.36 349.18 85.16 Q 350.99 88.55 352.67 92.02 Q 356.03 98.97 358.77 106.20 Q 360.14 109.79 361.37 113.45 Q 363.82 120.77 365.59 128.29 Q 366.47 132.04 367.16 135.84 Q 368.52 143.44 369.19 151.15 Q 369.52 155.00 369.60 158.87 Q 369.76 166.60 368.98 174.29 Q 368.60 178.13 367.98 181.94 Q 366.74 189.57 364.65 197.01 Q 363.61 200.73 362.35 204.39 Q 359.84 211.71 356.57 218.75 Q 354.94 222.26 353.12 225.69 Q 349.48 232.54 345.18 239.03 Q 343.03 242.28 340.73 245.43 Q 336.12 251.74 331.00 257.64 Q 328.43 260.60 325.74 263.45 Q 320.33 269.17 314.49 274.44 Q 311.56 277.09 308.51 279.61 Q 302.39 284.67 295.85 289.19 Q 292.56 291.47 289.17 293.60 Q 282.38 297.88 275.27 301.58 Q 271.69 303.45 268.04 305.17 Q 260.72 308.62 253.15 311.48 Q 249.35 312.92 245.50 314.22 Q 237.78 316.82 229.89 318.80 Q 225.94 319.79 221.95 320.61 Q 213.97 322.25 205.87 323.22 Q 201.82 323.71 197.75 324.01 Q 189.60 324.62 181.42 324.51 Q 177.34 324.45 173.26 324.20 Q 165.10 323.69 157.01 322.52 Q 152.96 321.94 148.94 321.17 Q 140.90 319.63 133.01 317.40 Q 129.07 316.28 125.17 314.98 Q 117.39 312.37 109.84 309.11 Q 106.07 307.47 102.37 305.67 Q 94.99 302.04 87.90 297.87 Q 84.36 295.77 80.91 293.54 Q 73.99 289.05 67.43 284.06 Q 64.15 281.56 60.98 278.94 Q 54.62 273.67 48.63 268.02 Q 45.63 265.18 42.75 262.25 Q 37.00 256.37 31.68 250.14 Q 29.02 246.99 26.49 243.77 Q 21.43 237.29 16.84 230.50 Q 14.56 226.99 12.42 223.41 Q 8.14 216.22 4.43 208.74 Q 2.59 205.02 0.90 201.22 Q -2.48 193.60 -4.90 185.73 Q -6.10 181.81 -7.09 177.84 Q -9.03 169.88 -10.13 161.75 Q -10.68 157.70 -10.99 153.62 Q -11.58 145.46 -11.26 137.28 Q -11.10 133.20 -10.73 129.13 Q -9.99 121.00 -8.52 112.96 Q -7.79 108.94 -6.86 104.96 Q -5.01 97.00 -2.43 89.21 Q -1.15 85.32 0.32 81.50 Q 3.18 73.86 6.80 66.50 Q 8.62 62.83 10.63 59.25 Q 14.67 51.99 19.37 45.08 Q 21.74 41.59 24.29 38.22 Q 29.44 31.42 35.16 25.08 Q 37.98 21.94 40.96 18.96 Q 47.01 12.91 53.56 7.36 Q 56.87 4.56 60.31 1.92 Q 67.24 -3.38 74.66 -8.11 L 76.41 -9.21 L 77.62 -7.54 Q 79.64 -4.68 81.82 -1.95 Q 86.19 3.52 91.01 8.56 Q 93.43 11.09 96.00 13.49 Q 101.17 18.32 106.72 22.70 Q 109.53 24.91 112.45 26.99 Q 118.32 31.19 124.55 34.88 Q 127.70 36.73 130.95 38.43 Q 137.48 41.87 144.32 44.77 L 146.62 45.77 L 145.74 43.42 Q 144.46 39.83 143.03 36.30 Q 140.16 29.25 136.89 22.38 Q 135.25 18.95 133.51 15.57 Q 130.02 8.80 126.18 2.24 L 124.89 0.00 L 127.36 -0.38 Q 131.39 -0.96 135.45 -1.18 Q 143.58 -1.62 151.73 -0.72 Q 155.80 -0.27 159.85 0.44 Q 167.95 1.86 175.91 4.10 Q 179.90 5.22 183.82 6.58 Q 191.67 9.31 199.26 12.81 Q 203.05 14.56 206.75 16.50 Q 214.15 20.39 221.22 24.87 Q 224.76 27.12 228.20 29.53 Q 235.08 34.38 241.58 39.72 Q 244.84 42.40 247.99 45.21 Q 254.29 50.86 260.20 56.99 Q 263.15 60.05 265.99 63.23 Q 271.67 69.61 276.91 76.38 Q 279.54 79.77 282.04 83.26 Q 287.05 90.26 291.53 97.61 Q 293.77 101.28 295.88 105.03 Q 300.11 112.54 303.75 120.36 Q 305.57 124.27 307.24 128.25 Q 310.58 136.22 313.29 144.44 Q 314.64 148.53 315.81 152.68 Q 318.13 161.00 319.69 169.50 Q 320.47 173.74 321.05 178.01 Q 322.19 186.58 322.58 195.22 Q 322.77 199.54 322.70 203.86 Q 322.54 212.50 321.59 221.09 Q 321.12 225.38 320.41 229.64 Q 318.99 238.18 316.74 246.55 Q 315.62 250.73 314.29 254.86 Q 311.63 263.13 308.18 271.10 Q 306.46 275.09 304.52 279.00 Q 300.63 286.82 295.99 294.23 Q 293.66 297.95 291.15 301.56 Q 286.11 308.80 280.45 315.58 Q 277.60 318.99 274.61 322.28 Q 268.61 328.90 262.09 335.00 Q 258.81 338.07 255.40 341.02 Q 248.57 346.93 241.30 352.29 Q 237.64 355.00 233.87 357.57 Q 226.31 362.72 218.40 367.27 Q 214.42 369.57 210.35 371.71 Q 202.19 376.02 193.71 379.70 Q 189.45 381.54 185.12 383.20 Q 176.44 386.54 167.52 389.17 Q 163.06 390.49 158.54 391.60 Q 149.49 393.82 140.29 395.24 Q 135.70 395.95 131.09 396.43 Q 121.86 397.40 112.58 397.57 Q 107.94 397.66 103.30 397.54 Q 93.99 397.29 84.73 396.29 Q 80.09 395.79 75.47 395.07 Q 66.22 393.63 57.09 391.48 Q 52.51 390.41 48.00 389.09 Q 38.96 386.45 30.14 383.17 Q 25.72 381.53 21.37 379.68 Q 12.67 375.97 4.30 371.61 L 2.47 370.65 L 3.31 368.76 Q 5.51 364.32 8.06 360.05 Q 13.18 351.50 19.18 343.56 Q 22.19 339.58 25.41 335.76 Q 31.88 328.08 38.96 320.99 Q 42.52 317.42 46.24 314.02 Q 53.72 307.17 61.73 300.95 Q 65.77 297.80 69.95 294.84 Q 78.35 288.86 87.21 283.59 Q 91.68 280.93 96.28 278.49 Q 105.52 273.58 115.20 269.47 Q 120.09 267.39 125.07 265.56 Q 135.07 261.88 145.41 259.16 Q 150.59 257.80 155.83 256.72 Q 166.34 254.56 177.00 253.52 Q 182.34 253.00 187.69 252.76 Q 198.41 252.27 209.13 252.99 Q 214.49 253.34 219.83 253.99 Q 230.51 255.29 240.99 257.75 Q 246.23 259.00 251.41 260.54 Q 261.77 263.64 271.80 267.83 Q 276.81 269.93 281.73 272.26 Q 291.57 276.95 300.95 282.62 Q 305.63 285.47 310.18 288.53 Q 319.28 294.68 327.78 301.62 Q 331.99 304.97 336.09 308.52 Q 344.29 315.64 351.80 323.47 Q 355.53 327.37 359.11 331.41 Q 366.27 339.52 372.62 348.20 Q 375.78 352.53 378.75 356.99 Q 384.69 365.93 389.82 375.37 Q 392.36 379.98 394.70 384.72 Q 399.40 394.23 403.19 404.14 Q 405.07 409.06 406.71 414.08 Q 409.98 424.16 412.20 434.52 Q 413.29 439.66 414.13 444.86 Q 415.79 455.30 416.42 465.87 L 416.62 469.28 L 413.22 469.03 Q 408.64 468.72 404.07 468.15 Q 394.93 467.00 385.87 465.05 Q 381.33 464.08 376.83 462.89 Q 367.82 460.53 358.99 457.46 Q 354.56 455.93 350.20 454.17 Q 341.48 450.65 333.04 446.46 Q 328.81 444.36 324.68 442.08 Q 316.41 437.50 308.48 432.34 Q 304.50 429.75 300.64 427.00 Q 292.90 421.47 285.59 415.40 Q 281.92 412.35 278.39 409.16 Q 271.32 402.76 264.72 395.87 Q 261.41 392.42 258.27 388.85 Q 252.00 381.69 246.28 374.11 Q 243.43 370.33 240.76 366.43 Q 235.43 358.62 230.71 350.45 Q 228.37 346.38 226.20 342.21 Q 221.88 333.88 218.21 325.25 Q 216.39 321.00 214.76 316.68 Q 211.49 308.02 208.94 299.16 Q 207.68 294.74 206.62 290.27 Q 204.50 281.31 203.18 272.22 Q 202.53 267.68 202.09 263.12 Q 201.21 254.00 201.08 244.83 Q 201.02 240.25 201.17 235.68 Q 201.47 226.53 202.53 217.43 Q 203.06 212.88 203.81 208.36 Q 205.30 199.31 207.59 190.39 Q 208.74 185.93 210.10 181.52 Q 212.83 172.70 216.39 164.14 Q 218.17 159.85 220.18 155.65 Q 224.22 147.24 228.97 139.14 Q 231.35 135.08 233.95 131.13 Q 239.17 123.22 245.02 115.71 Q 247.96 111.93 251.08 108.27 Q 257.34 100.92 264.18 94.08 Q 267.62 90.64 271.22 87.37 Q 278.44 80.80 286.16 74.82 Q 289.99 71.85 293.97 69.06 Q 301.96 63.44 310.40 58.50 Q 314.64 55.99 319.00 53.69 Q 327.75 49.05 336.86 45.13 Q 341.44 43.15 346.11 41.38 Q 355.48 37.82 365.13 35.06 Q 369.97 33.66 374.87 32.49 Q 384.72 30.13 394.74 28.67 Q 399.76 27.94 404.81 27.43 Q 414.91 26.41 425.07 26.33 Q 430.15 26.29 435.23 26.47 Q 445.39 26.84 455.50 28.16 Q 460.55 28.82 465.58 29.72 Q 475.63 31.51 485.54 34.15 Q 490.50 35.47 495.42 36.99 Q 505.25 40.04 514.86 43.87 Q 519.66 45.79 524.40 47.90 Q 533.87 52.13 543.05 57.09 Q 547.63 59.58 552.13 62.24 Q 561.11 67.59 569.73 73.58 Q 574.03 76.58 578.24 79.73 Q 586.63 86.05 594.63 92.95 Q 598.62 96.41 602.52 100.00 Q 610.29 107.20 617.60 114.89 Q 621.25 118.73 624.79 122.68 Q 631.84 130.61 638.42 138.95 Q 641.69 143.10 644.86 147.34 Q 651.19 155.82 656.99 164.70 Q 659.89 169.13 662.66 173.65 Q 668.19 182.70 673.14 192.11 Q 675.61 196.81 677.93 201.59 Q 682.59 211.15 686.57 221.02 Q 688.56 225.95 690.40 230.94 Q 694.07 240.92 697.02 251.15 Q 698.49 256.26 699.76 261.43 Q 702.30 271.77 704.09 282.29 Q 704.98 287.54 705.67 292.83 Q 707.04 303.42 707.62 314.11 Q 707.91 319.46 707.96 324.81 Q 708.05 335.51 707.34 346.18 Q 706.98 351.51 706.41 356.83 Q 705.27 367.47 703.33 378.01 Q 702.31 383.28 701.08 388.51 Q 698.62 398.97 695.38 409.25 Q 693.76 414.38 691.96 419.47 Q 688.36 429.65 684.03 439.56 Q 681.87 444.51 679.54 449.40 Q 674.89 459.17 669.55 468.61 Q 666.89 473.31 664.06 477.93 Q 658.41 487.16 652.11 496.02 Q 649.75 499.64 647.30 503.20 Q 642.40 510.31 637.14 517.14 Q 634.51 520.55 631.80 523.90 Q 626.38 530.59 620.64 537.01 Q 617.77 540.22 614.82 543.36 Q 608.92 549.63 602.69 555.61 Q 599.58 558.60 596.39 561.52 Q 590.01 567.36 583.32 572.90 Q 580.13 575.42 576.87 577.87 Q 570.34 582.78 563.52 587.37 Q 560.11 589.67 556.63 591.88 Q 549.67 596.32 542.46 600.42 Q 539.00 602.32 535.49 604.13 Q 528.46 607.76 521.21 611.04 Q 517.58 612.69 513.91 614.25 Q 506.57 617.38 499.06 620.12 Q 495.29 621.50 491.49 622.78 Q 483.88 625.35 476.13 627.51 Q 472.26 628.60 468.35 629.58 Q 460.51 631.54 452.57 633.09 Q 448.60 633.87 444.60 634.54 Q 436.60 635.88 428.54 636.80 Q 424.51 637.26 420.48 637.62 Q 412.41 638.33 404.31 638.62 Q 400.26 638.77 396.20 638.82 Q 388.09 638.91 379.98 638.59 Q 375.92 638.43 371.87 638.16 Q 363.76 637.62 355.69 636.69 Q 351.66 636.22 347.65 635.64 Q 339.63 634.48 331.68 632.91 Q 327.71 632.12 323.77 631.22 Q 315.89 629.41 308.14 627.20 Q 304.27 626.09 300.44 624.88 Q 292.78 622.45 285.24 619.63 Q 281.48 618.21 277.76 616.71 Q 270.32 613.69 263.03 610.31 Q 259.40 608.61 255.81 606.83 Q 248.63 603.25 241.63 599.34 Q 238.14 597.39 234.71 595.35 Q 227.85 591.25 221.17 586.85 Q 217.84 584.64 214.58 582.34 Q 207.99 577.61 201.67 572.56 Q 198.51 570.03 195.42 567.41 Q 189.24 562.16 183.33 556.63 Q 180.37 554.06 177.49 551.40 Q 171.74 546.07 166.26 540.46 Q 163.52 537.66 160.85 534.78 Q 155.50 528.99 150.44 523.00 Q 147.91 520.00 145.47 516.93 Q 140.60 510.77 136.01 504.41 Q 133.72 501.23 131.52 497.99 Q 127.13 491.51 123.03 484.85 Q 120.99 481.53 119.03 478.15 Q 115.12 471.39 111.51 464.47 Q 109.72 460.96 108.02 457.42 Q 104.62 450.32 101.52 443.08 Q 99.98 439.47 98.53 435.81 Q 95.64 428.48 93.08 421.04 Q 91.80 417.33 90.61 413.59 Q 88.23 405.99 86.20 398.31 Q 85.20 394.47 84.29 390.60 Q 82.48 382.86 81.04 375.05 Q 80.32 371.15 79.70 367.22 Q 78.46 359.37 77.59 351.47 Q 77.16 347.53 76.83 343.57 Q 76.17 335.64 75.88 327.68 Q 75.74 323.71 75.70 319.73 Q 75.62 311.77 75.93 303.82 Q 176.07 307.65 L 177.73 302.70 Q 179.02 298.81 180.50 294.97 Q 183.48 287.30 187.08 279.87 Q 188.88 276.15 190.83 272.51 Q 194.75 265.21 199.18 258.18 Q 201.41 254.65 203.78 251.20 Q 208.55 244.28 213.82 237.70 Q 216.47 234.40 219.25 231.18 Q 224.86 224.71 230.91 218.63 Q 233.96 215.57 237.13 212.63 Q 243.52 206.69 250.33 201.19 Q 253.76 198.42 257.30 195.78 Q 264.43 190.45 271.93 185.58 Q 275.71 183.12 279.59 180.80 Q 287.39 176.13 295.53 172.02 Q 299.63 169.95 303.82 168.04 Q 312.23 164.19 320.93 161.01 Q 325.30 159.41 329.74 157.99 Q 338.64 155.14 347.74 153.00 Q 352.31 151.93 356.92 151.05 Q 366.17 149.29 375.53 148.35 Q 380.23 147.88 384.94 147.62 Q 394.37 147.09 403.83 147.38 Q 408.55 147.52 413.27 147.88 Q 422.71 148.61 432.09 150.14 Q 436.78 150.90 441.43 151.88 Q 450.74 153.85 459.87 156.63 Q 464.45 158.02 468.97 159.62 Q 478.02 162.83 486.81 166.87 Q 491.22 168.90 495.56 171.12 Q 504.24 175.57 512.62 180.70 Q 516.80 183.27 520.90 186.02 Q 529.09 191.55 536.94 197.64 Q 540.86 200.69 544.69 203.88 Q 552.33 210.28 559.60 217.14 Q 563.24 220.58 566.78 224.13 Q 573.86 231.25 580.55 238.78 Q 583.89 242.54 587.13 246.40 Q 593.62 254.13 599.68 262.22 Q 602.71 266.27 605.63 270.41 Q 611.47 278.69 616.88 287.30 Q 619.59 291.60 622.17 295.99 Q 627.34 304.77 632.06 313.85 Q 634.42 318.39 636.65 322.99 Q 641.13 332.19 645.11 341.66 Q 647.11 346.39 648.97 351.18 Q 652.71 360.75 655.87 370.53 Q 657.46 375.41 658.91 380.34 Q 661.81 390.21 664.07 400.26 Q 665.20 405.28 666.17 410.34 Q 668.11 420.47 669.38 430.71 Q 670.01 435.83 670.48 440.97 Q 671.42 451.25 671.70 461.58 L 671.80 465.09 L 668.29 464.97 Q 663.64 464.82 658.99 464.46 Q 649.69 463.75 640.44 462.33 Q 635.81 461.63 631.20 460.71 Q 621.98 458.88 612.90 456.33 Q 608.35 454.86 603.86 453.20 Q 594.88 449.86 586.10 445.89 Q 581.71 443.90 577.40 441.75 Q 568.78 437.43 560.44 432.56 Q 556.27 430.12 552.19 427.54 Q 544.02 422.36 536.14 416.70 Q 532.19 413.87 528.34 410.91 Q 520.63 405.00 513.25 398.63 Q 509.55 395.45 506.00 392.15 Q 498.89 385.53 492.16 378.52 Q 488.78 375.00 485.54 371.37 Q 479.06 364.10 473.00 356.49 Q 469.96 352.69 467.07 348.79 Q 461.29 340.98 456.00 332.85 Q 453.36 328.79 450.86 324.64 Q 445.86 316.33 441.36 307.78 Q 439.12 303.51 437.02 299.17 Q 432.83 290.49 429.14 281.61 Q 427.31 277.18 425.62 272.69 Q 422.24 263.71 419.41 254.56 Q 418.01 249.99 416.73 245.38 Q 414.18 236.16 412.21 226.83 Q 411.24 222.17 410.39 217.48 Q 408.69 208.10 407.59 198.63 Q 407.05 193.90 406.64 189.15 Q 405.83 179.66 405.63 170.13 Q 405.53 165.37 405.56 160.60 Q 405.63 151.07 406.31 141.56 Q 406.65 136.80 407.13 132.06 Q 408.09 122.57 409.64 113.14 Q 410.42 108.43 411.33 103.74 Q 413.16 94.36 415.59 85.10 Q 416.81 80.47 418.17 75.88 Q 220.91 29.71 L 219.11 34.50 Q 217.68 38.26 216.09 41.97 Q 212.90 49.38 209.23 56.60 Q 207.38 60.22 205.43 63.78 Q 201.51 70.90 197.16 77.79 Q 194.97 81.25 192.67 84.65 Q 188.05 91.47 183.01 97.98 Q 180.48 101.24 177.85 104.44 Q 172.56 110.87 166.88 116.95 Q 164.01 120.01 161.03 122.99 Q 155.03 128.99 148.64 134.59 Q 145.42 137.41 142.09 140.14 Q 135.39 145.64 128.36 150.68 Q 124.82 153.22 121.18 155.64 Q 113.86 160.52 106.25 164.88 Q 102.42 167.08 98.50 169.14 Q 90.63 173.29 82.50 176.85 Q 78.42 178.64 74.27 180.28 Q 65.95 183.59 57.43 186.28 Q 53.16 187.63 48.84 188.82 Q 40.18 191.21 31.38 192.86 Q 26.98 193.69 22.54 194.31 Q 13.66 195.56 4.69 196.07 Q 0.21 196.33 -4.28 196.37 L -8.77 196.41 L -8.79 196.41 L -8.21 192.89 Q -7.81 190.48 -7.30 188.08 Q -6.28 183.29 -4.98 178.58 Q -3.33 172.39 -1.23 166.34 Q 1.98 158.20 6.02 150.49 Q 8.05 146.62 10.30 142.86 Q 14.82 135.30 19.93 128.16 Q 22.50 124.58 25.25 121.13 Q 30.78 114.20 36.85 107.73 Q 39.90 104.48 43.09 101.36 Q 49.53 95.08 56.45 89.31 Q 59.93 86.41 63.53 83.65 Q 70.78 78.08 78.44 73.04 Q 82.29 70.50 86.25 68.12 Q 94.21 63.33 102.54 59.13 Q 106.73 56.99 111.01 55.05 Q 119.60 51.13 128.48 47.87 Q 133.00 46.22 137.61 44.78 Q 146.86 41.89 156.35 39.77 Q 161.11 38.71 165.92 37.86 Q 175.55 36.16 185.31 35.26 Q 190.20 34.81 195.10 34.58 Q 204.91 34.13 214.74 34.49 Q 219.66 34.66 224.57 35.05 Q 234.40 35.82 244.15 37.52 Q 249.02 38.37 253.86 39.43 Q 263.54 41.57 273.03 44.60 Q 277.78 46.12 282.48 47.85 Q 291.88 51.32 301.03 55.58 Q 305.60 57.72 310.11 60.04 Q 319.12 64.71 327.81 70.05 Q 332.15 72.73 336.40 75.58 Q 344.88 81.31 352.97 87.61 Q 357.01 90.77 360.95 94.08 Q 368.81 100.74 376.25 107.88 Q 379.96 111.46 383.58 115.14 Q 390.81 122.53 397.59 130.34 Q 401.00 134.26 404.31 138.28 Q 410.93 146.34 417.06 154.80 Q 420.13 158.99 423.09 163.28 Q 429.01 171.88 434.43 180.82 Q 437.15 185.30 439.74 189.86 Q 444.93 198.99 449.60 208.42 Q 451.94 213.13 454.15 217.91 Q 458.59 227.49 462.47 237.30 Q 464.42 242.20 466.23 247.15 Q 469.87 257.07 472.90 267.18 Q 474.42 272.24 475.78 277.35 Q 478.50 287.58 480.58 297.97 Q 481.62 303.15 482.51 308.38 Q 484.28 318.84 485.39 329.42 Q 485.95 334.70 486.35 340.00 Q 487.15 350.60 487.29 361.23 Q 487.36 366.55 487.28 371.87 Q 487.12 382.49 486.30 393.09 Q 485.89 398.38 485.32 403.67 Q 484.18 414.24 482.38 424.73 Q 481.48 429.97 480.42 435.18 Q 478.30 445.59 475.48 455.86 Q 474.08 461.00 472.51 466.09 Q 469.37 476.28 465.53 486.28 Q 463.62 491.27 461.55 496.21 Q 457.41 506.09 452.58 515.71 Q 450.17 520.52 447.60 525.25 Q 442.46 534.72 436.66 543.88 Q 433.77 548.46 430.74 552.97 Q 424.67 561.98 418.05 570.64 Q 414.75 574.97 411.32 579.21 Q 404.45 587.70 397.13 595.82 Q 393.48 599.88 389.71 603.85 Q 382.17 611.78 374.23 619.31 Q 370.26 623.08 366.18 626.75 Q 358.03 634.09 349.50 640.99 Q 345.24 644.44 340.87 647.78 Q 332.14 654.47 323.06 660.67 Q 318.52 663.77 313.90 666.76 Q 304.65 672.75 295.09 678.21 Q 290.31 680.95 285.46 683.57 Q 275.75 688.82 265.79 693.54 Q 260.81 695.90 255.77 698.14 Q 245.68 702.64 235.41 706.60 Q 230.27 708.59 225.08 710.45 Q 214.69 714.18 204.15 717.36 Q 198.86 719.00 193.54 720.51 Q 182.88 723.54 172.11 725.99 Q 166.71 727.22 161.29 728.31 Q 150.44 730.50 139.49 732.09 Q 134.01 732.89 128.51 733.54 Q 117.51 734.85 106.46 735.55 Q 100.93 735.90 95.39 736.10 Q 84.31 736.50 73.21 736.28 L 67.66 736.17 L 67.64 732.62 Q 67.61 730.21 67.63 727.80 Q 67.67 722.98 67.85 718.17 Q 68.21 708.55 69.09 698.99 Q 69.88 690.46 71.31 682.03 Q 72.04 677.82 72.95 673.64 Q 74.77 665.29 77.20 657.09 Q 78.42 652.99 79.80 648.95 Q 82.59 640.86 86.00 632.97 Q 87.71 629.03 89.58 625.16 Q 93.34 617.41 97.68 609.94 Q 99.86 606.21 102.18 602.55 Q 106.84 595.22 111.98 588.18 Q 114.57 584.66 117.29 581.23 Q 122.76 574.36 128.66 567.81 Q 131.62 564.53 134.71 561.35 Q 140.92 554.97 147.51 548.94 Q 150.82 545.91 154.25 542.99 Q 161.15 537.12 168.40 531.61 Q 171.79 529.01 175.27 526.52 Q 182.26 521.51 189.55 516.87 Q 193.21 514.54 196.95 512.31 Q 204.47 507.82 212.26 503.73 Q 216.17 501.68 220.15 499.72 Q 228.14 495.80 236.36 492.31 Q 240.49 490.55 244.67 488.90 Q 216.07 28.43 Z"
                    fill="rgba(255, 255, 255, 0.15)"
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                  />
                  
                  {/* Glowing outline */}
                  <motion.path
                    d="M 213.22 21.84 Q 214.98 21.95 216.73 22.10 Q 228.98 23.46 237.94 32.40 Q 243.78 38.27 246.82 46.30 Q 248.89 51.68 249.84 57.47 Q 250.30 60.38 250.52 63.34 Q 250.89 68.73 250.61 74.13 Q 250.19 82.26 248.09 90.05 Q 246.87 94.64 245.15 99.04 Q 242.09 106.86 237.71 113.93 Q 235.22 117.87 232.37 121.57 Q 226.59 128.99 219.65 135.14 Q 207.40 145.90 193.26 153.65 Q 187.47 156.86 181.41 159.51 Q 172.50 163.36 163.11 165.89 Q 157.78 167.36 152.33 168.27 Q 145.19 169.47 137.95 169.75 Q 133.61 169.92 129.27 169.69 Q 122.04 169.32 114.95 167.73 Q 110.73 166.81 106.61 165.47 Q 99.71 163.32 93.14 160.22 Q 83.99 156.07 75.60 150.53 Q 70.72 147.37 66.11 143.85 Q 58.25 138.07 51.26 131.28 Q 46.22 126.38 41.65 120.99 Q 35.09 113.40 29.66 105.07 Q 26.46 100.15 23.66 94.97 Q 19.31 87.00 16.09 78.50 Q 14.19 73.57 12.71 68.50 Q 10.52 61.17 9.28 53.60 Q 8.61 49.49 8.30 45.33 Q 7.89 39.70 8.07 34.06 Q 8.18 30.58 8.58 27.13 Q 9.21 21.86 10.52 16.74 Q 11.41 13.24 12.64 9.85 Q 14.69 4.41 17.62 -0.51 L 19.43 0.38"
                    fill="none"
                    stroke="rgba(147, 197, 253, 0.6)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    style={{ filter: "blur(3px)" }}
                  />
                </svg>
              </div>

              {/* Center Count Badge */}
              <motion.div
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                <p className="text-white font-black text-lg">4 Centers</p>
                <p className="text-blue-200 text-xs">Across India</p>
              </motion.div>

              {/* City Pins */}
              {cityPins.map((pin, i) => (
                <motion.div
                  key={pin.city}
                  className="absolute z-10"
                  style={{ left: pin.x, top: pin.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: 0.8 + i * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <motion.div
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.3, zIndex: 20 }}
                  >
                    {/* Ping effect */}
                    <motion.div
                      className={`absolute -inset-3 rounded-full ${pin.color} opacity-30`}
                      animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                    
                    {/* Outer ring */}
                    <motion.div
                      className={`absolute -inset-1.5 rounded-full ${pin.color} opacity-40`}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4 + 0.5,
                      }}
                    />
                    
                    {/* Pin marker */}
                    <div
                      className={`w-6 h-6 rounded-full ${pin.color} ring-4 ring-white/50 shadow-2xl flex items-center justify-center relative`}
                      style={{ 
                        boxShadow: "0 4px 20px rgba(0,0,0,0.3), 0 0 40px currentColor" 
                      }}
                    >
                      <MapPin className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                    
                    {/* Label */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <motion.span 
                        className="text-xs font-bold text-white bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-lg"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
                      >
                        {pin.city}
                      </motion.span>
                    </div>
                    
                    {/* Connecting line to map */}
                    <motion.div
                      className="absolute top-3 left-3 w-0.5 h-4 bg-gradient-to-b from-white/60 to-transparent"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: 1 + i * 0.15 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            variants={fadeInRight}
            className="lg:w-1/2 text-white space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <Locate className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-bold text-blue-200">
                Our Presence Across India
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-black leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                6 World-Class
              </span>{" "}
              Centers, One Mission
            </h3>

            <p className="text-blue-100 leading-relaxed">
              From the coaching hub of Old Rajinder Nagar in Delhi to the tech
              city of Bangalore, our centers are strategically located to serve
              aspirants across India. Each center maintains the same high
              standards of teaching, infrastructure, and support.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Building2, text: "4 Pan-India Centers" },
                { icon: Users, text: "35,000+ Students" },
                { icon: GraduationCap, text: "88+ Expert Faculty" },
                { icon: Trophy, text: "405+ UPSC Selections" },
                { icon: Monitor, text: "Smart Classrooms" },
                { icon: Shield, text: "Same Quality Everywhere" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  <item.icon className="w-4 h-4 text-blue-300 flex-shrink-0" />
                  <span className="text-xs font-semibold text-blue-100">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="w-5 h-5" />
              Find Nearest Center
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Star Rating
   ═══════════════════════════════════════════════════════════════════ */

const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
    <span className="text-sm font-bold text-gray-700">{rating}</span>
    <span className="text-xs text-gray-400">({reviews.toLocaleString()})</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Center Card (Detailed)
   ═══════════════════════════════════════════════════════════════════ */

const CenterCard = ({ center, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const AmenityIcon = (amenityName) =>
    AMENITY_ICON_MAP[amenityName] || CheckCircle;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative h-full rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-blue-200/60 group-hover:-translate-y-2">
        <motion.div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-sm" />

        {/* Image Header */}
        <div className="relative h-52 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${center.image})` }}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${center.gradient} opacity-70`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge */}
          <motion.div
            className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${center.badgeColor} text-white text-xs font-bold shadow-lg`}
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.12 + 0.3, type: "spring" }}
          >
            {center.flagship ? (
              <Crown className="w-3 h-3" />
            ) : (
              <Flame className="w-3 h-3" />
            )}
            {center.badge}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col gap-2"
            initial={{ x: 50, opacity: 0 }}
            animate={isHovered ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-lg"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-lg"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium">
                <Calendar className="w-3 h-3" />
                Est. {center.established}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium">
                <Users className="w-3 h-3" />
                {center.students}
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative p-6 space-y-4">
          {/* City & State */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-600">
                {center.city}, {center.state}
              </span>
            </div>
            <StarRating rating={center.rating} reviews={center.reviews} />
          </div>

          {/* Name */}
          <h3 className="text-lg font-black text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
            {center.name}
          </h3>

          {/* Address */}
          <p className="text-sm text-gray-500 leading-relaxed">
            {center.address}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Faculty", value: center.faculty, icon: GraduationCap },
              { label: "Selections", value: center.selections, icon: Trophy },
              {
                label: "Courses",
                value: center.courses.length,
                icon: BookOpen,
              },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="text-center p-2 rounded-xl bg-blue-50 border border-blue-100/50"
                whileHover={{ scale: 1.05 }}
              >
                <s.icon className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-black text-gray-800">{s.value}</p>
                <p className="text-[10px] text-gray-400 uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Timing */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-gray-500">{center.timing}</span>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">
                {center.phone[0]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{center.email}</span>
            </div>
          </div>

          {/* Available Courses */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Available Courses
            </p>
            <div className="flex flex-wrap gap-1.5">
              {center.courses.map((course) => (
                <motion.span
                  key={course}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100"
                  whileHover={{ scale: 1.1 }}
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Expandable Details */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            whileHover={{ x: 3 }}
          >
            <Eye className="w-3.5 h-3.5" />
            {isExpanded ? "Show Less" : "View More Details"}
            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-2">
                  {/* Amenities */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Amenities
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {center.amenities.map((amenity) => {
                        const Icon = AmenityIcon(amenity);
                        return (
                          <motion.div
                            key={amenity}
                            className="flex items-center gap-2 text-xs text-gray-600"
                            whileHover={{ x: 3 }}
                          >
                            <Icon className="w-3.5 h-3.5 text-blue-500" />
                            <span>{amenity}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Transport */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      How to Reach
                    </p>
                    <div className="space-y-1.5">
                      {center.transport.map((t) => (
                        <div
                          key={t}
                          className="flex items-center gap-2 text-xs text-gray-500"
                        >
                          <Train className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Center Highlights
                    </p>
                    <div className="space-y-1.5">
                      {center.highlights.map((h) => (
                        <motion.div
                          key={h}
                          className="flex items-start gap-2 text-xs text-gray-600"
                          whileHover={{ x: 3 }}
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTAs */}
          <div className="flex items-center gap-3 pt-2">
            <motion.button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className="w-4 h-4" />
              Get Directions
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              className="w-12 h-12 rounded-xl border-2 border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Call center"
            >
              <Phone className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENT: Center Facilities Showcase
   ═══════════════════════════════════════════════════════════════════ */

const FacilitiesShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const facilities = [
    {
      icon: Tv2,
      title: "Smart Classrooms",
      description:
        "Interactive smart boards, HD projectors, and digital teaching aids for immersive learning experience.",
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
    },
    {
      icon: Library,
      title: "Extensive Library",
      description:
        "50,000+ books, journals, magazines, and previous year papers. Open 12+ hours daily.",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description:
        "Seamless internet connectivity across all centers for online resources and recorded lectures.",
      color: "from-purple-500 to-pink-600",
      bg: "bg-purple-50",
    },
    {
      icon: MessageCircle,
      title: "Discussion Rooms",
      description:
        "Dedicated group discussion rooms for peer learning, debates, and mock interview practice.",
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
    },
    {
      icon: Coffee,
      title: "Cafeteria",
      description:
        "Hygienic, subsidized cafeteria serving nutritious meals and refreshments for students.",
      color: "from-rose-500 to-red-600",
      bg: "bg-rose-50",
    },
    {
      icon: Wind,
      title: "Air Conditioned",
      description:
        "Fully air-conditioned classrooms and study halls for comfortable year-round learning.",
      color: "from-cyan-500 to-blue-600",
      bg: "bg-cyan-50",
    },
    {
      icon: Monitor,
      title: "Computer Lab",
      description:
        "Online test practice, digital assessments, and research facilities available for all students.",
      color: "from-indigo-500 to-violet-600",
      bg: "bg-indigo-50",
    },
    {
      icon: Accessibility,
      title: "Accessible",
      description:
        "Wheelchair ramps, lifts, and special assistance available at all our centers.",
      color: "from-teal-500 to-green-600",
      bg: "bg-teal-50",
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
      <motion.div variants={staggerItem} className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Zap className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-bold text-indigo-700 uppercase tracking-wider">
            World-Class Infrastructure
          </span>
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
          Facilities at Our <span className="text-blue-600">Centers</span>
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Every center is equipped with state-of-the-art facilities to ensure
          the best learning environment.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {facilities.map((fac, index) => (
          <motion.div
            key={fac.title}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group"
          >
            <div
              className={`relative h-full p-6 rounded-2xl ${fac.bg} border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl`}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${fac.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${fac.color} flex items-center justify-center mb-4 shadow-md`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                >
                  <fac.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="text-sm font-black text-gray-900 mb-1.5 group-hover:text-blue-700 transition-colors">
                  {fac.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {fac.description}
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
   SUB-COMPONENT: Visit CTA
   ═══════════════════════════════════════════════════════════════════ */

const VisitCTA = () => {
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

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          {/* Left */}
          <div className="flex-1 text-white space-y-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h3 className="text-3xl lg:text-4xl font-black">
              Visit Our Nearest Center
            </h3>
            <p className="text-blue-100 text-base max-w-xl leading-relaxed">
              Nothing beats experiencing our learning environment firsthand.
              Schedule a free campus visit, attend a demo class, and interact
              with our faculty & students.
            </p>

            <div className="space-y-3">
              {[
                "Free campus tour with personal guidance",
                "Attend a live demo class in any subject",
                "Meet faculty & interact with current students",
                "Get personalized study plan consultation",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-blue-100">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Form / CTA */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 space-y-4">
              <h4 className="text-lg font-black text-white text-center">
                Schedule a Free Visit
              </h4>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
                <select
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white/60 text-sm focus:outline-none focus:border-white/40 transition-colors appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Preferred Center
                  </option>
                  {CENTERS_DATA.map((c) => (
                    <option key={c.id} value={c.id} className="text-gray-900">
                      {c.shortName}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white/60 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <motion.button
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-xl"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Calendar className="w-4 h-4" />
                Book Free Visit
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <p className="text-center text-[10px] text-blue-300/50">
                We'll confirm your visit within 24 hours. No obligation, no
                fees.
              </p>
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

const CentersTicker = () => {
  const items = [
    "📍 Delhi — Old Rajinder Nagar (Flagship)",
    "📍 Chennai — Anna Salai",
    "📍 Bangalore — MG Road",
    "📍 Hyderabad — Ameerpet",
    "🏗️ New Centers Coming Soon!",
    "🆓 Free Campus Visit Available",
  ];

  return (
    <div className="mb-14 overflow-hidden py-3 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-2xl border border-blue-100/50 shadow-sm">
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: [0, -2200] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const FindOfflineCenters = () => {
  const [activeRegion, setActiveRegion] = useState("all");

  const filteredCenters =
    activeRegion === "all"
      ? CENTERS_DATA
      : CENTERS_DATA.filter((c) => c.region === activeRegion);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/20 to-gray-50 overflow-hidden">
      <CenterParallax />
      <CenterParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <CenterSectionHeader />
        <CenterStatsBar />
        <CentersTicker />
        <IndiaMapSection />

        <RegionFilter
          activeRegion={activeRegion}
          onRegionChange={setActiveRegion}
        />

        {/* Centers Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14"
          >
            {filteredCenters.map((center, index) => (
              <CenterCard key={center.id} center={center} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        <FacilitiesShowcase />
        <VisitCTA />
      </div>
    </section>
  );
};

export default FindOfflineCenters;
