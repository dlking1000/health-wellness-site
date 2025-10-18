import Link from 'next/link';

export const metadata = {
  title: 'About Us | The Healthy Solutions Report',
  description: 'Learn about The Healthy Solutions Report and our mission to provide evidence-based health and wellness information.',
};

export default function AboutPage() {
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Welcome to The Healthy Solutions Report, your trusted source for evidence-based health and wellness information.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-4">
              We believe that everyone deserves access to reliable, easy-to-understand health information. Our mission is to empower individuals to make informed decisions about their health and wellness by providing comprehensive, research-backed content on a wide range of health topics.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What We Offer</h3>
            <p className="text-gray-700 mb-4">
              The Healthy Solutions Report features thousands of articles covering topics including:
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li className="mb-2">Nutrition and diet</li>
              <li className="mb-2">Mental health and wellness</li>
              <li className="mb-2">Digestive health</li>
              <li className="mb-2">Brain health and cognitive function</li>
              <li className="mb-2">Weight management</li>
              <li className="mb-2">Immune system support</li>
              <li className="mb-2">Natural health solutions</li>
              <li className="mb-2">Preventive care</li>
            </ul>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Approach</h3>
            <p className="text-gray-700 mb-4">
              We take a holistic approach to health and wellness, recognizing that physical, mental, and emotional well-being are interconnected. Our content is designed to be:
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li className="mb-2"><strong>Evidence-based:</strong> We prioritize information supported by scientific research and expert consensus</li>
              <li className="mb-2"><strong>Accessible:</strong> We present complex health topics in clear, understandable language</li>
              <li className="mb-2"><strong>Practical:</strong> We focus on actionable advice you can implement in your daily life</li>
              <li className="mb-2"><strong>Comprehensive:</strong> We cover topics from multiple angles to give you a complete picture</li>
            </ul>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Important Disclaimer</h3>
            <p className="text-gray-700 mb-4">
              The information provided on The Healthy Solutions Report is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Affiliate Disclosure</h3>
            <p className="text-gray-700 mb-4">
              The Healthy Solutions Report participates in affiliate marketing programs. This means we may earn a commission when you click on links to products or services and make a purchase. These commissions come at no additional cost to you and help us continue providing free, high-quality health information.
            </p>
            <p className="text-gray-700 mb-4">
              We only recommend products and services that we believe may be helpful to our readers. Our editorial content is not influenced by affiliate relationships, and we maintain strict editorial independence.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              We value your feedback and questions. If you have any inquiries or suggestions, please visit our <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact page</Link>.
            </p>
            
            <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-gray-700">
                <strong>Thank you for visiting The Healthy Solutions Report.</strong> We're committed to supporting you on your journey to better health and wellness.
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
              <Link href="/contact" className="text-sm hover:text-blue-400">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

