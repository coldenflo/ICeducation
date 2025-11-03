// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const showAdminLink = Boolean(isAuthenticated && user?.isAdmin);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerHeightThreshold = 80;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < headerHeightThreshold) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      else if (currentScrollY > lastScrollY.current && currentScrollY > headerHeightThreshold) {
        if (!isMenuOpen) {
            setIsVisible(false);
        }
      }

      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);

  }, [isMenuOpen]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
        setIsVisible(true);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-white shadow-md py-3 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          onClick={() => {
            closeMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2"
        >
          <img
            src="https://i.postimg.cc/k4BtQBkt/IMG-0532.png"
            alt="PR International Consultancy logo"
            className="h-14 w-auto drop-shadow-sm"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link
            to="/universities"
            className={`font-medium transition-colors duration-200 ${
              location.pathname.startsWith('/universities')
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent'
            }`}
          >
            Universities
          </Link>
          <Link
            to="/documents"
            className={`font-medium transition-colors duration-200 ${
              location.pathname === '/documents'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent'
            }`}
          >
            Application Guide
          </Link>
          <Link
            to="/services"
            className={`font-medium transition-colors duration-200 ${
              location.pathname === '/services'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent'
            }`}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={`font-medium transition-colors duration-200 ${
              location.pathname === '/about'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent'
            }`}
          >
            About Us
          </Link>
        </nav>
        {showAdminLink && (
          <Link
            to="/admin"
            className={`hidden md:inline-flex font-medium transition-colors duration-200 ${
              location.pathname === '/admin'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent'
            }`}
          >
            Admin
          </Link>
        )}

        <button
          className="md:hidden text-gray-700 hover:text-primary transition-colors z-10"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out overflow-y-auto ${
          isMenuOpen ? 'max-h-screen opacity-100 border-t border-gray-200' : 'max-h-0 opacity-0 border-t-0'
        }`}
        style={{ maxHeight: isMenuOpen ? 'calc(100vh - 64px)' : '0' }}
      >
          <nav className="flex flex-col space-y-1 p-4">
            <Link
              to="/universities"
              className={`block font-medium py-3 px-4 rounded transition-colors ${
                location.pathname.startsWith('/universities') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Universities
            </Link>
            <Link
              to="/documents"
              className={`block font-medium py-3 px-4 rounded transition-colors ${
                location.pathname === '/documents' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Application Guide
            </Link>
            <Link
              to="/services"
              className={`block font-medium py-3 px-4 rounded transition-colors ${
                location.pathname === '/services' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              to="/about"
              className={`block font-medium py-3 px-4 rounded transition-colors ${
                location.pathname === '/about' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              About Us
            </Link>
            {showAdminLink && (
              <Link
                to="/admin"
                className={`block font-medium py-3 px-4 rounded transition-colors ${
                  location.pathname === '/admin' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                Admin
              </Link>
            )}
          </nav>

      </div>
    </header>
  );
};

export default Header;
