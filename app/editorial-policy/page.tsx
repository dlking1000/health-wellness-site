import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Policy - The Healthy Solutions Report',
  description: 'Learn about our editorial standards, content creation process, and commitment to providing accurate, evidence-based health information.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Editorial Policy
          </h1>
          <p className="text-xl text-gray-600">
            Our commitment to accuracy, integrity, and transparency
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At The Healthy Solutions Report, we are committed to providing accurate, evidence-based health 
            and wellness information that our readers can trust. This editorial policy outlines our standards 
            for content creation, review, and publication.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our goal is to empower individuals with reliable information to make informed decisions about 
            their health and wellness. We take this responsibility seriously and maintain rigorous standards 
            throughout our content development process.
          </p>
        </div>

        {/* Editorial Standards */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Editorial Standards</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Evidence-Based Information</h3>
              <p className="text-gray-700 mb-2">
                All health claims and recommendations in our content are supported by:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Peer-reviewed scientific research and clinical studies</li>
                <li>Guidelines from reputable health organizations (NIH, CDC, WHO, Mayo Clinic, etc.)</li>
                <li>Expert consensus from recognized medical and health professionals</li>
                <li>Current medical literature and established health practices</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Accuracy and Fact-Checking</h3>
              <p className="text-gray-700 mb-2">
                We maintain accuracy through:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Thorough research using authoritative medical and scientific sources</li>
                <li>Verification of health claims against multiple reputable sources</li>
                <li>Regular content reviews and updates to reflect current medical understanding</li>
                <li>Clear citation of sources for all medical and health information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Transparency</h3>
              <p className="text-gray-700 mb-2">
                We believe in complete transparency with our readers:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Clear disclosure of affiliate relationships and sponsored content</li>
                <li>Identification of content authors and their qualifications</li>
                <li>Acknowledgment of limitations in current medical knowledge</li>
                <li>Honest representation of uncertainties in health research</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Editorial Independence</h3>
              <p className="text-gray-700 mb-2">
                Our editorial content is independent of commercial interests:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Editorial decisions are based solely on reader value and content quality</li>
                <li>Affiliate partnerships do not influence our editorial recommendations</li>
                <li>We maintain clear separation between editorial content and advertising</li>
                <li>Product recommendations are based on research and merit, not compensation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Creation Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Content Creation Process</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Topic Research</h3>
                <p className="text-gray-700">
                  We identify health topics based on reader interest, emerging research, and public health relevance. 
                  Topics are selected to provide maximum value and address common health questions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Source Verification</h3>
                <p className="text-gray-700">
                  Our team conducts comprehensive research using peer-reviewed journals, government health agencies, 
                  and established medical institutions. We prioritize recent studies and current medical guidelines.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Development</h3>
                <p className="text-gray-700">
                  Articles are written to be accessible while maintaining scientific accuracy. Complex medical 
                  concepts are explained in clear language without oversimplification or misrepresentation.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Editorial Review</h3>
                <p className="text-gray-700">
                  All content undergoes editorial review to ensure accuracy, clarity, and adherence to our 
                  editorial standards. We verify that all health claims are properly supported and sourced.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 font-bold">5</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Publication and Updates</h3>
                <p className="text-gray-700">
                  After publication, we monitor new research and medical guidelines. Content is updated as needed 
                  to reflect the latest evidence-based understanding of health topics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sources and Citations */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sources and Citations</h2>
          <p className="text-gray-700 mb-4">
            We rely on authoritative sources for our health information, including:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Government Health Agencies</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• National Institutes of Health (NIH)</li>
                <li>• Centers for Disease Control (CDC)</li>
                <li>• Food and Drug Administration (FDA)</li>
                <li>• World Health Organization (WHO)</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Medical Institutions</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Mayo Clinic</li>
                <li>• Cleveland Clinic</li>
                <li>• Johns Hopkins Medicine</li>
                <li>• Harvard Medical School</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scientific Journals</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• PubMed/MEDLINE</li>
                <li>• The Lancet</li>
                <li>• JAMA</li>
                <li>• New England Journal of Medicine</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Professional Organizations</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• American Medical Association</li>
                <li>• American Heart Association</li>
                <li>• American Diabetes Association</li>
                <li>• Academy of Nutrition and Dietetics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Corrections and Updates */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Corrections and Updates</h2>
          <p className="text-gray-700 mb-4">
            We are committed to maintaining the accuracy of our content:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>
              <strong>Errors:</strong> If we discover an error in published content, we correct it promptly 
              and note the correction transparently.
            </li>
            <li>
              <strong>Updates:</strong> As medical knowledge evolves, we update articles to reflect current 
              understanding and best practices.
            </li>
            <li>
              <strong>Reader Feedback:</strong> We welcome reader input regarding potential errors or outdated 
              information and investigate all concerns.
            </li>
          </ul>
        </div>

        {/* Affiliate Disclosure */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Affiliate Disclosure</h2>
          <p className="text-gray-700 mb-4">
            The Healthy Solutions Report participates in affiliate marketing programs. This means we may earn 
            a commission when readers click on links to products or services and make a purchase. These 
            commissions help us maintain and improve our site while keeping our content free for readers.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Important principles regarding affiliates:</strong>
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Affiliate relationships do not influence our editorial content or recommendations</li>
                <li>We only recommend products and services we believe may genuinely benefit our readers</li>
                <li>Product recommendations are based on research, quality, and relevance</li>
                <li>We clearly disclose affiliate relationships where applicable</li>
                <li>Readers are never charged additional fees when using our affiliate links</li>
              </ul>
        </div>

        {/* Contact */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Questions About Our Editorial Policy?</h2>
          <p className="text-lg mb-6">
            We're committed to transparency and welcome your questions or concerns.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

