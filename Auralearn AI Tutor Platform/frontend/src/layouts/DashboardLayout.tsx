import { useState } from "react";
import { AuraHeader } from "@/components/AuraHeader";
import { AuraSidebar } from "@/components/AuraSidebar";
import { AuraChatSidebar } from "@/components/AuraChatSidebar";
import { useStress } from "@/contexts/StressContext";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  const { isHighStress } = useStress();
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen flex-col bg-background stress-transition">
      <AuraHeader />
      <div className="flex flex-1 overflow-hidden">
        <AuraSidebar />
        <Outlet />
        {!isHighStress && (
          <>
            <AuraChatSidebar
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
            {!isChatOpen && (
              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-6 right-6 z-40 rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Open Aura
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
