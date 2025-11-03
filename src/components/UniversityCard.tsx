import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Award, Book } from 'lucide-react';
import { University } from '../types'; // Убедитесь, что путь к типам правильный

interface UniversityCardProps {
  university: University;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  console.log(`Rendering card for: ${university.name}, Logo URL:`, university.logo);
  const detailLink = university.slug ? `/universities/${university.slug}` : `/universities/${university.id}`;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={university.image || 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg'}
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {university.logo && (
          <img
            src={university.logo}
            alt={`${university.name} logo`}
            className="absolute top-2 left-2 w-12 h-12 rounded-full bg-white p-1 shadow-md object-contain z-10" // Добавлен z-10 на всякий случай, чтобы гарантировать слой поверх
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{university.name}</h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span>{university.location}</span>
        </div>

        {(university.countryRanking || university.worldRanking) && (
          <div className="flex items-center space-x-4 mb-3">
            {university.countryRanking && (
              <div className="flex items-center text-blue-600">
                <Award size={16} className="mr-1" />
                <span>В стране: #{university.countryRanking}</span>
              </div>
            )}
            {university.worldRanking && (
              <div className="flex items-center text-green-600">
                <Award size={16} className="mr-1" />
                <span>В мире: #{university.worldRanking}</span>
              </div>
            )}
          </div>
        )}

        {university.programs.length > 0 && (
            <div className="mb-4">
                <div className="font-medium text-gray-700 mb-1 flex items-center">
                    <Book size={16} className="mr-1" />
                    <span>Программы:</span>
                </div>
                <ul className="text-gray-600 ml-5 list-disc">
                    {university.programs.slice(0, 3).map((program, index) => (
                    <li key={index}>{program.name} ({program.language})</li> 
                    ))}
                    {university.programs.length > 3 && <li>...</li>}
                </ul>
            </div>
        )}


        {university.scholarships.length > 0 && ( 
            <div className="mb-4">
                <div className="font-medium text-gray-700 mb-1">Стипендии:</div>
                <div className="flex flex-wrap gap-2">
                    {university.scholarships.map((scholarship, index) => (
                    <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                    >
                        {scholarship.type}
                    </span>
                    ))}
                </div>
            </div>
        )}


        <Link
          to={detailLink}
          className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard;