export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface Task {
  id: string;

  description: string;

  isCompleted: boolean;

  priority: Priority;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}

export interface CreateTask {
  description: string;

  priority?: Priority;
}
