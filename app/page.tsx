import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';
import EmailPopup from './components/EmailPopup';

interface Article {
  keyword: string;
  title: string;
  content: string;
  format: string;
  word_count: number;
  slug: string;
}

async function getArticleCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('published', true);
    
    if (error) {
      console.error('Error counting articles:', error);
      return 0;
    }
    
    return count || 0;
  } catch (error) {
    console.error('Error counting articles:', error);
    return 0;
  }
}

async function getFeaturedArticles(): Promise<Article[]> {
  try {
    // Get 15 random articles for the homepage
    const { data, error } = await supabase
      .from('articles')
      .select('keyword, title, content, format, word_count, slug')
      .eq('published', true)
      .limit(15);
    
    if (error || !data) {
      console.error('Error loading articles:', error);
      return [];
    }
    
    return data as Article[];
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const totalArticles = await getArticleCount();
  const articles = await getFeaturedArticles();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              The Healthy Solutions Report
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
              <Link href="/editorial-policy" className="text-gray-700 hover:text-blue-600 font-medium">Editorial Policy</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
            </div>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              The Healthy Solutions Report
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              Your trusted source for evidence-based health and wellness information
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">
                  {totalArticles.toLocaleString()} Articles
                </span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span>Evidence-Based</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Fact-Checked</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Articles Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Health Articles
              </h2>
              <p className="text-gray-600">
                Explore our comprehensive collection of evidence-based health and wellness content
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-500 group"
              >
                <div className="mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {article.format}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title || article.keyword}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.content.substring(0, 150).replace(/[#*]/g, '')}...
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {article.word_count} words
                  </span>
                  <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Browse More Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Explore {totalArticles.toLocaleString()}+ Health Articles</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Discover comprehensive, evidence-based information on nutrition, mental health, digestive wellness, 
            brain health, and more. Our extensive library covers all aspects of health and wellness.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">Nutrition & Diet</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">Mental Wellness</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">Digestive Health</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">Brain Health</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">Weight Management</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">Immune Support</span>
          </div>
        </div>

        {/* Trust Signals Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Evidence-Based Research</h4>
            <p className="text-sm text-gray-600">
              All content is grounded in peer-reviewed research and guidelines from reputable health organizations.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Expert Editorial Team</h4>
            <p className="text-sm text-gray-600">
              Our health and wellness research specialists ensure accuracy and quality in every article.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Regularly Updated</h4>
            <p className="text-sm text-gray-600">
              We continuously monitor new research and update our content to reflect current medical understanding.
            </p>
          </div>
        </div>
      </main>

      <EmailPopup />

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Medical Disclaimer */}
          <div className="mb-8 p-6 bg-yellow-900/30 border-l-4 border-yellow-500 rounded-lg">
            <h4 className="font-semibold text-yellow-200 mb-2">Medical Disclaimer</h4>
            <p className="text-sm text-yellow-100">
              The information on this website is for educational purposes only and is not intended as medical advice. 
              Always consult with a qualified healthcare professional before making health decisions. 
              <Link href="/medical-disclaimer" className="underline hover:text-white ml-1">Read full disclaimer</Link>
            </p>
          </div>

          {/* Affiliate Disclosure */}
          <div className="mb-8 p-6 bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-gray-200 mb-2">Affiliate Disclosure</h4>
            <p className="text-sm text-gray-300">
              This website contains affiliate links. If you choose to purchase through these links, we may earn a 
              commission at no additional cost to you. This helps us continue providing free health information. 
              We only recommend products we believe may be helpful to our readers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">The Healthy Solutions Report</h3>
              <p className="text-gray-400 text-sm">
                Providing evidence-based health and wellness information to help you make informed decisions about your health.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/editorial-policy" className="text-gray-400 hover:text-white">Editorial Policy</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/medical-disclaimer" className="text-gray-400 hover:text-white">Medical Disclaimer</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <p className="text-gray-400 text-sm mb-2">
                {totalArticles.toLocaleString()}+ articles covering:
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• Nutrition & Diet</li>
                <li>• Mental Wellness</li>
                <li>• Digestive Health</li>
                <li>• Brain Health</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} The Healthy Solutions Report. All rights reserved.</p>
            <p className="mt-2">Evidence-based health information you can trust.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

