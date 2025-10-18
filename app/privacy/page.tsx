import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | The Healthy Solutions Report',
  description: 'Privacy Policy for The Healthy Solutions Report',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            The Healthy Solutions Report
          </h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
          
          <p className="text-sm text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              The Healthy Solutions Report ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h3>
            
            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Information You Provide</h4>
            <p className="text-gray-700 mb-4">
              We may collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li className="mb-2">Subscribe to our email newsletter</li>
              <li className="mb-2">Fill out forms on our website</li>
              <li className="mb-2">Contact us with questions or feedback</li>
              <li className="mb-2">Participate in surveys or promotions</li>
            </ul>
            <p className="text-gray-700 mb-4">
              This information may include your name, email address, and any other information you choose to provide.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h4>
            <p className="text-gray-700 mb-4">
              When you visit our website, we may automatically collect certain information about your device and browsing actions, including:
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li className="mb-2">IP address</li>
              <li className="mb-2">Browser type and version</li>
              <li className="mb-2">Operating system</li>
              <li className="mb-2">Pages visited and time spent on pages</li>
              <li className="mb-2">Referring website</li>
              <li className="mb-2">Device information</li>
            </ul>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h3>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li className="mb-2">Provide, operate, and maintain our website</li>
              <li className="mb-2">Send you newsletters and promotional materials (if you've opted in)</li>
              <li className="mb-2">Respond to your inquiries and provide customer support</li>
              <li className="mb-2">Analyze website usage and improve our content</li>
              <li className="mb-2">Detect and prevent fraud or abuse</li>
              <li className="mb-2">Comply with legal obligations</li>
            </ul>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies and Tracking Technologies</h3>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to collect and track information about your browsing activities. Cookies are small data files stored on your device that help us improve your experience.
            </p>
            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Services</h3>
            
            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Affiliate Links</h4>
            <p className="text-gray-700 mb-4">
              Our website contains affiliate links to third-party products and services. When you click on these links and make a purchase, we may earn a commission. These third-party sites have their own privacy policies, and we are not responsible for their practices.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Analytics Services</h4>
            <p className="text-gray-700 mb-4">
              We may use third-party analytics services (such as Google Analytics) to help us understand how visitors use our website. These services may collect information about your use of our site and other websites.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Email Service Providers</h4>
            <p className="text-gray-700 mb-4">
              If you subscribe to our newsletter, your email address will be stored and processed by our email service provider. We use reputable providers that comply with data protection regulations.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h3>
            <p className="text-gray-700 mb-4">
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Privacy Rights</h3>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li className="mb-2"><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li className="mb-2"><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li className="mb-2"><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li className="mb-2"><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              <li className="mb-2"><strong>Data portability:</strong> Request transfer of your data to another service</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To exercise these rights, please contact us using the information provided below.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Children's Privacy</h3>
            <p className="text-gray-700 mb-4">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h3>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us through our website.
            </p>
            
            <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-gray-700">
                <strong>Your Privacy Matters:</strong> We are committed to protecting your personal information and using it responsibly. Thank you for trusting The Healthy Solutions Report.
              </p>
            </div>
          </div>
        </article>
      </main>
      
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} The Healthy Solutions Report. All rights reserved.
            </p>
            <div className="mt-4 space-x-4">
              <Link href="/" className="text-sm hover:text-blue-400">Home</Link>
              <Link href="/about" className="text-sm hover:text-blue-400">About</Link>
              <Link href="/privacy" className="text-sm hover:text-blue-400">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

