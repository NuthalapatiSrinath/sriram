import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  ExternalLink,
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
  Sparkles,
  Zap,
  Target,
  Shield,
  Heart,
  MessageCircle,
  Send,
  Download,
  Layers,
  Home,
  Info,
  HelpCircle,
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
  CheckCircle,
  ArrowUpRight,
  Smartphone,
  Wifi,
  Building,
  Landmark,
  Scale,
  Map,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS — Footer data
   ═══════════════════════════════════════════════════════════════════ */

const QUICK_LINKS = [
  { label: "Home", to: "/", icon: Home },
  { label: "About Us", to: "/about", icon: Info },
  { label: "Our Faculty", to: "/faculty", icon: Users },
  { label: "Our Results", to: "/results", icon: Trophy },
  { label: "Testimonials", to: "/testimonials", icon: MessageCircle },
  { label: "Contact Us", to: "/contact", icon: Phone },
  { label: "Blog", to: "/blog", icon: PenTool },
  { label: "FAQ", to: "/faq", icon: HelpCircle },
];

const COURSE_LINKS = [
  { label: "UPSC CSE Complete", to: "/courses/upsc-cse", icon: GraduationCap },
  { label: "IAS Foundation", to: "/courses/ias-foundation", icon: BookOpen },
  {
    label: "Prelims Intensive",
    to: "/courses/prelims-intensive",
    icon: Target,
  },
  { label: "GS Paper I", to: "/courses/gs1", icon: BookMarked },
  { label: "GS Paper II", to: "/courses/gs2", icon: Scale },
  { label: "GS Paper III", to: "/courses/gs3", icon: BarChart3 },
  { label: "GS Paper IV — Ethics", to: "/courses/gs4", icon: Shield },
  { label: "Optional Subjects", to: "/courses/optional", icon: Layers },
  { label: "State PSC Courses", to: "/courses/state", icon: Landmark },
];

const RESOURCE_LINKS = [
  { label: "Free NCERT Notes", to: "/resources/ncert", icon: BookMarked },
  { label: "Previous Year Papers", to: "/resources/pyq", icon: FileText },
  {
    label: "Current Affairs Notes",
    to: "/resources/ca-notes",
    icon: Newspaper,
  },
  { label: "Topper's Notes", to: "/resources/topper-notes", icon: Trophy },
  { label: "Video Lectures", to: "/resources/videos", icon: Video },
  {
    label: "Daily MCQ Practice",
    to: "/resources/daily-mcq",
    icon: CheckCircle,
  },
  { label: "Answer Writing", to: "/resources/answer-writing", icon: PenTool },
  { label: "Test Series", to: "/test-series", icon: FileText },
];

const STUDENT_LINKS = [
  { label: "Student Login", to: "/login", icon: Users },
  { label: "Register Now", to: "/register", icon: ArrowUpRight },
  { label: "LMS Dashboard", to: "/dashboard", icon: BarChart3 },
  { label: "My Courses", to: "/dashboard/courses", icon: BookOpen },
  { label: "My Test Series", to: "/dashboard/tests", icon: FileText },
  { label: "Assignments", to: "/dashboard/assignments", icon: PenTool },
  { label: "Certificates", to: "/dashboard/certificates", icon: Award },
  { label: "Support", to: "/support", icon: HelpCircle },
];

const CA_LINKS = [
  {
    label: "Daily Current Affairs",
    to: "/current-affairs/daily",
    icon: Calendar,
  },
  {
    label: "Monthly Compilations",
    to: "/current-affairs/monthly",
    icon: BookOpen,
  },
  {
    label: "Editorial Analysis",
    to: "/current-affairs/editorial",
    icon: Newspaper,
  },
  { label: "PIB Summary", to: "/current-affairs/pib", icon: FileText },
  { label: "Weekly CA Quiz", to: "/current-affairs/quiz", icon: HelpCircle },
];

const OFFICES = [
  {
    city: "Delhi (Head Office)",
    address: "42, Rajendra Nagar, Near Karol Bagh Metro",
    phone: "+91 11-2345-6789",
    email: "delhi@sriramsias.com",
    mapLink: "#",
  },
  {
    city: "Hyderabad",
    address: "Plot 7, Ashok Nagar, Ameerpet",
    phone: "+91 40-2345-6789",
    email: "hyd@sriramsias.com",
    mapLink: "#",
  },
  {
    city: "Bangalore",
    address: "15, Jayanagar 4th Block, Near Forum Mall",
    phone: "+91 80-2345-6789",
    email: "blr@sriramsias.com",
    mapLink: "#",
  },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: "f",
    href: "#",
    color: "from-blue-600 to-blue-700",
    hoverColor: "hover:from-blue-500 hover:to-blue-600",
  },
  {
    name: "Twitter",
    icon: "𝕏",
    href: "#",
    color: "from-gray-700 to-gray-800",
    hoverColor: "hover:from-gray-600 hover:to-gray-700",
  },
  {
    name: "Instagram",
    icon: "📷",
    href: "#",
    color: "from-pink-500 to-purple-600",
    hoverColor: "hover:from-pink-400 hover:to-purple-500",
  },
  {
    name: "YouTube",
    icon: "▶",
    href: "#",
    color: "from-red-500 to-red-600",
    hoverColor: "hover:from-red-400 hover:to-red-500",
  },
  {
    name: "LinkedIn",
    icon: "in",
    href: "#",
    color: "from-blue-500 to-blue-700",
    hoverColor: "hover:from-blue-400 hover:to-blue-600",
  },
  {
    name: "Telegram",
    icon: "✈",
    href: "#",
    color: "from-cyan-500 to-cyan-600",
    hoverColor: "hover:from-cyan-400 hover:to-cyan-500",
  },
  {
    name: "WhatsApp",
    icon: "💬",
    href: "#",
    color: "from-green-500 to-green-600",
    hoverColor: "hover:from-green-400 hover:to-green-500",
  },
];

const ACHIEVEMENTS = [
  { value: "15+", label: "Years of Excellence", icon: Star },
  { value: "500+", label: "IAS Officers Produced", icon: Trophy },
  { value: "25,000+", label: "Active Students", icon: Users },
  { value: "94%", label: "Success Rate", icon: TrendingUp },
  { value: "120+", label: "Courses Available", icon: BookOpen },
  { value: "85+", label: "Expert Faculty", icon: Award },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Refund Policy", to: "/refund" },
  { label: "Cookie Policy", to: "/cookies" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "Sitemap", to: "/sitemap" },
];

const UPSC_CALENDAR = [
  { event: "UPSC CSE 2027 Notification", date: "Feb 2027", status: "upcoming" },
  { event: "Prelims Examination", date: "May 2027", status: "upcoming" },
  { event: "Mains Examination", date: "Sep 2027", status: "upcoming" },
  {
    event: "Interview / Personality Test",
    date: "Jan 2028",
    status: "upcoming",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, type: "spring", stiffness: 200 },
  }),
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

/* ——— 1. Animated Wave Separator ——— */
const WaveSeparator = () => {
  return (
    <div className="relative w-full overflow-hidden leading-none">
      <motion.svg
        viewBox="0 0 1440 120"
        className="relative block w-full h-[60px] md:h-[80px]"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z"
          className="fill-blue-950 dark:fill-slate-950"
          initial={{
            d: "M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z",
          }}
          animate={{
            d: [
              "M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z",
              "M0,60 C240,10 480,80 720,30 C960,80 1200,20 1440,50 L1440,120 L0,120 Z",
              "M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,60 C360,110 720,20 1080,70 C1260,90 1380,40 1440,80 L1440,120 L0,120 Z"
          className="fill-blue-950/60 dark:fill-slate-950/60"
          animate={{
            d: [
              "M0,60 C360,110 720,20 1080,70 C1260,90 1380,40 1440,80 L1440,120 L0,120 Z",
              "M0,80 C360,30 720,90 1080,40 C1260,60 1380,80 1440,50 L1440,120 L0,120 Z",
              "M0,60 C360,110 720,20 1080,70 C1260,90 1380,40 1440,80 L1440,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.svg>

      {/* Animated dots on the wave */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`wave-dot-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30"
            style={{ left: `${10 + i * 12}%` }}
            animate={{
              y: [20, 40, 20],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ——— 2. Newsletter Section ——— */
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 md:p-8 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5"
            animate={{ scale: [1.3, 1, 1.3], rotate: [45, 0, 45] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/3"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`newsletter-particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-6">
          {/* Left content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-3"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-blue-100 font-medium">
                Join 50,000+ Aspirants
              </span>
            </motion.div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-2">
              Stay Ahead with Daily Updates
            </h3>
            <p className="text-sm text-blue-100/80 max-w-md">
              Get daily current affairs, study tips, exam notifications, and
              exclusive free resources delivered straight to your inbox.
            </p>
          </div>

          {/* Right form */}
          <div className="w-full md:w-auto md:min-w-[360px]">
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Successfully Subscribed!
                    </p>
                    <p className="text-xs text-blue-200">
                      Check your inbox for a welcome email.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200/60 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Send className="w-4 h-4" />
                    Subscribe Free
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
            <p className="text-[10px] text-blue-200/50 mt-2 text-center md:text-left">
              No spam, ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ——— 3. Achievement Counter ——— */
const AchievementCounter = ({ value, label, icon: Icon, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="relative group text-center"
      custom={delay}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="relative inline-flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all duration-500"
        whileHover={{ y: -5, scale: 1.03 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-blue-400/0 group-hover:bg-blue-400/5 transition-colors"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-colors"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <motion.p
          className="text-2xl md:text-3xl font-black text-white bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent"
          animate={isInView ? { scale: [0.5, 1.1, 1] } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          {value}
        </motion.p>
        <p className="text-[11px] text-blue-300/60 font-medium tracking-wide uppercase">
          {label}
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ——— 4. Footer Link Column ——— */
const FooterLinkColumn = ({ title, links, icon: TitleIcon, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400"
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          <TitleIcon className="w-4 h-4" />
        </motion.div>
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
          {title}
        </h4>
      </div>

      <motion.ul
        className="space-y-1.5"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {links.map((link) => (
          <motion.li key={link.label} variants={staggerItem}>
            <Link
              to={link.to}
              className="group flex items-center gap-2 py-1 text-sm text-blue-200/60 hover:text-white transition-all duration-300"
            >
              <motion.span className="w-0 h-[1px] bg-blue-400 group-hover:w-3 transition-all duration-300" />
              {link.icon && (
                <link.icon className="w-3 h-3 opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity" />
              )}
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {link.label}
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

/* ——— 5. Office Card ——— */
const OfficeCard = ({ office, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      custom={index * 0.1}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/30 p-4 hover:bg-white/8 transition-all duration-500"
      whileHover={{ y: -3 }}
    >
      {/* Gradient top line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
      />

      <div className="flex items-start gap-3">
        <motion.div
          className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 mt-0.5"
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          <Building className="w-4 h-4" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white mb-1">{office.city}</p>
          <p className="text-xs text-blue-200/50 mb-2 leading-relaxed">
            {office.address}
          </p>
          <div className="space-y-1">
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-xs text-blue-300/60 hover:text-blue-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              {office.phone}
            </a>
            <a
              href={`mailto:${office.email}`}
              className="flex items-center gap-1.5 text-xs text-blue-300/60 hover:text-blue-300 transition-colors"
            >
              <Mail className="w-3 h-3" />
              {office.email}
            </a>
          </div>
          <motion.a
            href={office.mapLink}
            className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            whileHover={{ x: 3 }}
          >
            <Map className="w-3 h-3" />
            View on Map
            <ArrowUpRight className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

/* ——— 6. Social Media Button ——— */
const SocialButton = ({ social, index }) => {
  return (
    <motion.a
      href={social.href}
      title={social.name}
      className={`relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${social.color} text-white text-sm shadow-lg overflow-hidden group transition-all duration-300 ${social.hoverColor}`}
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.05 * index, type: "spring", stiffness: 400 }}
      whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Shimmer on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
        style={{ backgroundSize: "200% 100%" }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-10">{social.icon}</span>
    </motion.a>
  );
};

/* ——— 7. UPSC Calendar Widget ——— */
const UPSCCalendar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Calendar className="w-4 h-4" />
        </motion.div>
        <h4 className="text-sm font-bold text-white">UPSC Calendar 2027</h4>
      </div>

      {/* Timeline */}
      <div className="relative pl-4 space-y-3">
        {/* Vertical line */}
        <div className="absolute left-1 top-1 bottom-1 w-[2px] bg-gradient-to-b from-blue-500/40 via-indigo-500/40 to-blue-500/40" />

        {UPSC_CALENDAR.map((item, i) => (
          <motion.div
            key={item.event}
            className="relative flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            {/* Dot */}
            <motion.div
              className="absolute -left-[11px] top-1 w-3 h-3 rounded-full border-2 border-blue-500 bg-blue-950"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />

            <div className="flex-1 ml-2">
              <p className="text-xs font-semibold text-blue-200/80">
                {item.event}
              </p>
              <p className="text-[10px] text-blue-300/40 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ——— 8. App Download Section ——— */
const AppDownloadSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/10 p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Smartphone className="w-4 h-4" />
        </motion.div>
        <h4 className="text-sm font-bold text-white">Get Our App</h4>
      </div>
      <p className="text-xs text-blue-200/50 mb-3">
        Study anytime, anywhere. Download our mobile app for the best learning
        experience.
      </p>

      {/* App store buttons */}
      <div className="space-y-2">
        <motion.a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all group"
          whileHover={{ x: 3, scale: 1.01 }}
        >
          <div className="text-xl">🍎</div>
          <div>
            <p className="text-[9px] text-blue-300/50 leading-none">
              Download on the
            </p>
            <p className="text-sm font-bold text-white">App Store</p>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>

        <motion.a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all group"
          whileHover={{ x: 3, scale: 1.01 }}
        >
          <div className="text-xl">🤖</div>
          <div>
            <p className="text-[9px] text-blue-300/50 leading-none">
              Get it on
            </p>
            <p className="text-sm font-bold text-white">Google Play</p>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      </div>
    </motion.div>
  );
};

/* ——— 9. Back to Top Button ——— */
const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[900] w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/30 flex items-center justify-center group hover:from-blue-500 hover:to-indigo-600 transition-all"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-blue-400/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ——— 10. Animated Footer Logo ——— */
const FooterLogo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="inline-flex items-center gap-3 group">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 opacity-0 group-hover:opacity-30 blur-md"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white font-black text-lg shadow-xl shadow-blue-500/20">
            <motion.span
              className="relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              SR
            </motion.span>
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        <div>
          <motion.p
            className="text-2xl font-black bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            SRI RAM&apos;S IAS
          </motion.p>
          <p className="text-[10px] text-blue-400/60 tracking-[0.3em] font-medium">
            PREMIER IAS COACHING ACADEMY
          </p>
        </div>
      </Link>

      {/* Tagline */}
      <motion.p
        className="text-sm text-blue-200/40 mt-4 max-w-xs leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        Empowering aspirants with world-class education, expert mentorship, and
        proven strategies for success in Civil Services Examinations since 2010.
      </motion.p>

      {/* Contact info */}
      <div className="mt-4 space-y-2">
        <motion.a
          href="tel:+911234567890"
          className="flex items-center gap-2 text-sm text-blue-200/50 hover:text-blue-300 transition-colors group"
          whileHover={{ x: 3 }}
        >
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
            <Phone className="w-3.5 h-3.5" />
          </div>
          +91 123-456-7890
        </motion.a>
        <motion.a
          href="mailto:info@sriramsias.com"
          className="flex items-center gap-2 text-sm text-blue-200/50 hover:text-blue-300 transition-colors group"
          whileHover={{ x: 3 }}
        >
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
            <Mail className="w-3.5 h-3.5" />
          </div>
          info@sriramsias.com
        </motion.a>
        <motion.a
          href="#"
          className="flex items-center gap-2 text-sm text-blue-200/50 hover:text-blue-300 transition-colors group"
          whileHover={{ x: 3 }}
        >
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
            <Globe className="w-3.5 h-3.5" />
          </div>
          www.sriramsias.com
        </motion.a>
      </div>

      {/* Social links */}
      <div className="mt-5 flex flex-wrap gap-2">
        {SOCIAL_LINKS.map((social, i) => (
          <SocialButton key={social.name} social={social} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

/* ——— 11. Floating Particles Background ——— */
const FooterParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/3 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/3 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/2 blur-3xl"
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small floating particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`footer-particle-${i}`}
          className="absolute rounded-full bg-blue-400/10"
          style={{
            width: 1 + Math.random() * 3,
            height: 1 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20 - Math.random() * 30, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal animated lines */}
      <motion.div
        className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"
        animate={{ x: ["-50%", "50%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent"
        animate={{ x: ["50%", "-50%", "50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

/* ——— 12. Trust Badges ——— */
const TrustBadges = () => {
  const badges = [
    { label: "DGIPR Recognized", icon: Shield },
    { label: "ISO 9001:2015", icon: Award },
    { label: "Secure Payments", icon: Shield },
    { label: "24/7 Support", icon: Headphones },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-wrap items-center justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.5 }}
    >
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-blue-300/40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 + i * 0.1 }}
          whileHover={{ scale: 1.05, borderColor: "rgba(96, 165, 250, 0.3)" }}
        >
          <badge.icon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium">{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN FOOTER COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Back to Top */}
      <BackToTopButton />

      <footer ref={footerRef} className="relative">
        {/* Wave Separator */}
        <WaveSeparator />

        {/* Main Footer Content */}
        <div className="relative bg-blue-950 dark:bg-slate-950">
          <FooterParticles />

          <div className="relative max-w-7xl mx-auto px-4">
            {/* ═══ SECTION 1: Newsletter ═══ */}
            <div className="relative -mt-6 md:-mt-8 pb-8 md:pb-12">
              <NewsletterSection />
            </div>

            {/* ═══ SECTION 2: Achievement Counters ═══ */}
            <div className="pb-10 md:pb-14">
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-2"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs text-blue-300/60 font-medium">
                    Our Track Record
                  </span>
                </motion.div>
                <h3 className="text-lg md:text-xl font-black text-white">
                  Numbers That Speak for Themselves
                </h3>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {ACHIEVEMENTS.map((item, i) => (
                  <AchievementCounter
                    key={item.label}
                    value={item.value}
                    label={item.label}
                    icon={item.icon}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-1">
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>

            {/* ═══ SECTION 3: Main Links Grid ═══ */}
            <div className="py-10 md:py-14">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
                {/* Logo & About — 4 cols */}
                <div className="lg:col-span-4">
                  <FooterLogo />
                </div>

                {/* Quick Links — 2 cols */}
                <div className="lg:col-span-2">
                  <FooterLinkColumn
                    title="Quick Links"
                    links={QUICK_LINKS}
                    icon={Compass}
                    delay={0.1}
                  />
                </div>

                {/* Courses — 2 cols */}
                <div className="lg:col-span-2">
                  <FooterLinkColumn
                    title="Courses"
                    links={COURSE_LINKS}
                    icon={GraduationCap}
                    delay={0.15}
                  />
                </div>

                {/* Resources — 2 cols */}
                <div className="lg:col-span-2">
                  <FooterLinkColumn
                    title="Resources"
                    links={RESOURCE_LINKS}
                    icon={BookOpen}
                    delay={0.2}
                  />
                </div>

                {/* Student Portal — 2 cols */}
                <div className="lg:col-span-2">
                  <FooterLinkColumn
                    title="Student Portal"
                    links={STUDENT_LINKS}
                    icon={Users}
                    delay={0.25}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-1">
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            {/* ═══ SECTION 4: Offices, Calendar, App Download ═══ */}
            <div className="py-10 md:py-14">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
                {/* Offices — 5 cols */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400"
                      whileHover={{ scale: 1.1 }}
                    >
                      <MapPin className="w-4 h-4" />
                    </motion.div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Our Offices
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {OFFICES.map((office, i) => (
                      <OfficeCard key={office.city} office={office} index={i} />
                    ))}
                  </div>
                </div>

                {/* Current Affairs Links — 2 cols */}
                <div className="lg:col-span-2">
                  <FooterLinkColumn
                    title="Current Affairs"
                    links={CA_LINKS}
                    icon={Newspaper}
                    delay={0.3}
                  />
                </div>

                {/* UPSC Calendar — 2.5 cols */}
                <div className="lg:col-span-3">
                  <UPSCCalendar />

                  {/* Helpline */}
                  <motion.div
                    className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Phone className="w-4 h-4 text-amber-400" />
                      </motion.div>
                      <p className="text-xs font-bold text-amber-300">
                        24/7 Student Helpline
                      </p>
                    </div>
                    <a
                      href="tel:+911800123456"
                      className="text-xl font-black text-white hover:text-amber-300 transition-colors"
                    >
                      1800-123-456
                    </a>
                    <p className="text-[10px] text-blue-200/40 mt-1">
                      Toll Free | All Days
                    </p>
                  </motion.div>
                </div>

                {/* App Download — 2 cols */}
                <div className="lg:col-span-2">
                  <AppDownloadSection />

                  {/* Live status */}
                  <motion.div
                    className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs text-green-400 font-medium">
                        Live Now
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-200/50 mt-1">
                      2,847 students online
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Wifi className="w-3 h-3 text-blue-400/40" />
                      <span className="text-[10px] text-blue-300/30">
                        24/7 Learning Platform
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-1">
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>

            {/* ═══ SECTION 5: Trust Badges ═══ */}
            <div className="py-6">
              <TrustBadges />
            </div>

            {/* Divider */}
            <div className="relative py-1">
              <motion.div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
            </div>

            {/* ═══ SECTION 6: Bottom Bar ═══ */}
            <div className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Copyright */}
                <motion.div
                  className="flex items-center gap-2 text-xs text-blue-200/30"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <span>
                    © {currentYear} Sri Ram&apos;s IAS Academy. All Rights
                    Reserved.
                  </span>
                  <motion.span
                    className="text-blue-400/40"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-3 h-3 inline" />
                  </motion.span>
                  <span>Crafted with passion for aspirants.</span>
                </motion.div>

                {/* Legal links */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  {LEGAL_LINKS.map((link, i) => (
                    <span key={link.label} className="flex items-center gap-3">
                      <Link
                        to={link.to}
                        className="text-[11px] text-blue-200/30 hover:text-blue-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                      {i < LEGAL_LINKS.length - 1 && (
                        <span className="text-blue-500/20">·</span>
                      )}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="mt-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, delay: 1 }}
              />

              {/* Animated "Made in India" badge */}
              <motion.div
                className="flex items-center justify-center mt-4 gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1 }}
              >
                <motion.span
                  className="text-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  🇮🇳
                </motion.span>
                <span className="text-[10px] text-blue-200/20 font-medium tracking-widest uppercase">
                  Proudly Made in India
                </span>
                <motion.span
                  className="text-lg"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  🇮🇳
                </motion.span>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>

      {/* ——— Partner Logos Showcase ——— */}
      <PartnerLogosBar />

      {/* ——— UPSC Preparation Timeline ——— */}
      <PrepTimeline />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ADDITIONAL FOOTER SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

/* ——— Partner Logos / Affiliations Bar ——— */
const PartnerLogosBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const partners = [
    {
      name: "Ministry of Education",
      abbr: "MoE",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "UPSC Official",
      abbr: "UPSC",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      name: "National Testing Agency",
      abbr: "NTA",
      color: "from-cyan-500 to-cyan-700",
    },
    {
      name: "UGC Approved",
      abbr: "UGC",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      name: "Google for Education",
      abbr: "GfE",
      color: "from-amber-500 to-amber-700",
    },
    {
      name: "ISO 9001:2015 Certified",
      abbr: "ISO",
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div
      ref={ref}
      className="bg-gradient-to-b from-slate-950 to-blue-950 border-t border-blue-900/20 py-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          className="text-center text-xs text-blue-300/30 font-semibold uppercase tracking-[0.2em] mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Affiliated & Recognized By
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              className="group relative"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-blue-500/10 backdrop-blur-sm cursor-default"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(59,130,246,0.3)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${partner.color} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-white text-xs font-extrabold tracking-tight">
                    {partner.abbr}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-blue-100/50 group-hover:text-blue-200/70 transition-colors">
                    {partner.name}
                  </p>
                </div>
              </motion.div>

              {/* Glow on hover */}
              <motion.div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-blue-500/20" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-4 h-4 text-blue-500/20" />
          </motion.div>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-blue-500/20" />
        </motion.div>
      </div>
    </div>
  );
};

/* ——— UPSC Preparation Timeline Section ——— */
const PrepTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const milestones = [
    {
      phase: "Phase 1",
      title: "Foundation Building",
      duration: "Month 1-4",
      description:
        "NCERT mastery, newspaper habit, and understanding UPSC pattern",
      icon: BookOpen,
      color: "from-blue-400 to-blue-600",
      tasks: [
        "Complete NCERTs (6th-12th)",
        "Start newspaper reading",
        "Understand syllabus",
      ],
    },
    {
      phase: "Phase 2",
      title: "Prelims Preparation",
      duration: "Month 5-8",
      description: "Standard reference books, PYQ practice, and mock tests",
      icon: Target,
      color: "from-indigo-400 to-indigo-600",
      tasks: [
        "Laxmikanth, Spectrum, etc.",
        "Daily MCQ practice",
        "Weekly mock tests",
      ],
    },
    {
      phase: "Phase 3",
      title: "Mains Answer Writing",
      duration: "Month 9-14",
      description:
        "Answer writing practice, essays, and optional subject preparation",
      icon: PenTool,
      color: "from-cyan-400 to-cyan-600",
      tasks: [
        "Daily answer writing",
        "Essay practice",
        "Optional subject completion",
      ],
    },
    {
      phase: "Phase 4",
      title: "Interview Preparation",
      duration: "Month 15-16",
      description:
        "Personality development, mock interviews, and current affairs revision",
      icon: Users,
      color: "from-emerald-400 to-emerald-600",
      tasks: ["Mock interviews", "DAF-based questions", "Personality grooming"],
    },
  ];

  return (
    <div
      ref={ref}
      className="bg-gradient-to-b from-blue-950 to-slate-950 py-12 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="w-3.5 h-3.5 text-blue-400" />
            </motion.div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Your UPSC Roadmap
            </span>
          </motion.div>
          <h3 className="text-xl font-extrabold text-white mb-2">
            Strategic Preparation Timeline
          </h3>
          <p className="text-sm text-blue-200/40 max-w-md mx-auto">
            Follow our proven 16-month strategy to crack UPSC CSE
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/20 via-indigo-500/30 to-blue-500/10"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={milestone.phase}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
                >
                  {/* Center dot */}
                  <motion.div
                    className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg ring-4 ring-slate-950`}
                    >
                      <milestone.icon className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>

                  {/* Content card */}
                  <div
                    className={`ml-16 sm:ml-0 sm:w-[calc(50%-32px)] ${!isLeft ? "sm:mr-auto" : "sm:ml-auto"}`}
                  >
                    <motion.div
                      className="p-4 rounded-xl bg-white/[0.03] border border-blue-500/10 hover:border-blue-500/25 hover:bg-white/[0.05] transition-all group"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${milestone.color} text-white`}
                        >
                          {milestone.phase}
                        </span>
                        <span className="text-[10px] text-blue-300/30 font-medium">
                          {milestone.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-blue-200/30 mb-3 leading-relaxed">
                        {milestone.description}
                      </p>
                      <ul className="space-y-1">
                        {milestone.tasks.map((task) => (
                          <li
                            key={task}
                            className="flex items-center gap-2 text-[11px] text-blue-200/40"
                          >
                            <CheckCircle className="w-3 h-3 text-blue-400/40 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline end marker */}
          <motion.div
            className="relative mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5, type: "spring" }}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/20 ring-4 ring-slate-950">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            className="text-center mt-3 text-sm font-bold text-amber-400/40"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.8 }}
          >
            Become an IAS Officer! 🎯
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2 }}
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-xl shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all group"
          >
            <span>Start Your Journey Today</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
