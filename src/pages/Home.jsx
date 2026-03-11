// Import Home Page Components
import HeroBanner from "../components/home/HeroBanner";
import Testimonials from "../components/home/Testimonials";

/* ═══════════════════════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Home;
