import { Home, BookOpen, BarChart3 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useStress } from "@/contexts/StressContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { title: "Home", url: "/", icon: Home, alwaysVisible: true },
  { title: "Library", url: "/library", icon: BookOpen, alwaysVisible: false },
  { title: "My Progress", url: "/progress", icon: BarChart3, alwaysVisible: false },
];

export function AuraSidebar() {
  const { isHighStress } = useStress();
  const visibleItems = isHighStress ? navItems.filter((i) => i.alwaysVisible) : navItems;

  return (
    <aside className="w-56 shrink-0 border-r bg-sidebar p-4 stress-transition hidden md:block">
      <nav className="flex flex-col gap-1 mt-2">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <NavLink
                to={item.url}
                end={item.url === "/"}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                activeClassName="bg-sidebar-accent text-primary font-semibold"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            </motion.div>
          ))}
        </AnimatePresence>
      </nav>

      {!isHighStress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-auto pt-8"
        >
          <div className="rounded-xl bg-sage-light/60 p-4">
            <p className="text-xs font-semibold text-sage-dark mb-1">🌱 Today's Tip</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Take a 5-minute break every 25 minutes to maintain focus.
            </p>
          </div>
        </motion.div>
      )}
    </aside>
  );
}
