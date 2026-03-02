
import React, { useState, useCallback, useEffect, cloneElement, useRef } from 'react';
import type { Step, Category, Appliance, DiagnosisResult, AiResponse, ConversationTurn, ApplianceDetails, MaintenanceRequest, MaintenanceStatus, BackofficeRole, Ticket, TicketStatus, BackofficeTab, Property, Quote, Invoice, UserInfo, ArtisanProfile } from './types';
import { 
    ApplianceIcon, ElectricityIcon, MissingObjectIcon, OtherProblemIcon, PlumbingIcon, SettingsIcon, 
    WashingMachineIcon, DryerIcon, DishwasherIcon, FridgeIcon, OvenIcon, LandingLogo, LoadingSpinnerIcon,
    CheckIcon, HistoryIcon, CameraIcon, XIcon, ConciergeIcon, KeyIcon,
    MicrowaveIcon, CooktopIcon, CookerHoodIcon, CoffeeMachineIcon,
    HeatingIcon, WifiIcon, DoorIcon, WallIcon, BugIcon, FurnitureIcon,
    DashboardIcon, ClipboardListIcon, UserGroupIcon, WrenchIcon,
    SinkIcon, ToiletIcon, ShowerIcon, WaterHeaterIcon, FaucetIcon, PipeIcon,
    PowerOutageIcon, OutletIcon, SwitchIcon, LightBulbIcon, FuseBoxIcon,
    RadiatorIcon, BoilerIcon, AirConIcon, ThermostatIcon, FanIcon,
    RouterIcon, NoWifiIcon, TvBoxIcon, CableIcon, PhoneIcon,
    WindowIcon, ShutterIcon, LockIcon, GateIcon, BrokenGlassIcon,
    FileTextIcon, ShieldCheckIcon, EuroIcon, PhotoIcon, PrinterIcon,
    CalendarIcon, EyeIcon, EyeOffIcon, WalletIcon, CreditCardIcon, MapPinIcon,
    StarIcon, UserIcon
} from './components/icons';
import { getAiResponse } from './services/geminiService';

// --- DATA MOCKS ---
const CATEGORIES: Category[] = [
  { id: 'electromenager', name: 'Électromenager', icon: <ApplianceIcon /> },
  { id: 'plomberie', name: 'Plomberie', icon: <PlumbingIcon /> },
  { id: 'electricite', name: 'Électricité', icon: <ElectricityIcon /> },
  { id: 'chauffage', name: 'Chauffage & Clim', icon: <HeatingIcon /> },
  { id: 'internet', name: 'Internet & Wifi', icon: <WifiIcon /> },
  { id: 'menuisierie', name: 'Portes & Fenêtres', icon: <DoorIcon /> },
  { id: 'sols-murs', name: 'Sols & Murs', icon: <WallIcon /> },
  { id: 'nuisibles', name: 'Nuisibles', icon: <BugIcon /> },
  { id: 'mobilier', name: 'Mobilier', icon: <FurnitureIcon /> },
  { id: 'objets', name: 'Objets manquants', icon: <MissingObjectIcon /> },
];

const APPLIANCES: Record<string, Appliance[]> = {
  electromenager: [
    { id: 'lave-linge', name: 'Machine à laver', icon: <WashingMachineIcon /> },
    { id: 'refrigerateur', name: 'Réfrigérateur', icon: <FridgeIcon /> },
    { id: 'lave-vaisselle', name: 'Lave-vaisselle', icon: <DishwasherIcon /> },
    { id: 'four', name: 'Four', icon: <OvenIcon /> },
    { id: 'seche-linge', name: 'Sèche-linge', icon: <DryerIcon /> },
    { id: 'micro-ondes', name: 'Micro-ondes', icon: <MicrowaveIcon /> },
    { id: 'plaque-de-cuisson', name: 'Plaque de cuisson', icon: <CooktopIcon /> },
    { id: 'hotte', name: 'Hotte', icon: <CookerHoodIcon /> },
    { id: 'cafetiere', name: 'Machine à café', icon: <CoffeeMachineIcon /> },
    { id: 'autre-electromenager', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  plomberie: [
      { id: 'wc', name: 'Toilettes / WC', icon: <ToiletIcon /> },
      { id: 'evier', name: 'Évier / Lavabo', icon: <SinkIcon /> },
      { id: 'douche-baignoire', name: 'Douche / Baignoire', icon: <ShowerIcon /> },
      { id: 'chauffe-eau', name: 'Chauffe-eau', icon: <WaterHeaterIcon /> },
      { id: 'robinetterie', name: 'Robinetterie', icon: <FaucetIcon /> },
      { id: 'fuite', name: 'Fuite / Canalisation', icon: <PipeIcon /> },
      { id: 'autre-plomberie', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  electricite: [
      { id: 'coupure-courant', name: 'Coupure de courant', icon: <PowerOutageIcon /> },
      { id: 'prise', name: 'Prise électrique', icon: <OutletIcon /> },
      { id: 'interrupteur', name: 'Interrupteur', icon: <SwitchIcon /> },
      { id: 'eclairage', name: 'Ampoule / Luminaire', icon: <LightBulbIcon /> },
      { id: 'tableau-electrique', name: 'Tableau / Disjoncteur', icon: <FuseBoxIcon /> },
      { id: 'autre-electricite', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  chauffage: [
      { id: 'radiateur', name: 'Radiateur', icon: <RadiatorIcon /> },
      { id: 'chaudiere', name: 'Chaudière', icon: <BoilerIcon /> },
      { id: 'clim', name: 'Climatisation', icon: <AirConIcon /> },
      { id: 'thermostat', name: 'Thermostat', icon: <ThermostatIcon /> },
      { id: 'ventilation', name: 'VMC / Ventilation', icon: <FanIcon /> },
      { id: 'autre-chauffage', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  internet: [
      { id: 'box-internet', name: 'Box Internet', icon: <RouterIcon /> },
      { id: 'wifi-signal', name: 'Problème Wifi', icon: <NoWifiIcon /> },
      { id: 'tv-decoder', name: 'Décodeur TV', icon: <TvBoxIcon /> },
      { id: 'cabling', name: 'Prise / Câble Ethernet', icon: <CableIcon /> },
      { id: 'landline-phone', name: 'Téléphone Fixe', icon: <PhoneIcon /> },
      { id: 'autre-internet', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  menuisierie: [
      { id: 'door', name: 'Porte Entrée / Int.', icon: <DoorIcon /> },
      { id: 'window', name: 'Fenêtre / Baie Vitrée', icon: <WindowIcon /> },
      { id: 'shutter', name: 'Volet Roulant / Store', icon: <ShutterIcon /> },
      { id: 'lock', name: 'Serrure / Poignée', icon: <LockIcon /> },
      { id: 'garage', name: 'Portail / Garage', icon: <GateIcon /> },
      { id: 'broken-glass', name: 'Vitre cassée', icon: <BrokenGlassIcon /> },
      { id: 'autre-menuiserie', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  'sols-murs': [
      { id: 'parquet', name: 'Parquet', icon: <WallIcon /> },
      { id: 'carrelage', name: 'Carrelage', icon: <WallIcon /> },
      { id: 'peinture', name: 'Peinture / Murs', icon: <WallIcon /> },
      { id: 'autre-sols', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  'nuisibles': [
      { id: 'cafard', name: 'Cafards / Blattes', icon: <BugIcon /> },
      { id: 'rongeur', name: 'Souris / Rats', icon: <BugIcon /> },
      { id: 'punaise', name: 'Punaises de lit', icon: <BugIcon /> },
      { id: 'autre-nuisibles', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  'mobilier': [
      { id: 'lit', name: 'Lit / Sommier', icon: <FurnitureIcon /> },
      { id: 'canape', name: 'Canapé / Fauteuil', icon: <FurnitureIcon /> },
      { id: 'table', name: 'Table / Chaise', icon: <FurnitureIcon /> },
      { id: 'autre-mobilier', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ],
  'objets': [
      { id: 'cles', name: 'Clés perdues', icon: <KeyIcon className="w-12 h-12 text-gray-700" /> },
      { id: 'telecommande', name: 'Télécommande', icon: <MissingObjectIcon /> },
      { id: 'autre-objets', name: 'Autre', icon: <OtherProblemIcon className="w-12 h-12 text-gray-700" /> },
  ]
};

// List of appliance IDs for which we skip the Brand/Model selection step
const APPLIANCES_SKIPPING_DETAILS = [
    'wc', 'evier', 'douche-baignoire', 'robinetterie', 'fuite', 'autre-plomberie', 'autre-electromenager',
    'coupure-courant', 'prise', 'interrupteur', 'eclairage', 'tableau-electrique', 'autre-electricite',
    'radiateur', 'thermostat', 'ventilation', 'autre-chauffage',
    'box-internet', 'wifi-signal', 'tv-decoder', 'cabling', 'landline-phone', 'autre-internet',
    'door', 'window', 'shutter', 'lock', 'garage', 'broken-glass', 'autre-menuiserie',
    'parquet', 'carrelage', 'peinture', 'autre-sols',
    'cafard', 'rongeur', 'punaise', 'autre-nuisibles',
    'lit', 'canape', 'table', 'autre-mobilier',
    'cles', 'telecommande', 'autre-objets',
    'generic'
];

const BRAND_DATA: Record<string, Record<string, (string | { name: string; imageUrl: string })[]>> = {
  'lave-linge': {
    'Samsung': ['WW90T534DAE', 'WW80T554DAW', 'AddWash WW90K6414QW', 'EcoBubble WW70J5555FX'],
    'Bosch': ['WAU28T60FG', 'WGG244A0FR', 'Serie 6 WAU28S60GB', 'Serie 8 WAV28M40FG'],
    'LG': ['F4V709STSE', 'F4V909WTS', 'FV1450H2B', 'DirectDrive F4J6TY0W'],
    'Whirlpool': ['FFD9448BSVFR', 'FWG81496WSEU', 'ZEN SF10422', 'Supreme Care FSCR80421'],
    'Miele': ['WCR860WPS', 'WDD030', 'TwinDos WCG660', 'W1 WSA023'],
    'Autre': ['Modèle inconnu']
  },
  'refrigerateur': {
    'Samsung': ['RS68A8840S9', 'RB34T600ESA', 'Family Hub RF56M9540SR'],
    'Bosch': ['KGN39VWEBG', 'Serie 4 KGN36VLED', 'KGV36VLEAS'],
    'LG': ['GSX961NSAZ', 'GBB72PZVGN', 'InstaView GSLV71PZTF'],
    'Autre': ['Modèle inconnu']
  },
  // Add more brands as needed...
};

// --- BACKOFFICE MOCK DATA ---
const MOCK_PROPERTIES: Property[] = [
    { id: 'P-01', name: 'Résidence Les Lilas - Apt 4B', address: '12 Rue des Fleurs, 75011 Paris', ownerName: 'M. Pierre Durand', ownerPhone: '06 12 34 56 78', airbnbLink: 'https://airbnb.com/rooms/12345' },
    { id: 'P-02', name: 'Studio Montmartre', address: '5 Rue Lepic, 75018 Paris', ownerName: 'Mme Claire Leroi', ownerPhone: '06 98 76 54 32', airbnbLink: 'https://airbnb.com/rooms/67890' },
    { id: 'P-03', name: 'Loft Canal St Martin', address: '45 Quai de Valmy, 75010 Paris', ownerName: 'SCI Canal', ownerPhone: '01 44 55 66 77', airbnbLink: 'https://airbnb.com/rooms/11223' },
    { id: 'P-04', name: 'Appartement Le Marais', address: '20 Rue des Rosiers, 75004 Paris', ownerName: 'M. Thomas Martin', ownerPhone: '06 11 22 33 44', airbnbLink: 'https://airbnb.com/rooms/99887' }
];

const MOCK_TICKETS: Ticket[] = [
    {
        id: 'T-1042',
        propertyId: 'P-01',
        tenantName: 'Alice Dupont',
        apartment: 'Apt 4B',
        category: 'Électromenager',
        appliance: 'Machine à laver',
        brand: 'Samsung',
        model: 'WW90T534DAE',
        issueSummary: 'Fuite d\'eau importante lors du cycle d\'essorage. Code erreur E4 affiché.',
        fullDiagnosis: 'Le joint de porte semble intact visuellement. La fuite provient probablement de la pompe de vidange ou d\'une durite percée à l\'arrière. L\'utilisateur a coupé l\'arrivée d\'eau.',
        history: [
            { question: "Quelle est la nature du problème ?", answer: "La machine fuit beaucoup d'eau par le dessous." },
            { question: "À quel moment du cycle la fuite se produit-elle ?", answer: "Juste au moment de l'essorage." },
            { question: "Voyez-vous un code erreur sur l'écran ?", answer: "Oui, ça affiche E4." },
            { question: "Avez-vous vérifié le filtre de vidange ?", answer: "Oui, je l'ai ouvert, rien d'anormal." }
        ],
        dateCreated: '10/05/2024',
        priority: 'HIGH',
        status: 'NEW',
        isGuestDamaged: false,
        artisanQuoteStatus: 'DRAFT'
    },
    {
        id: 'T-1041',
        propertyId: 'P-02',
        tenantName: 'Jean Martin',
        apartment: 'Studio 2',
        category: 'Internet & Wifi',
        issueSummary: 'Coupure totale internet depuis l\'orage d\'hier.',
        fullDiagnosis: 'La box ne s\'allume plus du tout malgré le changement de prise électrique. Probable surtension ayant grillé l\'alimentation de la box.',
        dateCreated: '09/05/2024',
        priority: 'MEDIUM',
        status: 'ASSIGNED',
        assignedTo: 'Tech Connect',
        isGuestDamaged: false,
        interventionDate: '2024-05-12 14:00'
    },
    {
        id: 'T-1038',
        propertyId: 'P-01',
        tenantName: 'Sophie Lemaire',
        apartment: 'Apt 4B',
        category: 'Plomberie',
        issueSummary: 'Évier bouché, l\'eau remonte.',
        fullDiagnosis: 'L\'eau s\'évacue très lentement. L\'utilisateur a essayé le furet sans succès. Possible obstruction dans la colonne principale.',
        history: [
            { question: "Quel est le problème avec votre évier ?", answer: "L'eau ne s'écoule plus du tout, ça déborde." },
            { question: "Avez-vous essayé un déboucheur chimique ?", answer: "Oui, j'ai mis du Destop toute la nuit, ça n'a rien changé." },
            { question: "Avez-vous accès au siphon sous l'évier ?", answer: "Oui, je l'ai démonté et nettoyé, il n'était pas très sale." },
            { question: "Est-ce que les autres évacuations (douche/WC) fonctionnent ?", answer: "Oui, le reste fonctionne bien." }
        ],
        dateCreated: '08/05/2024',
        priority: 'LOW',
        status: 'RESOLVED',
        assignedTo: 'Moi (Artisan)',
        isGuestDamaged: true,
        airCoverStatus: 'APPROVED',
        photos: ['https://placehold.co/300x200/png?text=Evier+Bouché'],
        costEstimate: 150,
        artisanQuoteAmount: 150,
        artisanQuoteStatus: 'ACCEPTED',
        interventionDate: '2024-05-09 10:00'
    },
    {
        id: 'T-1035',
        propertyId: 'P-03',
        tenantName: 'Marc Dubreuil',
        apartment: 'Loft',
        category: 'Chauffage & Clim',
        issueSummary: 'Climatisation ne fait plus de froid.',
        fullDiagnosis: 'Le ventilateur tourne mais l\'air est tiède. Aucun bruit suspect. Filtres nettoyés par le locataire. Soupçon de fuite de gaz réfrigérant.',
        history: [
            { question: "Pouvez-vous décrire le dysfonctionnement ?", answer: "La clim souffle de l'air mais il n'est pas froid." },
            { question: "L'unité extérieure tourne-t-elle ?", answer: "Oui, je l'entends tourner." },
            { question: "Les filtres ont-ils été nettoyés récemment ?", answer: "Oui, je les ai nettoyés la semaine dernière." },
            { question: "Voyez-vous du givre sur les tuyaux ?", answer: "Non, pas de givre visible." }
        ],
        dateCreated: '05/05/2024',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        assignedTo: 'Moi (Artisan)',
        isGuestDamaged: false,
        artisanQuoteAmount: 280,
        artisanQuoteStatus: 'ACCEPTED',
        interventionDate: '2024-05-15 09:00'
    },
    // New ticket for the Marketplace demo
    {
        id: 'T-1043',
        propertyId: 'P-04',
        tenantName: 'Lucas Petit',
        apartment: 'Apt 2',
        category: 'Électricité',
        issueSummary: 'Tableau électrique qui saute quand le four est allumé.',
        fullDiagnosis: 'Surcharge probable du circuit ou défaut d\'isolement sur le four. Le disjoncteur différentiel saute immédiatement. Nécessite vérification ampérage et isolement.',
        history: [
             { question: "Que se passe-t-il exactement ?", answer: "Dès que j'allume le four, tout le courant de l'appart saute." },
             { question: "Est-ce que cela arrive avec d'autres appareils ?", answer: "Non, uniquement le four." },
             { question: "Est-ce le disjoncteur général ou un petit fusible ?", answer: "C'est le gros disjoncteur général (différentiel)." }
        ],
        dateCreated: '11/05/2024',
        priority: 'HIGH',
        status: 'NEW',
        isGuestDamaged: false,
        artisanQuoteStatus: 'DRAFT'
    }
];

const MOCK_QUOTES: Quote[] = [
    { id: 'Q-202', ticketId: 'T-1035', propertyName: 'Loft Canal St Martin', description: 'Recharge gaz réfrigérant R32 + Recherche fuite', amount: 280, status: 'PENDING_SIGNATURE', date: '06/05/2024' },
    { id: 'Q-201', ticketId: 'T-1030', propertyName: 'Studio Montmartre', description: 'Remplacement Serrure 3 points', amount: 450, status: 'SIGNED', date: '01/05/2024' }
];

const MOCK_INVOICES: Invoice[] = [
    { id: 'INV-505', ticketId: 'T-1038', propertyName: 'Résidence Les Lilas - Apt 4B', description: 'Débouchage canalisation haute pression', amount: 150, status: 'PENDING_PAYMENT', dueDate: '30/05/2024' },
    { id: 'INV-504', ticketId: 'T-1022', propertyName: 'Studio Montmartre', description: 'Remplacement vitrage fenêtre', amount: 320, status: 'PAID', dueDate: '15/05/2024' }
];

const MOCK_ARTISAN_PROFILE: ArtisanProfile = {
    name: "Michel Durand",
    companyName: "Durand & Fils Rénovation",
    email: "michel.durand@email.com",
    phone: "06 87 65 43 21",
    iban: "",
    skills: ['plomberie', 'chauffage', 'electricite'],
    serviceArea: "Paris 11ème et alentours (10km)",
    rating: 4.8,
    completedInterventions: 142,
    reviews: [
        { id: 'R-01', author: 'Sophie L.', rating: 5, comment: 'Intervention rapide et efficace. Très professionnel !', date: '10/05/2024' },
        { id: 'R-02', author: 'Marc D.', rating: 4, comment: 'Bon travail, mais arrivé avec 10min de retard.', date: '02/05/2024' },
        { id: 'R-03', author: 'Julie P.', rating: 5, comment: 'A sauvé ma fuite en pleine nuit, merci !', date: '20/04/2024' }
    ]
};

const MARQUEE_BRANDS = [
    "SAMSUNG", "BOSCH", "WHIRLPOOL", "LG", "MIELE", "SIEMENS", "DYSON", 
    "LEGRAND", "SCHNEIDER", "ATLANTIC", "GROHE", "GEBERIT", "SOMFY", "DAIKIN",
    "APPLE", "PHILIPS", "SONY", "DE DIETRICH", "THERMOR"
];

// --- HELPER COMPONENTS ---
const Header: React.FC<{ onBack?: () => void; onShowHistory?: () => void; onProAccessClick?: () => void; hideIcon?: boolean }> = ({ onBack, onShowHistory, onProAccessClick, hideIcon = false }) => (
    <header className="bg-slate-800 p-4 shadow-md sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between h-8">
            <div className="w-1/3">
                {onBack && (
                    <button onClick={onBack} aria-label="Go back" className="text-white hover:text-emerald-400 p-2 -ml-2 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="w-1/3 flex items-center justify-center gap-3">
                {!hideIcon && <SettingsIcon />}
                <h1 className="text-xl font-bold text-white whitespace-nowrap hidden md:block">BOB.AI</h1>
                <h1 className="text-xl font-bold text-white whitespace-nowrap md:hidden">BOB.AI</h1>
            </div>
            <div className="w-1/3 flex justify-end gap-2">
                {onProAccessClick && (
                    <button onClick={onProAccessClick} className="flex items-center gap-2 text-slate-300 hover:text-white border border-slate-600 hover:border-emerald-400 px-3 py-1.5 rounded-full transition text-sm font-medium group">
                        <KeyIcon className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
                        <span className="hidden sm:inline">Espace Pro</span>
                    </button>
                )}
                {onShowHistory && (
                     <button onClick={onShowHistory} aria-label="View history" className="text-white hover:text-emerald-400 p-2 rounded-full transition">
                        <HistoryIcon />
                     </button>
                )}
            </div>
        </div>
    </header>
);

const FullScreenCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <main className="container mx-auto p-4 md:p-8 flex-grow flex flex-col">
        <div className={`flex-grow flex flex-col ${className}`}>
             {children}
        </div>
    </main>
);

const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; disabled?: boolean; type?: 'button' | 'submit' }> = ({ onClick, children, className = '', disabled = false, type = 'button' }) => (
    <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`w-full max-w-md mx-auto text-lg font-semibold rounded-lg px-6 py-4 transition ${
            disabled 
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg'
        } ${className}`}
    >
        {children}
    </button>
);

const Card: React.FC<{ onClick: () => void; children: React.ReactNode; }> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center gap-3 text-center transition hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
    >
        {children}
    </button>
);

// --- SCREEN COMPONENTS ---

const BackofficeDashboard: React.FC<{ role: BackofficeRole; onLogout: () => void }> = ({ role, onLogout }) => {
    // Determine default tab based on role
    const defaultTab: BackofficeTab = role === 'CONCIERGE' ? 'DASHBOARD' : 'LEADS';
    const [activeTab, setActiveTab] = useState<BackofficeTab>(defaultTab);
    const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [showPdfModal, setShowPdfModal] = useState(false);
    
    // Artisan Profile State
    const [artisanProfile, setArtisanProfile] = useState<ArtisanProfile>(MOCK_ARTISAN_PROFILE);
    
    // Artisan Quote State
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [quoteAmount, setQuoteAmount] = useState('');
    const [quoteNotes, setQuoteNotes] = useState('');
    const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

    const getProperty = (id?: string) => MOCK_PROPERTIES.find(p => p.id === id);

    // Filter logic for different roles and views
    const displayedTickets = role === 'ARTISAN' 
        ? tickets.filter(t => t.status !== 'NEW' && (t.assignedTo === 'Tech Connect' || t.assignedTo === 'Michel Plomberie' || t.assignedTo === 'Clim Express' || t.assignedTo === 'Moi (Artisan)')) 
        : tickets;

    const artisanLeads = tickets.filter(t => t.status === 'NEW');
    const artisanMissions = tickets.filter(t => t.assignedTo === 'Moi (Artisan)');
    const artisanCompleted = tickets.filter(t => t.assignedTo === 'Moi (Artisan)' && t.status === 'RESOLVED');

    const airCoverTickets = tickets.filter(t => t.isGuestDamaged);

    const getStatusColor = (status: TicketStatus) => {
        switch(status) {
            case 'NEW': return 'bg-red-100 text-red-700';
            case 'ASSIGNED': return 'bg-blue-100 text-blue-700';
            case 'IN_PROGRESS': return 'bg-amber-100 text-amber-700';
            case 'RESOLVED': return 'bg-emerald-100 text-emerald-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };
    
    const handleProfileUpdate = (updates: Partial<ArtisanProfile>) => {
        setArtisanProfile(prev => ({ ...prev, ...updates }));
    };

    // --- ARTISAN ACTIONS ---
    const handleOpenQuote = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setQuoteAmount('');
        setQuoteNotes('');
        setShowQuoteModal(true);
    };

    const handleSubmitQuote = () => {
        if (!selectedTicket) return;
        setIsSubmittingQuote(true);
        
        // Simulation of quote submission and immediate client acceptance for demo purposes
        setTimeout(() => {
            setTickets(prev => prev.map(t => {
                if (t.id === selectedTicket.id) {
                    return {
                        ...t,
                        status: 'ASSIGNED', // Moves to "Assigned" immediately for demo
                        assignedTo: 'Moi (Artisan)',
                        artisanQuoteAmount: parseFloat(quoteAmount),
                        artisanQuoteStatus: 'ACCEPTED',
                        interventionDate: '2024-05-20 09:00' // Mock future date
                    };
                }
                return t;
            }));
            setIsSubmittingQuote(false);
            setShowQuoteModal(false);
            setActiveTab('PLANNING'); // Auto redirect to planning
            setSelectedTicket(null);
        }, 1500);
    };

    // --- RENDERERS ---

    const renderConciergeDashboard = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-500 text-sm font-medium uppercase">Tickets Ouverts</p>
                        <h3 className="text-3xl font-bold text-slate-800 mt-2">{tickets.filter(t => t.status === 'NEW' || t.status === 'IN_PROGRESS').length}</h3>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><ClipboardListIcon /></div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-500 text-sm font-medium uppercase">Dossiers AirCover</p>
                        <h3 className="text-3xl font-bold text-slate-800 mt-2">{airCoverTickets.length}</h3>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-purple-600"><ShieldCheckIcon /></div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-500 text-sm font-medium uppercase">Devis en attente</p>
                        <h3 className="text-3xl font-bold text-slate-800 mt-2">{MOCK_QUOTES.filter(q => q.status === 'PENDING_SIGNATURE').length}</h3>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg text-amber-600"><FileTextIcon /></div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-500 text-sm font-medium uppercase">Factures à payer</p>
                        <h3 className="text-3xl font-bold text-slate-800 mt-2">{MOCK_INVOICES.filter(i => i.status === 'PENDING_PAYMENT').length}</h3>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600"><EuroIcon /></div>
                </div>
            </div>
        </div>
    );

    const renderConciergeIncidents = () => (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-semibold">
                    <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Lieu / Client</th>
                        <th className="p-4">Problème</th>
                        <th className="p-4">Priorité</th>
                        <th className="p-4">Statut</th>
                        <th className="p-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {tickets.map(ticket => (
                        <tr key={ticket.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => setSelectedTicket(ticket)}>
                            <td className="p-4 font-mono text-sm text-slate-500">#{ticket.id}</td>
                            <td className="p-4">
                                <div className="font-bold text-slate-800">{getProperty(ticket.propertyId)?.name || ticket.apartment}</div>
                                <div className="text-xs text-slate-500">{ticket.tenantName}</div>
                            </td>
                            <td className="p-4">
                                <div className="text-slate-800">{ticket.category}</div>
                                <div className="text-sm text-slate-500 truncate max-w-xs">{ticket.issueSummary}</div>
                            </td>
                            <td className={`p-4 text-sm font-bold ${ticket.priority === 'HIGH' ? 'text-red-600' : 'text-slate-600'}`}>{ticket.priority}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                                    {ticket.status}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">Voir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderArtisanLeads = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {artisanLeads.length === 0 && (
                <div className="col-span-full text-center py-20 text-slate-400">
                    Aucune nouvelle opportunité disponible pour le moment.
                </div>
            )}
            {artisanLeads.map(lead => (
                <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col h-full">
                    <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Nouvelle demande</span>
                            <span className="text-slate-400 text-sm">{lead.dateCreated}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{lead.category} - {lead.appliance || 'Général'}</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                            <MapPinIcon />
                            <span className="blur-sm select-none">12 Rue de la Paix, 75000 Paris</span>
                            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded ml-2 text-slate-600">Zone Paris 11</span>
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-lg mb-4">
                            <p className="text-sm text-slate-700 italic">"{lead.issueSummary}"</p>
                        </div>
                        
                        <div className="mb-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Diagnostic IA</h4>
                            <p className="text-sm text-slate-600 line-clamp-3">{lead.fullDiagnosis}</p>
                        </div>
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                        <button 
                            onClick={() => handleOpenQuote(lead)}
                            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2"
                        >
                            <EyeOffIcon /> Proposer un devis
                        </button>
                        <p className="text-xs text-center text-slate-400 mt-2">Les coordonnées seront révélées après acceptation.</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderArtisanCalendar = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Planning des interventions</h3>
                <button className="text-emerald-600 font-medium text-sm">Sync Google Calendar</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {artisanMissions.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
                        Votre planning est vide. Répondez à des opportunités pour remplir votre agenda.
                    </div>
                )}
                {artisanMissions.map(mission => (
                    <div key={mission.id} className="bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-slate-100 px-4 py-3 rounded-lg text-center min-w-[80px]">
                                <p className="text-xs text-slate-500 font-bold uppercase">{new Date(mission.interventionDate || '').toLocaleString('fr-FR', { month: 'short' })}</p>
                                <p className="text-2xl font-bold text-slate-800">{new Date(mission.interventionDate || '').getDate()}</p>
                                <p className="text-xs text-slate-500">{new Date(mission.interventionDate || '').toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">{getProperty(mission.propertyId)?.name}</h4>
                                <p className="text-slate-600 flex items-center gap-2 text-sm">
                                    <MapPinIcon /> {getProperty(mission.propertyId)?.address}
                                </p>
                                <div className="mt-2 flex gap-2">
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">{mission.category}</span>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Devis: {mission.artisanQuoteAmount}€</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                             <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 text-sm">
                                Itinéraire GPS
                             </button>
                             <button 
                                onClick={() => setSelectedTicket(mission)}
                                className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 text-sm shadow-sm"
                             >
                                Voir Détails & Contact
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderArtisanFinances = () => (
        <div className="space-y-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <CreditCardIcon /> Informations de Virement
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                     <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Votre IBAN</label>
                         <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={artisanProfile.iban} 
                                onChange={(e) => handleProfileUpdate({ iban: e.target.value })}
                                placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" 
                                className="flex-grow p-3 border rounded-lg bg-slate-50 font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500"
                            />
                            <button className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg text-sm hover:bg-slate-800">
                                Enregistrer
                            </button>
                         </div>
                         <p className="text-xs text-slate-500 mt-1">Nécessaire pour recevoir les paiements des interventions.</p>
                     </div>
                 </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg">
                     <p className="text-slate-400 text-sm font-medium uppercase">Solde à venir</p>
                     <h3 className="text-3xl font-bold mt-2">1 280€</h3>
                     <p className="text-xs text-slate-400 mt-2">Virements BOB prévus le 30/05</p>
                 </div>
                 <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                     <p className="text-slate-500 text-sm font-medium uppercase">Total Gagné (Mois)</p>
                     <h3 className="text-3xl font-bold text-slate-800 mt-2">3 450€</h3>
                 </div>
                 <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                     <p className="text-slate-500 text-sm font-medium uppercase">Missions réalisées</p>
                     <h3 className="text-3xl font-bold text-slate-800 mt-2">{artisanProfile.completedInterventions}</h3>
                 </div>
             </div>

             <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Historique des paiements</h3>
             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                 <table className="w-full text-left">
                     <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                         <tr>
                             <th className="p-4">Date</th>
                             <th className="p-4">Mission</th>
                             <th className="p-4">Montant</th>
                             <th className="p-4">Statut</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         {/* Mock history rows */}
                         <tr>
                             <td className="p-4 text-sm text-slate-600">15/04/2024</td>
                             <td className="p-4 font-medium">Réparation Fuite - Apt 4B</td>
                             <td className="p-4 font-bold">150€</td>
                             <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">Versé</span></td>
                         </tr>
                         <tr>
                             <td className="p-4 text-sm text-slate-600">12/04/2024</td>
                             <td className="p-4 font-medium">Remplacement Prise</td>
                             <td className="p-4 font-bold">85€</td>
                             <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">Versé</span></td>
                         </tr>
                     </tbody>
                 </table>
             </div>
        </div>
    );

    const renderArtisanProfile = () => (
        <div className="space-y-8">
            {/* Profile Header & Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold">
                            {artisanProfile.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{artisanProfile.companyName}</h2>
                            <p className="text-slate-300">{artisanProfile.name}</p>
                        </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-sm text-slate-400">Membre depuis 2023</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-slate-100 p-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-400 text-xl font-bold mb-1">
                            <StarIcon /> {artisanProfile.rating}
                        </div>
                        <p className="text-xs text-slate-500 uppercase">Note Moyenne</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-slate-800 mb-1">{artisanProfile.completedInterventions}</p>
                        <p className="text-xs text-slate-500 uppercase">Missions Réussies</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-slate-800 mb-1">{artisanProfile.reviews.length}</p>
                        <p className="text-xs text-slate-500 uppercase">Avis Clients</p>
                    </div>
                </div>
            </div>

            {/* Settings Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills & Tags */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <WrenchIcon /> Compétences & Tags
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                        Sélectionnez les types d'interventions que vous pouvez réaliser. Cela permet de vous matcher avec les bons tickets.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map(cat => {
                            const isSelected = artisanProfile.skills.includes(cat.id);
                            return (
                                <button 
                                    key={cat.id}
                                    onClick={() => {
                                        const newSkills = isSelected 
                                            ? artisanProfile.skills.filter(s => s !== cat.id)
                                            : [...artisanProfile.skills, cat.id];
                                        handleProfileUpdate({ skills: newSkills });
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition border flex items-center gap-2 ${
                                        isSelected 
                                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    {isSelected && <CheckIcon className="w-4 h-4" />}
                                    {cat.name}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Location & Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <MapPinIcon /> Zone & Infos
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Zone d'intervention</label>
                            <input 
                                type="text" 
                                value={artisanProfile.serviceArea}
                                onChange={(e) => handleProfileUpdate({ serviceArea: e.target.value })}
                                className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Indiquez votre secteur géographique principal.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Pro</label>
                                <input type="text" value={artisanProfile.email} disabled className="w-full p-3 border rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed" />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                                <input type="text" value={artisanProfile.phone} onChange={(e) => handleProfileUpdate({ phone: e.target.value })} className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500" />
                             </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition">
                            Mettre à jour
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Derniers Avis Clients</h3>
                <div className="space-y-6">
                    {artisanProfile.reviews.map(review => (
                        <div key={review.id} className="border-b border-slate-100 pb-6 last:pb-0 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-xs">
                                        {review.author.charAt(0)}
                                    </div>
                                    <span className="font-bold text-slate-800">{review.author}</span>
                                </div>
                                <span className="text-xs text-slate-400">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className={i < review.rating ? "text-yellow-400" : "text-slate-200"} />
                                ))}
                            </div>
                            <p className="text-slate-600 text-sm italic">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAirCover = () => (
        <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-purple-900">Gestion des Litiges AirCover</h3>
                    <p className="text-purple-700">Générez vos dossiers de réclamation complets en un clic.</p>
                </div>
                <ShieldCheckIcon />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {airCoverTickets.map(ticket => (
                    <div key={ticket.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">Dossier #{ticket.id}</span>
                            <span className="text-slate-400 text-sm">{ticket.dateCreated}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg mb-1">{getProperty(ticket.propertyId)?.name}</h4>
                        <p className="text-slate-600 mb-4">{ticket.issueSummary}</p>
                        <div className="flex gap-2 mb-6">
                            {ticket.photos?.map((photo, i) => (
                                <img key={i} src={photo} alt="Preuve" className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                            ))}
                        </div>
                        <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                             <div>
                                <p className="text-xs text-slate-500 uppercase">Estimation</p>
                                <p className="font-bold text-slate-800">{ticket.costEstimate}€</p>
                             </div>
                             <button 
                                onClick={() => { setSelectedTicket(ticket); setShowPdfModal(true); }}
                                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
                            >
                                <PrinterIcon /> Générer Rapport PDF
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFinances = () => (
        <div className="space-y-8">
            {/* Quotes Section */}
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><FileTextIcon /> Devis en attente</h3>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Propriété</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Montant</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_QUOTES.map(quote => (
                                <tr key={quote.id}>
                                    <td className="p-4 text-sm font-mono">{quote.id}</td>
                                    <td className="p-4 font-medium">{quote.propertyName}</td>
                                    <td className="p-4 text-slate-600">{quote.description}</td>
                                    <td className="p-4 font-bold">{quote.amount}€</td>
                                    <td className="p-4">
                                        {quote.status === 'PENDING_SIGNATURE' ? (
                                            <button className="text-emerald-600 font-medium hover:underline">Signer</button>
                                        ) : (
                                            <span className="text-slate-400">Signé</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invoices Section */}
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><EuroIcon /> Factures à régler</h3>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Propriété</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Montant</th>
                                <th className="p-4">Échéance</th>
                                <th className="p-4">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_INVOICES.map(invoice => (
                                <tr key={invoice.id}>
                                    <td className="p-4 text-sm font-mono">{invoice.id}</td>
                                    <td className="p-4 font-medium">{invoice.propertyName}</td>
                                    <td className="p-4 text-slate-600">{invoice.description}</td>
                                    <td className="p-4 font-bold">{invoice.amount}€</td>
                                    <td className="p-4 text-sm text-slate-500">{invoice.dueDate}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${invoice.status === 'PENDING_PAYMENT' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {invoice.status === 'PENDING_PAYMENT' ? 'À payer' : 'Payée'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold">BOB.AI <span className="text-emerald-400 text-sm font-normal block">PRO</span></h1>
                    <div className="mt-4 flex items-center gap-2 text-slate-400 text-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        {role === 'CONCIERGE' ? 'Admin Gestion' : 'Espace Artisan'}
                    </div>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    {/* CONCIERGE MENU */}
                    {role === 'CONCIERGE' && (
                        <>
                            <button onClick={() => setActiveTab('DASHBOARD')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'DASHBOARD' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                <DashboardIcon /> Tableau de bord
                            </button>
                            <button onClick={() => setActiveTab('INCIDENTS')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'INCIDENTS' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                <ClipboardListIcon /> Incidents
                            </button>
                            <button onClick={() => setActiveTab('AIRCOVER')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'AIRCOVER' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                <ShieldCheckIcon /> AirCover
                            </button>
                            <button onClick={() => setActiveTab('FINANCES')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'FINANCES' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                <EuroIcon /> Finances
                            </button>
                        </>
                    )}
                    
                    {/* ARTISAN MENU */}
                    {role === 'ARTISAN' && (
                        <>
                            <button onClick={() => setActiveTab('LEADS')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'LEADS' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                <EyeIcon /> Opportunités
                            </button>
                            <button onClick={() => setActiveTab('PLANNING')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'PLANNING' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                <CalendarIcon /> Mon Planning
                            </button>
                            <button onClick={() => setActiveTab('REVENUS')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'REVENUS' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                <WalletIcon /> Revenus
                            </button>
                            <button onClick={() => setActiveTab('PROFILE')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'PROFILE' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                <UserIcon /> Mon Profil
                            </button>
                        </>
                    )}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={onLogout} className="w-full text-slate-400 hover:text-white text-sm flex items-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                         Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
                    <h1 className="font-bold text-slate-800">BOB.AI PRO</h1>
                    <button onClick={onLogout} className="text-sm text-slate-500">Quitter</button>
                </header>

                <div className="p-6 md:p-10 overflow-y-auto bg-slate-50">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-slate-800">
                            {activeTab === 'DASHBOARD' && 'Tableau de bord'}
                            {activeTab === 'INCIDENTS' && 'Tickets en attente'}
                            {activeTab === 'AIRCOVER' && 'Gestion AirCover'}
                            {activeTab === 'FINANCES' && 'Suivi Financier'}
                            {activeTab === 'LEADS' && 'Opportunités (Leads)'}
                            {activeTab === 'PLANNING' && 'Planning Missions'}
                            {activeTab === 'REVENUS' && 'Mes Revenus'}
                            {activeTab === 'PROFILE' && 'Mon Profil Artisan'}
                        </h2>
                    </div>

                    {/* Render correct view based on role and tab */}
                    {role === 'CONCIERGE' && (
                        <>
                            {activeTab === 'DASHBOARD' && renderConciergeDashboard()}
                            {activeTab === 'INCIDENTS' && renderConciergeIncidents()}
                            {activeTab === 'AIRCOVER' && renderAirCover()}
                            {activeTab === 'FINANCES' && renderFinances()}
                        </>
                    )}

                    {role === 'ARTISAN' && (
                        <>
                            {activeTab === 'LEADS' && renderArtisanLeads()}
                            {activeTab === 'PLANNING' && renderArtisanCalendar()}
                            {activeTab === 'REVENUS' && renderArtisanFinances()}
                            {activeTab === 'PROFILE' && renderArtisanProfile()}
                        </>
                    )}
                </div>
            </main>

            {/* Ticket Detail Modal (General) */}
            {selectedTicket && !showPdfModal && !showQuoteModal && (
                <div className="fixed inset-0 bg-slate-900/50 z-50 flex justify-end">
                    <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col animate-slide-in-right overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">Ticket #{selectedTicket.id}</h3>
                                <p className="text-slate-500">{selectedTicket.dateCreated}</p>
                            </div>
                            <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-slate-100 rounded-full">
                                <XIcon />
                            </button>
                        </div>

                        <div className="space-y-6 flex-grow">
                            {/* Status Card */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-slate-500 uppercase">Statut</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedTicket.status)}`}>{selectedTicket.status}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-500 uppercase">Priorité</span>
                                    <span className={`text-sm ${selectedTicket.priority === 'HIGH' ? 'text-red-600 font-bold' : 'text-slate-600'}`}>{selectedTicket.priority}</span>
                                </div>
                            </div>
                            
                            {/* Property Info (New) */}
                            {getProperty(selectedTicket.propertyId) && (
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-800 mb-2">Propriété</h4>
                                    <p className="text-blue-900 font-medium">{getProperty(selectedTicket.propertyId)?.name}</p>
                                    <p className="text-blue-700 text-sm">{getProperty(selectedTicket.propertyId)?.address}</p>
                                    <div className="mt-3 pt-3 border-t border-blue-200 flex justify-between text-sm">
                                        <span className="text-blue-600">Propriétaire:</span>
                                        <span className="text-blue-900 font-medium">{getProperty(selectedTicket.propertyId)?.ownerName}</span>
                                    </div>
                                </div>
                            )}

                            {/* Client Info */}
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <UserGroupIcon /> Locataire / Voyageur
                                </h4>
                                <p className="text-slate-700">{selectedTicket.tenantName}</p>
                                <p className="text-slate-500 text-sm">{selectedTicket.apartment}</p>
                            </div>

                            {/* Technical Issue */}
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <WrenchIcon /> Problème Technique
                                </h4>
                                <div className="bg-red-50 border border-red-100 p-4 rounded-xl mb-2">
                                    <p className="font-semibold text-red-800 mb-1">{selectedTicket.category} {selectedTicket.appliance ? `- ${selectedTicket.appliance}` : ''}</p>
                                    {selectedTicket.brand && <p className="text-xs text-red-600">Marque: {selectedTicket.brand} {selectedTicket.model}</p>}
                                </div>
                                <p className="text-slate-700 font-medium mb-2">Description:</p>
                                <p className="text-slate-600 text-sm italic mb-4">"{selectedTicket.issueSummary}"</p>
                                
                                <p className="text-slate-700 font-medium mb-2">Diagnostic Préliminaire (IA):</p>
                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-sm text-slate-700">
                                    {selectedTicket.fullDiagnosis}
                                </div>
                            </div>

                            {/* Conversation History (New) */}
                            {selectedTicket.history && selectedTicket.history.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                        <FileTextIcon /> Historique du Diagnostic
                                    </h4>
                                    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                                        {selectedTicket.history.map((turn, index) => (
                                             <div key={index} className={`p-4 border-b border-slate-100 last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Question BOB</p>
                                                <p className="text-slate-800 mb-2 font-medium">{turn.question}</p>
                                                <div className="flex items-start gap-2">
                                                     <div className="bg-emerald-100 text-emerald-700 p-1 rounded-full mt-0.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                     </div>
                                                     <div>
                                                        <p className="text-xs font-bold text-emerald-600 uppercase mb-0.5">Réponse Utilisateur</p>
                                                        <p className="text-slate-700">{turn.answer}</p>
                                                     </div>
                                                </div>
                                             </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Photos */}
                            {selectedTicket.photos && selectedTicket.photos.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><PhotoIcon /> Photos</h4>
                                    <div className="flex gap-2 overflow-x-auto">
                                        {selectedTicket.photos.map((photo, i) => (
                                            <img key={i} src={photo} alt="Ticket attachment" className="w-24 h-24 object-cover rounded-lg border border-slate-200" />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-6 mt-6 border-t border-slate-100">
                                {role === 'CONCIERGE' && selectedTicket.status === 'NEW' && (
                                    <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-900/20">
                                        Assigner un artisan
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Artisan Quote Modal */}
            {showQuoteModal && selectedTicket && (
                 <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">Proposer un devis</h3>
                            <button onClick={() => setShowQuoteModal(false)}><XIcon /></button>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-500 uppercase mb-1">Mission</h4>
                                <p className="font-bold text-slate-800 text-lg">{selectedTicket.category} - {selectedTicket.issueSummary}</p>
                                <div className="bg-blue-50 p-3 rounded mt-2 text-sm text-blue-800">
                                    <span className="font-bold">Diagnostic IA:</span> {selectedTicket.fullDiagnosis}
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Montant estimé (€)</label>
                                    <input 
                                        type="number" 
                                        value={quoteAmount} 
                                        onChange={(e) => setQuoteAmount(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" 
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Commentaire / Détails intervention</label>
                                    <textarea 
                                        value={quoteNotes}
                                        onChange={(e) => setQuoteNotes(e.target.value)}
                                        rows={3}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Ex: Déplacement + Pièces + Main d'oeuvre..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                            <button onClick={() => setShowQuoteModal(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">Annuler</button>
                            <button 
                                onClick={handleSubmitQuote} 
                                disabled={!quoteAmount || isSubmittingQuote}
                                className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                            >
                                {isSubmittingQuote ? 'Envoi...' : 'Envoyer le devis'}
                            </button>
                        </div>
                    </div>
                 </div>
            )}
            
            {/* PDF Report Generation Simulation Modal */}
            {showPdfModal && selectedTicket && (
                <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <FileTextIcon /> Rapport d'Incident - AirCover
                            </h3>
                            <button onClick={() => setShowPdfModal(false)}><XIcon /></button>
                        </div>
                        <div className="p-8 overflow-y-auto flex-grow bg-slate-50 font-serif">
                            <div className="bg-white p-8 shadow-sm border border-slate-200 text-sm">
                                <div className="flex justify-between border-b border-slate-300 pb-4 mb-6">
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-900 uppercase">Rapport de Dommages</h1>
                                        <p className="text-slate-500">Ref: {selectedTicket.id} / AC-{new Date().getFullYear()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">BOB.AI Certified</p>
                                        <p>{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h4 className="font-bold uppercase text-xs text-slate-500 mb-1">Propriété</h4>
                                        <p className="font-bold">{getProperty(selectedTicket.propertyId)?.name}</p>
                                        <p>{getProperty(selectedTicket.propertyId)?.address}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold uppercase text-xs text-slate-500 mb-1">Voyageur</h4>
                                        <p className="font-bold">{selectedTicket.tenantName}</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h4 className="font-bold uppercase text-xs text-slate-500 mb-2">Description de l'incident</h4>
                                    <p className="mb-4">{selectedTicket.issueSummary}</p>
                                    <div className="bg-slate-100 p-4 rounded border-l-4 border-slate-400 italic">
                                        "{selectedTicket.fullDiagnosis}"
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h4 className="font-bold uppercase text-xs text-slate-500 mb-2">Preuves Photographiques</h4>
                                    <div className="flex gap-4">
                                        {selectedTicket.photos?.map((p, i) => (
                                            <img key={i} src={p} className="w-32 h-32 object-cover border border-slate-300" />
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t-2 border-slate-900 pt-4 flex justify-between items-center">
                                    <span className="font-bold text-lg">Estimation des réparations</span>
                                    <span className="font-bold text-2xl">{selectedTicket.costEstimate}€</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 bg-white rounded-b-2xl flex justify-end gap-3">
                            <button onClick={() => setShowPdfModal(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Annuler</button>
                            <button className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 shadow-lg">Télécharger PDF & Soumettre</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- PREVIOUS SCREEN COMPONENTS ---
const LandingPage: React.FC<{ onStart: () => void; onCategorySelect: (category: Category) => void; }> = ({ onStart, onCategorySelect }) => {
    
    // Duplicating the list to create a seamless infinite loop
    const scrollingBrands = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS];

    return (
        <div className="relative text-white min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 25s linear infinite;
                }
            `}</style>
            <div className="absolute inset-0 bg-slate-900 bg-opacity-80 z-0"></div>
            <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
                <LandingLogo />
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                    Un problème ? <span className="text-emerald-400">Une solution.</span>
                </h1>
                <p className="max-w-2xl text-lg md:text-xl mb-10 text-slate-300 leading-relaxed">
                    Votre assistant de maintenance intelligent pour un diagnostic rapide et efficace des problèmes de votre appartement.
                </p>
                <ActionButton onClick={onStart} className="md:text-xl px-8 py-5 shadow-emerald-900/20 mb-16">
                    Démarrer un diagnostic
                </ActionButton>

                {/* Scrolling Brands Banner */}
                <div className="w-full mb-12 relative group">
                     {/* Fading gradients on the sides for a premium look */}
                    <div className="absolute top-0 left-0 h-full w-8 md:w-32 bg-gradient-to-r from-slate-900/80 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 h-full w-8 md:w-32 bg-gradient-to-l from-slate-900/80 to-transparent z-10 pointer-events-none"></div>
                    
                    <div className="overflow-hidden w-full">
                         <div className="flex whitespace-nowrap animate-scroll items-center">
                            {scrollingBrands.map((brand, index) => (
                                <span key={`${brand}-${index}`} className="text-xl md:text-3xl font-bold text-white mx-8 md:mx-12 inline-block uppercase opacity-80 hover:opacity-100 hover:text-emerald-400 transition-all duration-300 cursor-default">
                                    {brand}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full border-t border-slate-700/50 pt-8">
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-8">
                        Services pris en charge
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat.id}
                                onClick={() => onCategorySelect(cat)}
                                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group text-center"
                            >
                                {cloneElement(cat.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 text-slate-400 group-hover:text-white transition-colors duration-300" })}
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConciergePage: React.FC<{ onBack: () => void; onProAccess: () => void }> = ({ onBack, onProAccess }) => {
    const benefits = [
        {
            title: "Rapidité",
            description: "Obtenez un pré-diagnostic instantané grâce à notre IA, sans attendre un technicien.",
            icon: <ElectricityIcon className="w-10 h-10 text-emerald-400" />
        },
        {
            title: "Économies",
            description: "Résolvez les problèmes simples vous-même et évitez les frais de déplacement inutiles.",
            icon: <WallIcon className="w-10 h-10 text-emerald-400" />
        },
        {
            title: "Simplicité",
            description: "Une interface intuitive pour décrire vos problèmes sans jargon technique complexe.",
            icon: <CheckIcon />
        },
        {
            title: "Sérénité 24/7",
            description: "Un service disponible à tout moment. En cas de blocage, nous vous connectons à un pro de confiance.",
            icon: <ConciergeIcon />
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
             <main className="flex-grow container mx-auto p-6 md:p-12 flex flex-col items-center">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        BOB : La Conciergerie <span className="text-emerald-400">Connectée</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Plus qu'un simple outil de diagnostic, BOB est votre partenaire privilégié pour la gestion et la maintenance de votre habitat.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mb-16">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl flex flex-col items-start gap-4 hover:bg-slate-800 transition-colors">
                            <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30">
                                {cloneElement(benefit.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 text-emerald-400" })}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                    <ActionButton onClick={onBack} className="bg-slate-700 hover:bg-slate-600 w-full">
                        Retour à l'accueil
                    </ActionButton>
                    <button onClick={onProAccess} className="text-slate-500 hover:text-white text-sm underline transition">
                        Accès Pro / Partenaires
                    </button>
                </div>
             </main>
        </div>
    );
};

const BackofficeLogin: React.FC<{ onSelectRole: (role: BackofficeRole) => void; onBack: () => void }> = ({ onSelectRole, onBack }) => (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 relative">
        <button 
            onClick={onBack} 
            className="absolute top-6 left-6 p-2 text-slate-400 hover:text-slate-600 transition flex items-center gap-2"
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Retour</span>
        </button>
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl mt-12 md:mt-0">
            <div className="text-center mb-8">
                <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <DashboardIcon />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Espace Pro BOB.AI</h2>
                <p className="text-slate-500">Sélectionnez votre espace de connexion</p>
            </div>
            <div className="space-y-4">
                <button 
                    onClick={() => onSelectRole('CONCIERGE')}
                    className="w-full p-4 border-2 border-slate-200 hover:border-emerald-500 rounded-xl flex items-center gap-4 transition group hover:bg-emerald-50"
                >
                    <div className="bg-slate-100 p-3 rounded-full group-hover:bg-white">
                        <UserGroupIcon />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-slate-800">Conciergerie / Gestionnaire</h3>
                        <p className="text-sm text-slate-500">Gestion des tickets & assignations</p>
                    </div>
                </button>

                <button 
                    onClick={() => onSelectRole('ARTISAN')}
                    className="w-full p-4 border-2 border-slate-200 hover:border-emerald-500 rounded-xl flex items-center gap-4 transition group hover:bg-emerald-50"
                >
                    <div className="bg-slate-100 p-3 rounded-full group-hover:bg-white">
                        <WrenchIcon />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-slate-800">Artisan / Technicien</h3>
                        <p className="text-sm text-slate-500">Suivi des interventions & rapports</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
);

const CategorySelection: React.FC<{ onSelect: (category: Category) => void }> = ({ onSelect }) => (
    <FullScreenCard className="items-center justify-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Que souhaitez-vous diagnostiquer ?</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
            {CATEGORIES.map(cat => (
                <Card key={cat.id} onClick={() => onSelect(cat)}>
                    {cloneElement(cat.icon as React.ReactElement<{ className?: string }>, { className: "w-12 h-12 text-slate-600" })}
                    <span className="font-semibold text-slate-700">{cat.name}</span>
                </Card>
            ))}
             <Card key="autre" onClick={() => onSelect({ id: 'autre', name: 'Autre problème', icon: <OtherProblemIcon /> })}>
                <OtherProblemIcon className="w-12 h-12 text-slate-600" />
                <span className="font-semibold text-slate-700">Autre problème</span>
            </Card>
        </div>
    </FullScreenCard>
);

const ApplianceSelection: React.FC<{ 
    category: Category; 
    onSelect: (appliance: Appliance) => void; 
}> = ({ category, onSelect }) => {
    const appliances = APPLIANCES[category.id] || [];
    if (appliances.length === 0) {
        return (
             <FullScreenCard className="items-center justify-center">
                <div className="text-center">
                    <OtherProblemIcon className="w-20 h-20 mx-auto text-slate-300 mb-4"/>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Catégorie : {category.name}</h2>
                    <p className="mb-8 text-slate-600">Aucun appareil spécifique. Décrivez votre problème à l'étape suivante.</p>
                    <ActionButton onClick={() => onSelect({ id: 'generic', name: category.name, icon: category.icon })}>
                        Continuer
                    </ActionButton>
                </div>
             </FullScreenCard>
        );
    }
    return (
        <FullScreenCard>
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Quel équipement est concerné ?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appliances.map(app => (
                    <Card key={app.id} onClick={() => onSelect(app)}>
                        <div className="mb-2">{app.icon}</div>
                        <span className="font-medium">{app.name}</span>
                    </Card>
                ))}
            </div>
        </FullScreenCard>
    );
};

const ApplianceDetailsForm: React.FC<{
    appliance: Appliance;
    onSubmit: (details: ApplianceDetails) => void;
}> = ({ appliance, onSubmit }) => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [showModels, setShowModels] = useState(false);

    // Predefined brands for common appliances
    const brandsData = BRAND_DATA[appliance.id] || {};
    const brandNames = Object.keys(brandsData);

    const handleBrandSelect = (selectedBrand: string) => {
        setBrand(selectedBrand);
        setModel('');
        setShowModels(true);
    };

    const handleModelSelect = (selectedModel: string) => {
        setModel(selectedModel);
    };

    const handleSubmit = () => {
        if (!brand) return;
        onSubmit({ brand, model });
    };

    // Get models for selected brand
    const modelsList = brand && brandsData[brand] ? brandsData[brand] : [];

    return (
        <FullScreenCard className="max-w-2xl mx-auto justify-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Détails de l'équipement</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
                
                {/* Brand Selection */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Marque</label>
                    {brandNames.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {brandNames.map(b => (
                                <button
                                    key={b}
                                    onClick={() => handleBrandSelect(b)}
                                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                                        brand === b 
                                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' 
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-400 hover:bg-white'
                                    }`}
                                >
                                    {b}
                                </button>
                            ))}
                            <button
                                onClick={() => handleBrandSelect('Autre')}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                                    brand === 'Autre'
                                        ? 'bg-slate-800 text-white border-slate-800' 
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400'
                                }`}
                            >
                                Autre / Inconnu
                            </button>
                        </div>
                    ) : (
                        <input 
                            type="text" 
                            className="w-full p-3 border rounded-lg bg-slate-50"
                            placeholder="Ex: Atlantic, Daikin..."
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                        />
                    )}
                </div>

                {/* Model Selection (Visual Grid or Input) */}
                {brand && (
                    <div className="animate-fade-in">
                        <label className="block text-sm font-medium text-slate-700 mb-3">Modèle</label>
                        
                        {modelsList.length > 0 && brand !== 'Autre' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 max-h-60 overflow-y-auto pr-2">
                                {modelsList.map((m, idx) => {
                                    const modelName = typeof m === 'string' ? m : m.name;
                                    const imageUrl = typeof m === 'string' ? null : m.imageUrl;
                                    
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleModelSelect(modelName)}
                                            className={`relative p-2 rounded-lg border text-left transition-all group flex flex-col items-center gap-2 ${
                                                model === modelName
                                                    ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                                                    : 'border-slate-200 hover:border-emerald-300 hover:shadow-sm'
                                            }`}
                                        >
                                            {imageUrl && (
                                                <img src={imageUrl} alt={modelName} className="w-16 h-16 object-contain mb-1 mix-blend-multiply" />
                                            )}
                                            <span className="text-xs font-semibold text-slate-700 text-center break-words w-full">{modelName}</span>
                                            {model === modelName && (
                                                <div className="absolute top-1 right-1 text-emerald-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : null}

                        <div className="relative">
                             <input 
                                type="text" 
                                className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder={modelsList.length > 0 ? "Ou saisissez votre modèle..." : "Référence ou description"}
                                value={model}
                                onChange={e => setModel(e.target.value)}
                            />
                            <p className="text-xs text-slate-500 mt-1">Le modèle aide l'IA à être plus précise (voir étiquette appareil).</p>
                        </div>
                    </div>
                )}

                <ActionButton onClick={handleSubmit} disabled={!brand} className="w-full">
                    {"Lancer le diagnostic"}
                </ActionButton>
            </div>
        </FullScreenCard>
    );
};

const DiagnosisScreen: React.FC<{
    category: Category;
    appliance: Appliance;
    details: ApplianceDetails;
    onResult: (result: DiagnosisResult, history: ConversationTurn[]) => void;
}> = ({ category, appliance, details, onResult }) => {
    const [history, setHistory] = useState<ConversationTurn[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
    const [options, setOptions] = useState<{ optionText: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for manual input (when user selects "Autre/Decrire")
    const [showManualInput, setShowManualInput] = useState(false);
    const [manualText, setManualText] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial load
    useEffect(() => {
        processTurn([]);
    }, []);

    const processTurn = async (currentHistory: ConversationTurn[], answer?: string, image?: string | null) => {
        setLoading(true);
        setError(null);
        try {
            // If there's an answer, append it to history for the API call
            const nextHistory = answer 
                ? [...currentHistory] 
                : currentHistory;
            
            const response = await getAiResponse(category.name, appliance.name, nextHistory, details, image);
            
            if (response) {
                if (response.type === 'diagnosis') {
                    onResult(response.diagnosisResult, nextHistory);
                } else {
                    setCurrentQuestion(response.questionText);
                    setOptions(response.answerOptions);
                }
            } else {
                setError("Pas de réponse de l'IA");
            }
        } catch (e) {
            setError("Erreur de connexion");
        }
        setLoading(false);
    };

    const handleAnswer = (optionText: string) => {
        if (!currentQuestion) return;
        
        // Check if user selected "Other" or "Describe" option to trigger manual input mode
        if (optionText.toLowerCase().includes('autre') || optionText.toLowerCase().includes('décrire')) {
            setShowManualInput(true);
            return;
        }

        const newTurn: ConversationTurn = { question: currentQuestion, answer: optionText };
        const newHistory = [...history, newTurn];
        setHistory(newHistory);
        processTurn(newHistory, optionText);
    };

    const handleManualSubmit = () => {
        if (!manualText.trim() && !selectedImage) return;
        if (!currentQuestion) return;

        const answerText = selectedImage ? `${manualText} [Photo jointe]` : manualText;
        const newTurn: ConversationTurn = { question: currentQuestion, answer: answerText };
        const newHistory = [...history, newTurn];
        
        setHistory(newHistory);
        setShowManualInput(false);
        setManualText('');
        setSelectedImage(null);
        
        processTurn(newHistory, manualText, selectedImage);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <FullScreenCard className="max-w-2xl mx-auto">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[300px]">
                {history.map((turn, i) => (
                    <div key={i} className="space-y-2">
                        <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none self-start mr-12">
                            <p className="text-sm font-bold text-slate-500 mb-1">Assistant</p>
                            <p className="text-slate-800">{turn.question}</p>
                        </div>
                        <div className="bg-emerald-100 p-4 rounded-2xl rounded-tr-none self-end ml-12">
                            <p className="text-sm font-bold text-emerald-600 mb-1 text-right">Vous</p>
                            <p className="text-emerald-900 text-right whitespace-pre-wrap">{turn.answer}</p>
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="flex justify-center py-8">
                        <LoadingSpinnerIcon />
                    </div>
                )}

                {!loading && currentQuestion && !showManualInput && (
                    <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm animate-fade-in">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">{currentQuestion}</h3>
                        <div className="grid gap-3">
                            {options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(opt.optionText)}
                                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all active:scale-[0.98]"
                                >
                                    {opt.optionText}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && showManualInput && (
                    <div className="bg-white border-2 border-emerald-100 p-6 rounded-2xl shadow-sm animate-fade-in">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Décrivez votre problème</h3>
                        <textarea
                            className="w-full p-4 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all mb-4"
                            rows={8}
                            placeholder="Ex: Le bruit ressemble à un claquement métallique..."
                            value={manualText}
                            onChange={(e) => setManualText(e.target.value)}
                        />
                        
                        {selectedImage && (
                            <div className="relative w-24 h-24 mb-4 rounded-lg overflow-hidden border border-slate-200">
                                <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                                <button 
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-lg"
                                >
                                    <XIcon />
                                </button>
                            </div>
                        )}

                        <div className="flex gap-3 items-center">
                            <input 
                                type="file" 
                                accept="image/*" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleFileChange}
                            />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition"
                                title="Ajouter une photo"
                            >
                                <CameraIcon />
                            </button>
                            <button
                                onClick={handleManualSubmit}
                                disabled={!manualText && !selectedImage}
                                className={`flex-grow py-3 rounded-xl font-bold transition ${
                                    !manualText && !selectedImage
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-900/10'
                                }`}
                            >
                                Envoyer
                            </button>
                        </div>
                        <button 
                            onClick={() => setShowManualInput(false)}
                            className="w-full mt-3 text-slate-400 text-sm hover:text-slate-600"
                        >
                            Annuler
                        </button>
                    </div>
                )}
                
                {error && (
                    <div className="text-center text-red-500 p-4">
                        {error}
                        <button onClick={() => processTurn(history)} className="block mx-auto mt-2 text-sm underline">Réessayer</button>
                    </div>
                )}
            </div>
        </FullScreenCard>
    );
};

const ContactForm: React.FC<{ onSubmit: (info: UserInfo) => void }> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, phone, email, address });
    };

    return (
        <FullScreenCard className="max-w-lg mx-auto justify-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Vos Coordonnées</h2>
            <p className="text-slate-500 text-center mb-8">Afin qu'un technicien puisse vous contacter rapidement.</p>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom Complet</label>
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-lg bg-slate-50" placeholder="Jean Dupont" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                    <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 border rounded-lg bg-slate-50" placeholder="06 12 34 56 78" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-lg bg-slate-50" placeholder="jean.dupont@email.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Adresse de l'intervention</label>
                    <input required type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full p-3 border rounded-lg bg-slate-50" placeholder="10 Rue de la Paix, 75000 Paris" />
                </div>
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-lg transition mt-4 shadow-lg shadow-emerald-900/10">
                    Confirmer la demande
                </button>
            </form>
        </FullScreenCard>
    );
};

const ResultScreen: React.FC<{
    result: DiagnosisResult;
    onRestart: () => void;
    onContactPro: () => void;
}> = ({ result, onRestart, onContactPro }) => (
    <FullScreenCard className="max-w-2xl mx-auto text-center justify-center">
        <div className="mb-6 flex justify-center">
            {result.solutionType === 'simple' ? (
                <div className="bg-emerald-100 p-4 rounded-full"><CheckIcon /></div>
            ) : (
                <div className="bg-amber-100 p-4 rounded-full"><SettingsIcon /></div>
            )}
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{result.title}</h2>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">{result.summary}</p>
        
        {result.steps && result.steps.length > 0 && (
            <div className="text-left bg-slate-50 p-6 rounded-xl mb-8">
                <h3 className="font-bold text-slate-700 mb-4 uppercase text-sm tracking-wider">Étapes recommandées</h3>
                <ul className="space-y-3">
                    {result.steps.map((step, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">{i + 1}</span>
                            <span className="text-slate-700">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        <div className="flex flex-col gap-3">
             {result.solutionType === 'escalation' && (
                <ActionButton onClick={onContactPro} className="mb-2">Contacter un professionnel</ActionButton>
             )}
            <button onClick={onRestart} className="text-slate-500 hover:text-slate-700 underline">Terminer et revenir à l'accueil</button>
        </div>
    </FullScreenCard>
);

const HistoryScreen: React.FC<{
    items: MaintenanceRequest[];
    onClose: () => void;
}> = ({ items, onClose }) => (
    <FullScreenCard>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Historique</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><XIcon /></button>
        </div>
        {items.length === 0 ? (
            <div className="text-center text-slate-500 py-12">Aucun historique disponible.</div>
        ) : (
            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-slate-700">{item.applianceName}</span>
                            <span className="text-xs text-slate-400">{item.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{item.diagnosisTitle}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'RESOLVED_BY_USER' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {item.status === 'RESOLVED_BY_USER' ? 'Résolu' : 'Escaladé'}
                        </span>
                    </div>
                ))}
            </div>
        )}
    </FullScreenCard>
);

const SuccessScreen: React.FC<{ onRestart: () => void }> = ({ onRestart }) => (
    <FullScreenCard className="items-center justify-center text-center">
        <div className="bg-emerald-100 p-6 rounded-full mb-6 animate-bounce">
            <CheckIcon />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Demande envoyée !</h2>
        <p className="text-lg text-slate-600 max-w-md mb-8">
            Votre demande d'intervention a bien été prise en compte. Un technicien partenaire vous recontactera sous 24h.
        </p>
        <ActionButton onClick={onRestart}>Retour à l'accueil</ActionButton>
    </FullScreenCard>
);

export default function App() {
    const [step, setStep] = useState<Step>('LANDING');
    const [category, setCategory] = useState<Category | null>(null);
    const [appliance, setAppliance] = useState<Appliance | null>(null);
    const [details, setDetails] = useState<ApplianceDetails>({ brand: '', model: '' });
    const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
    const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceRequest[]>([]);
    const [backofficeRole, setBackofficeRole] = useState<BackofficeRole>('CONCIERGE');

    const handleStart = () => setStep('CATEGORY_SELECTION');
    
    const handleCategorySelect = (cat: Category) => {
        setCategory(cat);
        setStep('APPLIANCE_SELECTION');
    };

    const handleApplianceSelect = (app: Appliance) => {
        setAppliance(app);
        // Check if we should skip the details step for this specific appliance
        if (APPLIANCES_SKIPPING_DETAILS.includes(app.id)) {
            setDetails({ brand: 'Générique', model: '' });
            setStep('DIAGNOSIS');
        } else {
            setStep('APPLIANCE_DETAILS');
        }
    };

    const handleDetailsSubmit = (d: ApplianceDetails) => {
        setDetails(d);
        setStep('DIAGNOSIS');
    };

    const handleDiagnosisResult = (res: DiagnosisResult, conversation: ConversationTurn[]) => {
        setDiagnosis(res);
        setStep('RESULT');
    };

    const handleContactPro = () => {
        setStep('CONTACT_FORM');
    }

    const handleContactSubmit = (info: UserInfo) => {
        // In a real app, send data to backend here
        const newRequest: MaintenanceRequest = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            categoryName: category?.name || 'Inconnu',
            applianceName: appliance?.name || 'Inconnu',
            status: 'ESCALATED_TO_PRO',
            diagnosisTitle: diagnosis?.title || 'Demande Intervention',
            diagnosisSummary: diagnosis?.summary || ''
        };
        setMaintenanceHistory(prev => [newRequest, ...prev]);
        setStep('CONFIRMATION');
    };

    const handleRestart = () => {
        setStep('LANDING');
        setCategory(null);
        setAppliance(null);
        setDetails({ brand: '', model: '' });
        setDiagnosis(null);
    };

    const handleBack = () => {
        switch (step) {
            case 'CATEGORY_SELECTION': setStep('LANDING'); break;
            case 'APPLIANCE_SELECTION': setStep('CATEGORY_SELECTION'); break;
            case 'APPLIANCE_DETAILS': setStep('APPLIANCE_SELECTION'); break;
            case 'DIAGNOSIS': 
                // If we skipped details, going back should take us to appliance selection
                if (appliance && APPLIANCES_SKIPPING_DETAILS.includes(appliance.id)) {
                    setStep('APPLIANCE_SELECTION');
                } else {
                    setStep('APPLIANCE_DETAILS');
                }
                break;
            case 'RESULT': setStep('DIAGNOSIS'); break;
            case 'CONTACT_FORM': setStep('RESULT'); break;
            case 'HISTORY': setStep('LANDING'); break;
            case 'CONCIERGE': setStep('LANDING'); break;
            case 'BACKOFFICE_ROLE_SELECT': setStep('LANDING'); break;
            case 'BACKOFFICE_DASHBOARD': setStep('BACKOFFICE_ROLE_SELECT'); break;
            default: setStep('LANDING');
        }
    };

    // --- BACKOFFICE HANDLERS ---
    const handleProAccess = () => {
        setStep('BACKOFFICE_ROLE_SELECT');
    };

    const handleRoleSelect = (role: BackofficeRole) => {
        setBackofficeRole(role);
        setStep('BACKOFFICE_DASHBOARD');
    };

    const handleBackofficeLogout = () => {
        setStep('LANDING');
        setBackofficeRole('CONCIERGE'); // Reset default
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Standard Header logic (hidden in backoffice) */}
            {step !== 'LANDING' && step !== 'CONCIERGE' && step !== 'BACKOFFICE_DASHBOARD' && step !== 'BACKOFFICE_ROLE_SELECT' && (
                <Header 
                    onBack={step !== 'RESULT' && step !== 'CONFIRMATION' ? handleBack : undefined}
                    onShowHistory={() => setStep('HISTORY')}
                    onProAccessClick={handleProAccess}
                />
            )}
            {step === 'LANDING' && (
                <>
                   <Header onShowHistory={() => setStep('HISTORY')} onProAccessClick={handleProAccess} hideIcon />
                   <LandingPage onStart={handleStart} onCategorySelect={handleCategorySelect} />
                </>
            )}
            
            {step === 'CONCIERGE' && <ConciergePage onBack={() => setStep('LANDING')} onProAccess={handleProAccess} />}
            
            {/* Standard User Flow */}
            {step === 'CATEGORY_SELECTION' && <CategorySelection onSelect={handleCategorySelect} />}
            {step === 'APPLIANCE_SELECTION' && category && <ApplianceSelection category={category} onSelect={handleApplianceSelect} />}
            {step === 'APPLIANCE_DETAILS' && appliance && <ApplianceDetailsForm appliance={appliance} onSubmit={handleDetailsSubmit} />}
            {step === 'DIAGNOSIS' && category && appliance && (
                <DiagnosisScreen category={category} appliance={appliance} details={details} onResult={handleDiagnosisResult} />
            )}
            {step === 'RESULT' && diagnosis && <ResultScreen result={diagnosis} onRestart={handleRestart} onContactPro={handleContactPro} />}
            {step === 'CONTACT_FORM' && <ContactForm onSubmit={handleContactSubmit} />}
            {step === 'CONFIRMATION' && <SuccessScreen onRestart={handleRestart} />}
            {step === 'HISTORY' && <HistoryScreen items={maintenanceHistory} onClose={() => setStep('LANDING')} />}

            {/* Backoffice Flow */}
            {step === 'BACKOFFICE_ROLE_SELECT' && <BackofficeLogin onSelectRole={handleRoleSelect} onBack={handleBack} />}
            {step === 'BACKOFFICE_DASHBOARD' && <BackofficeDashboard role={backofficeRole} onLogout={handleBackofficeLogout} />}
        </div>
    );
}