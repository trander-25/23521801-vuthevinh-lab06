import { google } from '@ai-sdk/google'
import { embed } from 'ai'

// Create embedding for a text using Gemini
export async function createEmbedding(text: string): Promise<number[]> {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not configured')
  }

  const { embedding } = await embed({
    model: google.textEmbeddingModel('text-embedding-004'),
    value: text,
  })
  
  return embedding
}

// Split text into chunks
export function splitIntoChunks(text: string, maxChunkSize: number = 500): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks: string[] = []
  let currentChunk = ''

  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).length <= maxChunkSize) {
      currentChunk = currentChunk ? currentChunk + ' ' + sentence : sentence
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim())
      }
      currentChunk = sentence
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim())
  }

  return chunks.filter(chunk => chunk.length > 50) // Filter out very small chunks
}

// Create embeddings for multiple chunks
export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not configured')
  }

  const embeddings: number[][] = []
  
  // Gemini embed API xử lý từng text một
  for (const text of texts) {
    const { embedding } = await embed({
      model: google.textEmbeddingModel('text-embedding-004'),
      value: text,
    })
    embeddings.push(embedding)
  }
  
  return embeddings
}
