import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import EmailPopup from './components/EmailPopup';

interface Article {
  keyword: string;
  title: string;
  content: string;
  format: string;
  word_count: number;
}

function getArticleCount(): number {
  const articlesDir = path.join(process.cwd(), 'public/data/articles');
  
  if (!fs.existsSync(articlesDir)) {
    return 0;
  }
  
  const files = fs.readdirSync(articlesDir);
  return files.filter(file => file.endsWith('.json')).length;
}

function getArticlePage(page: number = 1, perPage: number = 50): { slug: string; article: Article }[] {
  const articlesDir = path.join(process.cwd(), 'public/data/articles');
  
  if (!fs.existsSync(articlesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(articlesDir);
  const jsonFiles = files
    .filter(file => file.endsWith('.json'))
    .sort();
  
  // Calculate pagination
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageFiles = jsonFiles.slice(start, end);
  
  const articles = pageFiles.map(file => {
    const slug = file.replace('.json', '');
    const filePath = path.join(articlesDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const article = JSON.parse(fileContents);
    return { slug, article };
  });
  
  return articles;
}

export default function Home() {
  const totalArticles = getArticleCount();
  const articles = getArticlePage(1, 50); // Show first 50 articles
  const totalPages = Math.ceil(totalArticles / 50);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            The Healthy Solutions Report
          </h1>
          <p className="text-xl text-gray-600">
            Your trusted source for health and wellness information
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {totalArticles.toLocaleString()} Articles
            </span>
            <span>Evidence-based health information</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Health Articles
          </h2>
          <p className="text-gray-600">
            Browse our comprehensive collection of health and wellness articles
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(({ slug, article }) => (
            <Link
              key={slug}
              href={`/article/${slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
            >
              <div className="mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {article.format}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {article.title || article.keyword}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.content.substring(0, 150).replace(/[#*]/g, '')}...
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{article.word_count} words</span>
                <span className="text-blue-600 font-medium">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination Info */}
        {totalArticles > 50 && (
          <div className="mt-12 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 inline-block">
              <p className="text-gray-700 mb-2">
                Showing <strong>1-{Math.min(50, totalArticles)}</strong> of <strong>{totalArticles.toLocaleString()}</strong> articles
              </p>
              <p className="text-sm text-gray-600">
                Use the search function or browse by category to find specific health topics
              </p>
            </div>
          </div>
        )}
        
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No articles found. Please check back soon!
            </p>
          </div>
        )}
      </main>
      
      <EmailPopup />
      
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong>Affiliate Disclosure:</strong> This website contains affiliate links. If you choose to purchase through these links, we may earn a commission at no additional cost to you. This helps us continue providing free health information. We only recommend products we believe may be helpful to our readers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">The Healthy Solutions Report</h3>
              <p className="text-gray-400 text-sm">
                Providing evidence-based health and wellness information to help you make informed decisions about your health.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Disclaimer</h4>
              <p className="text-gray-400 text-sm">
                The information on this website is for educational purposes only. Always consult with a qualified healthcare professional before making health decisions.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} The Healthy Solutions Report. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

