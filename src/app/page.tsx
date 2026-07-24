import { Dashboard } from "@/components/dashboard/dashboard";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <>
      <Dashboard />
      <Toaster position="top-right" richColors />
    </>
  );
}
