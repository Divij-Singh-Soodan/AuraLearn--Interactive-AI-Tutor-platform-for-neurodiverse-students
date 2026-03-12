import { Brain, Settings, Activity } from "lucide-react";
import { useStress } from "@/contexts/StressContext";
import { Slider } from "@/components/ui/slider";

const stressLabels: Record<string, { label: string; color: string }> = {
  low: { label: "Calm", color: "text-sage" },
  medium: { label: "Moderate", color: "text-peach-dark" },
  high: { label: "High Stress", color: "text-destructive" },
};

export function AuraHeader() {
  const { stressLevel, setStressLevel, stressCategory } = useStress();
  const stressInfo = stressLabels[stressCategory];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md stress-transition">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-foreground tracking-tight">AuraLearn</h1>
            <p className="text-[10px] font-medium text-muted-foreground -mt-0.5">Adaptive AI Tutor</p>
          </div>
        </div>

        {/* Stress Level Control */}
        <div className="flex items-center gap-4 rounded-2xl bg-muted/60 px-5 py-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-6">
              <span className="text-xs font-medium text-muted-foreground">Stress Level</span>
              <span className={`text-xs font-bold ${stressInfo.color}`}>{stressInfo.label} ({stressLevel})</span>
            </div>
            <Slider
              value={[stressLevel]}
              onValueChange={(v) => setStressLevel(v[0])}
              min={1}
              max={10}
              step={1}
              className="w-48"
            />
          </div>
        </div>

        {/* Settings */}
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
