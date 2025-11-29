import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Fijo */}
      <Sidebar />

      {/* Contenido Principal (con margen a la izquierda para no tapar el sidebar) */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}