import React from 'react';
import { Service } from '../types';
import {
  GraduationCap,
  MessageCircle,
  CreditCard,
  HelpCircle,
  MapPin,
  Plane,
  DollarSign,
  FileText,
  CalendarCheck,
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  GraduationCap: GraduationCap,
  MessageCircle: MessageCircle,
  CreditCard: CreditCard,
  HelpCircle: HelpCircle,
  MapPin: MapPin,
  Plane: Plane,
  DollarSign: DollarSign,
  FileText: FileText,
  CalendarCheck: CalendarCheck,
};

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.icon] || HelpCircle;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <div className="mb-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-primary">
          <IconComponent className="w-6 h-6" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        {service.title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed flex-grow text-center">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;
