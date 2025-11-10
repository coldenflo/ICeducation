import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Calendar,
  Award,
  DollarSign,
  FileCheck,
  Languages,
  ArrowLeft,
  Send,
  Loader,
  Info,
  Loader2,
  Book
} from 'lucide-react';
import { useUniversities } from '../context/UniversityContext';
import { useAuth } from '../context/AuthContext';
import { University } from '../types';

const UniversityDetail: React.FC = () => {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const navigate = useNavigate();
  const { universities, loading, error } = useUniversities();
  const { isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const [university, setUniversity] = useState<University | null | undefined>(undefined);

  useEffect(() => {
    if (slugOrId && !loading) {
      if (universities.length > 0) {
        const foundUniversity = universities.find(
          (item) => item.slug === slugOrId || item.id === slugOrId
        );
        setUniversity(foundUniversity || null);
      } else {
        setUniversity(null);
      }
    } else if (!slugOrId && !loading) {
      setUniversity(null);
    } else {
      setUniversity(undefined);
    }
  }, [slugOrId, universities, loading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    const backendUrl = '/api/notify';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          universityName: university?.name || 'Unknown university',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unable to read error body');
        throw new Error(
          `Server error: ${response.statusText} (status ${response.status}). ${errorText}`
        );
      }

      const result = await response.json();

      if (result.status === 'ok') {
        setSubmitStatus('success');
        setSubmitMessage('Your request has been sent! We will contact you soon.');
        setName('');
        setPhone('');
      } else {
        throw new Error(result.message || 'Unexpected response from the server.');
      }
    } catch (submitError) {
      console.error('University detail form error:', submitError);
      setSubmitStatus('error');
      setSubmitMessage(
        submitError instanceof Error
          ? submitError.message
          : 'We could not submit the form. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        <Helmet>
          <title>Loading… | PR China Admissions</title>
        </Helmet>
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
        <span className="ml-3 text-gray-600">Loading university data…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center text-center px-4">
        <Helmet>
          <title>Unable to Load | PR China Admissions</title>
        </Helmet>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (university === undefined) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        <Helmet>
          <title>Searching… | PR China Admissions</title>
        </Helmet>
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (university === null) {
    return (
      <div
        className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center text-center px-4"
        data-aos="fade-in"
      >
        <Helmet>
          <title>University Not Found | PR China Admissions</title>
          <meta name="description" content="The requested university could not be found." />
        </Helmet>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">University not found</h2>
        <p className="text-gray-600 mb-6">
          We could not find a university with the identifier “{slugOrId}”.
        </p>
        <Link
          to="/universities"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to universities
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{university.name} | PR China Admissions</title>
        <meta
          name="description"
          content={`Explore study options at ${university.name}: programs, scholarships, requirements, and estimated costs in ${university.location}.`}
        />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
            data-aos="fade-right"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>

          <div
            className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            data-aos="fade-down"
          >
            <div className="h-64 md:h-80 relative">
              <img
                src={
                  university.image ||
                  'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg'
                }
                alt={`${university.name} campus`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {university.name}
                    </h1>
                    <div className="flex items-center text-white/90 text-sm md:text-base">
                      <MapPin size={18} className="mr-2" />
                      <span>{university.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {typeof university.countryRanking === 'number' && (
                      <div className="bg-white/90 text-blue-900 px-4 py-2 rounded-md text-sm font-semibold">
                        China ranking: #{university.countryRanking}
                      </div>
                    )}
                    {typeof university.worldRanking === 'number' && (
                      <div className="bg-white/90 text-green-900 px-4 py-2 rounded-md text-sm font-semibold">
                        Global ranking: #{university.worldRanking}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isAuthenticated && (
            <div className="mb-6 text-right" data-aos="fade-left">
              <Link
                to={`/admin/edit-university/${university.id}`}
                className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-colors shadow-sm"
              >
                Edit university
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  About the university
                </h2>
                {university.description ? (
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {university.description}
                  </p>
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    No overview is currently available for this university.
                  </p>
                )}
              </div>

              {university.programs && university.programs.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="50">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Book size={18} className="mr-2 text-indigo-600" />
                    Programme highlights
                  </h2>
                  <ul className="space-y-3">
                    {university.programs.map((program, index) => (
                      <li
                        key={index}
                        className="flex flex-wrap items-center justify-between border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                      >
                        <span className="text-gray-700 text-sm md:text-base">{program.name}</span>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-3 py-1 mt-2 md:mt-0">
                          {program.language}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {university.applicationRequirements && university.applicationRequirements.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="100">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FileCheck className="w-5 h-5 mr-2 text-emerald-600" />
                    Application checklist
                  </h2>
                  <ul className="space-y-2 list-disc list-inside text-gray-700 text-sm md:text-base">
                    {university.applicationRequirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                  {university.englishRequirements && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="font-medium text-yellow-800 mb-1 text-sm flex items-center">
                        <Languages className="w-4 h-4 mr-2" />
                        English proficiency
                      </div>
                      <p className="text-yellow-700 text-sm">{university.englishRequirements}</p>
                    </div>
                  )}
                  {university.applicationDeadline && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-red-800 mb-1 text-sm">Application deadline</div>
                        <p className="text-red-700 text-sm font-semibold">
                          {university.applicationDeadline}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-left" data-aos-delay="200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Scholarships
                </h2>
                {university.scholarships && university.scholarships.length > 0 ? (
                  <div className="space-y-6">
                    {university.scholarships.map((scholarship, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0"
                      >
                        <h3 className="font-semibold text-blue-800 mb-2 text-sm">
                          {scholarship.type}
                        </h3>
                        <ul className="space-y-1.5">
                          {scholarship.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <span className="text-green-600 mr-2 font-bold">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 italic text-sm">
                    Scholarship information is not currently available.
                  </p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-left" data-aos-delay="250">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Estimated additional costs
                </h2>
                {university.additionalCosts && university.additionalCosts.length > 0 ? (
                  <div className="space-y-2">
                    {university.additionalCosts.map((cost, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 last:pb-0"
                      >
                        <span className="text-gray-700 text-sm">{cost.name}</span>
                        <span className="font-semibold text-gray-900 text-sm">{cost.amount}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 italic text-sm">No cost breakdown provided.</p>
                )}
              </div>

              <div
                className="bg-blue-700 rounded-lg shadow-lg p-6 text-white sticky top-24"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <h2 className="text-xl font-bold mb-3">Request a consultation</h2>
                <p className="mb-4 text-blue-100 text-sm">
                  Share your details and our counsellor will reach out to discuss studying at{' '}
                  <b>{university.name}</b>.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="cta-name"
                      className="block text-sm font-medium text-blue-100 mb-1"
                    >
                      Name <span className="text-red-300">*</span>
                    </label>
                    <input
                      type="text"
                      id="cta-name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white placeholder-gray-500 transition-shadow text-sm"
                      placeholder="Your name"
                      disabled={isSubmitting}
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cta-phone"
                      className="block text-sm font-medium text-blue-100 mb-1"
                    >
                      Phone <span className="text-red-300">*</span>
                    </label>
                    <input
                      type="tel"
                      id="cta-phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      pattern="\+?[0-9\s\-\(\)]+"
                      title="Please enter a valid phone number"
                      className="w-full px-3 py-2 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white placeholder-gray-500 transition-shadow text-sm"
                      placeholder="+86 151 1459 3047"
                      disabled={isSubmitting}
                      aria-required="true"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-2.5 px-4 bg-white text-blue-700 font-semibold rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow"
                  >
                    {isSubmitting ? (
                      <Loader className="animate-spin w-5 h-5 mr-2" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? 'Sending…' : 'Send request'}
                  </button>
                </form>
                {submitStatus !== 'idle' && (
                  <p
                    className={`mt-4 text-xs text-center font-medium ${
                      submitStatus === 'success' ? 'text-green-300' : 'text-red-300'
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversityDetail;
