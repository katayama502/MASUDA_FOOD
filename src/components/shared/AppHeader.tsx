import Link from 'next/link';
import { BackIcon } from './Icons';

interface AppHeaderProps {
  title: string;
  backHref: string;
  rightSlot?: React.ReactNode;
  dark?: boolean;
}

export function AppHeader({ title, backHref, rightSlot, dark }: AppHeaderProps) {
  const textCls = dark ? 'text-shiro' : 'text-sumi';
  const backBgCls = dark ? 'bg-white/10 text-shiro' : 'bg-sumi/[0.04] hover:bg-sumi/[0.08] text-sumi';

  return (
    <header className={`flex items-center gap-3 px-4 h-[52px] ${dark ? 'bg-sumi' : ''}`}>
      <Link
        href={backHref}
        className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer ${backBgCls}`}
        aria-label="戻る"
      >
        <BackIcon />
      </Link>
      <h1 className={`font-display text-[17px] font-semibold tracking-wider flex-1 ${textCls}`}>
        {title}
      </h1>
      {rightSlot && <div className="ml-auto">{rightSlot}</div>}
    </header>
  );
}
