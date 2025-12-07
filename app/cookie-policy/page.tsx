import React from 'react';

export const metadata = {
  title: 'Cookie Policy | SuperShift Labs',
  description: 'Cookie Policy for SuperShift Labs - Learn how we use cookies and tracking technologies.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/20 py-20 px-6">
      <article className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cookie Policy</h1>
        <p className="text-gray-400 mb-8">Last Updated: December 7, 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">1. What Are Cookies?</h2>
            <p className="leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently and to provide reporting information.
            </p>
            <p className="leading-relaxed mt-4">
              Cookies set by the website owner (in this case, SuperShift Labs) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., analytics, advertising).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">2. Why We Use Cookies</h2>
            <p className="leading-relaxed mb-3">
              We use first-party and third-party cookies for several reasons, including to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Enable certain functions of our website</li>
              <li>Provide analytics and understand how you use our website</li>
              <li>Store your preferences and settings</li>
              <li>Improve the performance of our website</li>
              <li>Enhance security and prevent fraud</li>
              <li>Deliver relevant content and personalized experiences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">3. Types of Cookies We Use</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.1 Essential Cookies</h3>
            <p className="leading-relaxed mb-3">
              These cookies are strictly necessary for the operation of our website. They enable core functionality such as:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Security and authentication</li>
              <li>Network management</li>
              <li>Accessibility features</li>
              <li>Session management</li>
            </ul>
            <p className="leading-relaxed mt-3">
              <strong>Duration:</strong> Session or up to 1 year<br />
              <strong>Can be disabled:</strong> No (essential for website functionality)
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.2 Performance and Analytics Cookies</h3>
            <p className="leading-relaxed mb-3">
              These cookies collect information about how visitors use our website, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Which pages are visited most often</li>
              <li>How long visitors spend on each page</li>
              <li>Any error messages encountered</li>
              <li>Traffic sources and navigation patterns</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We use services like Google Analytics and Vercel Analytics to collect this information. The data collected is aggregated and anonymous.
            </p>
            <p className="leading-relaxed mt-3">
              <strong>Duration:</strong> Up to 2 years<br />
              <strong>Can be disabled:</strong> Yes
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.3 Functionality Cookies</h3>
            <p className="leading-relaxed mb-3">
              These cookies allow our website to remember choices you make and provide enhanced, personalized features:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Language preferences</li>
              <li>Theme preferences (light/dark mode)</li>
              <li>Form data to save you time</li>
              <li>User interface customizations</li>
            </ul>
            <p className="leading-relaxed mt-3">
              <strong>Duration:</strong> Session or up to 1 year<br />
              <strong>Can be disabled:</strong> Yes (may affect functionality)
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.4 Targeting/Advertising Cookies</h3>
            <p className="leading-relaxed">
              Currently, we do not use advertising cookies on our website. If we begin using them in the future, we will update this policy and obtain your consent where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">4. Third-Party Cookies</h2>
            <p className="leading-relaxed mb-3">
              We use the following third-party services that may set cookies on your device:
            </p>

            <div className="space-y-4 mt-4">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Google Analytics</h4>
                <p className="text-sm">
                  <strong>Purpose:</strong> Website analytics and performance monitoring<br />
                  <strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">https://policies.google.com/privacy</a><br />
                  <strong>Opt-out:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Browser Add-on</a>
                </p>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Vercel Analytics</h4>
                <p className="text-sm">
                  <strong>Purpose:</strong> Website performance and speed monitoring<br />
                  <strong>Privacy Policy:</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">https://vercel.com/legal/privacy-policy</a>
                </p>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Supabase</h4>
                <p className="text-sm">
                  <strong>Purpose:</strong> Backend services and authentication<br />
                  <strong>Privacy Policy:</strong> <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">https://supabase.com/privacy</a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">5. Other Tracking Technologies</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.1 Web Beacons</h3>
            <p className="leading-relaxed">
              We may use web beacons (also known as pixel tags or clear GIFs) on our website and in our emails. Web beacons are tiny graphics with a unique identifier that track user behavior and engagement.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.2 Local Storage</h3>
            <p className="leading-relaxed">
              We may use local storage technologies (HTML5 local storage, IndexedDB) to store preferences and improve website performance. This data remains on your device until explicitly deleted.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5.3 Session Storage</h3>
            <p className="leading-relaxed">
              Session storage is used to store temporary data during your browsing session. This data is automatically deleted when you close your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">6. How to Control Cookies</h2>
            <p className="leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences through:
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">6.1 Browser Settings</h3>
            <p className="leading-relaxed mb-3">
              Most web browsers allow you to control cookies through their settings. You can set your browser to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies when you close your browser</li>
              <li>Alert you when a website tries to set a cookie</li>
            </ul>

            <p className="leading-relaxed mt-4 mb-2">
              Instructions for popular browsers:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Microsoft Edge</a></li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">6.2 Opt-Out Tools</h3>
            <p className="leading-relaxed mb-3">
              You can opt out of certain third-party cookies using industry opt-out tools:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Network Advertising Initiative Opt-Out</a></li>
              <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Digital Advertising Alliance Opt-Out</a></li>
              <li><a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Your Ad Choices (Canada)</a></li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">6.3 Mobile Devices</h3>
            <p className="leading-relaxed">
              For mobile devices, you can adjust settings in your device preferences to limit ad tracking and reset your advertising identifier.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">7. Consequences of Disabling Cookies</h2>
            <p className="leading-relaxed">
              If you choose to disable cookies, some features of our website may not function properly. You may experience:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Inability to stay logged in</li>
              <li>Loss of personalized settings</li>
              <li>Reduced website functionality</li>
              <li>Need to re-enter information on each visit</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Essential cookies cannot be disabled as they are necessary for the website to function.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">8. Updates to This Cookie Policy</h2>
            <p className="leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. The "Last Updated" date at the top of this policy indicates when it was last revised.
            </p>
            <p className="leading-relaxed mt-4">
              We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">9. More Information</h2>
            <p className="leading-relaxed mb-3">
              For more information about cookies and how they work, visit:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">All About Cookies</a></li>
              <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Your Online Choices</a></li>
              <li><a href="https://cookiepedia.co.uk/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Cookiepedia</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">10. Contact Us</h2>
            <p className="leading-relaxed mb-3">
              If you have questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-2">
              <p><strong>SuperShift Labs</strong></p>
              <p>Email: <a href="mailto:admin@supershiftlabs.com" className="text-green-400 hover:underline">admin@supershiftlabs.com</a></p>
              <p>Phone: <a href="tel:+13194708878" className="text-green-400 hover:underline">+1 319 470 8878</a></p>
              <p>SMS: <a href="sms:+13194708878" className="text-green-400 hover:underline">+1 319 470 8878</a></p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
