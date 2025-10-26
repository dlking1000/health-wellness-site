import { notFound } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import EmailPopup from '../../components/EmailPopup';
import AdSenseAd from '../../components/AdSenseAd';
import RelatedArticles from '../../components/RelatedArticles';
import Breadcrumbs from '../../components/Breadcrumbs';
import AuthorBio from '../../components/AuthorBio';

interface Article {
  keyword: string;
  title: string;
  content: string;
  format: string;
  word_count: number;
  products_mentioned: string[];
  generated_at: string;
  slug: string;
}

interface ArticleListItem {
  keyword: string;
  title: string;
  slug: string;
  format: string;
}

// Supabase client is imported from lib

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error || !data) {
      console.error('Error loading article:', error);
      return null;
    }
    
    return data as Article;
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}

async function getRelatedArticles(currentKeyword: string, currentSlug: string): Promise<ArticleListItem[]> {
  try {
    // Get a sample of articles for matching
    const { data: articles, error } = await supabase
      .from('articles')
      .select('keyword, title, slug, format')
      .neq('slug', currentSlug)
      .limit(200);
    
    if (error || !articles) {
      return [];
    }
    
    const currentWords = currentKeyword.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    
    interface ScoredArticle {
      article: ArticleListItem;
      score: number;
    }
    
    const scoredArticles: ScoredArticle[] = [];
    
    for (const article of articles) {
      const articleWords = article.keyword.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
      
      // Calculate keyword overlap score
      let score = 0;
      for (const word of currentWords) {
        if (articleWords.some((aw: string) => aw.includes(word) || word.includes(aw))) {
          score += 2; // Exact or partial match
        }
      }
      
      // Bonus for same format type
      if (article.format === currentKeyword.split(' ')[0]) {
        score += 1;
      }
      
      scoredArticles.push({
        article: {
          keyword: article.keyword,
          title: article.title,
          slug: article.slug,
          format: article.format || 'Article'
        },
        score: score
      });
    }
    
    // Sort by score and take top 6
    scoredArticles.sort((a, b) => b.score - a.score);
    
    // Get top 4 most relevant + 2 random for diversity
    const topRelevant = scoredArticles.slice(0, 4).map(sa => sa.article);
    const randomOnes = scoredArticles.slice(4).sort(() => 0.5 - Math.random()).slice(0, 2).map(sa => sa.article);
    
    return [...topRelevant, ...randomOnes];
  } catch (error) {
    console.error('Error loading related articles:', error);
    return [];
  }
}

// CRITICAL: Force dynamic rendering for all articles
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thehealthysolutionsreport.com';
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  const articleUrl = `${siteUrl}/article/${params.slug}`;
  const description = article.content.substring(0, 160).replace(/[#*]/g, '');
  
  return {
    title: `${article.title} | The Healthy Solutions Report`,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
      url: articleUrl,
      siteName: "The Healthy Solutions Report",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: description,
    },
    alternates: {
      canonical: articleUrl,
    },
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
        
        <AuthorBio />
        
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Medical Disclaimer
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>The information provided in this article is for educational and informational purposes only.</strong> It is not intended as a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p className="text-sm text-gray-700">
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. For more information, please read our <a href="/medical-disclaimer" className="text-blue-600 hover:text-blue-800 underline font-medium">full medical disclaimer</a>.
              </p>
            </div>
          </div>
        </div>
        
        <RelatedArticles 
          currentKeyword={article.keyword}
          currentSlug={params.slug}
          allArticles={relatedArticles}
        />
      </main>
      
      <EmailPopup />
      
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong>Affiliate Disclosure:</strong> This website contains affiliate links. If you choose to purchase through these links, we may earn a commission at no additional cost to you. This helps us continue providing free health information.
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm mb-4">
              © {new Date().getFullYear()} The Healthy Solutions Report. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/" className="hover:text-blue-400">Home</a>
              <a href="/about" className="hover:text-blue-400">About Us</a>
              <a href="/editorial-policy" className="hover:text-blue-400">Editorial Policy</a>
              <a href="/contact" className="hover:text-blue-400">Contact</a>
              <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
              <a href="/medical-disclaimer" className="hover:text-blue-400">Medical Disclaimer</a>
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
