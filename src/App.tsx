import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import BeforeAfter from "./components/BeforeAfter";
import About from "./components/About";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-primary overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <BeforeAfter />
        <About />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
