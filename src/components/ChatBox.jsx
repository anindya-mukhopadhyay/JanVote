import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'

const responseBank = {
  'how elections work': {
    normal:
      'In India, elections are managed by the Election Commission. Citizens vote for candidates in their constituency, and the candidate with the highest votes wins the seat.',
    eli10:
      'Think of India like a giant school. Every area picks one class monitor by voting, and all those winners help run the whole school together.',
  },
  'voting steps': {
    normal:
      'Voting steps are simple: check your name on the voter list, carry valid ID, go to your polling booth, verify details, vote on the EVM, and receive ink mark confirmation.',
    eli10:
      'Step 1: find your name. Step 2: show your ID. Step 3: press your chosen button on the voting machine. Step 4: done, you helped decide the leader.',
  },
}

// Component to simulate a typing/streaming effect
function StreamingMessage({ text }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    setDisplayedText('')
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 20) // Speed of typing

    return () => clearInterval(interval)
  }, [text])

  return <span>{displayedText}</span>
}

function ChatBox({ isEli10Mode }) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { incrementQuestions } = useProgress()
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: isEli10Mode
        ? 'Hi! I can explain elections in super simple language. Ask about "How elections work" or "Voting steps".'
        : 'Hello. I am your AI election guide. Ask about "How elections work" or "Voting steps".',
      isStreaming: false
    },
  ])
  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const getBotReply = (questionText) => {
    const normalized = questionText.toLowerCase().trim()
    const match = Object.keys(responseBank).find((key) => normalized.includes(key))

    if (!match) {
      return isEli10Mode
        ? 'I only know about "How elections work" and "Voting steps" right now. Try one of those!'
        : 'I can currently answer two prompts: "How elections work" and "Voting steps". Try either one.'
    }

    return responseBank[match][isEli10Mode ? 'eli10' : 'normal']
  }

  const sendMessage = (nextText) => {
    const textToSend = nextText ?? input
    const cleaned = textToSend.trim()

    if (!cleaned) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: cleaned,
      isStreaming: false
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    incrementQuestions() // Update global mastery progress

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getBotReply(cleaned),
        isStreaming: true
      }
      setIsTyping(false)
      setMessages((prev) => [...prev, botMessage])
    }, 1000) // Fake thinking delay
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col h-[600px] border-brand-500/20">
      
      {/* Preset Chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => sendMessage('How elections work')}
          className="flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/20 px-4 py-2 text-sm font-semibold text-brand-600 transition hover:bg-brand-500/20 dark:bg-brand-400/10 dark:text-brand-300 dark:hover:bg-brand-400/20 shadow-sm"
        >
          <Sparkles className="w-4 h-4" /> How elections work
        </button>
        <button
          type="button"
          onClick={() => sendMessage('Voting steps')}
          className="flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/20 px-4 py-2 text-sm font-semibold text-brand-600 transition hover:bg-brand-500/20 dark:bg-brand-400/10 dark:text-brand-300 dark:hover:bg-brand-400/20 shadow-sm"
        >
          <Sparkles className="w-4 h-4" /> Voting steps
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-slate-50/50 p-4 dark:bg-[#0f172a]/50 border border-slate-200/50 dark:border-slate-700/50 custom-scrollbar mb-6">
        <div className="space-y-6" aria-live="polite" aria-relevant="additions text">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${message.sender === 'user' ? 'bg-gradient-to-tr from-accent-500 to-purple-600' : 'bg-gradient-to-tr from-brand-500 to-blue-600'}`}>
                  {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                
                <div className={`rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-tr-sm'
                    : 'glass-panel text-slate-800 dark:text-slate-100 rounded-tl-sm border-white/50 dark:border-white/10'
                }`}>
                  {message.sender === 'bot' && message.isStreaming ? (
                    <StreamingMessage text={message.text} />
                  ) : (
                    message.text
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-[85%]"
            >
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-tr from-brand-500 to-blue-600">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass-panel rounded-2xl rounded-tl-sm px-5 py-3 border-white/50 dark:border-white/10 flex gap-1 items-center">
                <motion.div className="w-2 h-2 rounded-full bg-brand-500" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-2 h-2 rounded-full bg-brand-500" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-2 h-2 rounded-full bg-brand-500" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
            </motion.div>
          )}

          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-3 relative">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') sendMessage()
          }}
          placeholder="Ask me anything about elections..."
          className="w-full rounded-full border border-slate-300/50 bg-white/50 px-6 py-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white dark:border-slate-700/50 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900 shadow-inner"
        />
        <button
          type="button"
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          className="absolute right-2 top-2 bottom-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 text-sm font-bold text-white transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  )
}

export default ChatBox

