/**
 * Generate Embeddings Script
 * 
 * This script generates embeddings for all documents using Google Gemini.
 * Run with: npx tsx scripts/generate-embeddings.ts
 */

import { Pool } from 'pg'
import pgvector from 'pgvector/pg'
import { google } from '@ai-sdk/google'
import { embed } from 'ai'
import 'dotenv/config'

// Split text into chunks
function splitIntoChunks(text: string, maxChunkSize: number = 500): string[] {
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

  return chunks.filter(chunk => chunk.length > 50)
}

// Create embedding for text using Gemini
async function createEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: google.textEmbeddingModel('text-embedding-004'),
    value: text,
  })
  return embedding
}

async function generateEmbeddings() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })

  // Register pgvector type
  pool.on('connect', async (client) => {
    await pgvector.registerType(client)
  })

  console.log('🔌 Connecting to database...')

  try {
    await pool.query('SELECT NOW()')
    console.log('✅ Connected to database!')

    // Check Gemini API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables')
    }
    console.log('🔑 Gemini API key found!')

    // Get documents that need embeddings
    const documentsResult = await pool.query(`
      SELECT d.id, d.title, d.content
      FROM documents d
      LEFT JOIN document_chunks dc ON d.id = dc.document_id
      WHERE dc.id IS NULL
    `)

    const documents = documentsResult.rows

    if (documents.length === 0) {
      console.log('ℹ️  All documents already have embeddings.')
      return
    }

    console.log(`\n📊 Found ${documents.length} documents needing embeddings\n`)

    let totalChunks = 0
    let processedChunks = 0

    for (const doc of documents) {
      console.log(`\n📄 Processing: ${doc.title}`)
      
      // Split document into chunks
      const chunks = splitIntoChunks(doc.content)
      totalChunks += chunks.length
      
      console.log(`   → ${chunks.length} chunks to process`)

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]
        
        try {
          // Create embedding
          const embedding = await createEmbedding(chunk)
          
          // Insert chunk with embedding
          await pool.query(
            `INSERT INTO document_chunks (document_id, content, embedding, chunk_index) 
             VALUES ($1, $2, $3, $4)`,
            [doc.id, chunk, pgvector.toSql(embedding), i]
          )
          
          processedChunks++
          process.stdout.write(`   ✅ Chunk ${i + 1}/${chunks.length} processed\r`)
          
          // Rate limiting - wait a bit between API calls
          await new Promise(resolve => setTimeout(resolve, 100))
          
        } catch (error) {
          console.error(`\n   ❌ Error processing chunk ${i + 1}:`, error)
        }
      }
      
      console.log(`   ✅ All chunks processed for "${doc.title}"`)
    }

    console.log(`\n\n🎉 Embedding generation complete!`)
    console.log(`   Total documents processed: ${documents.length}`)
    console.log(`   Total chunks created: ${processedChunks}`)
    console.log(`\nYour Knowledge Base is now ready for AI-powered search!`)
    console.log('Run: npm run dev - to start the application')

  } catch (error) {
    console.error('❌ Error generating embeddings:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

generateEmbeddings()
