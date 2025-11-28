'use client'

import { Globe } from 'lucide-react'

export default function ConnectWallet() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Quest</h1>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-4">Geography Quiz on Blockchain</h2>
        <p className="text-gray-400 mb-8 text-base leading-relaxed">Connect your wallet to start answering questions and track your progress on the Celo blockchain</p>
        <appkit-button />
      </div>
    </div>
  )
}