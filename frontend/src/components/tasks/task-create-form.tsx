"use client";
import React from "react";
import {
  Box,
  Card,
  Group,
  TextInput,
  Button,
  Stack,
  Title,
  Textarea,
} from "@mantine/core";
import { IconPlus, IconLogout } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { useAuth } from "@/hooks/useAuth";
import { Task } from "@/hooks/useTasks";

interface TaskCreateFormProps {
  onCreate: (data: Omit<Task, "id" | "completed">) => Promise<void>;
}

export function TaskCreateForm({ onCreate }: TaskCreateFormProps) {
  const { logout } = useAuth();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showNotification({
        title: "Ошибка",
        message: "Название не может быть пустым",
        color: "red",
      });
      return;
    }
    setSubmitting(true);
    try {
      await onCreate({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      showNotification({
        title: "Успех",
        message: "Задача добавлена",
        color: "green",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Не удалось создать задачу";
      showNotification({
        title: "Ошибка",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card shadow="md" radius="lg" p="lg" mb="lg" withBorder>
      <Group justify="apart" mb="sm">
        <Title order={4}>Новая задача</Title>
        <Button
          variant="outline"
          leftSection={<IconLogout size={16} />}
          onClick={() => logout()}
          color="gray"
          size="xs"
        >
          Выйти
        </Button>
      </Group>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack gap="sm">
          <TextInput
            placeholder="Что нужно сделать?"
            label="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            radius="md"
            size="md"
          />
          <Textarea
            placeholder="Дополнительные подробности (необязательно)"
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            radius="md"
            size="md"
            minRows={2}
          />
          <Group justify="right" mt="sm">
            <Button
              type="submit"
              leftSection={<IconPlus size={18} />}
              loading={submitting}
              radius="xl"
              size="md"
            >
              Добавить
            </Button>
          </Group>
        </Stack>
      </Box>
    </Card>
  );
}
