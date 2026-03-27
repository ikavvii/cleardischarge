import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Pill, Storefront, CheckCircle, Wheelchair } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface PharmacyTransportProps {
  onComplete: () => void
  disabled?: boolean
}

export function PharmacyTransport({ onComplete, disabled }: PharmacyTransportProps) {
  const [pharmacyOption, setPharmacyOption] = useState<string>('hospital')
  const [pharmacyConfirmed, setPharmacyConfirmed] = useState(false)
  const [transportRequested, setTransportRequested] = useState(false)
  const [eta, setEta] = useState<string>('')

  const handlePharmacyConfirm = () => {
    setPharmacyConfirmed(true)
  }

  const handleTransportRequest = () => {
    setTransportRequested(true)
    setEta('5-10 minutes')
    onComplete()
  }

  return (
    <div className="space-y-6">
      <Card className={disabled ? 'opacity-50 pointer-events-none' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Pill weight="duotone" className="text-primary" size={24} />
            Medication & Pharmacy
          </CardTitle>
          <CardDescription>Choose how to receive your prescriptions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={pharmacyOption} onValueChange={setPharmacyOption}>
            <div className="flex items-start space-x-3 space-y-0 p-3 rounded-lg border">
              <RadioGroupItem value="hospital" id="hospital" />
              <div className="flex-1">
                <Label htmlFor="hospital" className="font-semibold cursor-pointer">
                  Hospital Pharmacy Delivery
                </Label>
                <p className="text-sm text-muted-foreground">
                  Delivered to your room before discharge
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-y-0 p-3 rounded-lg border">
              <RadioGroupItem value="external" id="external" />
              <div className="flex-1">
                <Label htmlFor="external" className="font-semibold cursor-pointer">
                  Send to My Pharmacy
                </Label>
                <p className="text-sm text-muted-foreground">
                  Pick up at your preferred pharmacy
                </p>
              </div>
            </div>
          </RadioGroup>

          {!pharmacyConfirmed && (
            <Button onClick={handlePharmacyConfirm} className="w-full">
              Confirm Pharmacy Choice
            </Button>
          )}

          {pharmacyConfirmed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-3"
            >
              <CheckCircle weight="fill" className="text-accent" size={24} />
              <div>
                <p className="font-semibold text-accent-foreground">Prescription sent</p>
                <p className="text-sm text-muted-foreground">
                  {pharmacyOption === 'hospital'
                    ? 'Will be delivered to your room'
                    : 'Sent to your pharmacy'}
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card className={disabled || !pharmacyConfirmed ? 'opacity-50 pointer-events-none' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Wheelchair weight="duotone" className="text-primary" size={24} />
            Transport Coordination
          </CardTitle>
          <CardDescription>Request assistance to exit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!transportRequested && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  A hospital orderly will bring a wheelchair to your room and assist you to the exit.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={handleTransportRequest}
                disabled={!pharmacyConfirmed}
              >
                <Wheelchair className="mr-2" size={20} />
                Request Transport
              </Button>
            </div>
          )}

          {transportRequested && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle weight="fill" className="text-accent" size={24} />
                  <p className="font-semibold text-accent-foreground">Transport requested</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated arrival: <span className="font-semibold text-foreground">{eta}</span>
                </p>
              </div>

              <div className="p-6 bg-primary/10 border-2 border-primary/20 rounded-lg text-center space-y-2">
                <CheckCircle weight="fill" className="text-primary mx-auto" size={48} />
                <h3 className="text-xl font-bold text-primary">All Set!</h3>
                <p className="text-sm text-muted-foreground">
                  Your discharge is complete. The orderly will arrive shortly.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
