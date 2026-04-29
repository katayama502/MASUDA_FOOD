/* Centralized SVG icon set — 益田めし応援団 */

export function BackIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BellIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <path d="M6 17v-5a6 6 0 1112 0v5l1.5 2H4.5L6 17z" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinejoin="round" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.12 : 0} />
      <path d="M10 20a2 2 0 004 0" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" />
    </svg>
  );
}

export function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-3v-7h-8v7H5a2 2 0 01-2-2v-9z" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinejoin="round" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.12 : 0} />
    </svg>
  );
}

export function TicketIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 100-4V8z" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinejoin="round" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.12 : 0} />
      <path d="M14 6v12" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
    </svg>
  );
}

export function UserIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.12 : 0} />
      <path d="M4 21c1-4.5 4.5-7 8-7s7 2.5 8 7" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} className="w-[22px] h-[22px]" aria-hidden="true">
      <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 4 23.5 8 21.5 12 19 16.5 12 21 12 21z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PlusIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <path d="M4 8a2 2 0 012-2h2l1.5-2h5L16 6h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CheckIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11l8-4M8 13l8 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function SparkleIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M4 20h4l11-11-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M7 7l1 12a2 2 0 002 2h4a2 2 0 002-2l1-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M3 12h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function StorefrontIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M3 9l1-4h16l1 4M3 9v11h18V9M3 9c0 2 1.5 3 3 3s3-1 3-3 1.5 3 3 3 3-1 3-3 1.5 3 3 3 3-1 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.85 5.36 4.62 6.78-.13.5-.83 3.07-.95 3.59-.15.66.24.65.5.47.21-.14 3.31-2.25 4.65-3.16.39.05.78.07 1.18.07 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
    </svg>
  );
}

export function QRIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 14h3v3M20 14v7M14 20v1M17 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
