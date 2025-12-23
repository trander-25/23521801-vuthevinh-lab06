/**
 * Database Initialization Script
 * 
 * This script creates the required tables and indexes for the AI Knowledge Base.
 * Run with: npx tsx scripts/init-db.ts
 */

import { Pool } from 'pg'
import 'dotenv/config'

async function initDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })

  console.log('🔌 Connecting to database...')

  try {
    // Test connection
    await pool.query('SELECT NOW()')
    console.log('✅ Connected to database successfully!')

    // Enable pgvector extension
    console.log('📦 Enabling pgvector extension...')
    await pool.query('CREATE EXTENSION IF NOT EXISTS vector')
    console.log('✅ pgvector extension enabled!')

    // Create documents table
    console.log('📄 Creating documents table...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Documents table created!')

    // Create document_chunks table with vector column
    console.log('📦 Creating document_chunks table...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS document_chunks (
        id SERIAL PRIMARY KEY,
        document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        embedding vector(768),
        chunk_index INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Document chunks table created!')

    // Create indexes
    console.log('🔍 Creating indexes...')
    
    // Index for vector similarity search using HNSW (faster for large datasets)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx 
      ON document_chunks 
      USING hnsw (embedding vector_cosine_ops)
    `)
    
    // Index for document lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS documents_slug_idx 
      ON documents (slug)
    `)
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS document_chunks_document_id_idx 
      ON document_chunks (document_id)
    `)
    
    console.log('✅ Indexes created!')

    // Create update trigger for updated_at
    console.log('⚡ Creating update trigger...')
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql'
    `)
    
    await pool.query(`
      DROP TRIGGER IF EXISTS update_documents_updated_at ON documents
    `)
    
    await pool.query(`
      CREATE TRIGGER update_documents_updated_at
        BEFORE UPDATE ON documents
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column()
    `)
    console.log('✅ Update trigger created!')

    console.log('\n🎉 Database initialization complete!')
    console.log('\nNext steps:')
    console.log('1. Run: npm run db:seed   - to add sample documents')
    console.log('2. Run: npm run db:embed  - to generate embeddings')
    
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

initDatabase()
