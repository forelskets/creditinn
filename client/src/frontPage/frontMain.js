import Navbar from './sections/Navbar';
import Section1 from './sections/section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';
import Footer from './sections/footer';
import './css/frontPage.css';

function FrontMain() {
  return (
    <>
      <Navbar />
      <Section1 />
      {/* <Section2 /> */}
      {/* <Section5 /> */}
      <Section3 />

      {/* <Section4 /> */}
      {/* <Section6 /> */}
      {/* <Section7 /> */}
      <Footer />
    </>
  );
}

export default FrontMain;
