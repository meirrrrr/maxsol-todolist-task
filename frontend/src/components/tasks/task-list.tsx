import React, { useState, useMemo, useEffect } from "react";
import {
  Stack,
  Text,
  ScrollArea,
  Divider,
  Title,
  Center,
  Box,
  Pagination,
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
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "active") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTasks.slice(start, start + pageSize);
  }, [filteredTasks, page]);

  const totalPages = Math.ceil(filteredTasks.length / pageSize);

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
        style={{ height: `calc(100vh - 480px)` }}
        type="auto"
        offsetScrollbars
      >
        <Stack gap="md" p="sm">
          <Title order={4}>Ваши задачи</Title>
          <Divider />

          {paginatedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onUpdate={onUpdate}
            />
          ))}

          {paginatedTasks.length === 0 && (
            <Center mt="xl">
              <Text color="dimmed">Нет задач по выбранному фильтру</Text>
            </Center>
          )}
        </Stack>
      </ScrollArea>

      {totalPages > 1 && (
        <Center my="md">
          <Pagination
            value={page}
            onChange={setPage}
            total={totalPages}
            siblings={1}
            boundaries={1}
          />
        </Center>
      )}
    </Box>
  );
}
