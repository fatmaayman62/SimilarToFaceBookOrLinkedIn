import React, { useEffect, useState } from 'react'
import { IoCheckmarkCircle } from "react-icons/io5";

function ConFirmMessage() {
  const [show, setShow] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`
        fixed bottom-10 right-0 z-50
        transition-all duration-500 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}
      `}
    >
      <div className="
        flex items-center gap-3
        px-5 py-3
        rounded-2xl
        bg-white/70 backdrop-blur-md
        shadow-lg
        text-gray-800
        border border-white/40
        min-w-[260px]
      ">
        {/* Icon */}
        <IoCheckmarkCircle className="text-green-500 text-xl" />

        {/* Text */}
        <p className="text-sm font-medium">
          Completed successfully
        </p>
      </div>
    </div>
  )
}

export default ConFirmMessage
