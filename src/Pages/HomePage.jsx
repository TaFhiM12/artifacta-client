import HeroSection from "../Components/HeroSection";
import FeatureGroup from "../Components/FeatureGroup";
import TimelineSection from "../Components/TimeLineSection";
import PreservationTips from "../Components/PreservationTips";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <Helmet>
        <title>Artifacta | Home</title>
      </Helmet>
      
      {/* Add IDs to each section */}
      <section id="hero">
        <HeroSection />
      </section>
      
      <section id="features">
        <FeatureGroup />
      </section>
      
      <section id="timeline">
        <TimelineSection />
      </section>
      
      <section id="tips">
        <PreservationTips />
      </section>
    </div>
  );
};

export default HomePage;