import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Medical Disclaimer - The Healthy Solutions Report',
  description: 'Important medical disclaimer and health information notice for The Healthy Solutions Report.',
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
            <svg className="w-12 h-12 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Medical Disclaimer
          </h1>
          <p className="text-xl text-gray-600">
            Important health information notice
          </p>
        </div>

        {/* Main Disclaimer */}
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-yellow-500 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Read Carefully</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The information provided on The Healthy Solutions Report (thehealthysolutionsreport.com) is for 
            <strong> educational and informational purposes only</strong>. It is not intended as a substitute 
            for professional medical advice, diagnosis, or treatment.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Always seek the advice of your physician or other qualified health provider</strong> with 
            any questions you may have regarding a medical condition. Never disregard professional medical 
            advice or delay in seeking it because of something you have read on this website.
          </p>
        </div>

        {/* Key Points */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Points</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Not Medical Advice</h3>
                <p className="text-gray-700">
                  The content on this website does not constitute medical advice and should not be relied upon 
                  as such. Our articles are designed to provide general health information and education, not 
                  personalized medical guidance.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Doctor-Patient Relationship</h3>
                <p className="text-gray-700">
                  Use of this website and the information contained herein does not create a doctor-patient 
                  relationship between you and The Healthy Solutions Report, its authors, or any associated 
                  healthcare professionals.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Individual Results May Vary</h3>
                <p className="text-gray-700">
                  Health outcomes and responses to treatments, supplements, or lifestyle changes vary 
                  significantly among individuals. What works for one person may not work for another. 
                  Always consult with a healthcare professional before making changes to your health regimen.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Guarantees</h3>
                <p className="text-gray-700">
                  We make no warranties or guarantees regarding the accuracy, completeness, or usefulness 
                  of the information provided. While we strive for accuracy, medical knowledge evolves 
                  continuously, and information may become outdated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-8 mb-8">
          <div className="flex items-start">
            <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-3">Medical Emergencies</h3>
              <p className="text-lg text-red-900 font-semibold mb-2">
                If you think you may have a medical emergency, call your doctor or 911 immediately.
              </p>
              <p className="text-red-800">
                Do not rely on information from this website in emergency situations. The Healthy Solutions 
                Report does not recommend or endorse any specific tests, physicians, products, procedures, 
                opinions, or other information that may be mentioned on the site.
              </p>
            </div>
          </div>
        </div>

        {/* Specific Disclaimers */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Specific Disclaimers</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dietary Supplements and Products</h3>
              <p className="text-gray-700">
                Information about dietary supplements, vitamins, herbs, or other products is not intended 
                to diagnose, treat, cure, or prevent any disease. The FDA has not evaluated statements about 
                supplements. Consult your healthcare provider before starting any supplement regimen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Medication and Treatment</h3>
              <p className="text-gray-700">
                Never stop taking prescribed medications or change your treatment plan without consulting 
                your healthcare provider. Information on this site about medications is for educational 
                purposes and should not replace professional medical guidance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nutrition and Diet</h3>
              <p className="text-gray-700">
                Dietary recommendations are general in nature and may not be appropriate for everyone. 
                Individual nutritional needs vary based on age, health status, activity level, and other 
                factors. Consult a registered dietitian or healthcare provider for personalized nutrition advice.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exercise and Physical Activity</h3>
              <p className="text-gray-700">
                Before beginning any exercise program, consult with your healthcare provider, especially 
                if you have pre-existing health conditions, are pregnant, or have been sedentary. Exercise 
                recommendations are general and may not be suitable for all individuals.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mental Health</h3>
              <p className="text-gray-700">
                Information about mental health conditions is educational only. If you are experiencing 
                mental health concerns, suicidal thoughts, or emotional distress, seek immediate help from 
                a qualified mental health professional or call the National Suicide Prevention Lifeline at 
                1-800-273-8255.
              </p>
            </div>
          </div>
        </div>

        {/* Liability */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            The Healthy Solutions Report, its authors, editors, and associated parties shall not be liable 
            for any direct, indirect, incidental, consequential, or punitive damages arising from your access 
            to, or use of, the information on this website.
          </p>
          <p className="text-gray-700 mb-4">
            Reliance on any information provided by this website is solely at your own risk. You assume full 
            responsibility for any decisions or actions you take based on the information provided.
          </p>
        </div>

        {/* External Links */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">External Links and Resources</h2>
          <p className="text-gray-700 mb-4">
            Our website may contain links to external websites and resources. These links are provided for 
            convenience and informational purposes only. We do not endorse, control, or assume responsibility 
            for the content, privacy policies, or practices of any third-party websites.
          </p>
          <p className="text-gray-700">
            We encourage you to review the terms of use and privacy policies of any external sites you visit.
          </p>
        </div>

        {/* Updates */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Updates to This Disclaimer</h2>
          <p className="text-gray-700">
            We reserve the right to update or modify this medical disclaimer at any time without prior notice. 
            Your continued use of this website following any changes constitutes acceptance of those changes. 
            Please review this disclaimer periodically for updates.
          </p>
        </div>

        {/* Professional Consultation */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-center text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">When in Doubt, Consult a Professional</h2>
          <p className="text-lg mb-4">
            Your health is too important to leave to chance. Always consult with qualified healthcare 
            professionals for medical advice, diagnosis, and treatment.
          </p>
          <p className="text-sm opacity-90">
            This disclaimer was last updated: October 2025
          </p>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/editorial-policy" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">Editorial Policy</h4>
                <p className="text-sm text-gray-600">Our content standards</p>
              </div>
            </Link>
            <Link 
              href="/privacy" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">Privacy Policy</h4>
                <p className="text-sm text-gray-600">How we protect your data</p>
              </div>
            </Link>
          </div>
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

