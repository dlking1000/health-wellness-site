'use client'

import Link from 'next/link'

interface BreadcrumbsProps {
  articleTitle: string
  articleFormat: string
}

export default function Breadcrumbs({ articleTitle, articleFormat }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      <span>/</span>
      <span className="text-gray-400">{articleFormat}</span>
      <span>/</span>
      <span className="text-gray-900 font-medium truncate max-w-md" title={articleTitle}>
        {articleTitle}
      </span>
    </nav>
  )
}

