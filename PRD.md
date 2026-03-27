# ClearDischarge - Bedside Hospital Discharge Platform

Transform the hospital discharge process into a seamless, bedside, digital experience that keeps caregivers with their loved ones while improving hospital efficiency.

**Experience Qualities**:
1. **Calming** - Reduces anxiety during a stressful medical transition by consolidating scattered tasks into one intuitive flow
2. **Empowering** - Gives caregivers complete visibility and control without leaving the patient's side
3. **Professional** - Conveys trustworthiness and clinical credibility through refined design that matches healthcare standards

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused digital tool that streamlines a specific multi-step process (insurance verification, paperwork, payment, pharmacy, transport) with persistent state across the discharge journey. It's more than a simple utility but doesn't require complex CRM-level features.

## Essential Features

### Pre-Discharge Timeline (24 Hours Before)
- **Functionality**: Visual countdown showing discharge preparation progress with automated insurance pre-auth status
- **Purpose**: Transforms frantic last-minute scrambling into organized preparation
- **Trigger**: Physician enters discharge order in EHR system
- **Progression**: Discharge order entered → Caregiver receives secure link via SMS → Timeline shows 24hr countdown → Insurance pre-auth runs automatically → Estimated costs appear → Educational materials unlock
- **Success Criteria**: Caregiver can see estimated out-of-pocket costs and required tasks at least 18 hours before actual departure

### Digital Paperwork Hub
- **Functionality**: Unified e-signature portal for all discharge forms (consent, liability, care instructions acknowledgment)
- **Purpose**: Eliminates physical paper shuffling and trips to nursing stations
- **Trigger**: Caregiver taps "Review Documents" in the timeline
- **Progression**: Tap documents section → View categorized forms (Legal, Medical, Financial) → Read each form → Sign with finger/stylus → Progress bar updates → All signatures complete
- **Success Criteria**: Caregiver can complete all required signatures from mobile device; nurse dashboard shows real-time completion status

### Bedside Payment Processing
- **Functionality**: Secure payment gateway for copays and out-of-pocket expenses with insurance breakdown
- **Purpose**: Eliminates the billing desk bottleneck that keeps caregivers away from patients
- **Trigger**: All paperwork signed, final bill calculated
- **Progression**: Bill ready notification → View itemized charges → See insurance coverage breakdown → Select payment method (Apple Pay/Card) → Authorize payment → Receipt sent to email
- **Success Criteria**: Payment processes successfully within 30 seconds; receipt includes insurance claim tracking number

### Medication & Transport Coordination
- **Functionality**: Prescription routing and orderly notification system
- **Purpose**: Coordinates the final two physical steps without phone tag or hallway searches
- **Trigger**: Payment confirmed and paperwork complete
- **Progression**: Discharge checklist complete → Select pharmacy option (hospital delivery or external) → Confirm prescription routing → Tap "Ready for Transport" → Orderly receives notification with room number → Estimated arrival time shown
- **Success Criteria**: Pharmacy receives order within 2 minutes; orderly confirms receipt and provides ETA

### Real-Time Dashboard (Nurse View)
- **Functionality**: Live status board showing discharge completion for all patients on the floor
- **Purpose**: Nurses know exactly who is ready for physical departure without checking multiple systems
- **Trigger**: Nurse logs into staff portal
- **Progression**: Open dashboard → See color-coded patient list → Filter by completion status → Click patient to see detailed checklist → Verify medical clearance → Approve final discharge
- **Success Criteria**: Dashboard updates within 5 seconds of caregiver action; shows bottlenecks clearly

## Edge Case Handling

- **Insurance Rejection**: Display clear next steps with hospital financial counselor contact; allow partial payment
- **Lost Connection**: Forms auto-save progress; offline mode for signature completion with sync on reconnect
- **Multiple Caregivers**: Primary caregiver can delegate sections via SMS invite with role-based permissions
- **Language Barriers**: Auto-translate all documents using browser settings; flag for interpreter if legal signatures required
- **Payment Failure**: Offer payment plan enrollment; allow discharge to proceed with billing follow-up appointment
- **Patient Deterioration**: Emergency override button for medical staff to pause/cancel discharge process instantly

## Design Direction

The interface should evoke **clinical confidence meets consumer simplicity** - the reliability of medical software with the intuitiveness of Apple Pay. Think of the calm competence of a seasoned ICU nurse, translated into visual design. The experience should reduce heart rate, not raise it. Every interaction whispers "we've done this thousands of times; you're in good hands."

## Color Selection

A medical environment with warmth and approachability - avoiding the sterile coldness of typical hospital software while maintaining professional credibility.

- **Primary Color (Deep Teal)**: `oklch(0.45 0.12 210)` - Medical scrubs meet tech trust; conveys healthcare professionalism with modern digital confidence
- **Secondary Color (Soft Slate)**: `oklch(0.92 0.01 240)` - Neutral foundation that doesn't compete; allows content hierarchy to emerge naturally
- **Accent Color (Healing Green)**: `oklch(0.65 0.15 155)` - Progress, completion, health; the visual reward for each completed step
- **Warning/Financial (Amber)**: `oklch(0.70 0.15 65)` - Cost transparency without alarm; approachable financial clarity
- **Background (Clinical White)**: `oklch(0.98 0.005 240)` - Clean, spacious, breathing room with subtle warmth to avoid stark hospital feel
- **Foreground/Text (Charcoal)**: `oklch(0.25 0.01 240)` - High readability without harsh black contrast

**Foreground/Background Pairings**:
- Background (Clinical White `oklch(0.98 0.005 240)`): Charcoal text (`oklch(0.25 0.01 240)`) - Ratio 14.2:1 ✓
- Primary (Deep Teal `oklch(0.45 0.12 210)`): White text (`oklch(1 0 0)`) - Ratio 6.8:1 ✓
- Accent (Healing Green `oklch(0.65 0.15 155)`): Charcoal text (`oklch(0.25 0.01 240)`) - Ratio 4.9:1 ✓
- Secondary (Soft Slate `oklch(0.92 0.01 240)`): Charcoal text (`oklch(0.25 0.01 240)`) - Ratio 12.1:1 ✓
- Warning (Amber `oklch(0.70 0.15 65)`): Charcoal text (`oklch(0.25 0.01 240)`) - Ratio 5.2:1 ✓

## Font Selection

Typography should balance **medical documentation clarity** with **mobile-first readability** - crisp enough for legal text, warm enough for emotional moments.

- **Primary Font**: **Plus Jakarta Sans** (via Google Fonts) - Modern geometric sans with soft terminals; professional without being corporate, friendly without being casual
- **Accent/Numbers**: **JetBrains Mono** (via Google Fonts) - For billing amounts, times, medication dosages where precision matters; monospace adds technical credibility

**Typographic Hierarchy**:
- **H1 (Page Title)**: Plus Jakarta Sans Bold / 32px / -0.02em letter spacing / leading-tight
- **H2 (Section Headers)**: Plus Jakarta Sans Semibold / 24px / -0.01em / leading-snug
- **H3 (Card Titles)**: Plus Jakarta Sans Semibold / 18px / normal spacing / leading-normal
- **Body (Instructions)**: Plus Jakarta Sans Regular / 16px / normal spacing / leading-relaxed (1.6)
- **Body Small (Metadata)**: Plus Jakarta Sans Regular / 14px / normal spacing / leading-normal
- **Financial/Data**: JetBrains Mono Medium / 20px / normal spacing / tabular-nums

## Animations

Animations should **reduce cognitive load and guide focus**, not entertain. Use motion to show relationships between steps, provide subtle completion feedback, and maintain spatial continuity as the discharge progresses.

- **Timeline Progress**: Smooth fill animation when tasks complete (400ms ease-out) with gentle haptic feedback
- **Card Reveals**: Staggered fade-in and slide-up (150ms delay between items) when opening new sections
- **Signature Capture**: Real-time ink trail with slight spring physics to feel natural and legally binding
- **Payment Success**: Gentle checkmark scale animation with accent color pulse (600ms total)
- **Page Transitions**: Slide transitions that maintain spatial model (current step slides left, next step enters from right)
- **Status Updates**: Subtle badge bounce when new notifications arrive; pulsing indicator for required actions

## Component Selection

**Components**:
- **Progress Indicator**: Custom timeline component (not standard Progress bar) showing 5 stages with connectors and status badges
- **Card**: Primary container for each discharge section (paperwork, payment, pharmacy) with shadow and border
- **Accordion**: For collapsible form categories (legal, medical, financial documents)
- **Button**: Primary actions (Sign, Pay, Confirm) with loading states; secondary for navigation
- **Badge**: Status indicators (Pending, Complete, Required) with color coding
- **Dialog**: Payment confirmation and critical alerts
- **Input**: Text fields for insurance numbers or pharmacy selection
- **Separator**: Visual breaks between timeline stages
- **Tabs**: Toggle between Caregiver View and Nurse Dashboard (for demo purposes)
- **ScrollArea**: For long document previews and terms
- **Alert**: Insurance pre-auth results and payment confirmations

**Customizations**:
- **Timeline Connector**: Custom SVG lines connecting progress nodes with animated stroke-dasharray
- **Signature Pad**: Custom canvas component with smooth bezier curves and save-as-image
- **Amount Display**: Large, tabular number formatting with insurance breakdown tooltip

**States**:
- **Buttons**: Clear disabled state (reduced opacity); loading spinner replaces text; success state shows checkmark
- **Timeline Nodes**: Gray (locked), Amber (current), Teal (in progress), Green (complete)
- **Cards**: Subtle hover lift (4px translate); active state with border highlight; disabled with reduced opacity
- **Form Inputs**: Focus state with accent border and subtle shadow; error state with destructive color

**Icon Selection**:
- **ClipboardText**: Document/paperwork sections
- **CreditCard**: Payment processing
- **Heartbeat**: Medical/patient status
- **CheckCircle**: Completion indicators
- **Clock**: Timeline and countdown elements
- **Pill**: Pharmacy/medication sections
- **Wheelchair**: Transport coordination
- **Warning**: Insurance issues or attention needed
- **ArrowRight**: Navigation and flow progression

**Spacing**:
- Container padding: `p-6` (24px) on mobile, `p-8` (32px) on desktop
- Card gaps: `gap-4` (16px) for tight grouping, `gap-6` (24px) for section separation
- Timeline vertical spacing: `gap-8` (32px) between stages
- Form field spacing: `gap-3` (12px) between label and input
- Button padding: `px-6 py-3` for primary actions

**Mobile Considerations**:
- **Bottom Sheet Pattern**: Critical actions (Sign, Pay) use drawer component that slides up from bottom on mobile
- **Sticky Progress**: Timeline collapses to horizontal progress bar that sticks to top on scroll
- **Touch Targets**: All interactive elements minimum 44px height
- **Single Column**: Stack all cards vertically on mobile; side-by-side comparisons (insurance breakdown) become accordion
- **Native Patterns**: Use device-native payment sheets (Apple Pay/Google Pay) when available
- **Reduced Motion**: Respect prefers-reduced-motion for users with vestibular disorders
