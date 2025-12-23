import { Pool } from 'pg'
import pgvector from 'pgvector/pg'

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Register pgvector type
pool.on('connect', async (client) => {
  await pgvector.registerType(client)
})

// Document types
export interface Document {
  id: number
  title: string
  content: string
  slug: string
  created_at: Date
  updated_at: Date
}

export interface DocumentChunk {
  id: number
  document_id: number
  content: string
  embedding: number[]
  chunk_index: number
}

// Get all documents
export async function getAllDocuments(): Promise<Document[]> {
  const result = await pool.query(
    'SELECT id, title, content, slug, created_at, updated_at FROM documents ORDER BY created_at DESC'
  )
  return result.rows
}

// Get document by ID
export async function getDocumentById(id: number): Promise<Document | null> {
  const result = await pool.query(
    'SELECT id, title, content, slug, created_at, updated_at FROM documents WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

// Get document by slug
export async function getDocumentBySlug(slug: string): Promise<Document | null> {
  const result = await pool.query(
    'SELECT id, title, content, slug, created_at, updated_at FROM documents WHERE slug = $1',
    [slug]
  )
  return result.rows[0] || null
}

// Create a new document
export async function createDocument(data: {
  title: string
  content: string
  slug: string
}): Promise<Document> {
  const result = await pool.query(
    `INSERT INTO documents (title, content, slug) 
     VALUES ($1, $2, $3) 
     RETURNING id, title, content, slug, created_at, updated_at`,
    [data.title, data.content, data.slug]
  )
  return result.rows[0]
}

// Create document chunk with embedding
export async function createDocumentChunk(data: {
  document_id: number
  content: string
  embedding: number[]
  chunk_index: number
}): Promise<DocumentChunk> {
  const result = await pool.query(
    `INSERT INTO document_chunks (document_id, content, embedding, chunk_index) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, document_id, content, chunk_index`,
    [data.document_id, data.content, pgvector.toSql(data.embedding), data.chunk_index]
  )
  return result.rows[0]
}

// Search for similar chunks using vector similarity
export async function searchSimilarChunks(
  queryEmbedding: number[],
  limit: number = 5
): Promise<{ content: string; document_title: string; similarity: number }[]> {
  const result = await pool.query(
    `SELECT 
       dc.content,
       d.title as document_title,
       1 - (dc.embedding <=> $1) as similarity
     FROM document_chunks dc
     JOIN documents d ON dc.document_id = d.id
     ORDER BY dc.embedding <=> $1
     LIMIT $2`,
    [pgvector.toSql(queryEmbedding), limit]
  )
  return result.rows
}

// Get chunks without embeddings
export async function getChunksWithoutEmbeddings(): Promise<{ id: number; content: string }[]> {
  const result = await pool.query(
    'SELECT id, content FROM document_chunks WHERE embedding IS NULL'
  )
  return result.rows
}

// Update chunk embedding
export async function updateChunkEmbedding(id: number, embedding: number[]): Promise<void> {
  await pool.query(
    'UPDATE document_chunks SET embedding = $1 WHERE id = $2',
    [pgvector.toSql(embedding), id]
  )
}

// Delete all chunks for a document
export async function deleteDocumentChunks(documentId: number): Promise<void> {
  await pool.query('DELETE FROM document_chunks WHERE document_id = $1', [documentId])
}

// Get documents that need embedding
export async function getDocumentsNeedingEmbedding(): Promise<Document[]> {
  const result = await pool.query(
    `SELECT d.id, d.title, d.content, d.slug, d.created_at, d.updated_at
     FROM documents d
     LEFT JOIN document_chunks dc ON d.id = dc.document_id
     WHERE dc.id IS NULL`
  )
  return result.rows
}

// Execute raw query (for scripts)
export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params)
}

export default pool
