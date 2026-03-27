import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CreditCard, CheckCircle, AppleLogo, GoogleLogo } from '@phosphor-icons/react'
import { InsuranceInfo } from '@/types/discharge'
import { motion } from 'framer-motion'

interface PaymentProps {
  insurance: InsuranceInfo
  onPayment: () => void
  disabled?: boolean
}

export function Payment({ insurance, onPayment, disabled }: PaymentProps) {
  const [processing, setProcessing] = useState(false)
  const [paid, setPaid] = useState(false)

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setPaid(true)
      onPayment()
    }, 2000)
  }

  const getStatusBadge = () => {
    if (insurance.status === 'approved') {
      return <Badge className="bg-accent text-accent-foreground">Approved</Badge>
    } else if (insurance.status === 'partial') {
      return <Badge className="bg-warning text-warning-foreground">Partial Approval</Badge>
    } else {
      return <Badge variant="secondary">Pending</Badge>
    }
  }

  return (
    <Card className={disabled ? 'opacity-50 pointer-events-none' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CreditCard weight="duotone" className="text-primary" size={24} />
              Payment & Insurance
            </CardTitle>
            <CardDescription>Review charges and complete payment</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Insurance Provider</span>
            <span className="font-semibold">{insurance.provider}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Member ID</span>
            <span className="font-mono font-semibold">{insurance.memberId}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Charges</span>
            <span className="font-mono text-lg">${insurance.totalCharges.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-accent">
            <span>Insurance Pays</span>
            <span className="font-mono text-lg font-semibold">-${insurance.insurancePays.toLocaleString()}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">You Owe</span>
            <span className="font-mono text-2xl font-bold font-['JetBrains_Mono']">
              ${insurance.patientOwes.toLocaleString()}
            </span>
          </div>
        </div>

        {!paid && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Select payment method:</p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePay}
                disabled={processing}
                className="h-16 flex-col gap-2"
              >
                <AppleLogo size={24} />
                <span className="text-sm">Apple Pay</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handlePay}
                disabled={processing}
                className="h-16 flex-col gap-2"
              >
                <GoogleLogo size={24} />
                <span className="text-sm">Google Pay</span>
              </Button>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={handlePay}
              disabled={processing}
            >
              {processing ? (
                'Processing...'
              ) : (
                <>
                  <CreditCard className="mr-2" size={20} />
                  Pay with Card
                </>
              )}
            </Button>
          </div>
        )}

        {paid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-3"
          >
            <CheckCircle weight="fill" className="text-accent" size={28} />
            <div className="flex-1">
              <p className="font-semibold text-accent-foreground">Payment completed</p>
              <p className="text-sm text-muted-foreground">Receipt sent to your email</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
