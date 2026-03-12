import { useState } from "react";
import { BookOpen, Eye, EyeOff, ChevronRight, Clock, Star, Bookmark } from "lucide-react";
import { BionicText } from "@/components/BionicText";
import { useStress } from "@/contexts/StressContext";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const sampleText = `Neuroplasticity, also known as brain plasticity, refers to the ability of the nervous system to change its activity in response to intrinsic or extrinsic stimuli by reorganizing its structure, functions, or connections. The most widely recognized forms of plasticity are learning, memory, and recovery from brain damage.

During the early stages of development, the brain has a remarkable capacity to reorganize and adapt. This is known as developmental plasticity. As we age, the brain continues to create new neural pathways and alter existing ones in order to adapt to new experiences, learn new information, and create new memories.

Research has shown that the brain can continue to form new neural connections throughout life. This is especially important for neurodiverse learners, as it suggests that with the right support and strategies, anyone can develop new skills and overcome learning challenges.

The concept of neuroplasticity has revolutionized our understanding of the brain. It tells us that our brains are not fixed or static, but rather dynamic organs that are constantly changing and adapting to our environment and experiences.`;

const chapters = [
  { id: 1, title: "Chapter 1: Introduction to Neuroscience", progress: 100, status: "completed" as const },
  { id: 2, title: "Chapter 2: Brain Architecture", progress: 100, status: "completed" as const },
  { id: 3, title: "Chapter 3: Neuroplasticity", progress: 45, status: "current" as const },
  { id: 4, title: "Chapter 4: Memory & Learning", progress: 0, status: "locked" as const },
];

export default function Home() {
  const [bionicEnabled, setBionicEnabled] = useState(false);
  const { isHighStress, stressCategory } = useStress();

  return (
    <div className="flex-1 overflow-y-auto p-6 stress-transition">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">
          Welcome back, Learner! 🌿
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isHighStress
            ? "Take it easy. We've simplified your view to help you focus."
            : "Ready to continue your learning journey?"}
        </p>
      </motion.div>

      {/* Chapter Navigation (hidden in high stress) */}
      {!isHighStress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className={`rounded-xl border p-4 transition-all cursor-pointer hover:shadow-md ${
                ch.status === "current"
                  ? "border-primary/40 bg-sage-light/30 shadow-sm"
                  : ch.status === "locked"
                  ? "opacity-50"
                  : "bg-card"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {ch.status === "completed" ? (
                  <Star className="h-4 w-4 text-peach-dark" />
                ) : ch.status === "current" ? (
                  <BookOpen className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {ch.status === "current" ? "Reading Now" : ch.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground leading-snug">{ch.title}</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${ch.progress}%` }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Reading Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-peach">
              <BookOpen className="h-4 w-4 text-peach-dark" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-foreground">Chapter 3: Neuroplasticity</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <Clock className="h-3 w-3" /> 12 min read
              </div>
            </div>
          </div>

          {/* Bionic Reading Toggle */}
          <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-1.5">
            {bionicEnabled ? <Eye className="h-3.5 w-3.5 text-primary" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
            <span className="text-xs font-medium text-muted-foreground">Bionic Reading</span>
            <Switch
              checked={bionicEnabled}
              onCheckedChange={setBionicEnabled}
              className="scale-75"
            />
          </div>
        </div>

        {/* Reading Content */}
        <div
          className="stress-transition prose prose-sm max-w-none"
          style={{
            fontSize: `var(--reading-font-size)`,
            lineHeight: `var(--reading-line-height)`,
            letterSpacing: `var(--reading-letter-spacing)`,
          }}
        >
          {sampleText.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-4 text-foreground/85">
              <BionicText text={paragraph} enabled={bionicEnabled} />
            </p>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-end mt-6 pt-4 border-t">
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Next Section <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
