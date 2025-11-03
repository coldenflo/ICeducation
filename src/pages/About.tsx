// src/pages/About.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Используем Link
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Globe, Users, Clock, Award, Send, Loader, ChevronDown, ChevronUp } from 'lucide-react';


interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const About: React.FC = () => {
  // Состояния для формы
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Состояние для раскрытия текста "Кто мы"
  const [isAboutUsExpanded, setIsAboutUsExpanded] = useState(false);

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    // Используем относительный путь для Vercel / Prod
    // или http://localhost:5001/api/notify для локальной разработки
    const backendUrl = '/api/notify';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok && result.status === 'ok') {
        setSubmitStatus('success');
        setSubmitMessage('Сообщение успешно отправлено! Спасибо за обращение.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || `Ошибка сервера: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Ошибка отправки формы 'Напишите нам':", error);
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Функция для переключения состояния "Кто мы"
  const toggleAboutUsExpansion = () => {
    setIsAboutUsExpanded(!isAboutUsExpanded);
  };

  return (
    <> {/* Фрагмент */}
      <Helmet>
        <title>О компании Viva-Tour | Образование в Китае</title>
        <meta name="description" content="Узнайте больше о Viva-Tour, вашем надежном партнере по поступлению в университеты Китая с 2010 года. Контакты, история, преимущества." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden"> {/* Добавлен overflow-hidden */}
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg shadow-lg overflow-hidden mb-16" data-aos="fade-down">
            <div className="p-8 md:p-12 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">О компании Viva-Tour</h1>
              <p className="text-xl text-blue-100 mb-6">
                Ваш надежный партнер в сфере образования в Китае с 2010 года
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact-us"
                  onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white text-blue-800 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Связаться с нами
                </a>
                <Link
                  to="/services"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-blue-800 transition-colors"
                >
                  Наши услуги
                </Link>
              </div>
            </div>
          </div>

          {/* Секция "Кто мы" */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center" data-aos="fade-up">
            {/* Левая колонка */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Вива-тур</h2>
              <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${isAboutUsExpanded ? 'max-h-[1200px]' : 'max-h-48'}`}>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>Туроператор «Viva Tour» с принимающим офисом в Сочи – активно развивающаяся и перспективная компания с 5-ти летней историей развития и профессиональным коллективом с большим опытом работы в туризме и гражданской авиации.</p>
                  <p>Основным видом деятельности компании является прием и обслуживание индивидуальных туристов, организованных групп на курортах Краснодарского Края и Республики Абхазия, оздоровление в санаториях России и странах СНГ.</p>
                  <p>Современная система онлайн бронирования позволяет в режиме реального времени забронировать отели, пансионаты, санатории, экскурсионные туры как для B2B, так и для B2C клиентов.</p>
                  <p>Мы рады предоставить следующие услуги:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Прием и обслуживание туристов на черноморском побережье РФ и РА, в регионах РФ.</li>
                      <li>Транспортно-экскурсионное обслуживание в Сочи и Абхазии</li>
                      <li>Бронирование авиа, ж/д, автобусных билетов</li>
                      <li>Обслуживание корпоративных клиентов (MICE)</li>
                      <li>Туры по всему миру для частных лиц</li>
                      <li>Бронирование доп. услуг по всему миру (страхование туристов, трансферы, консьерж сервис, экскурсии, аренда авто и яхт)</li>
                      <li>Фрахтование бизнес джетов</li>
                  </ul>
                  <p>Квалифицированный коллектив всегда рад организовать Ваш отдых либо деловую поездку на высоком уровне!</p>
                  <p className="mt-6 pt-4 border-t border-gray-200 font-semibold text-gray-700">Специализация на образовании в Китае:</p>
                  <p>Наша миссия — сделать процесс поступления в китайские университеты простым, понятным и доступным для всех желающих. Мы установили прямые контакты с приемными комиссиями ведущих вузов Китая, что позволяет нам предоставлять актуальную информацию и эффективную поддержку нашим клиентам.</p>
                  <p>Благодаря многолетнему опыту и глубокому пониманию образовательной системы Китая, мы предлагаем комплексное сопровождение студентов на всех этапах: от выбора университета и программы до адаптации к жизни в новой стране.</p>
                </div>
                {!isAboutUsExpanded && (
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pointer-events-none"></div>
                )}
              </div>
              <div className="mt-4">
                <button onClick={toggleAboutUsExpansion} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  {isAboutUsExpanded ? 'Свернуть описание' : 'Читать полное описание'}
                  {isAboutUsExpanded ? (<ChevronUp className="ml-1 h-4 w-4" />) : (<ChevronDown className="ml-1 h-4 w-4" />)}
                </button>
              </div>
            </div>
            {/* Правая колонка */}
            <div data-aos="fade-left" data-aos-delay="100">
              <img src="https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg" alt="Команда Viva-Tour" className="rounded-lg shadow-md w-full h-auto object-cover" />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="0">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4"><Users size={24} /></div>
              <div className="text-3xl font-bold text-gray-800 mb-1">1000+</div>
              <div className="text-gray-600 text-sm">Студентов поступили</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4"><Award size={24} /></div>
              <div className="text-3xl font-bold text-gray-800 mb-1">50+</div>
              <div className="text-gray-600 text-sm">Партнерских ВУЗов</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4"><Globe size={24} /></div>
              <div className="text-3xl font-bold text-gray-800 mb-1">15+</div>
              <div className="text-gray-600 text-sm">Городов Китая</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full mb-4"><Clock size={24} /></div>
              <div className="text-3xl font-bold text-gray-800 mb-1">14</div>
              <div className="text-gray-600 text-sm">Лет опыта</div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div id="contact-us" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" data-aos="fade-up">
            {/* Contact Info Block */}
            <div className="bg-white rounded-lg shadow-md p-8 order-last lg:order-first" data-aos="fade-right" data-aos-delay="100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Свяжитесь с нами</h2>
              <div className="space-y-5 mb-8">
                <a href="https://go.2gis.com/8dWiu" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Адрес</div>
                    <p className="text-gray-600 text-sm group-hover:text-blue-700 transition-colors">Адрес: ​г. Гуанчжоу, Китай, 广州市 番禺区 9-69商铺西南方向160米 邮政编码: 511442</p>
                  </div>
                </a>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Телефон</div>
                    <a className="text-gray-600 text-sm hover:text-blue-700 transition-colors" href="tel:+8615577372230">+86-155-7737-2230</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Электронная почта</div>
                    <a href="mailto:info@viva-education.com" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">info@viva-education.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Часы работы</div>
                    <p className="text-gray-600 text-sm">Пн-Пт: 9:00 - 18:00 (Пекин)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="font-medium text-gray-800">Мы в социальных сетях:</div>
                <div className="flex items-center space-x-4">
                  <a href="https://www.instagram.com/vivatourykt/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors" aria-label="Instagram"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/></svg></a>
                  <a href="https://wa.me/77775658706" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors" aria-label="WhatsApp"><svg className="w-10 ml-2 h-6" fill="currentColor" viewBox="0 -2 24 20" aria-hidden="true"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg></a>
                  <a href="https://vk.com/id566712635" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="VK"><svg className="w-6 h-6 " fill="currentColor" viewBox="1 0 24 24" aria-hidden="true"><path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"/></svg></a>
                </div>
              </div>
            </div> {/* End Contact Info */}

            {/* Contact Form Block */}
            <div className="bg-white rounded-lg shadow-md p-8" data-aos="fade-left" data-aos-delay="200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Напишите нам</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-gray-700 font-medium mb-1.5 text-sm">Имя <span className="text-red-500">*</span></label>
                  <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm" placeholder="Как к вам обращаться?" disabled={isSubmitting} aria-required="true" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-gray-700 font-medium mb-1.5 text-sm">Электронная почта <span className="text-red-500">*</span></label>
                  <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm" placeholder="your@email.com" disabled={isSubmitting} aria-required="true" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-gray-700 font-medium mb-1.5 text-sm">Телефон</label>
                  <input type="tel" id="contact-phone" name="phone" value={formData.phone || ''} onChange={handleInputChange} pattern="\+?[0-9\s\-\(\)]+" title="Введите корректный номер телефона" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm" placeholder="+7 (___) ___-__-__ (необязательно)" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-gray-700 font-medium mb-1.5 text-sm">Тема</label>
                  <input type="text" id="contact-subject" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm" placeholder="Тема вашего сообщения" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-gray-700 font-medium mb-1.5 text-sm">Сообщение <span className="text-red-500">*</span></label>
                  <textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm" placeholder="Опишите ваш вопрос или предложение..." disabled={isSubmitting} aria-required="true" ></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
                  {isSubmitting ? ( <Loader className="animate-spin w-5 h-5 mr-3" /> ) : ( <Send className="w-5 h-5 mr-3" /> )}
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </button>
                {submitStatus !== 'idle' && (
                  <div className={`mt-4 p-3 rounded-md text-sm text-center ${submitStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div> {/* End Contact Form */}
          </div> {/* End Contact Us Section */}

        </div> {/* End Container */}
      </div> {/* End Main Div */}
    </> // End Fragment
  );
};

export default About;