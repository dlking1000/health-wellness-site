import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

interface Article {
  keyword: string;
  title: string;
  content: string;
  format: string;
  word_count: number;
  products_mentioned: string[];
  generated_at: string;
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

async function getAllArticleSlugs(): Promise<string[]> {
  const articlesDir = path.join(process.cwd(), 'public/data/articles');
  
  if (!fs.existsSync(articlesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(articlesDir);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

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
        <article className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(article.content) }} />
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
      </main>
      
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
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

function convertMarkdownToHTML(markdown: string): string {
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
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<li')) {
      return para;
    }
    return `<p class="mb-4 leading-relaxed">${para}</p>`;
  }).join('\n');
  
  return html;
}

