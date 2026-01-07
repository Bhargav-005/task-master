import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTaskSchema, type InsertTask } from "@shared/schema";
import { useCreateTask } from "@/hooks/use-tasks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export function TaskForm() {
  const { mutate, isPending } = useCreateTask();
  
  const form = useForm<InsertTask>({
    resolver: zodResolver(insertTaskSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (data: InsertTask) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex gap-3 p-1 bg-white rounded-2xl shadow-sm border border-border/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300"
      >
        <Input
          {...form.register("description")}
          placeholder="What needs to be done?"
          className="flex-1 border-none shadow-none focus-visible:ring-0 text-lg py-6 bg-transparent placeholder:text-muted-foreground/70"
          disabled={isPending}
        />
        <Button 
          type="submit" 
          disabled={isPending}
          className="h-auto px-6 rounded-xl font-medium bg-primary hover:bg-primary/90 transition-all duration-200"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>Add</span>
            </div>
          )}
        </Button>
      </form>
      {form.formState.errors.description && (
        <p className="mt-2 text-sm text-destructive px-4">
          {form.formState.errors.description.message}
        </p>
      )}
    </motion.div>
  );
}
