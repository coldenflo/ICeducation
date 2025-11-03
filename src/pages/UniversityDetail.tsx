// src/pages/UniversityDetail.tsx
import React, { useState, useEffect } from 'react'; // Убедимся, что useEffect импортирован
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Calendar, Award, DollarSign, FileCheck, Languages, ArrowLeft, Send, Loader, Info, Loader2 } from 'lucide-react'; // Добавлен Loader2 для загрузки
import { useUniversities } from '../context/UniversityContext'; // Путь к контексту
import { useAuth } from '../context/AuthContext'; // Путь к контексту
import { University } from '../types'; // Импортируем тип University

const UniversityDetail: React.FC = () => {
  const { slugOrId } = useParams<{ slugOrId: string }>(); 
  const navigate = useNavigate();
  const { universities, loading, error } = useUniversities(); // Достаем loading и error из контекста
  const { isAuthenticated } = useAuth();

  // Состояния для формы
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Состояние для найденного университета
  const [university, setUniversity] = useState<University | null | undefined>(undefined); // undefined - поиск не завершен, null - не найден

  // --- Эффект для поиска университета при изменении slugOrId или списка universities ---
  useEffect(() => {
    console.log("Effect: slugOrId:", slugOrId, "Loading:", loading, "Universities count:", universities.length);

    // Искать только если есть slugOrId и данные загружены (не в состоянии loading)
    console.log("Effect: slugOrId:", slugOrId, "Loading:", loading, "Universities count:", universities.length);
    if (slugOrId && !loading) { 
      if (universities.length > 0) {
        const foundUniversity = universities.find(u => u.slug === slugOrId || u.id === slugOrId);
        console.log("Effect: Found university:", foundUniversity);
        setUniversity(foundUniversity || null); 
      } else {
        console.log("Effect: Universities array is empty after loading.");
        setUniversity(null); 
      }
    } else if (!slugOrId && !loading) {
        console.log("Effect: slugOrId is missing.");
        setUniversity(null); 
    } else {
        setUniversity(undefined);
    }
  }, [slugOrId, universities, loading]); 

  // --- Обработчик отправки формы (определен ВНЕ useEffect) ---
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    // Используем относительный путь для Vercel / Prod
    const backendUrl = '/api/notify';
    // Для локальной разработки: const backendUrl = 'http://localhost:5001/api/notify';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ name, phone, universityName: university?.name || 'Неизвестный университет' }),
      });

      // Добавим вывод статуса и попытку прочитать тело как текст при ошибке
      console.log("Form Submit Response Status:", response.status);
      if (!response.ok) {
          const errorText = await response.text().catch(() => "Не удалось прочитать тело ошибки");
          console.error("Form Submit Error Response Body:", errorText);
          throw new Error(`Ошибка сервера: ${response.statusText} (Статус: ${response.status})`);
      }

      const result = await response.json(); // Эта строка теперь должна работать, если статус ok
      console.log("Form Submit Response JSON:", result);

      if (result.status === 'ok') {
        setSubmitStatus('success');
        setSubmitMessage('Заявка успешно отправлена! Мы скоро свяжемся с вами.');
        setName(''); setPhone('');
      } else {
        // Если статус ok, но в json нет status='ok'
        throw new Error(result.message || 'Неожиданный ответ от сервера');
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setSubmitStatus('error');
      // Используем сообщение из объекта Error, если оно есть
      setSubmitMessage(error instanceof Error ? error.message : 'Произошла ошибка при отправке.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- Конец обработчика отправки формы ---

  // --- Обработка состояний загрузки и ошибки КОНТЕКСТА ---
  if (loading) {
     return (
        <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
            <Helmet><title>Загрузка...</title></Helmet>
            <Loader2 className="animate-spin h-12 w-12 text-primary" />
            <span className="ml-3 text-gray-600">Загрузка данных университета...</span>
        </div>
     )
  }

  if (error) { // Ошибка загрузки списка университетов
    return (
       <div className="min-h-screen pt-24 pb-16 flex justify-center items-center text-center px-4">
         <Helmet><title>Ошибка загрузки</title></Helmet>
         <p className="text-red-600">{error}</p>
       </div>
    )
  }
  // --- Конец обработки состояний контекста ---

  // --- Отображение "Не найдено" или заглушки поиска ---
  if (university === undefined) { // Поиск еще идет (или slugOrId/universities не готовы)
       return (
           <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
               <Helmet><title>Поиск университета...</title></Helmet>
               <Loader2 className="animate-spin h-12 w-12 text-primary" />
           </div>
       );
   }

  if (university === null) { // Поиск завершен, но университет не найден
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center text-center px-4" data-aos="fade-in">
        <Helmet>
          <title>Университет не найден | Viva-Tour</title>
          <meta name="description" content="Информация об указанном университете не найдена." />
        </Helmet>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Университет не найден</h2>
        <p className="text-gray-600 mb-6">К сожалению, мы не смогли найти информацию по '{slugOrId}'.</p> {/* Используем slugOrId */}
        <Link to="/universities" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
          <ArrowLeft size={18} className="mr-2" /> Вернуться к списку университетов
        </Link>
      </div>
    );
  }
  // --- Конец отображения "Не найдено" / заглушки ---

  // --- Рендеринг деталей, если университет найден ---
  return (
    <>
      <Helmet>
        <title>{university.name} | Университеты Китая | Viva-Tour</title>
        <meta name="description" content={`Подробная информация о ${university.name}: программы, стипендии, требования, стоимость обучения в ${university.location}.`} />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200" data-aos="fade-right">
            <ArrowLeft size={16} className="mr-1" /> Назад к списку
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8" data-aos="fade-down">
            <div className="h-64 md:h-80 relative">
              <img src={university.image || "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"} alt={`Кампус ${university.name}`} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                {university.logo && (<img src={university.logo} alt={`${university.name} Logo`} className="h-12 w-auto mb-3 bg-white p-1 rounded shadow" />)} {/* Добавлена тень */}
                <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">{university.name}</h1> {/* Тень для текста */}
                <div className="flex items-center text-gray-200"><MapPin size={16} className="mr-2 flex-shrink-0" /><span>{university.location}</span></div>
              </div>
            </div>
          </div>

          {isAuthenticated && (<div className="mb-6 text-right" data-aos="fade-left"><Link to={`/admin/edit-university/${university.id}`} className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-colors shadow-sm">Редактировать</Link></div> )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><Info className="w-5 h-5 mr-2 text-blue-600" /> Об университете</h2>
                {university.description ? (<p className="text-gray-700 leading-relaxed text-sm">{university.description}</p>) : (<p className="text-gray-500 italic">Описание университета пока не добавлено.</p>)}
              </div>

              {(university.countryRanking || university.worldRanking) && (
              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="150">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><Award className="w-5 h-5 mr-2 text-indigo-600" /> Рейтинги</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {university.countryRanking && (<div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100"><div className="text-sm text-gray-600 mb-1">Рейтинг в Китае</div><div className="text-2xl font-bold text-indigo-800">#{university.countryRanking}</div></div>)}
                  {university.worldRanking && (<div className="bg-teal-50 p-4 rounded-lg border border-teal-100"><div className="text-sm text-gray-600 mb-1">Мировой рейтинг</div><div className="text-2xl font-bold text-teal-800">#{university.worldRanking}</div></div>)}
                </div>
              </div>
              )}

              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Программы обучения</h2>
                <div className="space-y-3">
                  {university.programs && university.programs.length > 0 ? ( university.programs.map((program, index) => (<div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"><div className="flex justify-between items-center"><div><h3 className="font-medium text-gray-800">{program.name}</h3><div className="text-sm text-gray-600 flex items-center mt-1"><Languages size={14} className="mr-1.5" /> Язык обучения: {program.language}</div></div></div></div>)) ) : (<p className="text-gray-600 italic">Информация о программах обучения на данный момент отсутствует.</p>)}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="250">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><FileCheck className="w-5 h-5 mr-2 text-blue-600" /> Требования к поступлению</h2>
                {university.applicationRequirements && university.applicationRequirements.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {university.applicationRequirements.map((requirement, index) => (<li key={index} className="flex items-start text-sm"><span className="inline-block w-5 h-5 flex-shrink-0 bg-blue-100 text-blue-700 rounded-full text-center leading-5 mr-3 font-semibold text-xs">{index + 1}</span><span className="text-gray-700 mt-px">{requirement}</span></li>))}
                </ul>
                ) : (<p className="text-gray-600 italic mb-4">Требования к поступлению не указаны.</p>)}
                {university.englishRequirements && (<div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md"><div className="font-medium text-yellow-800 mb-1 text-sm">Требования к английскому языку:</div><p className="text-yellow-700 text-sm">{university.englishRequirements}</p></div>)}
                {university.applicationDeadline && (<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start"><Calendar className="w-5 h-5 mr-3 text-red-600 mt-0.5 flex-shrink-0" /><div><div className="font-medium text-red-800 mb-1 text-sm">Крайний срок подачи заявок:</div><p className="text-red-700 text-sm font-semibold">{university.applicationDeadline}</p></div></div>)}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-left" data-aos-delay="200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><Award className="w-5 h-5 mr-2 text-yellow-500" /> Стипендии</h2>
                {university.scholarships && university.scholarships.length > 0 ? (
                <div className="space-y-6">
                  {university.scholarships.map((scholarship, index) => (<div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0"><h3 className="font-semibold text-blue-800 mb-2 text-sm">{scholarship.type}</h3><ul className="space-y-1.5">{scholarship.benefits.map((benefit, idx) => (<li key={idx} className="flex items-start text-sm text-gray-700"><span className="text-green-600 mr-2 font-bold">✓</span>{benefit}</li>))}</ul></div>))}
                </div>
                ) : (<p className="text-gray-600 italic text-sm">Информация о доступных стипендиях не указана.</p>)}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-left" data-aos-delay="250">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><DollarSign className="w-5 h-5 mr-2 text-green-600" /> Дополнительные расходы (приблизительно)</h2>
                {university.additionalCosts && university.additionalCosts.length > 0 ? (
                <div className="space-y-2">
                  {university.additionalCosts.map((cost, index) => (<div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 last:pb-0"><span className="text-gray-700 text-sm">{cost.name}:</span><span className="font-semibold text-gray-900 text-sm">{cost.amount}</span></div>))}
                </div>
                ) : (<p className="text-gray-600 italic text-sm">Информация о дополнительных расходах не указана.</p>)}
              </div>

              <div className="bg-blue-700 rounded-lg shadow-lg p-6 text-white sticky top-24" data-aos="fade-left" data-aos-delay="300">
                <h2 className="text-xl font-bold mb-3">Оставить заявку на консультацию</h2>
                <p className="mb-4 text-blue-100 text-sm">Заполните форму, и наш специалист свяжется с вами для обсуждения деталей поступления в <b>{university.name}</b>.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="cta-name" className="block text-sm font-medium text-blue-100 mb-1">Имя <span className="text-red-300">*</span></label>
                    <input type="text" id="cta-name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white placeholder-gray-500 transition-shadow text-sm" placeholder="Ваше имя" disabled={isSubmitting} aria-required="true"/>
                  </div>
                  <div>
                    <label htmlFor="cta-phone" className="block text-sm font-medium text-blue-100 mb-1">Телефон <span className="text-red-300">*</span></label>
                    <input type="tel" id="cta-phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="\+?[0-9\s\-\(\)]+" title="Введите корректный номер телефона" className="w-full px-3 py-2 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white placeholder-gray-500 transition-shadow text-sm" placeholder="+7 (___) ___-__-__" disabled={isSubmitting} aria-required="true"/>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center py-2.5 px-4 bg-white text-blue-700 font-semibold rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow">
                    {isSubmitting ? (<Loader className="animate-spin w-5 h-5 mr-2" />) : (<Send className="w-5 h-5 mr-2" />)}
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </form>
                {submitStatus !== 'idle' && (<p className={`mt-4 text-xs text-center font-medium ${submitStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>{submitMessage}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UniversityDetail;