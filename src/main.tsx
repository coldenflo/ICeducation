// src/main.tsx
import { StrictMode } from 'react'; // Импортируем React
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom'; // <--- ИМПОРТ BrowserRouter
import AppWithProviders from './App'; // Используем ваш экспорт из App.tsx
// ИЛИ import App from './App'; если экспорт по умолчанию App
import './index.css';

// Инициализация DB (если она нужна глобально до всего)
// import { initializeDB } from './utils/db';
// initializeDB();

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter> {/* <--- Оборачиваем в BrowserRouter */}
          <AppWithProviders /> {/* Используем ваш компонент */}
          {/* ИЛИ <App /> если экспорт по умолчанию App */}
        </BrowserRouter> {/* <--- Закрываем BrowserRouter */}
      </HelmetProvider>
    </StrictMode>
  );
} else {
  console.error("Не удалось найти корневой элемент с ID 'root'");
}