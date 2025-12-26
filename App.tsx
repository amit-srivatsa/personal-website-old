import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AboutPreview } from './components/AboutPreview';
import { BentoGrid } from './components/BentoGrid';
import { Newsletter } from './components/Newsletter';
import { CV } from './components/CV';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white selection:bg-orange-200 selection:text-orange-900">
        {/* Semantic Header with Navigation */}
        <Header />

        {/* Semantic Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <AboutPreview />
                <BentoGrid />
                <Newsletter />
              </>
            } />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Semantic Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;