import { tasks, type Task, type InsertTask } from "@shared/schema";

export interface IStorage {
  getTasks(): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  deleteTask(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private tasks: Map<number, Task>;
  private currentId: number;

  constructor() {
    this.tasks = new Map();
    this.currentId = 1;
    this.tasks.set(this.currentId, { id: this.currentId++, description: "Buy groceries", completed: false });
    this.tasks.set(this.currentId, { id: this.currentId++, description: "Walk the dog", completed: false });
    this.tasks.set(this.currentId, { id: this.currentId++, description: "Finish the project", completed: false });
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentId++;
    const task: Task = { ...insertTask, id, completed: false };
    this.tasks.set(id, task);
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    this.tasks.delete(id);
  }
}

export const storage = new MemStorage();
