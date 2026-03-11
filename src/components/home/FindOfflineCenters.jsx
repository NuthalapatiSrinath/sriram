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

  const cityPins = [
    { city: "Delhi", x: "48%", y: "28%", count: 1, color: "bg-blue-500" },
    { city: "Hyderabad", x: "48%", y: "62%", count: 1, color: "bg-rose-500" },
    { city: "Chennai", x: "52%", y: "75%", count: 1, color: "bg-purple-500" },
    { city: "Bangalore", x: "45%", y: "72%", count: 1, color: "bg-cyan-500" },
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
              {/* India outline placeholder */}
              <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20" />

              {/* Title on map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3"
                  >
                    <Map className="w-10 h-10 text-white" />
                  </motion.div>
                  <p className="text-white font-black text-xl">4 Centers</p>
                  <p className="text-blue-200 text-sm">Across India</p>
                </div>
              </div>

              {/* City Pins */}
              {cityPins.map((pin, i) => (
                <motion.div
                  key={pin.city}
                  className="absolute z-10"
                  style={{ left: pin.x, top: pin.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: 0.5 + i * 0.15,
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
                      className={`absolute -inset-2 rounded-full ${pin.color} opacity-30`}
                      animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                    {/* Dot */}
                    <div
                      className={`w-5 h-5 rounded-full ${pin.color} ring-2 ring-white/40 shadow-lg flex items-center justify-center`}
                    >
                      <span className="text-[8px] font-black text-white">
                        {pin.count}
                      </span>
                    </div>
                    {/* Label */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-white/80 bg-black/20 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                        {pin.city}
                      </span>
                    </div>
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
