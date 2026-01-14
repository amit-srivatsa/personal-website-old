import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Page Components
import { Hero } from './components/Hero';
import { AboutPreview } from './components/AboutPreview';
import { BentoGrid } from './components/BentoGrid';
import { Newsletter } from './components/Newsletter';
import { CV } from './components/CV';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Resources } from './components/Resources';
import { Book } from './components/Book';
import { Subscribers } from './components/Subscribers';
import { Meta } from './components/Meta';
import { AdminDashboard } from './components/Admin/AdminDashboard';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white selection:bg-orange-200 selection:text-orange-900">
    <div className="print:hidden">
      <Header />
    </div>
    <main className="flex-grow">
      {children}
    </main>
    <div className="print:hidden">
      <Footer />
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Admin Route - No Header/Footer */}
          <Route path="/admin" element={
            <>
              <Meta title="Admin - Amit Srivatsa" description="Content Management" keywords="" />
              <AdminDashboard />
            </>
          } />

          {/* Public Routes - Wrapped in Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={
                  <>
                    <Meta title="Amit Srivatsa - AI Strategy & Content" description="Amit Srivatsa's personal website. Explore his work in AI strategy, content, and marketing." keywords="Amit Srivatsa, AI, strategy, content, marketing, portfolio, blog, cv" />
                    <Hero />
                    <AboutPreview />
                    <BentoGrid />
                    <Newsletter />
                  </>
                } />
                <Route path="/services" element={
                  <>
                    <Meta title="Services - Amit Srivatsa" description="Explore the services offered by Amit Srivatsa, including AI strategy, content marketing, and more." keywords="AI strategy, content marketing, consulting, Amit Srivatsa" />
                    <Services />
                  </>
                } />
                <Route path="/resources" element={
                  <>
                    <Meta title="Resources - Amit Srivatsa" description="Curated tools, templates, and frameworks for builders and marketers." keywords="resources, tools, templates, AI, marketing, Amit Srivatsa" />
                    <Resources />
                  </>
                } />
                <Route path="/portfolio" element={
                  <>
                    <Meta title="Portfolio - Amit Srivatsa" description="Browse Amit Srivatsa's portfolio of projects in AI, content, and marketing." keywords="portfolio, projects, AI, content, marketing, Amit Srivatsa" />
                    <Portfolio />
                  </>
                } />
                <Route path="/cv" element={
                  <>
                    <Meta title="CV - Amit Srivatsa" description="View Amit Srivatsa's curriculum vitae, detailing his experience, skills, and education." keywords="CV, resume, experience, skills, education, Amit Srivatsa" />
                    <CV />
                  </>
                } />
                <Route path="/blog" element={
                  <>
                    <Meta title="Blog - Amit Srivatsa" description="Read Amit Srivatsa's blog for insights on AI, marketing, and career development." keywords="blog, articles, AI, marketing, career, Amit Srivatsa" />
                    <Blog />
                  </>
                } />
                <Route path="/contact" element={
                  <>
                    <Meta title="Contact - Amit Srivatsa" description="Get in touch with Amit Srivatsa for collaborations, inquiries, or to say hello." keywords="contact, email, LinkedIn, Amit Srivatsa" />
                    <Contact />
                  </>
                } />
                <Route path="/book" element={
                  <>
                    <Meta title="Book Consultation - Amit Srivatsa" description="Schedule a consultation with Amit Srivatsa." keywords="consultation, booking, schedule, AI strategy" />
                    <Book />
                  </>
                } />
                <Route path="/dashboard/subscribers" element={
                  <>
                    <Meta title="Subscribers - Amit Srivatsa" description="Manage newsletter subscribers." keywords="admin, subscribers" />
                    <Subscribers />
                  </>
                } />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;