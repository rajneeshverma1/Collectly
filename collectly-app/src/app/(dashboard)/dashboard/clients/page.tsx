import { ClientSection } from '@/components/ClientSection';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function ClientsPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="animate-spin text-white/20" size={32} />
      </div>
    }>
      <ClientSection />
    </Suspense>
  );
}
