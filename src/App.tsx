import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Booking />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
