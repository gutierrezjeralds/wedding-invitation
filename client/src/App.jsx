import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import Envelope from './components/views/contents/Envelope';
import Cover from './components/views/contents/Cover';
import Home from './components/views/contents/Home';
import Story from './components/views/contents/Story';
import Wedding from './components/views/contents/Wedding';
import Entourage from './components/views/contents/Entourage';
import Attire from './components/views/contents/Attire';
import Faq from './components/views/contents/Faq';
import Gift from './components/views/contents/Gift';
import RSVP from './components/views/contents/Rsvp';
import Proposal from './components/views/contents/Proposal';
import ScrollToTop from './components/views/utils/ScrollToTop';
import BackgroundMusic from './components/views/utils/BackgroundMusic';
// import { useDrivePhotos } from './components/views/utils/GDrive';

export default function App() {
    const location = useLocation();

    // Array of paths where the Header should NOT appear
    const isProposalPath = location.pathname.startsWith('/proposal');
    const hideHeaderOnPaths = ['/', "/envelope", '/home', '/cover'];
    const showHeader = !hideHeaderOnPaths.includes(location.pathname) && !isProposalPath;

    // const { photosData, loading, error } = useDrivePhotos();

    return (
        <React.Fragment>
            <ScrollToTop />
            {showHeader && <Header />}

            <Routes>
                {/* Test */}
                <Route path="/" element={<Navigate to="/envelope" replace />} />

                <Route path="/envelope" element={<Envelope />} />
                <Route path="/cover" element={<Cover />} />
                <Route path="/home" element={<Home />} />
                <Route path="/story" element={<Story />} />
                <Route path="/wedding" element={<Wedding />} />
                <Route path="/entourage" element={<Entourage />} />
                <Route path="/attire" element={<Attire />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/gift" element={<Gift />} />
                <Route path="/rsvp" element={<RSVP />} />
                <Route path="/proposal/:sId/:sName" element={<Proposal />} />

                {/* Fallback routing */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {showHeader && <Footer />}

            {/* <BackgroundMusic /> */}
        </React.Fragment>
    );
}