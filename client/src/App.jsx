import { useLocation } from 'react-router';
import Header from './components/views/Header';
import Envelope from './components/views/contents/Envelope';
import TheWedding from './components/views/contents/TheWedding';

export default function App() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isTheWeddingPage = location.pathname === '/thewedding';

  return (
    <>
      {(!isHomePage && !isTheWeddingPage) && <Header />}

      {location.pathname === '/' && <Envelope />}
      {location.pathname === '/thewedding' && <TheWedding />}
    </>
  );
}