'use client'
import React from 'react';
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Globe, CheckCircle, Loader2, Award, BarChart3, Target, Edit2, RotateCcw } from 'lucide-react'
import { useGeoQuestContract, useContractData, useSubmission, useCompletedCount } from '../hooks/useContract'

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
  <div className="bg-surface border border-[#333] rounded-2xl p-6 hover:border-primary/50 transition-all">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
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
    <div className="bg-surface border border-[#333] rounded-2xl p-6 hover:border-primary/30 transition-all">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">{questionId}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-xl font-semibold text-white pr-4">{question}</h3>
            {exists && !isEditing && (
              <div className="flex-shrink-0">
                <div className="bg-green-600/10 border border-green-600/30 rounded-full px-4 py-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-sm font-medium">Completed</span>
                </div>
              </div>
            )}
          </div>
          
          {exists && !isEditing ? (
            <div className="bg-[#2a2a2a] border border-[#333] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-white font-medium">Your Answer</span>
                </div>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-3 py-1.5 bg-surface hover:bg-[#2a2a2a] border border-[#333] hover:border-primary/50 rounded-lg text-gray-300 hover:text-white text-sm transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
              <p className="text-white text-lg font-medium mb-3">{previousAnswer}</p>
              <div className="text-gray-400 text-sm">
                {timestamp && new Date(Number(timestamp) * 1000).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {isEditing && (
                <div className="flex items-center gap-2 text-yellow-500 text-sm bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <RotateCcw className="w-4 h-4 flex-shrink-0" />
                  <span>Editing your answer - this will update your previous submission</span>
                </div>
              )}
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 bg-surface border border-[#333] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all"
              />
              <div className="flex gap-3">
                {isEditing && (
                  <button
                    onClick={() => {
                      setAnswer('')
                      setIsEditing(false)
                    }}
                    className="px-6 py-3 bg-surface hover:bg-[#2a2a2a] border border-[#333] rounded-xl text-white font-medium transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !answer.trim()}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
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
    <div className="bg-surface border border-primary/30 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Award className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Owner Panel</h2>
          <p className="text-gray-400 text-sm">Update quiz questions via IPFS CID</p>
        </div>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          value={newCID}
          onChange={(e) => setNewCID(e.target.value)}
          placeholder="Enter new IPFS CID..."
          className="w-full px-4 py-3 bg-background border border-[#333] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all"
        />
        <button
          onClick={handleUpdate}
          disabled={isUpdating || !newCID.trim()}
          className="w-full bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
        >
          {isUpdating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
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
  const { cid, owner } = useContractData()
  const { submitAnswer, updateCID, isPending, isConfirming, isConfirmed } = useGeoQuestContract()
  const completedCount = useCompletedCount(address, questions.length)

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase()

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

  if (!isConnected) {
    return <ConnectWallet />
  }

  const totalQuestions = questions.length
  const progress = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Quest</h1>
                <p className="text-gray-400 text-sm">Geography Quiz on Blockchain</p>
              </div>
            </div>
            <appkit-button />
          </div>
        </header>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatsCard icon={Target} label="Total Questions" value={totalQuestions} />
          <StatsCard icon={CheckCircle} label="Completed" value={completedCount} />
          <StatsCard icon={BarChart3} label="Remaining" value={totalQuestions - completedCount} />
          <StatsCard icon={Award} label="Progress" value={`${progress}%`} />
        </div>

        {/* IPFS CID Info */}
        {cid && (
          <div className="bg-surface border border-[#333] rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-gray-400 text-sm mb-1">Current IPFS CID</div>
                <div className="text-white font-mono text-sm break-all">{String(cid)}</div>
              </div>
              <a 
                href={`https://ipfs.io/ipfs/${cid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-all"
              >
                View on IPFS
              </a>
            </div>
          </div>
        )}

        {/* Owner Panel */}
        {isOwner && (
          <div className="mb-8">
            <OwnerPanel onUpdateCID={handleUpdateCID} isUpdating={isPending || isConfirming} />
          </div>
        )}

        {/* Questions Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Quiz Questions</h2>
            {questions.length > 0 && (
              <div className="bg-surface border border-[#333] px-4 py-2 rounded-full">
                <span className="text-white font-medium">{questions.length}</span>
              </div>
            )}
          </div>
          
          {isLoadingQuestions ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="ml-3 text-gray-400">Loading questions from IPFS...</span>
            </div>
          ) : questions.length > 0 ? (
            questions.map((q, index) => (
              <QuestionCard
                key={index}
                question={q.question}
                questionId={index + 1}
                onSubmit={handleSubmitAnswer}
                userAddress={address}
                isSubmitting={isPending || isConfirming}
              />
            ))
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
