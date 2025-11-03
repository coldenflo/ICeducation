import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileText, FileCheck, FilePlus } from 'lucide-react';
import { documents } from '../data/documents';
import DocumentCard from '../components/DocumentCard';

const Documents: React.FC = () => {
  const generalDocuments = documents.filter((doc) => doc.requiredFor === 'All application types');
  const bachelorDocuments = documents.filter(
    (doc) => doc.requiredFor === 'Undergraduate programmes (and above)'
  );

  return (
    <>
      <Helmet>
        <title>Required Documents | PR International Consultancy</title>
        <meta
          name="description"
          content="Review the essential documents you need to study in China with PR International Consultancy — from passports and transcripts to medical checks and recommendation letters."
        />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div data-aos="fade-down">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">
              Required Documents for Studying in China
            </h1>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Use this checklist to prepare your application package. PR International Consultancy will
              review each document, suggest improvements, and ensure it meets the requirements of your
              chosen universities.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12" data-aos="fade-up">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              Document Overview
            </h2>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Chinese universities require a detailed portfolio to evaluate academic readiness, language
              proficiency, and personal suitability. Some items are mandatory for every student, while
              additional materials are necessary for undergraduate and higher-level degree programmes.
            </p>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              PR International Consultancy assists with notarised translations, verification, and
              application portal uploads. Always check the validity period of documents such as medical
              reports and police clearances — they typically must be issued within six months of
              submission.
            </p>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md mt-6">
              <p className="text-yellow-800 text-sm font-medium">
                <strong>Important:</strong> Documents not issued in English or Chinese must be translated
                and notarised by a certified translator. Our team can coordinate translations and legalisations
                in your home country.
              </p>
            </div>
          </div>

          <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FileCheck className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" />
              Core Documents for All Applications
            </h2>
            {generalDocuments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generalDocuments.map((document, index) => (
                  <div key={document.id} data-aos="fade-up" data-aos-delay={(index % 3) * 50}>
                    <DocumentCard document={document} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center py-4">
                No core documents found. Please revise the filter or contact our team for guidance.
              </p>
            )}
          </div>

          <div className="mb-12" data-aos="fade-up" data-aos-delay="150">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FilePlus className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" />
              Additional Documents for Undergraduate &amp; Higher Degrees
            </h2>
            {bachelorDocuments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bachelorDocuments.map((document, index) => (
                  <div key={document.id} data-aos="fade-up" data-aos-delay={(index % 3) * 50}>
                    <DocumentCard document={document} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center py-4">
                No additional documents are required at this time.
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10" data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Need Help Preparing Your File?
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Our admission specialists review every document for accuracy, help you request official
              letters, and keep track of deadlines. We also provide templates for recommendation letters
              and personal statements tailored to Chinese universities.
            </p>
            <div className="text-center">
              <Link
                to="/services"
                className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Explore Our Support Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
