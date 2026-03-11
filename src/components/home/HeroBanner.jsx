import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Clock,
  Trophy,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   HERO SLIDER DATA
   ═══════════════════════════════════════════════════════════════════ */

const HERO_SLIDES = [
  {
    id: 1,
    title: "CSAT Course for UPSC CSE Prelims",
    subtitle: "Master the qualifying paper with confidence",
    description: "Structured approach to crack CSAT with proven strategies",
    features: ["Mock Tests", "Speed Building", "Doubt Sessions"],
    badge: "Batch starts Feb 20, 2026",
    seats: "200 seats left",
    gradient: "from-purple-600 via-purple-700 to-pink-600",
    bgImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80",
    stats: { students: "5,200+", rating: "4.9", duration: "6 Months" },
  },
  {
    id: 2,
    title: "2 Year General Studies Foundation Course",
    subtitle: "Build your UPSC foundation from scratch",
    description: "Comprehensive coverage of all GS papers with expert faculty",
    features: ["Live Classes", "Recorded Lectures", "Test Series"],
    badge: "Most Popular Course",
    seats: "150 seats left",
    gradient: "from-blue-600 via-blue-700 to-indigo-700",
    bgImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80",
    stats: { students: "8,500+", rating: "5.0", duration: "24 Months" },
  },
  {
    id: 3,
    title: "UPSC Prelims Complete Course 2027",
    subtitle: "Crack UPSC Prelims in first attempt",
    description:
      "Intensive prelims preparation with daily practice and mentorship",
    features: ["Daily MCQs", "Weekly Tests", "Mentorship"],
    badge: "Early Bird Offer",
    seats: "300 seats left",
    gradient: "from-emerald-600 via-green-700 to-teal-600",
    bgImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80",
    stats: { students: "12,000+", rating: "4.8", duration: "12 Months" },
  },
  {
    id: 4,
    title: "Mains Answer Writing Masterclass",
    subtitle: "Transform your answers into scoring gems",
    description: "Expert evaluation and personalized feedback on every answer",
    features: ["Daily Practice", "Expert Evaluation", "Model Answers"],
    badge: "Limited Seats",
    seats: "100 seats left",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    bgImage:
      "https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=1920&q=80",
    stats: { students: "3,800+", rating: "4.9", duration: "8 Months" },
  },
  {
    id: 5,
    title: "Optional Subject - Geography",
    subtitle: "Score 300+ in Geography optional",
    description: "Complete coverage with maps, case studies, and revision",
    features: ["Map Practice", "Case Studies", "PYQ Solutions"],
    badge: "Top Faculty",
    seats: "180 seats left",
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    bgImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1920&q=80",
    stats: { students: "2,400+", rating: "5.0", duration: "18 Months" },
  },
];

/* ═══════════════════════════════════════════════════════════════════
   HERO BANNER COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef(null);

  // Auto-play slider
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const slide = HERO_SLIDES[currentSlide];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950" />

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.bgImage})`,
              }}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7 }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </motion.div>
                <span className="text-sm font-bold text-white">
                  {slide.badge}
                </span>
                <div className="h-4 w-[1px] bg-white/30" />
                <span className="text-sm font-bold text-amber-300">
                  {slide.seats}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight"
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl lg:text-2xl text-blue-100 font-semibold mb-3"
              >
                {slide.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base text-blue-200/80 mb-6 max-w-xl"
              >
                {slide.description}
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                {slide.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  >
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span className="text-sm font-medium text-white">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 mb-8"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-300" />
                  <div>
                    <p className="text-xs text-blue-300/60">
                      Students Enrolled
                    </p>
                    <p className="text-lg font-bold text-white">
                      {slide.stats.students}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Trophy className="w-5 h-5 text-amber-400" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-blue-300/60">Course Rating</p>
                    <p className="text-lg font-bold text-white">
                      {slide.stats.rating}/5
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-300" />
                  <div>
                    <p className="text-xs text-blue-300/60">Duration</p>
                    <p className="text-lg font-bold text-white">
                      {slide.stats.duration}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4"
              >
                <motion.button
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 text-base font-bold shadow-2xl shadow-white/20 hover:shadow-white/30 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Course Details</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </motion.button>

                <motion.button
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 backdrop-blur-md text-white text-base font-bold hover:bg-white/10 hover:border-white/50 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Free Demo</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Decorative Success Card */}
            <div className="absolute top-10 right-10 hidden xl:block">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-64 h-64 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Success Rate</p>
                    <p className="text-2xl font-black text-white">98.5%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {["Top Rankers", "Expert Faculty", "Best Resources"].map(
                    (item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-white/80"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{item}</span>
                      </motion.div>
                    ),
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${currentSlide}-${i}`}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: 3 + Math.random() * 6,
                  height: 3 + Math.random() * 6,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30 - Math.random() * 40, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 lg:px-8 pointer-events-none z-20">
        <motion.button
          onClick={() => {
            prevSlide();
            resetAutoPlay();
          }}
          className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={() => {
            nextSlide();
            resetAutoPlay();
          }}
          className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {HERO_SLIDES.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              goToSlide(index);
              resetAutoPlay();
            }}
            className={`rounded-full transition-all ${
              currentSlide === index
                ? "w-12 h-2 bg-white"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-white/30"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 5, ease: "linear" }}
        key={`progress-${currentSlide}`}
      />
    </section>
  );
};

export default HeroBanner;
