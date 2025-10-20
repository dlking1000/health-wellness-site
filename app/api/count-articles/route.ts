import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const articlesDir = path.join(process.cwd(), 'public/data/articles');
    
    if (!fs.existsSync(articlesDir)) {
      return NextResponse.json({ 
        error: 'Directory not found',
        path: articlesDir,
        cwd: process.cwd()
      });
    }
    
    const files = fs.readdirSync(articlesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json')).sort();
    
    return NextResponse.json({
      total: jsonFiles.length,
      first: jsonFiles[0],
      last: jsonFiles[jsonFiles.length - 1],
      sample_first_10: jsonFiles.slice(0, 10),
      sample_last_10: jsonFiles.slice(-10),
      directory_path: articlesDir,
      working_directory: process.cwd()
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to count articles',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

