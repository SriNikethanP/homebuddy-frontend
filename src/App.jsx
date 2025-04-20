import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactBar from './components/ContactBar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ContactForm from './components/ContactForm';
import Contact from './pages/Contact';
import Services from './pages/Services';
import About from './pages/About';
import BookAppointment from './pages/BookAppointment';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import SEOMetadata from './components/SEOMetadata';

function App() {
  return (
    <Router>
      <SEOMetadata />
      <div className="min-h-screen flex flex-col">
        <ContactBar />
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={
              <div className="w-full">
                <Hero />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                  <Categories />
                  <ContactForm />
                </div>
              </div>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 