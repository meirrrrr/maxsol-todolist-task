"use client";
import React, { useState, useMemo } from "react";
import {
  Stack,
  Text,
  ScrollArea,
  Divider,
  Title,
  Center,
  SegmentedControl,
  Box,
} from "@mantine/core";
import { Task } from "@/hooks/useTasks";
import { TaskItem } from "./task-item";
import { FilterPanel } from "./filter-panel";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onUpdate: (
    id: number,
    data: Partial<Omit<Task, "id" | "completed">>
  ) => Promise<void>;
}

export function TaskList({
  tasks,
  onDelete,
  onToggle,
  onUpdate,
}: TaskListProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((t) => t.completed);
      case "active":
        return tasks.filter((t) => !t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  if (tasks.length === 0) {
    return (
      <Center mt="xl">
        <Text size="lg" color="dimmed">
          Здесь пока нет задач. Добавьте новую!
        </Text>
      </Center>
    );
  }

  return (
    <Box>
      <FilterPanel filter={filter} setFilter={setFilter} />
      <ScrollArea
        style={{ height: "calc(100vh - 360px)" }}
        type="always"
        offsetScrollbars
      >
        <Stack gap="md">
          <Title order={4} mb="sm">
            Ваши задачи
          </Title>
          <Divider />
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onUpdate={onUpdate}
            />
          ))}
          {filteredTasks.length === 0 && (
            <Center mt="xl">
              <Text size="md" color="dimmed">
                Нет задач по выбранному фильтру
              </Text>
            </Center>
          )}
        </Stack>
      </ScrollArea>
    </Box>
  );
}
