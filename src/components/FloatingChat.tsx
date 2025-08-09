'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, Phone, Mail, X } from 'lucide-react'

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappHref =
    'https://wa.me/916300856868?text=Hi%20Green%20Cars%2C%20I%27d%20like%20to%20sell%20my%20car.'

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Panel */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl shadow-2xl bg-white border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-600 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div className="font-semibold">Chat with us</div>
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-emerald-700/30"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
              <Image src="/whatsapp.svg" width={18} height={18} alt="WhatsApp" />
              WhatsApp Chat
            </a>

            <a
              href="tel:+916300856868"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call +91 63008 56868
            </a>

            <a
              href="mailto:info@greencars.com"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 bg-gray-900 hover:bg-black text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a href="#enquire" className="text-center text-sm py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">
                Enquire
              </a>
              <a href="#estimate" className="text-center text-sm py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">
                Get Estimate
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={() => setIsOpen((v) => !v)}
        className="relative rounded-full shadow-2xl bg-emerald-600 hover:bg-emerald-700 text-white w-14 h-14 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="h-7 w-7" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
        )}
      </button>
    </div>
  )
}


