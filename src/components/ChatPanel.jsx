import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ChatMessage from './ChatMessage'
import QuickReplies from './QuickReplies'
import { FiTrash2, FiSend, FiX } from 'react-icons/fi'

const API_BASE_URL = import.meta.env.VITE_API_URL

function getSessionId() {
  return localStorage.getItem('chat_session_id')
}
function setSessionId(id) {
  localStorage.setItem('chat_session_id', id)
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMobile
}

export default function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionIdState] = useState(getSessionId())
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const chatRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  useEffect(() => {
    if (sessionId) {
      axios.get(`${API_BASE_URL}/history/${sessionId}`)
        .then(res => setMessages(res.data.history || []))
        .catch(() => setMessages([]))
    }
  }, [sessionId])

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
  }, [messages])

  const sendMessage = async (msg) => {
    if (!msg.trim()) return
    setLoading(true)
    const payload = {
      message: msg,
      session_id: sessionId || ''
    }
    try {
      const { data } = await axios.post(`${API_BASE_URL}/chat`, payload)
      if (!sessionId && data.session_id) {
        setSessionId(data.session_id)
        setSessionIdState(data.session_id)
      }
      setMessages(prev => [
        ...prev,
        { message: msg, type: 'HUMAN', created_at: new Date().toISOString() },
        data
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        { message: 'Desculpe, houve um erro. Tente novamente.', type: 'AI', created_at: new Date().toISOString() }
      ])
    }
    setInput('')
    setLoading(false)
  }

  const handleNewConversation = () => {
    localStorage.removeItem('chat_session_id')
    setSessionIdState(null)
    setMessages([])
  }

  const quickReplies = [
    "Está tendo algum jogo hoje?",
    "Qual foi o ultimo jogo da Furia?",
    "Quem criou este ChatBot?",
    "Qual o próximo jogo da Furia?",
  ]

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 z-50 animate-fade-in">
      <div className="
        relative 
        bg-gradient-to-br from-[#23232b] via-[#18181b] to-[#23232b] 
        md:rounded-5xl rounded-none
        shadow-furia 
        w-full md:max-w-4xl
        h-screen md:h-[88vh]
        flex flex-col 
        border-2 border-furia-accent/40 
        animate-slide-up
      ">
        {!isMobile && (
          <button
            className="absolute right-2 md:right-8 top-2 md:top-6 text-3xl text-furia-accent hover:text-furia-white transition z-10"
            onClick={onClose}
            aria-label="Fechar chat"
          >
            &times;
          </button>
        )}
        <div className="flex items-center gap-4 px-4 md:px-12 pt-6 md:pt-10 pb-4 border-b border-furia-accent/10">
          <img src="logo.svg" alt="FURIA avatar" className="w-14 h-14 rounded-full bg-furia-accent/20" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-furia-accent truncate">Assistente FURIA</h2>
              <button
                className="p-2 rounded-full bg-furia-accent/10 hover:bg-furia-accent/30 transition flex items-center justify-center"
                onClick={handleNewConversation}
                title="Limpar conversa"
                aria-label="Limpar conversa"
              >
                <FiTrash2 className="text-xl text-furia-accent" />
              </button>
            </div>
            <span className="text-gray-300 text-base">Online</span>
          </div>
        </div>
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-12 py-4 md:py-6 space-y-4 bg-transparent">
          {messages.length === 0 && (
            <div className="text-gray-400 text-lg text-center mt-16">Como posso ajudar você hoje?</div>
          )}
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} {...msg} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 mt-2 animate-pulse">
              <span className="inline-block w-3 h-3 bg-furia-accent rounded-full animate-pulse-slow"></span>
              <span className="text-furia-accent">Digitando...</span>
            </div>
          )}
        </div>
        <div className="px-2 md:px-12 pb-4 md:pb-8 pt-2">
          {!isMobile && showQuickReplies && (
            <div className="flex items-center mb-2">
              <QuickReplies replies={quickReplies} onSelect={sendMessage} />
              <button
                type="button"
                onClick={() => setShowQuickReplies(false)}
                aria-label="Fechar sugestões"
                className="ml-2 p-2 rounded-full bg-furia-accent/10 hover:bg-furia-accent/30 transition flex items-center justify-center"
              >
                <FiX className="text-xl text-furia-accent" />
              </button>
            </div>
          )}
          <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-2 md:gap-3'} mt-4`}>
            <form className="flex flex-1 gap-2" onSubmit={e => { e.preventDefault(); sendMessage(input) }}>
              <input
                type="text"
                className="flex-1 min-w-0 p-3 md:p-4 rounded-3xl border border-furia-accent/30 bg-[#23232b] text-white text-lg focus:border-furia-accent outline-none transition"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`flex-shrink-0 bg-furia-accent text-furia-black font-bold px-3 md:px-8 py-3 rounded-3xl shadow hover:bg-furia-accent2 transition text-lg w-12 md:w-auto truncate flex items-center justify-center gap-2
                  ${(!loading && input.trim()) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                style={{ minWidth: 48, maxWidth: 96 }}
              >
                {loading ? (
                  <span className="animate-spin inline-block w-6 h-6 border-2 border-furia-black border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <span className="hidden xs:inline">Enviar</span>
                    <FiSend className="inline text-xl" />
                  </>
                )}
              </button>
            </form>
            {isMobile && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar chat"
                className="flex-shrink-0 p-3 rounded-full bg-furia-accent/10 hover:bg-furia-accent/30 transition flex items-center justify-center"
                style={{ minWidth: 48, maxWidth: 48 }}
              >
                <FiX className="text-2xl text-furia-accent" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
