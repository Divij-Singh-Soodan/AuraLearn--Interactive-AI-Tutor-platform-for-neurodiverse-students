import { BookOpen, Search, Filter, Clock, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const courses = [
  { id: 1, title: "Introduction to Neuroscience", category: "Science", chapters: 12, duration: "4h 30m", rating: 4.8, students: 2340, color: "bg-sage-light", icon: "🧠" },
  { id: 2, title: "Cognitive Psychology", category: "Psychology", chapters: 10, duration: "3h 45m", rating: 4.6, students: 1820, color: "bg-lavender", icon: "💭" },
  { id: 3, title: "Learning Strategies for ADHD", category: "Self-Help", chapters: 8, duration: "2h 15m", rating: 4.9, students: 3100, color: "bg-peach", icon: "🎯" },
  { id: 4, title: "Memory Techniques", category: "Education", chapters: 6, duration: "1h 50m", rating: 4.7, students: 1560, color: "bg-sky", icon: "📚" },
  { id: 5, title: "Mindfulness & Focus", category: "Wellness", chapters: 9, duration: "3h 10m", rating: 4.5, students: 2780, color: "bg-cream", icon: "🧘" },
  { id: 6, title: "Reading Comprehension Mastery", category: "Education", chapters: 11, duration: "4h", rating: 4.8, students: 1950, color: "bg-sage-light", icon: "📖" },
];

export default function Library() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">Library 📚</h2>
        <p className="text-sm text-muted-foreground mb-6">Explore curated courses designed for neurodiverse learners</p>
      </motion.div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10 rounded-xl bg-card border" />
        </div>
        <button className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border bg-card overflow-hidden hover:shadow-md transition-all cursor-pointer group"
          >
            <div className={`h-28 ${course.color} flex items-center justify-center text-4xl`}>
              {course.icon}
            </div>
            <div className="p-4">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">{course.category}</span>
              <h3 className="text-sm font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{course.title}</h3>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.chapters} chapters</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="flex items-center gap-1 text-xs font-medium text-peach-dark">
                  <Star className="h-3 w-3 fill-current" /> {course.rating}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> {course.students.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
