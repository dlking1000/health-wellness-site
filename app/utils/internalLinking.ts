/**
 * Internal Linking Utility
 * Adds contextual internal links within article content for SEO
 */

interface LinkOpportunity {
  keyword: string;
  slug: string;
  title: string;
}

/**
 * Find and add internal links within article content
 * @param content - The article content in markdown format
 * @param currentSlug - The current article slug to avoid self-linking
 * @param allArticles - Array of all available articles for linking
 * @returns Modified content with internal links added
 */
export function addContextualLinks(
  content: string,
  currentSlug: string,
  linkOpportunities: LinkOpportunity[]
): string {
  let modifiedContent = content;
  const linksAdded = new Set<string>();
  const maxLinksPerArticle = 5; // Limit to avoid over-optimization
  
  // Sort opportunities by keyword length (longer = more specific = better)
  const sortedOpportunities = linkOpportunities
    .filter(opp => opp.slug !== currentSlug)
    .sort((a, b) => b.keyword.length - a.keyword.length);
  
  for (const opportunity of sortedOpportunities) {
    if (linksAdded.size >= maxLinksPerArticle) break;
    
    const keyword = opportunity.keyword;
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create a case-insensitive regex that matches the keyword as a whole phrase
    // but not if it's already part of a link
    const regex = new RegExp(
      `(?<!\\[)\\b(${escapedKeyword})\\b(?!\\]|\\()`,
      'gi'
    );
    
    // Check if the keyword exists in the content
    const matches = modifiedContent.match(regex);
    
    if (matches && matches.length > 0) {
      // Only link the first occurrence to avoid over-optimization
      let replaced = false;
      modifiedContent = modifiedContent.replace(regex, (match) => {
        if (!replaced && !linksAdded.has(keyword.toLowerCase())) {
          replaced = true;
          linksAdded.add(keyword.toLowerCase());
          return `[${match}](/article/${opportunity.slug} "${opportunity.title}")`;
        }
        return match;
      });
    }
  }
  
  return modifiedContent;
}

/**
 * Get strategic link opportunities based on content analysis
 * @param content - The article content to analyze
 * @param allArticles - All available articles
 * @returns Array of best link opportunities
 */
export function findLinkOpportunities(
  content: string,
  currentSlug: string,
  allArticles: Array<{ keyword: string; slug: string; title: string }>
): LinkOpportunity[] {
  const contentLower = content.toLowerCase();
  const opportunities: Array<LinkOpportunity & { relevance: number }> = [];
  
  for (const article of allArticles) {
    if (article.slug === currentSlug) continue;
    
    const keywordLower = article.keyword.toLowerCase();
    const keywordWords = keywordLower.split(/\s+/).filter(w => w.length > 3);
    
    // Calculate relevance score
    let relevance = 0;
    
    // Check if exact keyword phrase appears
    if (contentLower.includes(keywordLower)) {
      relevance += 10;
    }
    
    // Check for partial keyword matches
    for (const word of keywordWords) {
      const wordRegex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = contentLower.match(wordRegex);
      if (matches) {
        relevance += matches.length;
      }
    }
    
    if (relevance > 0) {
      opportunities.push({
        keyword: article.keyword,
        slug: article.slug,
        title: article.title,
        relevance
      });
    }
  }
  
  // Sort by relevance and return top 10 opportunities
  return opportunities
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 10)
    .map(({ keyword, slug, title }) => ({ keyword, slug, title }));
}

/**
 * Smart internal linking that analyzes content and adds relevant links
 * @param content - Article content
 * @param currentSlug - Current article slug
 * @param sampleArticles - Sample of articles to consider for linking (for performance)
 * @returns Content with internal links added
 */
export function smartInternalLinking(
  content: string,
  currentSlug: string,
  sampleArticles: Array<{ keyword: string; slug: string; title: string }>
): string {
  // Find the best link opportunities based on content
  const opportunities = findLinkOpportunities(content, currentSlug, sampleArticles);
  
  // Add contextual links
  return addContextualLinks(content, currentSlug, opportunities);
}

