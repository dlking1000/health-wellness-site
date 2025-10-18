'use client'

import Link from 'next/link'

interface Article {
  keyword: string
  title: string
  slug: string
  format: string
}

interface RelatedArticlesProps {
  currentKeyword: string
  currentSlug: string
  allArticles: Article[]
}

export default function RelatedArticles({ currentKeyword, currentSlug, allArticles }: RelatedArticlesProps) {
  // Find related articles based on keyword similarity
  const getRelatedArticles = (): Article[] => {
    const currentWords = currentKeyword.toLowerCase().split(' ')
    
    // Score each article based on keyword overlap
    const scored = allArticles
      .filter(article => article.slug !== currentSlug) // Exclude current article
      .map(article => {
        const articleWords = article.keyword.toLowerCase().split(' ')
        const overlap = currentWords.filter(word => 
          word.length > 3 && articleWords.some(aw => aw.includes(word) || word.includes(aw))
        ).length
        
        return { article, score: overlap }
      })
      .filter(item => item.score > 0) // Only articles with some relevance
      .sort((a, b) => b.score - a.score) // Sort by relevance
      .slice(0, 6) // Take top 6
      .map(item => item.article)
    
    // If we don't have enough related articles, add random ones
    if (scored.length < 6) {
      const remaining = allArticles
        .filter(article => article.slug !== currentSlug && !scored.includes(article))
        .sort(() => Math.random() - 0.5) // Shuffle
        .slice(0, 6 - scored.length)
      
      return [...scored, ...remaining]
    }
    
    return scored
  }
  
  const relatedArticles = getRelatedArticles()
  
  if (relatedArticles.length === 0) {
    return null
  }
  
  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Articles You May Find Helpful
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {article.keyword}
            </p>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {article.format}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

