import React from 'react'

export default function Loading() {
  return (
    <div className="flex justify-center h-screen items-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#50829F]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#50829F] animate-spin"></div>
        </div>
        <p className="text-[#50829F] font-bold text-lg animate-pulse">
          ElleStore
        </p>
      </div>
    </div>
  )
}