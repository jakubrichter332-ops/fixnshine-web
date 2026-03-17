import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import BeforeAfter from "./components/BeforeAfter";
import About from "./components/About";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import Privacy from "./components/Privacy";
import SpringPromo from "./components/SpringPromo";
import Reviews from "./components/Reviews";
import PromoBanner from "./components/PromoBanner";

function HomePage() {
  return (
    <div className="min-h-screen bg-primary overflow-x-hidden">
      <Reviews />
      <Navbar />
      <main>
        <Hero />
        <SpringPromo />
        <Services />
        <Gallery />
        <BeforeAfter />
        <About />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <PromoBanner />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/gdpr" element={<Privacy />} />
    </Routes>
  );
}

export default App;
