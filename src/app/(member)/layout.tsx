import { TabBar } from '@/components/shared/TabBar';

// TODO: Init LIFF SDK here (client component wrapper)
export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
}
