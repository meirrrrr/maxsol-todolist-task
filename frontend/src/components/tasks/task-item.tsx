"use client";
import React from "react";
import {
  Paper,
  Group,
  Checkbox,
  Text,
  TextInput,
  Textarea,
  ActionIcon,
  Box,
  Badge,
  Avatar,
} from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { Task } from "@/hooks/useTasks";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onUpdate: (
    id: number,
    data: Partial<Omit<Task, "id" | "completed">>
  ) => Promise<void>;
}

export function TaskItem({
  task,
  onDelete,
  onToggle,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description || "");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate(task.id, { title, description });
    setIsEditing(false);
    setIsSaving(false);
  };

  return (
    <Paper
      withBorder
      radius="lg"
      p="lg"
      style={(theme) => ({
        borderLeft: `4px solid ${
          task.completed ? theme.colors.green[6] : theme.colors.blue[6]
        }`,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows.md,
        },
      })}
    >
      <Group align="center" justify="apart">
        <Group align="center" gap="sm" style={{ flex: 1 }}>
          <Checkbox
            checked={task.completed}
            onChange={(e) => onToggle(task.id, e.currentTarget.checked)}
            size="lg"
            radius="xl"
          />
          <Avatar color={task.completed ? "green" : "blue"} radius="xl">
            {task.title.charAt(0).toUpperCase()}
          </Avatar>
          <Box style={{ flex: 1 }}>
            {isEditing ? (
              <TextInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                mb="xs"
                size="md"
              />
            ) : (
              <Text
                fw={700}
                size="lg"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.title}
              </Text>
            )}
            {isEditing ? (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minRows={2}
              />
            ) : (
              task.description && (
                <Text color="dimmed" mt="xs">
                  {task.description}
                </Text>
              )
            )}
          </Box>
        </Group>
        <Group gap="xs">
          {isEditing ? (
            <ActionIcon
              color="green"
              variant="light"
              onClick={handleSave}
              loading={isSaving}
            >
              <IconEdit />
            </ActionIcon>
          ) : (
            <ActionIcon
              color="blue"
              variant="light"
              onClick={() => setIsEditing(true)}
            >
              <IconEdit />
            </ActionIcon>
          )}
          <ActionIcon
            color="red"
            variant="light"
            onClick={() => onDelete(task.id)}
          >
            <IconTrash />
          </ActionIcon>
          <Badge
            color={task.completed ? "green" : "yellow"}
            variant="light"
            size="sm"
          >
            {task.completed ? "Выполнено" : "В процессе"}
          </Badge>
        </Group>
      </Group>
    </Paper>
  );
}
