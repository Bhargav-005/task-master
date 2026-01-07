import { useTasks, useDeleteTask } from "@/hooks/use-tasks";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskList() {
  const { data: tasks, isLoading, error } = useTasks();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  if (isLoading) {
    return (
      <div className="space-y-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/50">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 text-center rounded-xl bg-destructive/5 text-destructive border border-destructive/20">
        <p>Failed to load tasks. Please try again later.</p>
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 text-center text-muted-foreground"
      >
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm opacity-70">Add a task above to get started!</p>
      </motion.div>
    );
  }

  return (
    <div className="mt-8 space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="group flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="text-primary/40">
                <Circle className="w-5 h-5" />
              </div>
              <span className="text-foreground font-medium">{task.description}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              disabled={isDeleting}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
