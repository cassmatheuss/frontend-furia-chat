import React from 'react'

export default function QuickReplies({ replies, onSelect }) {
  if (!replies || !replies.length) return null
  return (
    <div className="flex gap-3 flex-wrap animate-fade-in">
      {replies.map((r, i) => (
        <button
          key={i}
          type="button"
          className="bg-furia-accent/20 text-furia-accent px-4 py-2 rounded-3xl text-base font-semibold hover:bg-furia-accent/40 transition"
          onClick={() => onSelect(r)}
        >
          {r}
        </button>
      ))}
    </div>
  )
}
