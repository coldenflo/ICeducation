// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react'; // Добавлен useRef
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // --- Логика для скрытия/показа хедера при скролле ---
  const [isVisible, setIsVisible] = useState(true); // Изначально хедер виден
  const lastScrollY = useRef(0); // Используем useRef для хранения последнего значения скролла без ререндеров
  const headerHeightThreshold = 80; // Порог в пикселях, после которого хедер может начать скрываться

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Всегда показывать хедер, если мы близко к верху страницы
      if (currentScrollY < headerHeightThreshold) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY; // Обновляем последнее значение
        return;
      }

      // Показываем хедер при скролле вверх
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      // Скрываем хедер при скролле вниз (и если мы не в самом верху)
      else if (currentScrollY > lastScrollY.current && currentScrollY > headerHeightThreshold) {
        // Не скрывать, если мобильное меню открыто!
        if (!isMenuOpen) {
            setIsVisible(false);
        }
      }

      // Обновляем последнее значение скролла для следующего сравнения
      // Устанавливаем > 0, чтобы избежать срабатывания на скролл до 0
      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Используем passive для производительности

    return () => window.removeEventListener('scroll', handleScroll);

  }, [isMenuOpen]); // Добавляем isMenuOpen в зависимости, чтобы хедер не скрывался при открытом меню

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // --- Функции для мобильного меню ---
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Если открываем меню, хедер должен быть виден
    if (!isMenuOpen) {
        setIsVisible(true);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  // --- Конец логики ---

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-white shadow-md py-3 ${
        isVisible ? 'translate-y-0' : '-translate-y-full' // Управляем видимостью через transform
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Логотип */}
        <Link to="/" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2">
          <img
            src="https://i.postimg.cc/7ZsRc2bs/logo-descriptor-EN.png"
            alt="Viva Tour Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {/* Ссылки */}
          <Link
            to="/universities"
            className={`font-medium transition-colors duration-200 ${
              location.pathname.startsWith('/universities')
                ? 'text-primary border-b-2 border-primary pb-1' // Добавлен pb-1 для визуального выравнивания
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent' // Прозрачная граница для сохранения места
            }`}
          >
            Университеты
          </Link>
          <Link
            to="/documents"
            className={`font-medium transition-colors duration-200 ${
              location.pathname === '/documents'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent'
            }`}
          >
            Документы
          </Link>
          <Link
            to="/services"
            className={`font-medium transition-colors duration-200 ${
              location.pathname === '/services'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent'
            }`}
          >
            Наши услуги
          </Link>
          <Link
            to="/about"
            className={`font-medium transition-colors duration-200 ${
              location.pathname === '/about'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-700 hover:text-primary border-b-2 border-transparent'
            }`}
          >
            О нас
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-primary transition-colors z-10" // Добавили z-10
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {/* Анимация остается прежней, но теперь она зависит от isMenuOpen */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out overflow-y-auto ${ // Добавлен overflow-y-auto
          isMenuOpen ? 'max-h-screen opacity-100 border-t border-gray-200' : 'max-h-0 opacity-0 border-t-0' // Используем max-h-screen и границу
        }`}
        style={{ maxHeight: isMenuOpen ? 'calc(100vh - 64px)' : '0' }} // Ограничиваем высоту видимой областью экрана
      >
       {/* Контент меню рендерится всегда для правильной анимации высоты, но виден только при isMenuOpen */}
          <nav className="flex flex-col space-y-1 p-4"> {/* Уменьшен space-y, добавлены отступы */}
            <Link
              to="/universities"
              className={`block font-medium py-3 px-4 rounded transition-colors ${ // Увеличен py
                location.pathname.startsWith('/universities') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Университеты
            </Link>
            <Link
              to="/documents"
              className={`block font-medium py-3 px-4 rounded transition-colors ${
                location.pathname === '/documents' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Документы
            </Link>
            <Link
              to="/services"
              className={`block font-medium py-3 px-4 rounded transition-colors ${
                location.pathname === '/services' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Наши услуги
            </Link>
            <Link
              to="/about"
              className={`block font-medium py-3 px-4 rounded transition-colors ${
                location.pathname === '/about' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              О нас
            </Link>
          </nav>

      </div>
    </header>
  );
};

export default Header;