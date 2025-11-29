'use client'

import { Globe, Award, Shield, TrendingUp, CheckCircle, Github, Twitter } from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Geometric Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Quest</span>
            </div>
            <button
              onClick={onGetStarted}
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium text-sm transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Floating Balls */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-20 h-20 bg-primary/30 rounded-full blur-xl animate-float" style={{ animationDuration: '6s' }} />
          <div className="absolute top-40 right-[15%] w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-[20%] w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }} />
          <div className="absolute top-60 right-[25%] w-16 h-16 bg-accent/30 rounded-full blur-lg animate-float" style={{ animationDuration: '9s', animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 right-[10%] w-28 h-28 bg-primary/25 rounded-full blur-2xl animate-float" style={{ animationDuration: '7.5s', animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-primary/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Powered by Celo Blockchain</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Test Your Geography Knowledge on the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Blockchain
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Answer geography questions, track your progress on-chain, and prove your knowledge with immutable blockchain records.
          </p>
          
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-primary/50 inline-flex items-center gap-2"
          >
            <span>Connect Wallet & Start</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Quest?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A decentralized quiz platform that combines learning with blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-surface border border-[#333] rounded-2xl p-8 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Blockchain Verified</h3>
              <p className="text-gray-400 leading-relaxed">
                All your answers are recorded on the Celo blockchain, providing immutable proof of your knowledge and progress.
              </p>
            </div>

            <div className="bg-surface border border-[#333] rounded-2xl p-8 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Track Progress</h3>
              <p className="text-gray-400 leading-relaxed">
                Monitor your quiz completion rate and see your improvement over time with detailed analytics and stats.
              </p>
            </div>

            <div className="bg-surface border border-[#333] rounded-2xl p-8 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Global Quizzes</h3>
              <p className="text-gray-400 leading-relaxed">
                Test your knowledge with geography questions from around the world, updated regularly via IPFS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-400">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-white">
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Connect Your Wallet</h3>
              <p className="text-gray-400">
                Connect your Web3 wallet to access the quiz platform securely
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-white">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Answer Questions</h3>
              <p className="text-gray-400">
                Test your geography knowledge by answering questions one by one
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-white">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Track On-Chain</h3>
              <p className="text-gray-400">
                Your answers are recorded on the blockchain for permanent verification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-3xl p-12 text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join Quest today and start proving your geography expertise on the blockchain
            </p>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-primary/50"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#333] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Quest</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A decentralized geography quiz platform powered by blockchain technology.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={onGetStarted} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    Get Started
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-surface border border-[#333] hover:border-primary/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-surface border border-[#333] hover:border-primary/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Quest. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
