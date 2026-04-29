export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // TODO: Supabase auth check, redirect to /store/login if role !== 'admin'
  return <>{children}</>;
}
