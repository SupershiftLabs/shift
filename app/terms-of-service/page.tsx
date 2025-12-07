import React from 'react';

export const metadata = {
  title: 'Terms of Service | SuperShift Labs',
  description: 'Terms of Service for SuperShift Labs - Read our terms and conditions for using our services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/20 py-20 px-6">
      <article className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last Updated: December 7, 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding agreement between you and SuperShift Labs ("Company," "we," "us," or "our") concerning your access to and use of our website <a href="https://supershiftlabs.com" className="text-green-400 hover:underline">supershiftlabs.com</a> and any related services (collectively, the "Services").
            </p>
            <p className="leading-relaxed mt-4">
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">2. Services Description</h2>
            <p className="leading-relaxed mb-3">
              SuperShift Labs provides digital services including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Web development and design</li>
              <li>Mobile application development</li>
              <li>Cloud solutions and infrastructure</li>
              <li>Brand identity and design services</li>
              <li>Digital consulting and strategy</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Specific terms for individual projects will be outlined in separate Service Agreements or Statements of Work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">3. Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least 18 years of age to use our Services. By using our Services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">4. User Accounts</h2>
            <p className="leading-relaxed mb-3">
              When you create an account with us or use our Services, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate and current</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="leading-relaxed mt-4">
              We reserve the right to suspend or terminate your account if any information provided is inaccurate, fraudulent, or violates these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">5. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.1 Our Content</h3>
            <p className="leading-relaxed">
              All content, features, and functionality on our website, including but not limited to text, graphics, logos, images, software, and design, are the exclusive property of SuperShift Labs and are protected by United States and international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.2 Client Content</h3>
            <p className="leading-relaxed">
              When you provide content, materials, or information to us for use in projects, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing Services to you.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.3 Project Deliverables</h3>
            <p className="leading-relaxed">
              Upon full payment for services rendered, you will receive the agreed-upon intellectual property rights to project deliverables as specified in your Service Agreement. We retain the right to use project work in our portfolio unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">6. Prohibited Uses</h2>
            <p className="leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use our Services for any unlawful purpose or in violation of these Terms</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the operation of our Services</li>
              <li>Upload or transmit viruses, malware, or other malicious code</li>
              <li>Collect or harvest information about other users without their consent</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Engage in any activity that could damage, disable, or impair our Services</li>
              <li>Use automated systems (bots, scrapers) to access our Services without permission</li>
              <li>Violate any applicable local, state, national, or international law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">7. Payment Terms</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.1 Fees</h3>
            <p className="leading-relaxed">
              Fees for our Services will be outlined in individual Service Agreements or quotes. All fees are in US Dollars unless otherwise specified.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.2 Payment Schedule</h3>
            <p className="leading-relaxed">
              Payment terms will be specified in your Service Agreement. Typical payment structures include upfront deposits, milestone payments, or net payment terms (e.g., Net 30).
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.3 Late Payments</h3>
            <p className="leading-relaxed">
              Late payments may be subject to interest charges of 1.5% per month or the maximum rate permitted by law, whichever is less. We reserve the right to suspend Services for accounts with outstanding balances.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.4 Refunds</h3>
            <p className="leading-relaxed">
              Refund policies will be outlined in individual Service Agreements. Generally, deposits and payments for completed work are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">8. Project Timeline and Deliverables</h2>
            <p className="leading-relaxed">
              Project timelines and deliverables will be specified in your Service Agreement. While we strive to meet all deadlines, timelines are estimates and may be subject to change due to factors including client feedback delays, scope changes, or unforeseen circumstances.
            </p>
            <p className="leading-relaxed mt-4">
              We are not liable for delays caused by circumstances beyond our reasonable control, including but not limited to client delays, third-party service failures, or force majeure events.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">9. Warranties and Disclaimers</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">9.1 Service Warranty</h3>
            <p className="leading-relaxed">
              We warrant that our Services will be performed in a professional and workmanlike manner consistent with industry standards. Bug fixes and minor adjustments within the warranty period (typically 30-90 days post-launch) will be provided as outlined in your Service Agreement.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">9.2 Disclaimer</h3>
            <p className="leading-relaxed">
              OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="leading-relaxed mt-4">
              We do not warrant that our Services will be uninterrupted, error-free, or completely secure. We are not responsible for delays, failures, or interruptions caused by third-party services or internet connectivity issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">10. Limitation of Liability</h2>
            <p className="leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUPERSHIFT LABS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="leading-relaxed mt-4">
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $1,000, WHICHEVER IS GREATER.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">11. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless SuperShift Labs and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or related to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Your use of our Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Content or materials you provide to us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">12. Termination</h2>
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate your access to our Services at any time, with or without cause, with or without notice, for any reason including violation of these Terms.
            </p>
            <p className="leading-relaxed mt-4">
              You may terminate your use of our Services at any time. Upon termination, your right to use our Services will immediately cease. Termination does not relieve you of any payment obligations for services already provided.
            </p>
            <p className="leading-relaxed mt-4">
              Provisions of these Terms that by their nature should survive termination shall survive, including but not limited to intellectual property rights, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">13. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">13.1 Governing Law</h3>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Iowa, United States, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">13.2 Arbitration</h3>
            <p className="leading-relaxed">
              Any dispute, controversy, or claim arising out of or relating to these Terms or the breach thereof shall be settled by binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association. The arbitration shall take place in Iowa, and judgment on the award may be entered in any court having jurisdiction.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">13.3 Exceptions</h3>
            <p className="leading-relaxed">
              Either party may seek injunctive relief in any court of competent jurisdiction to protect intellectual property rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">14. Modifications to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our Services after changes become effective constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">15. Severability</h2>
            <p className="leading-relaxed">
              If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">16. Entire Agreement</h2>
            <p className="leading-relaxed">
              These Terms, together with any Service Agreements and our Privacy Policy, constitute the entire agreement between you and SuperShift Labs regarding the use of our Services and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">17. Contact Information</h2>
            <p className="leading-relaxed mb-3">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-2">
              <p><strong>SuperShift Labs</strong></p>
              <p>Email: <a href="mailto:admin@supershiftlabs.com" className="text-green-400 hover:underline">admin@supershiftlabs.com</a></p>
              <p>Phone: <a href="tel:+13195370228" className="text-green-400 hover:underline">+1 319 537 0228</a></p>
              <p>SMS: <a href="sms:+13195370228" className="text-green-400 hover:underline">+1 319 537 0228</a></p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
