import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Clock,
  Award,
  Send,
  Loader,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Heart,
  ShieldCheck,
  Target
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const About: React.FC = () => {
  const licenseGallery = [
    {
      src: 'https://i.postimg.cc/QdgfKy3W/2025-10-19-18-21-42.png',
      alt: 'PR International Consultancy license 1',
      caption: 'KYC Acknowledgement letter from CDSL VENTURES LIMITED ',
    },
    {
      src: 'https://i.postimg.cc/MGdtdfHF/2025-10-19-18-21-37.png',
      alt: 'PR International Consultancy license 2',
      caption: 'Certificate of Incorporation from Government of India Ministry of Corporate Affairs',
    },
    {
      src: 'https://i.postimg.cc/5tVLL43N/2025-10-19-18-36-21.png',
      alt: 'PR International Consultancy collaboration 1',
      caption: 'Academic Collaboration – Chinese Partner University',
    },
    {
      src: 'https://i.postimg.cc/1zr6KkCq/2025-10-19-18-36-16.png',
      alt: 'PR International Consultancy collaboration 2',
      caption: 'Academic Collaboration – Chinese Partner University',
    },
    {
      src: 'https://i.postimg.cc/0Q5SXVFT/2025-10-19-18-36-11.png',
      alt: 'PR International Consultancy collaboration 2',
      caption: 'Academic Collaboration – Chinese Partner University',
    },
    {
      src: 'https://i.postimg.cc/G2MyWk1t/2025-10-19-18-36-02.png',
      alt: 'PR International Consultancy collaboration 2',
      caption: 'Academic Collaboration – Chinese Partner University',
    },
    {
      src: 'https://i.postimg.cc/L5n12nHJ/2025-10-19-18-35-57.png',
      alt: 'PR International Consultancy collaboration 2',
      caption: 'Academic Collaboration – Chinese Partner University',
    },
    {
      src: 'https://i.postimg.cc/Kjwgzxz5/2025-10-19-18-35-53.png',
      alt: 'PR International Consultancy collaboration 2',
      caption: 'Academic Collaboration – Chinese Partner University',
    },
  ];

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isAboutUsExpanded, setIsAboutUsExpanded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    const backendUrl = '/api/notify';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok && result.status === 'ok') {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for contacting us! Our consultants will respond shortly.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || `Server error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'We could not send your message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAboutUsExpansion = () => {
    setIsAboutUsExpanded(!isAboutUsExpanded);
  };

  return (
    <>
      <Helmet>
        <title>About PR International Consultancy | Study in China</title>
        <meta
          name="description"
          content="Discover PR International Consultancy Pvt Ltd — a trusted global education consultancy guiding students to top Chinese universities with multilingual support and end-to-end services."
        />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div
            className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg shadow-lg overflow-hidden mb-16"
            data-aos="fade-down"
          >
            <div className="p-8 md:p-12 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                PR International Consultancy Pvt Ltd.
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                A perfect choice for your study journey with a trusted global partner in China admissions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact-us"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white text-blue-800 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </a>
                <Link
                  to="/services"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-blue-800 transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center" data-aos="fade-up">
            <div data-aos="fade-right">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Profile</h2>
              <div
                className={`space-y-4 text-gray-600 leading-relaxed relative overflow-hidden transition-all duration-700 ${
                  isAboutUsExpanded ? 'max-h-[2200px]' : 'max-h-96'
                }`}
              >
                <p>
                  Founded in 2012 and incorporated with the Government of India in August 2018, PR
                  International Consultancy is a leading education consultancy headquartered in India.
                  We specialise in guiding international students to top-ranked universities across
                  China and deliver bespoke support for every stage of the admission journey.
                </p>
                <p>
                  With a presence in more than 10 countries — including Russia, Morocco, Algeria,
                  Bangladesh, Pakistan, Nepal, Afghanistan, Iran, and Uzbekistan — our multilingual
                  team serves students in English, Russian, Hindi, Spanish, French, Arabic, Urdu, and
                  Bengali. Over 3,000 students have trusted us to plan, apply, and transition to their
                  dream programmes.
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Founded: 2012</li>
                  <li>Incorporated with the Government of India: August 2018</li>
                  <li>Global representation: 10+ countries with 6+ language capabilities</li>
                </ul>
                <p>
                  Our mission is to make world-class Chinese education accessible by combining
                  expert counselling, transparent processes, scholarship facilitation, and on-the-ground
                  partnerships. We empower students worldwide to build successful global careers through
                  education.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                  <h3 className="text-blue-900 font-semibold mb-2">What We Do</h3>
                  <ul className="list-disc ml-6 space-y-2 text-blue-900">
                    <li>University Admission Guidance tailored to every student’s aspirations.</li>
                    <li>Scholarship Assistance for tuition, accommodation, and living support.</li>
                    <li>Visa &amp; Documentation Support with end-to-end application management.</li>
                    <li>Pre-departure Orientation covering travel, accommodation, and cultural acclimation.</li>
                    <li>Multilingual Counselling delivered by experienced regional experts.</li>
                    <li>Global Representation with registered offices for localised support.</li>
                  </ul>
                </div>
                {isAboutUsExpanded && (
                  <>
                    <p>
                      PR International Consultancy is the trusted route to explore new learning
                      opportunities in China. Our goal is to simplify every step, from selecting the
                      right major to settling into campus life, so students and families can focus on
                      academic success and personal growth.
                    </p>
                    <p>
                      Our dedicated team of 22 office staff and six admission heads coordinates
                      applications from students across Africa, South Asia, the Middle East, and beyond.
                      We ensure personalised advice, transparent guidance, and reliable support at
                      every milestone.
                    </p>
                    <p>
                      Communication is seamless with multilingual counsellors who understand the
                      unique needs of each region. Whether you prefer English, Russian, Hindi, Spanish,
                      French, Arabic, Urdu, or Bengali, our advisors are ready to help.
                    </p>
                    <p>
                      <strong>Leadership Spotlight:</strong> Dr. Aadil Mushtaq, Founder &amp; Managing Director,
                      holds an MBBS, MD, and PhD from Harbin Medical University. Since 2012 he has led
                      our strategy, global partnerships, and student services, ensuring every learner
                      benefits from reliable, high-quality guidance. He is joined by a global leadership
                      team, including Md Ibrahim Khalil Sagor (Managing Director, Bangladesh) and Md
                      Sehzad Khurram (China Office).
                    </p>
                    <p>
                      <strong>Core Values:</strong> Compassion drives our student-first approach, professionalism
                      shapes every interaction, and our well-coordinated team collaborates across borders
                      to deliver outstanding results.
                    </p>
                    <p>
                      <strong>Achievements &amp; Milestones:</strong> We have supported more than 3,000 students,
                      secured scholarships for hundreds of applicants, built trusted partnerships with
                      leading Chinese universities, and expanded our registered presence across Asia,
                      Africa, and the Middle East.
                    </p>
                    <p>
                      Our expertise spans popular majors such as Business Administration, Engineering,
                      and MBBS/BDS degrees. From SPOT Admission Days to large-scale seminars — including
                      Admission Seminars in Morocco 2023 and Spot Admission 2024 — we bring universities
                      closer to students through hands-on events and personalised assessments.
                    </p>
                    <p>
                      PR International Consultancy holds official registrations in Bangladesh and Russia,
                      and continues to earn additional authorisations from institutional partners. Our
                      operations are supported by a global network of representatives across Bangladesh,
                      Iran, India, Russia, Pakistan, Nepal, Africa, Afghanistan, and Uzbekistan.
                    </p>
                  </>
                )}
                {!isAboutUsExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 pointer-events-none" />
                )}
              </div>
              <div className="mt-4">
                <button
                  onClick={toggleAboutUsExpansion}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {isAboutUsExpanded ? 'Show less' : 'Read full profile'}
                  {isAboutUsExpanded ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-delay="100">
              <img
                src="https://i.postimg.cc/k5x7k9Kj/2025-10-19-17-55-22.png"
                alt="PR International Consultancy global team"
                className="rounded-lg shadow-md w-100 ml-24 h-auto object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Users size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">3,000+</div>
              <div className="text-gray-600 text-sm">Students guided into Chinese universities</div>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                <Award size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">50+</div>
              <div className="text-gray-600 text-sm">Partner universities across China</div>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
                <Globe size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">10+</div>
              <div className="text-gray-600 text-sm">Countries with local representation</div>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full mb-4">
                <Clock size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">12+</div>
              <div className="text-gray-600 text-sm">Years of specialised experience</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              How We Empower Students
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'University Admission Guidance',
                  description:
                    'Personalised counselling to shortlist universities and programmes that match each student’s ambitions.',
                },
                {
                  title: 'Scholarship Assistance',
                  description:
                    'Dedicated scholarship mentors who help students uncover and secure funding opportunities in China.',
                },
                {
                  title: 'Visa & Documentation Support',
                  description:
                    'Complete assistance with application paperwork, legalisation, and embassy submissions.',
                },
                {
                  title: 'Pre-Departure Orientation',
                  description:
                    'Advisory sessions on travel planning, accommodation, budgeting, and adapting to life in China.',
                },
                {
                  title: 'Multilingual Counselling',
                  description:
                    'Consultations available in English, Russian, Hindi, Spanish, French, Arabic, Urdu, and Bengali.',
                },
                {
                  title: 'Global Representation',
                  description:
                    'Registered offices and partner teams in over ten countries for dependable local support.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start bg-gray-50 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                  data-aos="fade-up"
                >
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-900 text-white rounded-lg shadow-xl p-8 md:p-12 mb-16" data-aos="zoom-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Company Goal</h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              PR International Consultancy is the trusted route for exploring new learning opportunities
              in China. We make quality education accessible by providing honest guidance, comprehensive
              scholarship support, and streamlined admission services. Our commitment is to empower every
              student to build a successful global career through education.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
              Student Support &amp; Career Guidance
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              We prepare students to thrive beyond high school through tailored career guidance and
              admission advisory. Our network of 22 office staff and six admission heads collaborates
              to assist applicants from every corner of the world, ensuring confidence at each step.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start">
                <Target className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                Personalised academic roadmaps aligned with long-term career goals.
              </li>
              <li className="flex items-start">
                <ShieldCheck className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                Dedicated admission managers overseeing documentation, deadlines, and interviews.
              </li>
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                Lifelong support channels for students and families, from pre-arrival to graduation.
              </li>
              <li className="flex items-start">
                <Users className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                Multilingual mentors providing culturally aware guidance for each region.
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Our Licenses, Authorisations, and University Collaborations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {licenseGallery.map((item, index) => (
                <figure
                  key={item.src}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={(index % 2) * 100}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-100 object-cover"
                  />
                  <figcaption className="px-4 py-3 text-sm text-gray-700">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" data-aos="fade-up">
            {[
              {
                name: 'Dr. Aadil Mushtaq',
                title: 'Founder & Managing Director',
                bio: 'MBBS, MD, PhD – Harbin Medical University. Leads strategy, global partnerships, and student services with a vision for accessible international education.',
              },
              {
                name: 'Global Leadership Team',
                title: 'Regional Directors & Admission Heads',
                bio: 'Md Ibrahim Khalil Sagor (Bangladesh), Md Sehzad Khurram (China), and seasoned managers across Africa, South Asia, and the Middle East deliver on-the-ground expertise.',
              },
            ].map((leader) => (
              <div
                key={leader.name}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
                data-aos="fade-up"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold text-lg flex items-center justify-center mr-4">
                    {leader.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{leader.name}</h3>
                    <p className="text-sm text-gray-500">{leader.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{leader.bio}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: <Heart className="w-10 h-10 text-red-500" />,
                  title: 'Compassionate',
                  description: 'We treat every student’s dream as our own and guide with empathy.',
                },
                {
                  icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
                  title: 'Professional',
                  description: 'We uphold transparency, integrity, and compliance in every process.',
                },
                {
                  icon: <Users className="w-10 h-10 text-blue-600" />,
                  title: 'Best Team',
                  description: 'We bring together experts across continents to deliver measurable success.',
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                  data-aos="fade-up"
                >
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
              Achievements &amp; Milestones
            </h2>
            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto">
              <li>3,000+ students assisted with full-cycle admission and onboarding support.</li>
              <li>Registered presence in 10+ countries, including India, Morocco, Bangladesh, Russia, Pakistan, Nepal, Afghanistan, Iran, and Uzbekistan.</li>
              <li>Hundreds of scholarships secured for medical, engineering, and business majors.</li>
              <li>Official registrations in Bangladesh and Russia with expanding authorisations.</li>
              <li>Spot Admission programmes and international seminars such as Morocco 2023 and Spot Admission 2024.</li>
              <li>Partnerships with trusted Chinese universities and healthcare institutions.</li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-inner p-8 md:p-10 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
              Popular Majors
            </h2>
            <p className="text-gray-600 text-center mb-6">
              We specialise in guiding international students toward the most in-demand programmes across China.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Business Administration', 'Engineering', 'MBBS / BDS', 'International Trade', 'Computer Science'].map(
                (major) => (
                  <span
                    key={major}
                    className="px-4 py-2 bg-white text-blue-700 border border-blue-200 rounded-full shadow-sm text-sm font-medium"
                  >
                    {major}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Global Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  region: 'India (Head Office)',
                  address: 'Baghat Chowk, Near Sadar PS Baghat, Srinagar, India',
                  phone: '+91 91494 16118',
                },
                {
                  region: 'Morocco',
                  address: 'KHADAMATE sarl, N20 Av Haj Massoud Alwifkawi Bureau 9, 3rd Floor, Hay Salam, Agadir',
                  phone: '+212 701 178 6543',
                },
                {
                  region: 'Bangladesh',
                  address: '15 Borun Bhaban (2nd Floor), Gulshan Circle 2, Dhaka',
                  phone: '+880 1601 000 368',
                },
                {
                  region: 'Tajikistan',
                  address: 'Park Street, 45/B, Dushanbe',
                  phone: '+992 940 406 733',
                },
                {
                  region: 'China',
                  address: '哈尔滨医大二院家属楼28栋4单元201室, Harbin, China',
                  phone: '+86 151 1459 3047',
                },
                {
                  region: 'UAE',
                  address: 'Ayal Nasir, Naif Police Station, Flat M07 (2nd floor), Dubai',
                  phone: '+971 5695 92818',
                },
              ].map((office) => (
                <div
                  key={office.region}
                  className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white transition-colors shadow-sm"
                  data-aos="fade-up"
                >
                  <div className="flex items-start mb-3">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{office.region}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{office.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-blue-600 mr-2" />
                    <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="text-sm text-blue-700 hover:text-blue-900">
                      {office.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            id="contact-us"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            data-aos="fade-up"
          >
            <div
              className="bg-white rounded-lg shadow-md p-8 order-last lg:order-first"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact PR International Consultancy</h2>
              <div className="space-y-5 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Head Office</div>
                    <p className="text-gray-600 text-sm">
                      Baghat Chowk, Near Sadar PS Baghat, Srinagar, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Phone / WhatsApp</div>
                    <a
                      className="text-gray-600 text-sm hover:text-blue-700 transition-colors"
                      href="tel:+8615114593047"
                    >
                      +86 151 1459 3047
                    </a>
                    <p className="text-gray-500 text-xs mt-1">India: +91 91494 16118 | Morocco: +212 701 178 6543</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Email</div>
                    <a
                      href="mailto:pr.international70@gmail.com"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      pr.international70@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">WeChat</div>
                    <p className="text-gray-600 text-sm">ID: Aadi341</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Global Support</div>
                    <p className="text-gray-600 text-sm">
                      Local advisors in Bangladesh, Iran, India, Russia, Pakistan, Nepal, Africa, Afghanistan, and Uzbekistan.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>
                  <strong>Office Hours:</strong> Monday – Friday, 9:00 – 18:00 (Beijing Time)
                </p>
                <p>
                  For more details, feel free to talk to us or connect through WhatsApp and WeChat for
                  quick assistance.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md p-8"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-gray-700 font-medium mb-1.5 text-sm"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
                    placeholder="How should we address you?"
                    disabled={isSubmitting}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-gray-700 font-medium mb-1.5 text-sm"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-gray-700 font-medium mb-1.5 text-sm"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    pattern="\+?[0-9\s\-\(\)]+"
                    title="Please enter a valid phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
                    placeholder="+86 151 1459 3047"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-gray-700 font-medium mb-1.5 text-sm"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
                    placeholder="How can we help?"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-gray-700 font-medium mb-1.5 text-sm"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
                    placeholder="Tell us about your study plans and questions..."
                    disabled={isSubmitting}
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin w-5 h-5 mr-3" />
                  ) : (
                    <Send className="w-5 h-5 mr-3" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus !== 'idle' && (
                  <div
                    className={`mt-4 p-3 rounded-md text-sm text-center ${
                      submitStatus === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
