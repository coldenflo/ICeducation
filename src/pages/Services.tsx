import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';

const Services: React.FC = () => {
  const [isWhyUsExpanded, setIsWhyUsExpanded] = useState(false);
  const toggleWhyUsExpansion = () => setIsWhyUsExpanded(!isWhyUsExpanded);

  return (
    <>
      <Helmet>
        <title>Services | PR International Consultancy</title>
        <meta
          name="description"
          content="Discover the full suite of services from PR International Consultancy — admissions counselling, scholarships, visa processing, pre-departure preparation, and multilingual student support for China."
        />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div data-aos="fade-down">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">
              Comprehensive Services for Your China Admission Journey
            </h1>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              From your first counselling call to settling into campus accommodation, PR International
              Consultancy delivers every service required to study successfully in China.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={service.id} data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Why Partner with PR International Consultancy?
            </h2>
            <div
              className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
                isWhyUsExpanded ? 'max-h-[1000px]' : 'max-h-60'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  {
                    title: '12+ Years of Proven Experience',
                    description:
                      'Since 2012 we have guided thousands of students into medical, engineering, and business programmes across China.',
                  },
                  {
                    title: 'Direct University Partnerships',
                    description:
                      'We collaborate with admission offices at 50+ reputed Chinese universities to deliver fast, transparent responses.',
                  },
                  {
                    title: 'Personalised Admission Roadmaps',
                    description:
                      'Every student receives a customised plan aligned with academic strengths, budget, and long-term aspirations.',
                  },
                  {
                    title: 'High Success & Scholarship Rates',
                    description:
                      'Our meticulous documentation and coaching translate to exceptional admission offers and scholarship conversions.',
                  },
                  {
                    title: 'Support from Application to Arrival',
                    description:
                      'From paperwork to visas, travel, housing, and wellness — we stand by you and your family at every milestone.',
                  },
                  {
                    title: 'Multilingual Global Team',
                    description:
                      'Counsellors across Asia, Africa, and the Middle East assist in English, Russian, Hindi, Spanish, French, Arabic, Urdu, and Bengali.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {!isWhyUsExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={toggleWhyUsExpansion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isWhyUsExpanded ? 'Show less' : 'Read more'}
                {isWhyUsExpanded ? (
                  <ChevronUp className="ml-2 -mr-1 h-5 w-5" />
                ) : (
                  <ChevronDown className="ml-2 -mr-1 h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-16" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Student Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  initials: 'SI',
                  name: 'Sara I.',
                  subtitle: 'MBBS Student, Harbin Medical University',
                  quote:
                    'PR International Consultancy made my MBBS admission seamless. They prepared my documents, secured my scholarship, and even arranged airport pickup. I felt supported from day one.',
                },
                {
                  initials: 'MA',
                  name: 'Mohammed A.',
                  subtitle: 'Engineering Student, Beijing Jiaotong University',
                  quote:
                    'Their counsellors matched me with the perfect engineering programme and helped with my visa interview. The multilingual team understood my family’s concerns and answered every question.',
                },
                {
                  initials: 'NB',
                  name: 'Nargiza B.',
                  subtitle: 'Business Administration, Shanghai University',
                  quote:
                    'From spot admission in Tashkent to finding housing in Shanghai, PR International Consultancy was with me the entire way. Their guidance made studying abroad achievable.',
                },
              ].map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={150 + index * 100}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.subtitle}</div>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 italic text-sm leading-relaxed flex-grow">
                    “{testimonial.quote}”
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg shadow-xl p-8 md:p-12 text-white text-center"
            data-aos="zoom-in"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Begin Your Study Journey in China?
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Request a free consultation to receive a tailored admission plan, scholarship insights,
              and next steps for securing your offer.
            </p>
            <Link
              to="/about#contact-us"
              className="inline-block px-8 py-3 bg-white text-indigo-700 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg text-lg"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
