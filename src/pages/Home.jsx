// Import Home Page Components
import HeroBanner from "../components/home/HeroBanner";
import Courses from "../components/home/Courses";
import AboutUs from "../components/home/AboutUs";
import CelebratingSelections from "../components/home/CelebratingSelections";
import FindOfflineCenters from "../components/home/FindOfflineCenters";
import CurrentAffairs from "../components/home/CurrentAffairs";
import WhyChooseSriram from "../components/home/WhyChooseSriram";
import Testimonials from "../components/home/Testimonials";
import TeachingExperts from "../components/home/TeachingExperts";
import VideoCorner from "../components/home/VideoCorner";

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

      {/* Current Affairs Section */}
      <CurrentAffairs />

      {/* Why Choose Sriram Section */}
      <WhyChooseSriram />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Teaching Experts Section */}
      <TeachingExperts />

      {/* Video Corner Section */}
      <VideoCorner />
    </div>
  );
};

export default Home;
