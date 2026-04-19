'use client';

import CanvasLoader from "./components/common/CanvasLoader";
import ContactForm from "./components/common/ContactForm";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";
import ComplianceBanner from "./components/common/ComplianceBanner";
import GradientMenu from "./components/common/GradientMenu";
import VideoModal from "./components/common/VideoModal";

const Home = () => {
  return (
    <>
      <CanvasLoader>
        <ScrollWrapper>
          <Hero/>
          <Experience/>
          <Footer/>
        </ScrollWrapper>
      </CanvasLoader>
      <ContactForm />
      <ComplianceBanner />
      <GradientMenu />
      <VideoModal />
    </>
  );
};
export default Home;
