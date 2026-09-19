import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/views/Header';
import Envelope from './components/views/contents/Envelope';
import Home from './components/views/contents/Home';
import TheWedding from './components/views/contents/TheWedding';

export default function App() {
  const location = useLocation();

  // Array of paths where the Header should NOT appear
  const hideHeaderOnPaths = ['/', '/home'];
  const showHeader = !hideHeaderOnPaths.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Envelope />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}