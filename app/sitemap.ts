import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// Force dynamic generation of sitemap - Updated for 10,000 articles
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thehealthysolutionsreport.com'
  
  // Get all articles
  const articlesDir = path.join(process.cwd(), 'public/data/articles')
  const articles: MetadataRoute.Sitemap = []
  
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir)
    
    files.forEach((file) => {
      if (file.endsWith('.json')) {
        try {
          const slug = file.replace('.json', '')
          const filePath = path.join(articlesDir, file)
          const content = fs.readFileSync(filePath, 'utf-8')
          const article = JSON.parse(content)
          
          articles.push({
            url: `${baseUrl}/article/${slug}`,
            lastModified: article.generated_at ? new Date(article.generated_at) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
          })
        } catch (error) {
          console.error(`Error processing ${file}:`, error)
        }
      }
    })
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
  
  return [...staticPages, ...articles]
}

