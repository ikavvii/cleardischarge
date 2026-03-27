import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ClipboardText, CheckCircle, Clock, Warning } from '@phosphor-icons/react'
import { DischargeStep } from '@/types/discharge'
import { cn } from '@/lib/utils'

interface TimelineProps {
  steps: DischargeStep[]
  currentStepId: string
}

export function Timeline({ steps, currentStepId }: TimelineProps) {
  const getStatusColor = (status: DischargeStep['status']) => {
    switch (status) {
      case 'complete':
        return 'bg-accent'
      case 'in-progress':
        return 'bg-primary'
      case 'pending':
        return 'bg-warning'
      case 'locked':
        return 'bg-muted'
    }
  }

  const getIcon = (status: DischargeStep['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle weight="fill" className="text-accent" size={24} />
      case 'in-progress':
        return <ClipboardText weight="duotone" className="text-primary" size={24} />
      case 'pending':
        return <Clock weight="duotone" className="text-warning" size={24} />
      case 'locked':
        return <Clock weight="duotone" className="text-muted-foreground" size={24} />
    }
  }

  const getStatusLabel = (status: DischargeStep['status']) => {
    switch (status) {
      case 'complete':
        return 'Complete'
      case 'in-progress':
        return 'In Progress'
      case 'pending':
        return 'Required'
      case 'locked':
        return 'Locked'
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          Discharge Progress
        </CardTitle>
        <CardDescription>Complete all steps to finalize discharge</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            const isCurrent = step.id === currentStepId

            return (
              <div key={step.id} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300',
                        getStatusColor(step.status),
                        isCurrent && 'ring-4 ring-primary/20'
                      )}
                    >
                      {getIcon(step.status)}
                    </div>
                    {!isLast && (
                      <div
                        className={cn(
                          'w-0.5 h-12 mt-2 transition-all duration-500',
                          step.status === 'complete' ? 'bg-accent' : 'bg-border'
                        )}
                      />
                    )}
                  </div>

                  <div className="flex-1 pt-2">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={cn(
                          'font-semibold text-lg transition-colors',
                          step.status === 'locked'
                            ? 'text-muted-foreground'
                            : 'text-foreground'
                        )}
                      >
                        {step.title}
                      </h3>
                      <Badge
                        variant={step.status === 'complete' ? 'default' : 'secondary'}
                        className={cn(
                          'transition-colors',
                          step.status === 'complete' && 'bg-accent text-accent-foreground',
                          step.status === 'in-progress' && 'bg-primary text-primary-foreground',
                          step.status === 'pending' && 'bg-warning text-warning-foreground'
                        )}
                      >
                        {getStatusLabel(step.status)}
                      </Badge>
                    </div>
                    <p
                      className={cn(
                        'text-sm transition-colors',
                        step.status === 'locked'
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
