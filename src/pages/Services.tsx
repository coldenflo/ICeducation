// src/pages/Services.tsx
import React, { useState } from 'react'; // Добавлен useState для раскрытия
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'; // Добавлены иконки для раскрытия
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';

const Services: React.FC = () => {
  // Состояние для раскрывающегося блока "Почему нас выбирают"
  const [isWhyUsExpanded, setIsWhyUsExpanded] = useState(false);
  const toggleWhyUsExpansion = () => setIsWhyUsExpanded(!isWhyUsExpanded);

  return (
    <> {/* Фрагмент */}
      <Helmet>
        <title>Наши Услуги | Поступление в Китай | Viva-Tour</title>
        <meta name="description" content="Полный спектр услуг от Viva-Tour: помощь с поступлением, визой, проживанием, адаптацией и консультациями для студентов в Китае." />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden"> {/* Добавлен overflow-hidden */}
        <div className="container mx-auto px-4">
          {/* Заголовок страницы */}
          <div data-aos="fade-down">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">Наши услуги</h1>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Предоставляем полный спектр услуг для успешного поступления и комфортного обучения студентов в Китае.
            </p>
          </div>

          {/* Сетка услуг */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              // Анимация для каждой карточки услуги
              <div key={service.id} data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                 <ServiceCard service={service} />
              </div>
            ))}
          </div>

          {/* Секция "Почему выбирают нас" */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Почему выбирают нас?</h2>
            <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${isWhyUsExpanded ? 'max-h-[1000px]' : 'max-h-60'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Пункт 1 */}
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Опыт работы более 10 лет</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Мы успешно помогаем студентам поступать в китайские вузы и получать стипендии уже более десяти лет.</p>
                  </div>
                </div>
                {/* Пункт 2 */}
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Партнерство с ведущими ВУЗами</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">У нас налажены прямые контакты с приемными комиссиями более 50 ведущих университетов Китая.</p>
                  </div>
                </div>
                {/* Пункт 3 */}
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Индивидуальный подход</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Подбираем университет и программу обучения, учитывая ваши академические цели, интересы и финансовые возможности.</p>
                  </div>
                </div>
                {/* Пункт 4 */}
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Высокий процент зачисления</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Благодаря нашему опыту и знанию требований, более 95% наших клиентов успешно поступают в выбранные ВУЗы.</p>
                  </div>
                </div>
                {/* Пункт 5 */}
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Поддержка на всех этапах</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Мы сопровождаем вас с момента подачи заявки до приезда в Китай, помогая с визой, билетами и адаптацией.</p>
                  </div>
                </div>
                {/* Пункт 6 */}
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Профессиональная команда</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Наши консультанты имеют международный опыт в сфере образования и глубоко понимают китайскую систему.</p>
                  </div>
                </div>
              </div>
              {!isWhyUsExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>
            <div className="text-center mt-6">
              <button onClick={toggleWhyUsExpansion} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                {isWhyUsExpanded ? 'Свернуть' : 'Читать далее'}
                {isWhyUsExpanded ? (<ChevronUp className="ml-2 -mr-1 h-5 w-5" />) : (<ChevronDown className="ml-2 -mr-1 h-5 w-5" />)}
              </button>
            </div>
          </div>

          {/* Секция "Отзывы" */}
          <div className="mb-16" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Отзывы наших студентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col" data-aos="fade-up" data-aos-delay="150">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0">ВП</div>
                  <div>
                    <div className="font-semibold text-gray-800">Виталий Петров</div>
                    <div className="text-xs text-gray-500">Гуйлиньский Электротехнический Университет</div>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic text-sm leading-relaxed flex-grow">"Очень доволен работой Вива-тур, спасибо им за оказанную поддержку по работе с офисом, оформлении китайской карты, заселении и в целом за помощь при поступлении в данный университет"</blockquote>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col" data-aos="fade-up" data-aos-delay="250">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg mr-4 flex-shrink-0">АС</div>
                  <div>
                    <div className="font-semibold text-gray-800">Анна С.</div>
                    <div className="text-xs text-gray-500">Педагогический Университет, Сиань</div>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic text-sm leading-relaxed flex-grow">"Огромное спасибо команде Вива-Тур за помощь с адаптацией в Сиане! Помогли заселиться, оформить все местные документы – чувствовала себя уверенно с первого дня. Учеба идет отлично!"</blockquote>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col" data-aos="fade-up" data-aos-delay="350">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg mr-4 flex-shrink-0">ДН</div>
                  <div>
                    <div className="font-semibold text-gray-800">Дмитрий Н.</div>
                    <div className="text-xs text-gray-500">Харбинский Проф. Институт</div>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic text-sm leading-relaxed flex-grow">"Поступил в Харбин через Вива-Тур. Очень доволен выбором программы и качеством преподавания. Компания оказала неоценимую помощь с оформлением визы и подготовкой к переезду."</blockquote>
              </div>
            </div>
          </div>

          {/* Секция "Призыв к действию" */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg shadow-xl p-8 md:p-12 text-white text-center" data-aos="zoom-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы начать свое образовательное путешествие в Китай?</h2>
            <p className="text-lg md:text-xl mb-8">Свяжитесь с нами сегодня для получения бесплатной консультации и индивидуального подбора программы!</p>
            <Link to="/about#contact-us" className="inline-block px-8 py-3 bg-white text-indigo-700 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg text-lg">Получить консультацию</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Services;