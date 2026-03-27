import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Bed, IdentificationCard, CalendarDots } from '@phosphor-icons/react'
import { PatientInfo } from '@/types/discharge'

interface PatientHeaderProps {
  patient: PatientInfo
  timeRemaining: string
}

export function PatientHeader({ patient, timeRemaining }: PatientHeaderProps) {
  return (
    <Card className="border-primary border-2 bg-gradient-to-br from-primary/5 via-background to-background">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
                <User weight="duotone" className="text-primary" size={32} />
                {patient.name}
              </h1>
              <p className="text-muted-foreground">Discharge in Progress</p>
            </div>
            <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2 font-mono">
              {timeRemaining}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="flex items-center gap-2">
              <Bed weight="duotone" className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Room</p>
                <p className="font-semibold">{patient.room}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <IdentificationCard weight="duotone" className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">MRN</p>
                <p className="font-semibold font-mono">{patient.mrn}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDots weight="duotone" className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Admitted</p>
                <p className="font-semibold">{patient.admitDate}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
