
import React from 'react';

export const ApplianceIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} strokeWidth="1" stroke="currentColor">
    <path d="M7 15H17V12C17 11.4477 16.5523 11 16 11H8C7.44772 11 7 11.4477 7 12V15Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 15H5C4.44772 15 4 15.4477 4 16V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V16C20 15.4477 19.5523 15 19 15Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 11V8C17 7.44772 16.5523 7 16 7H8C7.44772 7 7 7.44772 7 8V11" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="9" r="0.5" fill="currentColor" stroke="none"/>
    <circle cx="11" cy="9" r="0.5" fill="currentColor" stroke="none"/>
    <circle cx="13" cy="9" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

export const PlumbingIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} strokeWidth="1" stroke="currentColor">
    <path d="M8.5 7C5.5 8 4 10.5 4 12C4 14.5 5.5 16.5 8.5 18" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5 17C18.5 16 20 13.5 20 12C20 10.5 18.5 8.5 15.5 7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 7L8.5 4.5M8.5 7L6 4.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 18L15.5 20.5M15.5 18L18 20.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ElectricityIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const MissingObjectIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
  </svg>
);

export const OtherProblemIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const HeatingIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const WifiIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);

export const DoorIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const WallIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6v4m4 4v4m4-12v4m-8 8v4m4-16v4" />
  </svg>
);

export const BugIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V8m6 6v2m0-4H8m4 0h2m4 0a2 2 0 100 4m0-4a2 2 0 110 4m0 4v2m0-6V8" />
  </svg>
);

export const FurnitureIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    </svg>
);

export const ConciergeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const KeyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
);

export const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const WashingMachineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-4 0a4 4 0 108 0 4 4 0 10-8 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 5h2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2" />
  </svg>
);

export const DryerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-4 0a4 4 0 108 0 4 4 0 10-8 0" />
    <path d="M8 12a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zM8 15a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zM8 9a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z" />
  </svg>
);

export const DishwasherIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16h10" />
    <path d="M17 5h2" />
  </svg>
);

export const FridgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10h14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6v2" />
  </svg>
);

export const OvenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 15h10v4H7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 6h2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 6h2" />
  </svg>
);

export const MicrowaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5v14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h10" />
    <circle cx="18" cy="8" r="1" />
    <circle cx="18" cy="12" r="1" />
    <circle cx="18" cy="16" r="1" />
  </svg>
);

export const CooktopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3z" />
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16" cy="16" r="2.5" />
    <circle cx="8" cy="16" r="1.5" />
    <circle cx="16" cy="8" r="1.5" />
  </svg>
);

export const CookerHoodIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 10l2-6h8l2 6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 18h4" />
  </svg>
);

export const CoffeeMachineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 5h2v10h-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 19h8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

export const LandingLogo = () => (
    <div className="relative mb-6">
        <SettingsIcon />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <ElectricityIcon className="w-5 h-5 text-emerald-400" />
        </div>
    </div>
);

export const LoadingSpinnerIcon = () => (
    <svg 
        className="animate-spin h-12 w-12 text-slate-500"
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 100 100"
    >
        <path
            d="M10 50A40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
        />
    </svg>
);

export const CheckIcon = ({ className = "h-16 w-16 text-emerald-500" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- PLUMBING ICONS ---
export const SinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M12 3v5m0 0-2-2m2 2 2-2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
  </svg>
);

export const ToiletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 10a2 2 0 01-2 2H9a2 2 0 01-2-2L6 8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6a3 3 0 013 3v2H6V6a3 3 0 013-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v2" />
  </svg>
);

export const ShowerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v4c0 2.5 2 4 5 4h3m-3-4l2-2m-2 2l2 2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 11v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 14v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14a2 2 0 002-2v-2H3v2a2 2 0 002 2z" />
  </svg>
);

export const WaterHeaterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 5a2 2 0 012-2h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l2-4m-2 4l-2-4m2 4v6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19h6" />
  </svg>
);

export const FaucetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v5m0 0c0 2.5 2 4 5 4h2m-7-4H8a2 2 0 00-2 2v8a2 2 0 002 2h2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12v10" />
  </svg>
);

export const PipeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h4m12 0h-4m-8 0v4a4 4 0 004 4 4 4 0 004-4v-4m-8 0H8a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2h-4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

// --- ELECTRICAL ICONS ---
export const PowerOutageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" />
  </svg>
);

export const OutletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const SwitchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

export const LightBulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export const FuseBoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11h3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 11h3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 15h3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 15h3" />
  </svg>
);

// --- HEATING & CLIMATE ICONS ---
export const RadiatorIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 4h8m-8 16h8M6 6v12m4-12v12m4-12v12m4-12v12M18 6v12" />
  </svg>
);

export const BoilerIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M17 3a2.828 2.828 0 1 1 4 4V7.5a2.5 2.5 0 0 1-5 0V7a2.828 2.828 0 0 1 1-4z" />
    <rect x="4" y="9" width="16" height="12" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 13a4 4 0 108 0 4 4 0 10-8 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13v2" />
  </svg>
);

export const AirConIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <rect x="3" y="8" width="18" height="8" rx="1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h.01M10 12h.01M14 12h.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 4l-3 3-3-3" />
  </svg>
);

export const ThermostatIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <circle cx="12" cy="12" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const FanIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4m12.5-6.5L7.5 18.5m0-13l9 13" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// --- INTERNET & WIFI ICONS ---
export const RouterIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <rect x="2" y="13" width="20" height="8" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13V7a1 1 0 011-1h2a1 1 0 011 1v6M14 13V7a1 1 0 011-1h2a1 1 0 011 1v6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 17h.01M19 17h.01" />
    </svg>
);

export const NoWifiIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M8.529 8.528a10.001 10.001 0 0114.058 0M12 20h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.55a10 10 0 01.85-1.18M16.122 16.122a3 3 0 01-4.122.428" />
    </svg>
);

export const TvBoxIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <rect x="2" y="8" width="20" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 3l3 5h2l3-5" />
        <circle cx="18" cy="14" r="1.5" fill="currentColor" />
    </svg>
);

export const CableIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 18h4a1 1 0 001-1v-5a1 1 0 00-1-1h-4a1 1 0 00-1 1v5a1 1 0 001 1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11V3m0 15v3M6 8l-2-2m14 2l2-2" />
    </svg>
);

export const PhoneIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

// --- DOORS & WINDOWS ICONS ---
export const WindowIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <rect x="5" y="4" width="14" height="16" rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
    </svg>
);

export const DashboardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

export const ClipboardListIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

export const UserGroupIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const WrenchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

export const ShutterIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M3 15h18M3 12h18" />
    </svg>
);

export const LockIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <rect x="6" y="11" width="12" height="10" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
    </svg>
);

export const GateIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6v12M16 6v12M4 6v12M20 6v12M4 10h16M4 14h16" />
    </svg>
);

export const BrokenGlassIcon = ({ className = "w-12 h-12 text-gray-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 5-2 4 5 3-4 8H4l3-6-2-5 7-9z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M10 9l-2 3M14 12l2-1" />
    </svg>
);

export const FileTextIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const ShieldCheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

export const EuroIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4" />
    </svg>
);

export const PhotoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const PrinterIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
);

export const CalendarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const EyeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export const EyeOffIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18" />
    </svg>
);

export const WalletIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export const CreditCardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export const MapPinIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const UserIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);
