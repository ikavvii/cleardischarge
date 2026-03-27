import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileText, CheckCircle, PencilLine } from '@phosphor-icons/react'
import { Document } from '@/types/discharge'
import { motion, AnimatePresence } from 'framer-motion'
import { SignaturePad } from '@/components/SignaturePad'

interface DocumentsProps {
  documents: Document[]
  onSign: (docId: string, signatureData: string) => void
  disabled?: boolean
}

export function Documents({ documents, onSign, disabled }: DocumentsProps) {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [showSignaturePad, setShowSignaturePad] = useState(false)
  const [currentDocToSign, setCurrentDocToSign] = useState<Document | null>(null)

  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = []
    }
    acc[doc.category].push(doc)
    return acc
  }, {} as Record<string, Document[]>)

  const allSigned = documents.filter(d => d.required).every(d => d.signed)
  const signedCount = documents.filter(d => d.signed).length

  const getCategoryLabel = (category: Document['category']) => {
    switch (category) {
      case 'legal':
        return 'Legal Documents'
      case 'medical':
        return 'Medical Instructions'
      case 'financial':
        return 'Financial Agreements'
    }
  }

  return (
    <Card className={disabled ? 'opacity-50 pointer-events-none' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText weight="duotone" className="text-primary" size={24} />
              Sign Documents
            </CardTitle>
            <CardDescription>Review and sign all required documents</CardDescription>
          </div>
          <Badge variant={allSigned ? 'default' : 'secondary'} className={allSigned ? 'bg-accent text-accent-foreground' : ''}>
            {signedCount} / {documents.length} Signed
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {Object.entries(groupedDocs).map(([category, docs]) => (
            <AccordionItem key={category} value={category} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{getCategoryLabel(category as Document['category'])}</span>
                  <Badge variant="outline">
                    {docs.filter(d => d.signed).length} / {docs.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {docs.map(doc => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {doc.signed ? (
                          <CheckCircle weight="fill" className="text-accent" size={20} />
                        ) : (
                          <PencilLine weight="duotone" className="text-muted-foreground" size={20} />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{doc.title}</p>
                          {doc.required && !doc.signed && (
                            <p className="text-xs text-muted-foreground">Required</p>
                          )}
                          {doc.signed && doc.signedAt && (
                            <p className="text-xs text-muted-foreground">
                              Signed {new Date(doc.signedAt).toLocaleString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                hour: 'numeric', 
                                minute: '2-digit' 
                              })}
                            </p>
                          )}
                        </div>
                        {doc.signed && doc.signatureData && (
                          <div className="ml-2">
                            <img 
                              src={doc.signatureData} 
                              alt="Signature" 
                              className="h-8 w-16 object-contain border border-border rounded bg-card"
                            />
                          </div>
                        )}
                      </div>
                      {!doc.signed && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setCurrentDocToSign(doc)
                            setShowSignaturePad(true)
                          }}
                        >
                          Sign
                        </Button>
                      )}
                      {doc.signed && (
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                          Signed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {allSigned && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-3"
          >
            <CheckCircle weight="fill" className="text-accent" size={24} />
            <div>
              <p className="font-semibold text-accent-foreground">All documents signed</p>
              <p className="text-sm text-muted-foreground">You can proceed to payment</p>
            </div>
          </motion.div>
        )}
      </CardContent>

      <AnimatePresence>
        {showSignaturePad && currentDocToSign && (
          <SignaturePad
            documentTitle={currentDocToSign.title}
            onSave={(signatureData) => {
              onSign(currentDocToSign.id, signatureData)
              setShowSignaturePad(false)
              setCurrentDocToSign(null)
            }}
            onCancel={() => {
              setShowSignaturePad(false)
              setCurrentDocToSign(null)
            }}
          />
        )}
      </AnimatePresence>
    </Card>
  )
}
