import { MetadataRoute } from 'next';
import { supabase } from '@/app/lib/supabase';

// Force dynamic generation of sitemap
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thehealthysolutionsreport.com'
  
  // Supabase client is imported from lib
  
  // Fetch all articles from database with pagination
  const articles: MetadataRoute.Sitemap = []
  let offset = 0
  const pageSize = 1000
  
  try {
    while (true) {
      const { data, error } = await supabase
        .from('articles')
        .select('slug, generated_at')
        .range(offset, offset + pageSize - 1)
      
      if (error) {
        console.error('Error fetching articles for sitemap:', error)
        break
      }
      
      if (!data || data.length === 0) {
        break
      }
      
      // Add articles to sitemap
      data.forEach((article) => {
        articles.push({
          url: `${baseUrl}/article/${article.slug}`,
          lastModified: article.generated_at ? new Date(article.generated_at) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      })
      
      offset += pageSize
      
      // Break if we got less than a full page (last batch)
      if (data.length < pageSize) {
        break
      }
    }
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }
  
  // Add homepage and other static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
  
  console.log(`Sitemap generated with ${articles.length} articles`)
  
  return [...staticPages, ...articles]
}

