import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-secondary" />
              <span className="text-xl font-bold">PR China Admissions</span>
            </div>
            <p className="text-gray-300 mb-4">
              A trusted global education consultancy guiding students to leading Chinese universities with end-to-end admission, scholarship, and relocation support.
            </p>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>WeChat: Aadi341</p>
              <p>Phone / WhatsApp: <a className="hover:text-secondary" href="tel:+8615114593047">+86 151 1459 3047</a></p>
              <p>Email: <a className="hover:text-secondary" href="mailto:pr.international70@gmail.com">pr.international70@gmail.com</a></p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Global Offices</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-secondary mr-3 mt-1.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Head Office India: Baghat Chowk, Near Sadar PS Baghat, Srinagar, India
                </p>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-secondary mr-3 mt-1.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Morocco Office: KHADAMATE sarl, N20 Av Haj Massoud Alwifkawi Bureau 9, 3rd Floor, Hay Salam, Agadir
                </p>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-secondary mr-3 mt-1.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Bangladesh Office: 15 Borun Bhaban (2nd Floor), Gulshan Circle 2, Dhaka
                </p>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-secondary mr-3 mt-1.5 flex-shrink-0" />
                <p className="text-gray-300">
                  China Office: 哈尔滨医大二院家属楼28栋4单元201室, Harbin, China
                </p>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-secondary mr-3 mt-1.5 flex-shrink-0" />
                <p className="text-gray-300">+91 91494 16118 (India) | +212 701 178 6543 (Morocco) | +880 1601 000 368 (Bangladesh)</p>
              </div>
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-secondary mr-3 mt-1.5 flex-shrink-0" />
                <p className="text-gray-300">pr.international70@gmail.com</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/universities" className="text-gray-300 hover:text-secondary transition-colors">Universities</Link></li>
              <li><Link to="/documents" className="text-gray-300 hover:text-secondary transition-colors">Application Guide</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} PR China Admissions Pvt Ltd. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="/privacypolicy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/termsofservice" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
