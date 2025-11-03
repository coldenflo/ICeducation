// src/components/ServiceCard.tsx
import React from 'react';
import { Service } from '../types'; // Убедитесь, что путь к типам правильный
import {
  GraduationCap,
  MessageCircle,
  CreditCard,
  HelpCircle, // Будет использоваться как иконка по умолчанию
  MapPin,
  Plane,
  DollarSign,
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  GraduationCap: GraduationCap,
  MessageCircle: MessageCircle,
  CreditCard: CreditCard,
  HelpCircle: HelpCircle, // HelpCircle тоже в карте, на случай если он указан в данных
  MapPin: MapPin,
  Plane: Plane,
  DollarSign: DollarSign,
};

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.icon] || HelpCircle;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      {/* Блок для иконки */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-primary"> {/* Используйте цвет text-blue-600 или ваш primary */}
          {/* Динамически рендерим иконку */}
          <IconComponent className="w-6 h-6" />
        </div>
      </div>

      {/* Заголовок */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        {service.title}
      </h3>

      {/* Описание */}
      <p className="text-gray-600 text-sm leading-relaxed flex-grow text-center">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;