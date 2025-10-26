import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

// Force dynamic generation of sitemap
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thehealthysolutionsreport.com'
  
  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftfivtdofqnktacokgtj.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Zml2dGRvZnFua3RhY29rZ3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMDMyOTAsImV4cCI6MjA3Njg3OTI5MH0.4zjtYpTX18PlmYdfr-TlzrO9g1ZIKgkvTI859g359KQ';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Fetch all articles from database with pagination
  const articles: MetadataRoute.Sitemap = []
  let offset = 0
  const pageSize = 1000
  
  try {
    while (true) {
      const { data, error } = await supabase
        .table('articles')
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
