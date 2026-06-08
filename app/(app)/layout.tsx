export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app-shell" className="relative isolate min-h-screen min-h-dvh [&_.aurora]:hidden">
      {children}
    </div>
  );
}
