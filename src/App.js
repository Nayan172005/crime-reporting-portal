import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import CrimeStats from './components/CrimeStats';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import ReportCrime from './pages/ReportCrime';
import ViewReports from './pages/ViewReports'; 
import EditReport from './pages/EditReport'; 

function App() {
  return (
    <Router>
      {/* Header and Footer outside Routes to show on all pages */}
      <Header />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Banner />
                <div className="content-container">
                  <CrimeStats />
                  <NewsSection />
                </div>
              </>
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<ReportCrime />} />
          
          <Route path="/reports" element={<ViewReports />} />
          <Route path="/editreport" element={<EditReport />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
