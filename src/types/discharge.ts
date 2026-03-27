export type DischargeStatus = 'pending' | 'in-progress' | 'complete' | 'locked'

export interface DischargeStep {
  id: string
  title: string
  description: string
  status: DischargeStatus
  icon: string
}

export interface PatientInfo {
  name: string
  room: string
  mrn: string
  admitDate: string
  dischargeTime: string
}

export interface InsuranceInfo {
  provider: string
  memberId: string
  totalCharges: number
  insurancePays: number
  patientOwes: number
  status: 'pending' | 'approved' | 'partial'
}

export interface Document {
  id: string
  title: string
  category: 'legal' | 'medical' | 'financial'
  signed: boolean
  required: boolean
  signatureData?: string
  signedAt?: string
}
