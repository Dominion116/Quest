'use client'
import React from 'react';
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Globe, CheckCircle, Loader2, Award, BarChart3, Target, Edit2, RotateCcw } from 'lucide-react'
import { useGeoQuestContract, useContractData, useSubmission, useCompletedCount } from '../hooks/useContract'
import LandingPage from '../components/LandingPage'

interface Question {
  question: string
  answer: string
}

interface ToastState {
  message: string
  type: 'success' | 'error' | 'loading'
}

// Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'loading'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  const config = {
    success: { icon: CheckCircle, bg: 'bg-green-600', text: 'Success!' },
    error: { icon: CheckCircle, bg: 'bg-red-600', text: 'Error!' },
    loading: { icon: Loader2, bg: 'bg-primary', text: 'Processing...' }
  }

  const { icon: Icon, bg } = config[type]

  return (
    <div className={`fixed top-6 right-6 ${bg} text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 min-w-[320px]`}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${type === 'loading' ? 'animate-spin' : ''}`} />
      <div className="flex-1">
        <p className="font-semibold text-sm">{config[type].text}</p>
        <p className="text-xs text-white/80">{message}</p>
      </div>
    </div>
  )
}

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) => (
  <div className="bg-surface border border-[#333] rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-primary/50 hover:scale-105 transition-all">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
    </div>
    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs sm:text-sm text-gray-400">{label}</div>
  </div>
)

// Question Card Component
const QuestionCard = ({ question, questionId, onSubmit, userAddress, isSubmitting }: {
  question: string
  questionId: number
  onSubmit: (id: number, ans: string) => Promise<void>
  userAddress: string | undefined
  isSubmitting: boolean
}) => {
  const [answer, setAnswer] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const { answer: previousAnswer, timestamp, exists } = useSubmission(userAddress, questionId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!answer.trim()) return
    await onSubmit(questionId, answer)
    setAnswer('')
    setIsEditing(false)
  }

  const handleEdit = () => {
    setAnswer(previousAnswer || '')
    setIsEditing(true)
  }

  return (
    <div className="bg-surface border border-[#333] rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-primary/30 transition-all">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg sm:text-xl">{questionId}</span>
          </div>
        </div>
        
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white break-words">{question}</h3>
            {exists && !isEditing && (
              <div className="flex-shrink-0">
                <div className="bg-green-600/10 border border-green-600/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-green-500 text-xs sm:text-sm font-medium">Completed</span>
                </div>
              </div>
            )}
          </div>
          
          {exists && !isEditing ? (
            <div className="bg-[#2a2a2a] border border-[#333] rounded-lg sm:rounded-xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-white font-medium text-sm sm:text-base">Your Answer</span>
                </div>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-surface hover:bg-[#2a2a2a] border border-[#333] hover:border-primary/50 rounded-lg text-gray-300 hover:text-white text-xs sm:text-sm transition-all self-start sm:self-auto"
                >
                  <Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
              <p className="text-white text-base sm:text-lg font-medium mb-2 sm:mb-3 break-words">{previousAnswer}</p>
              <div className="text-gray-400 text-xs sm:text-sm">
                {timestamp && new Date(Number(timestamp) * 1000).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {isEditing && (
                <div className="flex items-start gap-2 text-yellow-500 text-xs sm:text-sm bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2.5 sm:p-3">
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                  <span>Editing - this will update your previous submission</span>
                </div>
              )}
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-surface border border-[#333] rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-primary transition-all"
              />
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {isEditing && (
                  <button
                    onClick={() => {
                      setAnswer('')
                      setIsEditing(false)
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-surface hover:bg-[#2a2a2a] border border-[#333] rounded-lg sm:rounded-xl text-white font-medium text-sm sm:text-base transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !answer.trim()}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>{isEditing ? 'Updating...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <span>{isEditing ? 'Update Answer' : 'Submit Answer'}</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Owner Panel Component
const OwnerPanel = ({ onUpdateCID, isUpdating }: { onUpdateCID: (cid: string) => Promise<void>; isUpdating: boolean }) => {
  const [newCID, setNewCID] = useState('')

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCID.trim()) return
    onUpdateCID(newCID)
    setNewCID('')
  }

  return (
    <div className="bg-surface border border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Owner Panel</h2>
          <p className="text-gray-400 text-xs sm:text-sm">Update quiz questions via IPFS CID</p>
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <input
          type="text"
          value={newCID}
          onChange={(e) => setNewCID(e.target.value)}
          placeholder="Enter new IPFS CID..."
          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-background border border-[#333] rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-primary transition-all"
        />
        <button
          onClick={handleUpdate}
          disabled={isUpdating || !newCID.trim()}
          className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
        >
          {isUpdating ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <span>Update CID</span>
          )}
        </button>
      </div>
    </div>
  )
}

// Connect Wallet Component
const ConnectWallet = () => (
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

// Main Component
export default function Home() {
  const { address, isConnected } = useAccount()
  const [toast, setToast] = useState<ToastState | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showDashboard, setShowDashboard] = useState(false)
  const { cid, owner } = useContractData()
  const { submitAnswer, updateCID, isPending, isConfirming, isConfirmed } = useGeoQuestContract()
  const completedCount = useCompletedCount(address, questions.length)

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase()

  // Handle showing dashboard after wallet connection
  useEffect(() => {
    if (isConnected) {
      setShowDashboard(true)
    } else {
      setShowDashboard(false)
    }
  }, [isConnected])

  // Fetch questions from IPFS
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!cid) return

      setIsLoadingQuestions(true)
      try {
        const gateways = [
          `https://ipfs.io/ipfs/${cid}`,
          `https://gateway.pinata.cloud/ipfs/${cid}`,
          `https://cloudflare-ipfs.com/ipfs/${cid}`,
        ]

        let data = null
        for (const gateway of gateways) {
          try {
            const response = await fetch(gateway)
            if (response.ok) {
              data = await response.json()
              break
            }
          } catch {
            continue
          }
        }

        if (data && Array.isArray(data)) {
          setQuestions(data)
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
        setToast({ message: 'Failed to load questions from IPFS', type: 'error' })
      } finally {
        setIsLoadingQuestions(false)
      }
    }

    fetchQuestions()
  }, [cid])

  const handleSubmitAnswer = async (questionId: number, answer: string) => {
    try {
      setToast({ message: 'Submitting answer to blockchain...', type: 'loading' })
      await submitAnswer(questionId, answer)
    } catch (error) {
      setToast({ message: 'Failed to submit answer', type: 'error' })
    }
  }

  const handleUpdateCID = async (newCID: string) => {
    try {
      setToast({ message: 'Updating CID on blockchain...', type: 'loading' })
      await updateCID(newCID)
    } catch (error) {
      setToast({ message: 'Failed to update CID', type: 'error' })
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      setToast({ message: 'Transaction confirmed successfully!', type: 'success' })
    }
  }, [isConfirmed])

  // Show landing page if not connected or dashboard not shown yet
  if (!showDashboard || !isConnected) {
    return <LandingPage onGetStarted={() => {
      // Set flag to show dashboard once connected
      if (!isConnected) {
        // Trigger wallet connect modal by dispatching a click event
        setTimeout(() => {
          const connectButton = document.querySelector('appkit-button')
          if (connectButton) {
            const shadowRoot = connectButton.shadowRoot
            if (shadowRoot) {
              const button = shadowRoot.querySelector('button')
              if (button) {
                button.click()
              }
            } else {
              (connectButton as HTMLElement).click()
            }
          }
        }, 100)
      }
    }} />
  }

  const totalQuestions = questions.length
  const progress = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6">
        {/* Header */}
        <header className="mb-8 sm:mb-12 animate-fade-in">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Quest</h1>
                <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Geography Quiz on Blockchain</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <appkit-button />
            </div>
          </div>
        </header>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 animate-slide-up">
          <StatsCard icon={Target} label="Total Questions" value={totalQuestions} />
          <StatsCard icon={CheckCircle} label="Completed" value={completedCount} />
          <StatsCard icon={BarChart3} label="Remaining" value={totalQuestions - completedCount} />
          <StatsCard icon={Award} label="Progress" value={`${progress}%`} />
        </div>

        {/* IPFS CID Info */}
        {cid && (
          <div className="bg-surface border border-[#333] rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 animate-slide-up animate-delay-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-gray-400 text-xs sm:text-sm mb-1">Current IPFS CID</div>
                <div className="text-white font-mono text-xs sm:text-sm break-all">{String(cid)}</div>
              </div>
              <a 
                href={`https://ipfs.io/ipfs/${cid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-all text-center"
              >
                View on IPFS
              </a>
            </div>
          </div>
        )}

        {/* Owner Panel */}
        {isOwner && (
          <div className="mb-8 animate-scale-in">
            <OwnerPanel onUpdateCID={handleUpdateCID} isUpdating={isPending || isConfirming} />
          </div>
        )}

        {/* Questions Section */}
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Quiz Questions</h2>
            {questions.length > 0 && (
              <div className="bg-surface border border-[#333] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex-shrink-0">
                <span className="text-white font-medium text-xs sm:text-sm whitespace-nowrap">
                  {currentQuestionIndex + 1}/{questions.length}
                </span>
              </div>
            )}
          </div>
          
          {isLoadingQuestions ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="ml-3 text-gray-400">Loading questions from IPFS...</span>
            </div>
          ) : questions.length > 0 ? (
            <>
              <QuestionCard
                question={questions[currentQuestionIndex].question}
                questionId={currentQuestionIndex + 1}
                onSubmit={handleSubmitAnswer}
                userAddress={address}
                isSubmitting={isPending || isConfirming}
              />
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-2 sm:gap-4 pt-4 animate-slide-up">
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-surface hover:bg-[#2a2a2a] border border-[#333] hover:border-primary/50 rounded-xl text-white font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all"
                >
                  Previous
                </button>
                
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all flex-shrink-0 ${
                        index === currentQuestionIndex 
                          ? 'bg-primary w-6 sm:w-8' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="bg-surface border border-[#333] rounded-2xl p-12 text-center">
              <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Questions Available</h3>
              <p className="text-gray-400">
                {cid ? 'Unable to load questions from IPFS. Please check the CID.' : 'No IPFS CID set. Owner needs to update the CID.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
