import { Target, Flame, TrendingUp, Award, Calendar } from "lucide-react";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { motion } from "framer-motion";

const weeklyData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 30 },
  { day: "Wed", minutes: 60 },
  { day: "Thu", minutes: 20 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 15 },
  { day: "Sun", minutes: 0 },
];
const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes));

const achievements = [
  { icon: "🔥", title: "7-Day Streak", desc: "Study for 7 days in a row", earned: true },
  { icon: "📖", title: "Bookworm", desc: "Complete 5 chapters", earned: true },
  { icon: "🧠", title: "Quick Learner", desc: "Score 90%+ on a quiz", earned: false },
  { icon: "⭐", title: "Consistent", desc: "Study 30 min daily for a week", earned: false },
];

export default function ProgressPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">My Progress 📊</h2>
        <p className="text-sm text-muted-foreground mb-6">Track your learning journey</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Daily Focus Goal", value: "35 / 45 min", progress: 78, icon: Target, color: "bg-sage-light text-sage-dark" },
          { label: "Chapter Completion", value: "2 / 4", progress: 50, icon: TrendingUp, color: "bg-peach text-peach-dark" },
          { label: "Current Streak", value: "5 days", progress: 71, icon: Flame, color: "bg-secondary text-secondary-foreground" },
          { label: "Quizzes Passed", value: "3 / 5", progress: 60, icon: Award, color: "bg-lavender text-lavender-dark" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border bg-card p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-lg font-bold text-foreground mb-2">{stat.value}</p>
            <ProgressBar value={stat.progress} className="h-2" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border bg-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-display font-bold text-foreground">Weekly Activity</h3>
          </div>
          <div className="flex items-end gap-3 h-32">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-primary/20 relative overflow-hidden transition-all"
                  style={{ height: `${Math.max((d.minutes / maxMinutes) * 100, 5)}%` }}
                >
                  <div
                    className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all"
                    style={{ height: `${Math.max((d.minutes / maxMinutes) * 100, 5)}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border bg-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-4 w-4 text-peach-dark" />
            <h3 className="text-sm font-display font-bold text-foreground">Achievements</h3>
          </div>
          <div className="space-y-3">
            {achievements.map((a) => (
              <div
                key={a.title}
                className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
                  a.earned ? "bg-sage-light/40" : "bg-muted/40 opacity-50"
                }`}
              >
                <span className="text-xl">{a.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
                {a.earned && (
                  <span className="ml-auto text-[10px] font-bold uppercase text-primary">Earned ✓</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
