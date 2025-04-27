import React, { useState } from 'react'
import AnimatedBG from './components/AnimatedBG'
import ChatPanel from './components/ChatPanel'

function Features() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-[#23232b] rounded-3xl p-8 shadow-furia flex flex-col items-center transition-all hover:scale-105 hover:shadow-2xl duration-300">
        <span className="text-furia-accent text-4xl mb-4">🤖</span>
        <h3 className="text-lg font-bold text-furia-accent mb-2">IA Exclusiva</h3>
        <p className="text-gray-200 text-base text-center">Respostas inteligentes e personalizadas sobre o universo FURIA.</p>
      </div>
      <div className="bg-[#23232b] rounded-3xl p-8 shadow-furia flex flex-col items-center transition-all hover:scale-105 hover:shadow-2xl duration-300">
        <span className="text-furia-accent text-4xl mb-4">📊</span>
        <h3 className="text-lg font-bold text-furia-accent mb-2">Estatísticas ao Vivo</h3>
        <p className="text-gray-200 text-base text-center">Acompanhe placares, curiosidades e dados em tempo real dos jogos.</p>
      </div>
      <div className="bg-[#23232b] rounded-3xl p-8 shadow-furia flex flex-col items-center transition-all hover:scale-105 hover:shadow-2xl duration-300">
        <span className="text-furia-accent text-4xl mb-4">🦁</span>
        <h3 className="text-lg font-bold text-furia-accent mb-2">Comunidade FURIA</h3>
        <p className="text-gray-200 text-base text-center">Interaja com outros fãs e fique por dentro das novidades.</p>
      </div>
    </section>
  )
}

export default function App() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="relative min-h-screen flex flex-col bg-furia-hero overflow-x-hidden">
      <AnimatedBG />

      <header className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-black/40 backdrop-blur-xl border-b border-furia-accent/10 shadow-lg">
        <img src="logo.svg" alt="Logo FURIA" className="w-32" draggable={false} />
        <button
          className="px-6 py-2 rounded-3xl bg-furia-accent text-furia-black font-bold shadow hover:bg-furia-accent2 transition"
          onClick={() => setShowChat(true)}
        >
          Abrir Chat
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-4 w-full pt-[120px] md:pt-[160px]">
        <section className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          <img src="logo.svg" alt="Logo FURIA" className="w-80 mb-8 drop-shadow-2xl animate-fade-in" draggable={false} />
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-furia-accent drop-shadow-xl animate-slide-up text-center">
            FURIA Fan Chat
          </h1>
          <p className="text-2xl md:text-2xl text-gray-100 mt-6 max-w-2xl text-center font-medium animate-fade-in">
            Torcida conectada, jogos ao vivo, feito por Matheus Castilho.<br /><strong>Tudo em um só lugar.</strong>
          </p>
          <button
            className="mt-10 px-12 py-4 rounded-3xl bg-furia-accent text-furia-black font-extrabold text-2xl shadow-furia hover:bg-furia-accent2 transition-colors animate-fade-in"
            onClick={() => setShowChat(true)}
          >
            Abrir Chat
          </button>
        </section>
        <Features />
      </main>

      {showChat && <ChatPanel onClose={() => setShowChat(false)} />}

      <footer className="w-full py-8 text-center text-gray-500 text-base border-t border-furia-accent/10 z-10 relative">
        © {new Date().getFullYear()} FURIA Fan Chat
      </footer>
    </div>
  )
}
