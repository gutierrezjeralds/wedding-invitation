import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import Envelope from './components/views/contents/Envelope';
import Home from './components/views/contents/Home';
import Story from './components/views/contents/Story';
import Wedding from './components/views/contents/Wedding';
import Entourage from './components/views/contents/Entourage';
import Attire from './components/views/contents/Attire';
import Faq from './components/views/contents/Faq';
import Gift from './components/views/contents/Gift';
import ScrollToTop from './components/views/utils/ScrollToTop';
import BackgroundMusic from './components/views/utils/BackgroundMusic';

export default function App() {
  const location = useLocation();

  // Array of paths where the Header should NOT appear
  const hideHeaderOnPaths = ['/', '/home'];
  const showHeader = !hideHeaderOnPaths.includes(location.pathname);

  return (
    <React.Fragment>
      <ScrollToTop />
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Envelope />} />
        <Route path="/home" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/entourage" element={<Entourage />} />
        <Route path="/attire" element={<Attire />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/gift" element={<Gift />} />
      </Routes>

      {showHeader && <Footer />}

      <BackgroundMusic />
    </React.Fragment>
  );
}