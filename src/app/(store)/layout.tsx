export default function StoreLayout({ children }: { children: React.ReactNode }) {
  // TODO: Supabase auth check, redirect to /store/login if not authenticated
  return <>{children}</>;
}
