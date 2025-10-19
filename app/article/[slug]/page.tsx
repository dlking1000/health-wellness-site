import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import EmailPopup from '../../components/EmailPopup';
import AdSenseAd from '../../components/AdSenseAd';
import RelatedArticles from '../../components/RelatedArticles';
import Breadcrumbs from '../../components/Breadcrumbs';

interface Article {
  keyword: string;
  title: string;
  content: string;
  format: string;
  word_count: number;
  products_mentioned: string[];
  generated_at: string;
}

interface ArticleListItem {
  keyword: string;
  title: string;
  slug: string;
  format: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const articlesDir = path.join(process.cwd(), 'public/data/articles');
    const filePath = path.join(articlesDir, `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}

async function getRelatedArticles(currentKeyword: string, currentSlug: string): Promise<ArticleListItem[]> {
  const articlesDir = path.join(process.cwd(), 'public/data/articles');
  
  if (!fs.existsSync(articlesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(articlesDir);
  const articles: ArticleListItem[] = [];
  
  // Get a random sample of 6 articles (excluding current)
  const shuffled = files
    .filter(file => file.endsWith('.json') && file.replace('.json', '') !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);
  
  for (const file of shuffled) {
    try {
      const filePath = path.join(articlesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const article = JSON.parse(content);
      
      if (article.keyword && article.title) {
        const slug = file.replace('.json', '');
        articles.push({
          keyword: article.keyword,
          title: article.title,
          slug: slug,
          format: article.format || 'Article'
        });
      }
    } catch (error) {
      console.error(`Error reading ${file}:`, error);
    }
  }
  
  return articles;
}

// CRITICAL: Remove generateStaticParams to enable dynamic rendering
// This allows all 9,981 articles to be accessible without pre-building them

export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const dynamicParams = true; // Allow dynamic params

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: `${article.title} | The Healthy Solutions Report`,
    description: article.content.substring(0, 160).replace(/[#*]/g, ''),
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    notFound();
  }
  
  const relatedArticles = await getRelatedArticles(article.keyword, params.slug);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <a href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            The Healthy Solutions Report
          </h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs articleTitle={article.title} articleFormat={article.format} />
        <article className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-700">
              <strong>Disclosure:</strong> This article contains affiliate links. If you choose to purchase through these links, we may earn a commission at no additional cost to you. This helps us continue providing free health information.
            </p>
          </div>
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(article.content, true) }} />
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Category:</strong> {article.format} | <strong>Keywords:</strong> {article.keyword}
            </p>
          </div>
        </article>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Medical Disclaimer
          </h3>
          <p className="text-sm text-blue-800">
            The information provided in this article is for educational purposes only and is not intended as medical advice. 
            Always consult with a qualified healthcare provider before making any changes to your health regimen.
          </p>
        </div>
        
        <RelatedArticles 
          currentKeyword={article.keyword}
          currentSlug={params.slug}
          allArticles={relatedArticles}
        />
      </main>
      
      <EmailPopup />
      
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong>Affiliate Disclosure:</strong> This website contains affiliate links. If you choose to purchase through these links, we may earn a commission at no additional cost to you. This helps us continue providing free health information.
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} The Healthy Solutions Report. All rights reserved.
            </p>
            <div className="mt-4 space-x-4">
              <a href="/about" className="text-sm hover:text-blue-400">About</a>
              <a href="/privacy" className="text-sm hover:text-blue-400">Privacy Policy</a>
              <a href="/contact" className="text-sm hover:text-blue-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function convertMarkdownToHTML(markdown: string, includeAds: boolean = false): string {
  let html = markdown;
  
  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');
  
  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer nofollow">$1</a>');
  
  // Convert lists
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>');
  
  // Wrap lists in ul tags
  html = html.replace(/(<li[\s\S]*?<\/li>)/g, '<ul class="list-disc my-4">$1</ul>');
  
  // Convert paragraphs
  const paragraphs = html.split('\n\n').map(para => {
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<li')) {
      return para;
    }
    return `<p class="mb-4 leading-relaxed">${para}</p>`;
  });
  
  // Inject AdSense ads at strategic positions if requested
  if (includeAds && paragraphs.length > 5) {
    const adHTML = '<div class="my-8"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3425980701787946" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>';
    
    // Insert ads at 25%, 50%, and 75% through the content
    const positions = [
      Math.floor(paragraphs.length * 0.25),
      Math.floor(paragraphs.length * 0.50),
      Math.floor(paragraphs.length * 0.75)
    ];
    
    positions.reverse().forEach(pos => {
      paragraphs.splice(pos, 0, adHTML);
    });
  }
  
  html = paragraphs.join('\n');
  
  return html;
}

