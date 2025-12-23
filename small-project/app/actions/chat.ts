'use server'

import { createEmbedding } from '@/lib/embeddings'
import { searchSimilarChunks } from '@/database'

export interface SearchResult {
  content: string
  document_title: string
  similarity: number
}

// Search for relevant context based on user query
export async function searchContext(query: string): Promise<SearchResult[]> {
  try {
    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query)
    
    // Search for similar chunks
    const results = await searchSimilarChunks(queryEmbedding, 5)
    
    return results
  } catch (error) {
    console.error('Error searching context:', error)
    return []
  }
}

// Format context for AI prompt
export async function getContextForQuery(query: string): Promise<string> {
  const results = await searchContext(query)
  
  if (results.length === 0) {
    return 'Không tìm thấy tài liệu liên quan.'
  }
  
  const context = results
    .map((r, i) => `[Nguồn ${i + 1}: ${r.document_title}]\n${r.content}`)
    .join('\n\n---\n\n')
  
  return context
}
