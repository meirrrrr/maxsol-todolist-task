import { useState, useEffect } from "react";
import api from "@/lib/apit";

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface ApiError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (data: Omit<Task, "id" | "completed">) => Promise<void>;
  updateTask: (
    id: number,
    data: Partial<Omit<Task, "id" | "completed"> & { completed?: boolean }>
  ) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number, completed: boolean) => Promise<void>;
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get<Task[]>(`/tasks`);
      setTasks(res.data);
      setError(null);
    } catch (error: unknown) {
      console.error("Error fetching tasks:", error);
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.detail || "Ошибка загрузки задач";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async ({
    title,
    description,
  }: Omit<Task, "id" | "completed">) => {
    try {
      const res = await api.post<Task>(`/tasks`, {
        title,
        description,
      });
      setTasks((prev) => [...prev, res.data]);
    } catch (error: unknown) {
      console.error("Error creating task:", error);
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.detail || "Ошибка создания задачи";
      throw new Error(errorMessage);
    }
  };

  const updateTask = async (
    id: number,
    data: Partial<Omit<Task, "id" | "completed"> & { completed?: boolean }>
  ) => {
    try {
      const res = await api.put<Task>(`/tasks/${id}`, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (error: unknown) {
      console.error("Error updating task:", error);
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.detail || "Ошибка обновления задачи";
      throw new Error(errorMessage);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.detail || "Ошибка удаления задачи";
      throw new Error(errorMessage);
    }
  };

  const toggleTask = (id: number, completed: boolean) => {
    return updateTask(id, { completed });
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
