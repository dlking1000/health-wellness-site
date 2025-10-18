import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

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
          const filePath = path.join(articlesDir, file)
          const content = fs.readFileSync(filePath, 'utf-8')
          const article = JSON.parse(content)
          
          if (article.keyword) {
            const slug = article.keyword
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
            
            articles.push({
              url: `${baseUrl}/article/${slug}`,
              lastModified: article.generated_at ? new Date(article.generated_at) : new Date(),
              changeFrequency: 'monthly',
              priority: 0.7,
            })
          }
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
  ]
  
  return [...staticPages, ...articles]
}

