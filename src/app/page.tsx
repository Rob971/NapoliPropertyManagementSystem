import { Dashboard } from "@/components/dashboard/dashboard";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <Providers>
      <Dashboard />
      <Toaster position="top-right" richColors />
    </Providers>
  );
}
