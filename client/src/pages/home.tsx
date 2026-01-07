import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Simple To-Do
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Stay organized and get things done. A clean space for your daily tasks.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="relative">
          {/* Decorative background blur */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 -z-10" />
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/5 ring-1 ring-black/5">
            <TaskForm />
            <TaskList />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground/60">
          <p>Built with React & Tailwind</p>
        </footer>
      </div>
    </div>
  );
}
