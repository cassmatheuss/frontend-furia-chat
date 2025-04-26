import React from 'react'

export default function AnimatedBG() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a23] via-[#23232b] to-[#18181b] opacity-90"></div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-furia-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-furia-accent/20 rounded-full blur-2xl"></div>
      <div className="absolute top-[22%] left-[12%] w-40 h-40 bg-furia-accent/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-[18%] left-[20%] w-24 h-24 bg-furia-accent/10 rounded-full blur-lg"></div>
      <div className="absolute bottom-[10%] right-[18%] w-24 h-24 bg-furia-accent/15 rounded-full blur-lg"></div>
    </div>
  )
}
