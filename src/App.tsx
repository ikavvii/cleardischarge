import { useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { PatientHeader } from '@/components/PatientHeader'
import { Timeline } from '@/components/Timeline'
import { Documents } from '@/components/Documents'
import { Payment } from '@/components/Payment'
import { PharmacyTransport } from '@/components/PharmacyTransport'
import { DischargeStep, PatientInfo, InsuranceInfo, Document } from '@/types/discharge'
import { toast } from 'sonner'

function App() {
  const [currentStep, setCurrentStep] = useKV<string>('current-step', 'insurance')
  const [documents, setDocuments] = useKV<Document[]>('documents', [
    { id: '1', title: 'Discharge Summary', category: 'medical', signed: false, required: true },
    { id: '2', title: 'Post-Op Care Instructions', category: 'medical', signed: false, required: true },
    { id: '3', title: 'Medication Guidelines', category: 'medical', signed: false, required: true },
    { id: '4', title: 'Liability Waiver', category: 'legal', signed: false, required: true },
    { id: '5', title: 'HIPAA Privacy Notice', category: 'legal', signed: false, required: false },
    { id: '6', title: 'Financial Responsibility Agreement', category: 'financial', signed: false, required: true },
    { id: '7', title: 'Payment Terms', category: 'financial', signed: false, required: true },
  ])

  const [timeRemaining, setTimeRemaining] = useState('2:30 PM')

  const patient: PatientInfo = {
    name: 'Sarah Martinez',
    room: '4B-312',
    mrn: 'MRN-847392',
    admitDate: 'March 15, 2025',
    dischargeTime: '2:30 PM Today',
  }

  const insurance: InsuranceInfo = {
    provider: 'Blue Cross Blue Shield',
    memberId: 'BCBS-938471-02',
    totalCharges: 8450,
    insurancePays: 7200,
    patientOwes: 1250,
    status: 'approved',
  }

  const steps: DischargeStep[] = [
    {
      id: 'insurance',
      title: 'Insurance Verification',
      description: 'Pre-authorization approved',
      status: 'complete',
      icon: 'shield',
    },
    {
      id: 'documents',
      title: 'Sign Documents',
      description: 'Review and sign discharge paperwork',
      status: currentStep === 'documents' ? 'in-progress' : currentStep === 'payment' || currentStep === 'pharmacy' || currentStep === 'complete' ? 'complete' : 'pending',
      icon: 'clipboard',
    },
    {
      id: 'payment',
      title: 'Complete Payment',
      description: 'Process copay and out-of-pocket costs',
      status: currentStep === 'payment' ? 'in-progress' : currentStep === 'pharmacy' || currentStep === 'complete' ? 'complete' : 'locked',
      icon: 'card',
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy & Transport',
      description: 'Coordinate medications and exit assistance',
      status: currentStep === 'pharmacy' ? 'in-progress' : currentStep === 'complete' ? 'complete' : 'locked',
      icon: 'pill',
    },
  ]

  const handleSignDocument = (docId: string, signatureData: string) => {
    setDocuments((currentDocs) => {
      if (!currentDocs) return []
      return currentDocs.map((doc) =>
        doc.id === docId ? { ...doc, signed: true, signatureData, signedAt: new Date().toISOString() } : doc
      )
    })
    toast.success('Document signed successfully')
  }

  const handlePayment = () => {
    toast.success('Payment processed successfully')
    setCurrentStep('pharmacy')
  }

  const handleComplete = () => {
    setCurrentStep('complete')
    toast.success('Discharge process complete!')
  }

  useEffect(() => {
    if (!documents) return
    
    const allRequiredSigned = documents
      .filter((d) => d.required)
      .every((d) => d.signed)

    if (allRequiredSigned && currentStep === 'documents') {
      setTimeout(() => {
        setCurrentStep('payment')
        toast.info('Ready for payment processing')
      }, 1000)
    }
  }, [documents, currentStep, setCurrentStep])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          <PatientHeader patient={patient} timeRemaining={timeRemaining} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Timeline steps={steps} currentStepId={currentStep || 'insurance'} />
            </div>

            <div className="lg:col-span-2 space-y-6">
              {(currentStep === 'documents' || currentStep === 'payment' || currentStep === 'pharmacy' || currentStep === 'complete') && documents && (
                <Documents
                  documents={documents}
                  onSign={handleSignDocument}
                  disabled={currentStep !== 'documents'}
                />
              )}

              {(currentStep === 'payment' || currentStep === 'pharmacy' || currentStep === 'complete') && (
                <Payment
                  insurance={insurance}
                  onPayment={handlePayment}
                  disabled={currentStep !== 'payment'}
                />
              )}

              {(currentStep === 'pharmacy' || currentStep === 'complete') && (
                <PharmacyTransport
                  onComplete={handleComplete}
                  disabled={currentStep !== 'pharmacy'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App