'use client'

export default function AskAIButton() {
  const handleClick = () => {
    const event = new CustomEvent('openAskAI')
    window.dispatchEvent(event)
  }

  return (
    <button
      onClick={handleClick}
      className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
    >
      Hỏi AI ngay
    </button>
  )
}
