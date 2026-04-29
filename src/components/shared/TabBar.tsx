'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, TicketIcon, BellIcon, UserIcon } from './Icons';

const TABS = [
  { href: '/home', label: 'ホーム', Icon: HomeIcon },
  { href: '/community', label: '食卓', Icon: TicketIcon },
  { href: '/notifications', label: 'お知らせ', Icon: BellIcon },
  { href: '/mypage', label: 'マイページ', Icon: UserIcon },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-shiro border-t border-kinari-3 pb-safe"
      aria-label="メインナビゲーション"
    >
      <div className="flex h-[56px]">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
                active ? 'text-akane' : 'text-sumi-3 hover:text-sumi-2'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon active={active} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
