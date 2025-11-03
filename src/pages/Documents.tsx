// src/pages/Documents.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileText, FileCheck, FilePlus } from 'lucide-react';
import { documents } from '../data/documents';
import DocumentCard from '../components/DocumentCard';

const Documents: React.FC = () => {
  const generalDocuments = documents.filter(doc => doc.requiredFor === 'Всех типов заявок');
  const bachelorDocuments = documents.filter(doc => doc.requiredFor === 'Программ бакалавриата (и выше)');

  return (
    <> {/* Фрагмент */}
      <Helmet>
        <title>Необходимые документы при поступлении | Поступление в Китай | Viva-Tour</title>
        <meta name="description" content="Подробный перечень документов для поступления в Китай" />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden"> {/* Добавлен overflow-hidden */}
        <div className="container mx-auto px-4">
          {/* Заголовок страницы */}
          <div data-aos="fade-down">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">Необходимые документы</h1>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Список основных документов, необходимых для поступления в университеты Китая.
            </p>
          </div>

          {/* Секция "Общая информация" */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12" data-aos="fade-up">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              Общая информация о документах
            </h2>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Для успешного поступления в университеты Китая требуется тщательно подготовить пакет документов. Некоторые документы являются стандартными и обязательными для всех типов программ и уровней обучения, в то время как другие (например, рекомендательные или мотивационные письма) могут потребоваться дополнительно, особенно для программ бакалавриата и магистратуры.
            </p>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Обратите особое внимание на сроки действия некоторых документов: медицинская справка и справка об отсутствии судимости обычно должны быть выданы не ранее, чем за 6 месяцев до предполагаемой даты подачи заявления в ВУЗ.
            </p>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md mt-6">
              <p className="text-yellow-800 text-sm font-medium">
                <strong>Важно:</strong> Все документы, составленные не на английском или китайском языке, должны сопровождаться официальным переводом на один из этих языков. Перевод должен быть выполнен сертифицированным переводчиком и нотариально заверен.
              </p>
            </div>
          </div>

          {/* Секция "Основные документы" */}
          <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FileCheck className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" />
              Основные документы (для всех программ)
            </h2>
            {generalDocuments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generalDocuments.map((document, index) => (
                   <div key={document.id} data-aos="fade-up" data-aos-delay={ (index % 3) * 50 }>
                     <DocumentCard document={document} />
                   </div>
                ))}
              </div>
            ) : ( <p className="text-gray-500 italic text-center py-4">Основные документы не найдены (проверьте фильтр).</p> )}
          </div>

          {/* Секция "Дополнительные документы" */}
          <div className="mb-12" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FilePlus className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0" />
              Дополнительные документы (для бакалавриата и выше)
            </h2>
            {bachelorDocuments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bachelorDocuments.map((document, index) => (
                  <div key={document.id} data-aos="fade-up" data-aos-delay={ (index % 3) * 50 }>
                     <DocumentCard document={document} />
                  </div>
                ))}
              </div>
            ) : ( <p className="text-gray-500 italic text-center py-4">Дополнительные документы не найдены (проверьте фильтр).</p> )}
          </div>

          {/* Секция "Процесс подачи" */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Процесс подачи документов (общая схема)</h2>
            <ol className="space-y-5">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-4 font-semibold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Подготовка и сбор</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Соберите все необходимые документы согласно списку требований выбранного университета. Проверьте сроки действия и формат.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-4 font-semibold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Перевод и заверение</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Осуществите нотариально заверенный перевод документов на английский или китайский язык (если требуется).</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-4 font-semibold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Заполнение анкеты и подача</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Заполните онлайн-анкету на портале университета или через нашу систему и загрузите сканы подготовленных документов.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-4 font-semibold">4</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Рассмотрение и ожидание</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Приемная комиссия рассматривает вашу заявку. Сроки рассмотрения могут варьироваться.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-4 font-semibold">5</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Получение приглашения и виза</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">В случае положительного решения вы получите официальное приглашение (Admission Notice) и форму JW201/JW202 для оформления студенческой визы (X1/X2).</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Секция "Призыв к действию" */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg shadow-xl p-8 md:p-12 text-white text-center" data-aos="zoom-in" data-aos-delay="100">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Возникли сложности с документами?</h2>
            <p className="text-lg md:text-xl mb-8">Наша команда поможет вам собрать полный пакет документов, правильно их оформить и перевести, чтобы максимально повысить ваши шансы на поступление.</p>
            <Link to="/about#contact-us" className="inline-block px-8 py-3 bg-white text-indigo-700 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg text-lg">Запросить помощь</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Documents;