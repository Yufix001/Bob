
import type { ReactElement, ReactNode } from 'react';

export type Step =
  | 'LANDING'
  | 'CATEGORY_SELECTION'
  | 'APPLIANCE_SELECTION'
  | 'APPLIANCE_DETAILS'
  | 'VALIDATION'
  | 'DIAGNOSIS'
  | 'RESULT'
  | 'ESCALATION'
  | 'CONFIRMATION'
  | 'FEEDBACK_SUCCESS'
  | 'FEEDBACK_AI'
  | 'HISTORY'
  | 'CONCIERGE'
  | 'BACKOFFICE_ROLE_SELECT'
  | 'BACKOFFICE_DASHBOARD'
  | 'CONTACT_FORM';

export interface Category {
  id: string;
  name: string;
  // FIX: Changed icon type to be more specific for React.cloneElement to correctly pass props.
  icon: ReactElement<{ className?: string }>;
}

export interface Appliance {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface ApplianceDetails {
    brand: string;
    model: string;
}

export interface UserInfo {
    name: string;
    phone: string;
    email: string;
    address: string;
}

export interface DiagnosisResult {
  solutionType: 'simple' | 'escalation';
  title: string;
  steps?: string[];
  summary: string;
}

// New types for AI conversation
export interface ConversationTurn {
    question: string;
    answer: string;
}

export type AiResponse =
    | { type: 'question'; questionText: string; answerOptions: { optionText: string }[] }
    | { type: 'diagnosis'; diagnosisResult: DiagnosisResult };

// New types for Maintenance History
export type MaintenanceStatus = 'RESOLVED_BY_USER' | 'ESCALATED_TO_PRO';

export interface MaintenanceRequest {
    id: number;
    date: string;
    categoryName: string;
    applianceName: string;
    status: MaintenanceStatus;
    diagnosisTitle: string;
    diagnosisSummary: string;
    notes?: string;
}

// --- BACKOFFICE TYPES ---

export type TicketStatus = 'NEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type BackofficeRole = 'CONCIERGE' | 'ARTISAN';

// Updated tabs to include Artisan specific views including PROFILE
export type BackofficeTab = 'DASHBOARD' | 'INCIDENTS' | 'AIRCOVER' | 'FINANCES' | 'LEADS' | 'PLANNING' | 'REVENUS' | 'PROFILE';
export type AirCoverStatus = 'ELIGIBLE' | 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export interface Property {
    id: string;
    name: string;
    address: string;
    ownerName: string;
    ownerPhone: string;
    airbnbLink?: string;
}

export interface Quote {
    id: string;
    ticketId: string;
    propertyName: string;
    description: string;
    amount: number;
    status: 'PENDING_SIGNATURE' | 'SIGNED' | 'REJECTED';
    date: string;
}

export interface Invoice {
    id: string;
    ticketId: string;
    propertyName: string;
    description: string;
    amount: number;
    status: 'PENDING_PAYMENT' | 'PAID' | 'OVERDUE';
    dueDate: string;
}

export interface Ticket {
    id: string;
    propertyId?: string; // Link to property
    tenantName: string;
    apartment: string; // Kept for display, derived from property usually
    category: string;
    appliance?: string;
    issueSummary: string; // AI Generated summary
    fullDiagnosis: string;
    history?: ConversationTurn[]; // Q&A History collected during diagnosis
    dateCreated: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo?: string; // Artisan Name
    brand?: string;
    model?: string;
    
    // AirCover & Advanced fields
    isGuestDamaged?: boolean;
    airCoverStatus?: AirCoverStatus;
    photos?: string[]; // URLs
    costEstimate?: number;
    
    // Artisan Specific
    artisanQuoteAmount?: number;
    artisanQuoteStatus?: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
    interventionDate?: string;
}

// --- PROFILE TYPES ---
export interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

export interface ArtisanProfile {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    iban: string;
    skills: string[]; // Array of category IDs
    serviceArea: string; // e.g., "Paris 11ème"
    rating: number;
    completedInterventions: number;
    reviews: Review[];
}