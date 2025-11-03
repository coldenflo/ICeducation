import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | PR International Consultancy</title>
        <meta
          name="description"
          content="Read the terms that govern your use of PR International Consultancy’s website, services, and resources for studying in China."
        />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-10 lg:p-12 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-4xl mx-auto">
            <h1 data-aos="fade-down">Terms of Service</h1>

            <p data-aos="fade-up">Last updated: 12 May 2025</p>

            <h2 data-aos="fade-up" data-aos-delay="50">1. Introduction</h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Welcome to PR International Consultancy Pvt Ltd (“PR International Consultancy”, “we”, “us” or “our”).
              These Terms of Service (“Terms”) govern your access to and use of our website, any subdomains, and the
              services, tools, and content provided through it (collectively, the “Services”). By using our Services,
              you agree to these Terms. If you do not agree, please refrain from accessing the website.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="150">2. Services We Provide</h2>
            <p data-aos="fade-up" data-aos-delay="200">
              PR International Consultancy provides advisory and application support services for students seeking to
              study at universities in China. Services include, but are not limited to, academic counselling, programme
              selection, scholarship guidance, document preparation, visa assistance, pre-departure briefings, and
              related logistical support. A detailed overview is available on the{' '}
              <Link to="/services" className="text-primary hover:text-primary/80">Services</Link> page.
            </p>
            <p data-aos="fade-up" data-aos-delay="250">
              We may modify, suspend, or discontinue parts of the Services at any time. Updates will be posted on the
              website; continued use after changes constitutes acceptance of the revised Terms.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="300">3. Acceptable Use</h2>
            <p data-aos="fade-up" data-aos-delay="350">
              You agree to use the Services in compliance with applicable laws and these Terms. You must not:
            </p>
            <ul data-aos="fade-up" data-aos-delay="400">
              <li>Use the Services for unlawful, fraudulent, or harmful purposes.</li>
              <li>Submit inaccurate personal data or impersonate another person or organisation.</li>
              <li>Interfere with or disrupt the operation of the website, servers, or networks.</li>
              <li>Attempt to gain unauthorised access to other accounts, systems, or data.</li>
              <li>Transmit unsolicited marketing messages or spam.</li>
            </ul>

            <h2 data-aos="fade-up" data-aos-delay="450">4. Eligibility</h2>
            <p data-aos="fade-up" data-aos-delay="500">
              To use the Services, you must be at least 16 years old or the age of majority in your jurisdiction. If you
              are accessing on behalf of a minor, you confirm you have parental or guardian authority to do so.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="550">5. Accounts &amp; Security</h2>
            <p data-aos="fade-up" data-aos-delay="600">
              Certain features may require you to create an account. You are responsible for maintaining the
              confidentiality of your login credentials and for all activities under your account. Notify us immediately
              of any unauthorised use.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="650">6. Intellectual Property</h2>
            <p data-aos="fade-up" data-aos-delay="700">
              The website, including text, graphics, logos, icons, images, audio clips, downloads, and software, is the
              property of PR International Consultancy or its licensors and is protected by international copyright,
              trademark, and other intellectual property laws. You may view the content for personal, non-commercial use
              only. Any reproduction, distribution, or derivative work requires prior written consent.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="750">7. User Content</h2>
            <p data-aos="fade-up" data-aos-delay="800">
              By submitting content (e.g., enquiry forms, testimonials, documents), you grant PR International
              Consultancy a non-exclusive, royalty-free licence to use, reproduce, modify, and communicate such content
              for the purpose of delivering Services. You confirm you own or have rights to any content you submit and
              that it does not infringe the rights of third parties.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="850">8. Third-Party Links</h2>
            <p data-aos="fade-up" data-aos-delay="900">
              The website may contain links to third-party sites or services. These are provided for convenience; we do
              not control or endorse third-party content and are not responsible for their policies or practices. Access
              at your own risk.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="950">9. Disclaimer of Warranties</h2>
            <p data-aos="fade-up" data-aos-delay="1000">
              The Services are provided on an “as-is” basis without warranties of any kind, either express or implied,
              including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or
              non-infringement. While we endeavour to keep information accurate and up to date, we make no guarantees
              regarding the completeness, reliability, or availability of the Services.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="1050">10. Limitation of Liability</h2>
            <p data-aos="fade-up" data-aos-delay="1100">
              To the fullest extent permitted by law, PR International Consultancy shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or data arising from your
              use of the Services. Our total liability for any claim related to the Services shall not exceed the amount
              you paid us for the specific service giving rise to the claim.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="1150">11. Indemnification</h2>
            <p data-aos="fade-up" data-aos-delay="1200">
              You agree to indemnify and hold harmless PR International Consultancy, its directors, employees, agents,
              and partners from any claims, liabilities, damages, losses, or expenses (including legal fees) arising
              from your use of the Services, your violation of these Terms, or your infringement of any third-party
              rights.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="1250">12. Termination</h2>
            <p data-aos="fade-up" data-aos-delay="1300">
              We may suspend or terminate your access to the Services at any time, without prior notice, if we believe
              you have violated these Terms or applicable law. Upon termination, your right to use the Services will
              immediately cease.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="1350">13. Governing Law &amp; Dispute Resolution</h2>
            <p data-aos="fade-up" data-aos-delay="1400">
              These Terms are governed by the laws of India, without regard to conflict-of-law principles. Any disputes
              shall be settled amicably; failing that, they will be subject to the exclusive jurisdiction of the courts
              located in Srinagar, Jammu &amp; Kashmir, India.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="1450">14. Changes to These Terms</h2>
            <p data-aos="fade-up" data-aos-delay="1500">
              We may update these Terms periodically. The “Last updated” date indicates when revisions were made. We
              encourage you to review the Terms regularly to stay informed about your rights and responsibilities.
            </p>

            <h2 data-aos="fade-up" data-aos-delay="1550">15. Contact Us</h2>
            <p data-aos="fade-up" data-aos-delay="1600">
              If you have questions about these Terms or wish to exercise any rights, please contact us at:
            </p>
            <ul data-aos="fade-up" data-aos-delay="1650">
              <li>Email: <a href="mailto:pr.international70@gmail.com">pr.international70@gmail.com</a></li>
              <li>Phone / WhatsApp: +86 151 1459 3047</li>
              <li>WeChat: Aadi341</li>
              <li>Head Office: Baghat Chowk, Near Sadar PS Baghat, Srinagar, India</li>
            </ul>

            <p data-aos="fade-up" data-aos-delay="1700">
              For additional information on how we handle personal data, please review our{' '}
              <Link to="/privacypolicy" className="text-primary hover:text-primary/80">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
