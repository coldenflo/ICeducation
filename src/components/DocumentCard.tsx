import React from 'react';
import { FileText } from 'lucide-react';
import { Document } from '../types';



interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="mr-4 text-blue-600">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{document.title}</h3>
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mb-2">
              {document.requiredFor}
            </span>
            <p className="text-gray-600">{document.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;