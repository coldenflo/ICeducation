// src/App.tsx
import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UniversityProvider } from './context/UniversityContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import Documents from './pages/Documents';
import Services from './pages/Services';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';
import { FaWhatsapp } from 'react-icons/fa';
import { Analytics } from '@vercel/analytics/react';
import PrivacyPolicy from './pages/PrivacyPolicy';  
import TermsOfService from './pages/TermsOfService'; 

// --- AOS ИМПОРТЫ ---
import AOS from 'aos';
import 'aos/dist/aos.css';
// --------------------

function App() {
  // Инициализация AOS
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      offset: 80,
    });
  }, []);

  // Обновление AOS при смене маршрута
  const location = useLocation();
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    // --- ИСПРАВЛЕНИЕ: Оборачиваем все в React Fragment ---
    <>
      <ScrollToTop /> {/* Компонент для скролла вверх */}
      <AuthProvider>
      <Analytics />
        <UniversityProvider>
          <div className="flex flex-col min-h-screen"> {/* Основной контейнер */}
            <Header /> {/* Ваш компонент хедера */}
            {/* Основной контент с отступом от хедера */}
            <main className="flex-grow pt-16 md:pt-20"> 
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/universities/:slugOrId" element={<UniversityDetail />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/termsofservice" element={<TermsOfService />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer /> {/* Ваш компонент футера */}

            {/* Кнопка WhatsApp */}
            <a
              href="https://wa.me/77775658706"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="fixed bottom-6 right-6 z-[60] bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 animate-pulse-whatsapp" // Увеличен z-index на всякий случай
            >
              <FaWhatsapp size={28} />
            </a>
          </div>
        </UniversityProvider>
      </AuthProvider>
    </>
    // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
  );
}

function AppWithProviders() {
  return <App />;
}

export default AppWithProviders;