// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, FileText, Globe } from 'lucide-react';
import { useUniversities } from '../context/UniversityContext';
import UniversityCard from '../components/UniversityCard';
import { Helmet } from 'react-helmet-async';

const Home: React.FC = () => {
  const { universities } = useUniversities();

  return (
    <div className="min-h-screen"> {/* Убрана обертка Fragment, не нужна */}
      <Helmet>
        <title>Поступление в ВУЗ мечты в Китае | Поступление в Китай | Viva-Tour</title>
        <meta name="description" content="Компания Вива-Тур, отправляем на обучение в Китай: помощь с поступлением, стипендии, виза, адаптация." /> {/* Уточнено описание */}
      </Helmet>

      {/* Hero Section */}
      {/* Анимация для всей секции */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-blue-900/80 via-blue-700/70 to-primary/60 text-white overflow-hidden"> {/* Изменен градиент, добавлен overflow-hidden */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
             {/* Анимация для текста */}
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left" data-aos="fade-right" data-aos-delay="100"> {/* AOS для текста */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Обучение в Китае с Вива-Тур
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Поступайте в ведущие университеты Китая! <br></br>
                Мы сделаем процесс поступления простым и понятным.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  to="/universities"
                  className="px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg" // Увеличена жирность, тень
                >
                  Все университеты
                </Link>
                <Link
                  to="/documents"
                  className="px-6 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary/90 transition-colors shadow-md hover:shadow-lg" // Увеличена жирность, тень
                >
                  Как поступить
                </Link>
              </div>
            </div>
            {/* Анимация для изображения */}
            <div className="md:w-1/2" data-aos="fade-left" data-aos-delay="300"> {/* AOS для картинки */}
              <img
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
                alt="Студенты в Китае" // Более релевантный alt
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto md:max-w-full" // Ограничение ширины на мобильных
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" data-aos="fade-up">Почему выбирают нас</h2> {/* AOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Добавляем AOS к каждой карточке */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="100"> {/* AOS + Delay + Hover Effect */}
              <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Лучшие ВУЗы</h3> {/* Изменен текст */}
              <p className="text-gray-600 text-sm">Доступ к ведущим университетам Китая с разнообразными программами обучения.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="200">
              <div className="inline-block p-3 rounded-full bg-secondary/10 text-secondary mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Гранты и Стипендии</h3>
              <p className="text-gray-600 text-sm">Помогаем найти и получить стипендии, покрывающие обучение и проживание.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="300">
              <div className="inline-block p-3 rounded-full bg-blue-500/10 text-blue-600 mb-4"> {/* Изменен цвет */}
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Помощь с документами</h3>
              <p className="text-gray-600 text-sm">Полное сопровождение в подготовке и подаче всего пакета документов.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="400">
              <div className="inline-block p-3 rounded-full bg-green-500/10 text-green-600 mb-4"> {/* Изменен цвет */}
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Адаптация и Поддержка</h3>
              <p className="text-gray-600 text-sm">Помощь с визой, билетами, встречей и адаптацией к жизни в Китае.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Universities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4" data-aos="fade-up">Популярные университеты</h2> {/* AOS */}
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100"> {/* AOS */}
            Ознакомьтесь с некоторыми из университетов, с которыми мы сотрудничаем, предлагающими отличные программы и стипендии.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Применяем AOS к обертке каждой карточки */}
            {universities.slice(0, 3).map((university, index) => (
              <div key={university.id} data-aos="fade-up" data-aos-delay={index * 150}> {/* AOS с нарастающей задержкой */}
                <UniversityCard university={university} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12" data-aos="fade-up"> {/* AOS */}
            <Link
              to="/universities"
              className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors shadow hover:shadow-md" // Увеличены отступы, жирность
            >
              Смотреть все университеты
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-secondary to-orange-500 text-white" data-aos="zoom-in"> {/* Изменен градиент, AOS */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать свое образовательное путешествие?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами сегодня, чтобы узнать больше о возможностях обучения в Китае и о том, как мы можем помочь вам осуществить вашу мечту.
          </p>
          <Link
            to="/about#contact-us" // Ссылка на контакты на странице About
             onClick={(e) => { // Добавляем скролл для SPA
                 // Если мы уже на /about, скроллим, иначе просто переходим
                 if (window.location.pathname === '/about') {
                    e.preventDefault();
                    document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
                 }
             }}
            className="px-8 py-4 bg-white text-secondary font-bold rounded-md hover:bg-gray-100 transition-colors text-lg shadow-lg hover:shadow-xl" // Увеличена тень
          >
            Получить консультацию
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;