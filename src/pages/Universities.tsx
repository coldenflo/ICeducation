// src/pages/Universities.tsx
import React, { useState } from 'react';
import { useUniversities } from '../context/UniversityContext';
import UniversityCard from '../components/UniversityCard';
import { Search, Loader2 } from 'lucide-react'; // <-- ИСПРАВЛЕНО: Loader2 вместо LoaderCircle
import { Helmet } from 'react-helmet-async';

const Universities: React.FC = () => {
  const { universities, loading, error } = useUniversities();
  const [searchTerm, setSearchTerm] = useState('');

  // --- Фильтрация ---
  const filteredUniversities = universities.filter(university =>
    (university.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (university.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (university.programs?.some(program =>
      (program.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    ))
  );
  // --- Конец Фильтрации ---

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 ">
      <Helmet>
        <title>Университеты Китая | Партнеры Viva-Tour</title>
        <meta name="description" content="Список университетов Китая, доступных для поступления с помощью Viva-Tour. Найдите подходящий ВУЗ и программу." />
      </Helmet>
      <div className="container mx-auto px-4">
        {/* Заголовок и подзаголовок */}
        <div data-aos="fade-down">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Университеты Китая</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">Все университеты с грантами!</p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 max-w-2xl mx-auto" data-aos="fade-up">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
              placeholder="Поиск по названию, городу или программе..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Состояния загрузки, ошибки или отсутствия результатов */}
        {loading ? (
          <div className="flex justify-center items-center h-64" data-aos="fade-in">
             {/* Используем Loader2 */}
            <Loader2 className="animate-spin h-12 w-12 text-primary" /> 
            <span className="ml-3 text-gray-600">Загрузка университетов...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-md" data-aos="fade-in">{error}</div>
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center text-gray-500 p-6 bg-white rounded-lg shadow-md" data-aos="fade-in">
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p>По вашему запросу "{searchTerm}" университеты не найдены. Попробуйте изменить или упростить поисковый запрос.</p>
          </div>
        ) : (
          // Сетка университетов
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.map((university, index) => (
              <div key={university.id} data-aos="fade-up" data-aos-delay={ (index % 3) * 100 }>
                <UniversityCard university={university} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Universities;