// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, FileText, Globe } from 'lucide-react';
import { useUniversities } from '../context/UniversityContext';
import UniversityCard from '../components/UniversityCard';
import { Helmet } from 'react-helmet-async';

const Home: React.FC = () => {
  const { universities } = useUniversities();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Study in China with PR China Admissions</title>
        <meta
          name="description"
          content="PR China Admissions Pvt Ltd guides international students into top Chinese universities with admission counselling, scholarships, and multilingual support."
        />
      </Helmet>

      <section className="pt-32 pb-20 bg-gradient-to-r from-blue-900/80 via-blue-700/70 to-primary/60 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left" data-aos="fade-right" data-aos-delay="100">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Your Gateway to Chinese Universities
              </h1>
              <p className="text-xl text-white/90 mb-8">
                PR China Admissions connects you with leading universities across China and
                supports every step — from counselling and scholarships to visas and arrival.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  to="/universities"
                  className="px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
                >
                  Explore Universities
                </Link>
                <Link
                  to="/documents"
                  className="px-6 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary/90 transition-colors shadow-md hover:shadow-lg"
                >
                  Application Guide
                </Link>
              </div>
            </div>
            <div className="md:w-1/2" data-aos="fade-left" data-aos-delay="300">
              <img
                src="https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?cs=srgb&dl=pexels-keira-burton-6147369.jpg&fm=jpg"
                alt="International students celebrating graduation"
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto md:max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" data-aos="fade-up">
            Why Students Choose PR China Admissions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Top Chinese Universities</h3>
              <p className="text-gray-600 text-sm">
                Access curated degree programmes with trusted partners throughout China.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="inline-block p-3 rounded-full bg-secondary/10 text-secondary mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Scholarship Expertise</h3>
              <p className="text-gray-600 text-sm">
                Discover grant options with mentors who specialise in scholarship acquisition.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="inline-block p-3 rounded-full bg-blue-500/10 text-blue-600 mb-4">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Documents Simplified</h3>
              <p className="text-gray-600 text-sm">
                Rely on visa and documentation specialists to navigate requirements with ease.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="inline-block p-3 rounded-full bg-green-500/10 text-green-600 mb-4">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ongoing Global Support</h3>
              <p className="text-gray-600 text-sm">
                Stay connected to advisers in 10+ countries for arrival, housing, and career guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4" data-aos="fade-up">
            Featured Universities
          </h2>
          <p
            className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Review a snapshot of our partner institutions in China that offer exceptional programmes,
            competitive tuition, and generous scholarship pathways.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.slice(0, 3).map((university, index) => (
              <div key={university.id} data-aos="fade-up" data-aos-delay={index * 150}>
                <UniversityCard university={university} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12" data-aos="fade-up">
            <Link
              to="/universities"
              className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors shadow hover:shadow-md"
            >
              View All Universities
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-secondary to-orange-500 text-white" data-aos="zoom-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact PR China Admissions today to discuss programmes, scholarship timelines,
            and the best route into your dream university in China.
          </p>
          <Link
            to="/about#contact-us"
             onClick={(e) => {
                 if (window.location.pathname === '/about') {
                    e.preventDefault();
                    document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
                 }
             }}
            className="px-8 py-4 bg-white text-secondary font-bold rounded-md hover:bg-gray-100 transition-colors text-lg shadow-lg hover:shadow-xl"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
