// Import Home Page Components
import HeroBanner from "../components/home/HeroBanner";
import Courses from "../components/home/Courses";
import AboutUs from "../components/home/AboutUs";
import CelebratingSelections from "../components/home/CelebratingSelections";
import FindOfflineCenters from "../components/home/FindOfflineCenters";
import Testimonials from "../components/home/Testimonials";

/* ═══════════════════════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Courses Section */}
      <Courses />

      {/* About Us Section */}
      {/* <AboutUs /> */}

      {/* Celebrating Selections Section */}
      <CelebratingSelections />

      {/* Find Offline Centers Section */}
      <FindOfflineCenters />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Home;
