import React from 'react'

export default function ChatMessage({ message, type, created_at }) {
  const isAI = type === 'AI';

  const formattedMessage = message
    .split('\n')
    .map((line, idx, arr) => (
      <React.Fragment key={idx}>
        {line}
        {idx < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} items-end gap-3`}>
      {isAI && (
        <img src="/src/assets/logo.svg" alt="FURIA" className="w-8 h-8 rounded-full bg-furia-accent/30" />
      )}
      <div className={`
        px-5 py-4 rounded-3xl max-w-[80%] shadow
        text-base md:text-lg
        ${isAI
          ? 'bg-furia-accent text-furia-black font-semibold'
          : 'bg-furia-black/90 text-white border border-furia-accent/40'
        }
        animate-fade-in
      `}>
        {formattedMessage}
        <div className="text-xs text-gray-600 mt-1 text-right">
          {new Date(created_at).toLocaleTimeString('pt-BR')}
        </div>
      </div>
      {!isAI && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-furia-accent/10 text-furia-accent font-bold text-base">
          😃
        </div>
      )}
    </div>
  )
}
