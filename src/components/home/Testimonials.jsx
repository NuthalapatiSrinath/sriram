import { motion } from "framer-motion";
import { Quote, Trophy, GraduationCap, Star } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   TESTIMONIALS DATA
   ═══════════════════════════════════════════════════════════════════ */

const SUCCESS_STORIES = [
  {
    id: 1,
    name: "Priya Sharma",
    rank: "AIR 12",
    year: "2025",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    quote:
      "The structured approach and personalized mentorship at SRIRAM IAS Academy made all the difference. The faculty's dedication is unparalleled.",
    course: "2 Year Foundation + Test Series",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun Singh",
    rank: "AIR 5",
    year: "2024",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    quote:
      "From a beginner to AIR 5, this institute transformed my preparation. The test series and answer writing sessions were game-changers.",
    course: "Integrated GS + Mains Masterclass",
    rating: 5,
  },
  {
    id: 3,
    name: "Neha Patel",
    rank: "AIR 28",
    year: "2025",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    quote:
      "The comprehensive study material and regular doubt sessions helped me stay consistent. Grateful to every mentor here.",
    course: "Prelims + Mains + Optional Geography",
    rating: 5,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   TESTIMONIALS COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4"
          >
            <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
              Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Our Toppers Speak
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Join the ranks of successful civil servants who trusted us with
            their UPSC journey
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-xl shadow-blue-100/50 dark:shadow-blue-900/30 border border-blue-100 dark:border-blue-800/30 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 dark:from-blue-950/30 dark:via-transparent dark:to-purple-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quote Icon */}
                <motion.div
                  className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Quote className="w-8 h-8 text-white" />
                </motion.div>

                <div className="relative z-10">
                  {/* Photo & Rank Badge */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-blue-600 ring-offset-2 dark:ring-offset-slate-800 shadow-lg">
                        <img
                          src={story.photo}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Trophy className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                        {story.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-md">
                          {story.rank}
                        </div>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          UPSC CSE {story.year}
                        </span>
                      </div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                          >
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                    "{story.quote}"
                  </blockquote>

                  {/* Course Badge */}
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800/50">
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                      {story.course}
                    </span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-3xl"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Success Stories</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Trophy className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
