"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { Box, Loader, Title, Text } from "@mantine/core";
import { TaskCreateForm } from "@/components/tasks/task-create-form";
import { TaskList } from "@/components/tasks/task-list";

export default function TasksPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.replace("/sign-in");
  }, [authLoading, user, router]);

  if (authLoading || loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="xl">
        <Text color="red">{error}</Text>
      </Box>
    );
  }

  return (
    <Box p="xl">
      <Title order={2} mb="md">
        Мои задачи
      </Title>
      <TaskCreateForm onCreate={createTask} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onUpdate={updateTask}
      />
    </Box>
  );
}
