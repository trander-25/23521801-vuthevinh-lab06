import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { searchContext } from '@/app/actions/chat'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Dynamic to prevent caching since this uses env vars at runtime
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    // Check for API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Google Gemini API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages } = await req.json()
    
    // Get the last user message
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop()
    
    if (!lastUserMessage) {
      return new Response('No user message found', { status: 400 })
    }
    
    // Search for relevant context using RAG
    let searchResults: Awaited<ReturnType<typeof searchContext>> = []
    try {
      console.log('🔍 Searching context for:', lastUserMessage.content)
      searchResults = await searchContext(lastUserMessage.content)
      console.log('✅ Found', searchResults.length, 'results')
    } catch (error) {
      console.error('❌ Error searching context:', error)
      console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
      // Continue without context if search fails
    }
    
    // Build context from search results
    let context = ''
    if (searchResults.length > 0) {
      context = searchResults
        .map((r, i) => `[Nguồn ${i + 1}: ${r.document_title}]\n${r.content}`)
        .join('\n\n---\n\n')
    }
    
    // System prompt with RAG context
    const systemPrompt = `Bạn là một trợ lý AI thông minh cho Knowledge Base. Nhiệm vụ của bạn là trả lời câu hỏi của người dùng dựa trên tài liệu được cung cấp.

${context ? `Dưới đây là các tài liệu liên quan để tham khảo:

${context}

---

Hãy trả lời dựa trên thông tin từ tài liệu trên. Nếu câu hỏi không liên quan đến tài liệu hoặc bạn không chắc chắn, hãy nói rõ điều đó.` : 'Hiện tại không có tài liệu liên quan. Hãy thông báo cho người dùng rằng họ cần thêm tài liệu vào hệ thống hoặc đặt câu hỏi liên quan đến nội dung có sẵn.'}

Luôn trả lời một cách thân thiện, chuyên nghiệp và hữu ích. Sử dụng tiếng Việt nếu người dùng hỏi bằng tiếng Việt.`

    // Stream the response using Vercel AI SDK with Gemini
    const result = streamText({
      model: google('gemini-flash-latest'),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Stack:', error instanceof Error ? error.stack : '')
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
