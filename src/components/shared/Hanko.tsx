import { cn } from '@/lib/utils/cn';

type HankoProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: { outer: 'w-9 h-14', fontSize: 'text-xs', padding: 'p-1' },
  md: { outer: 'w-14 h-14', fontSize: 'text-lg', padding: 'p-1.5' },
  lg: { outer: 'w-16 h-16', fontSize: 'text-2xl', padding: 'p-2' },
};

export function Hanko({ children, size = 'md', className }: HankoProps) {
  const s = sizeMap[size];
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded',
        'bg-akane text-shiro font-display font-bold leading-none',
        'writing-mode-vertical',
        '-rotate-[4deg]',
        s.outer, s.fontSize, s.padding,
        className,
      )}
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        boxShadow:
          'inset 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 12px rgba(0,0,0,0.18)',
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
