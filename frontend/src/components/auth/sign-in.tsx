"use client";

import React, { useEffect, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Card,
  Title,
  Text,
  Loader,
  Group,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { CheckCircle, Lock, User } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export default function SignInForm() {
  const { login, loading, user } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isFormLoading, setFormLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/tasks");
    }
  }, [user, loading, router]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (username.trim().length === 0) {
      newErrors.username = "Пожалуйста, введите имя пользователя";
    }
    if (password.length === 0) {
      newErrors.password = "Пожалуйста, введите пароль";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormLoading(true);
    try {
      await login({ username: username.trim(), password });
      showNotification({
        title: "Успешно!",
        message: "Вы успешно вошли в систему",
        color: "green",
        icon: <CheckCircle size={18} />,
      });
      router.push("/tasks");
    } catch (error: unknown) {
      console.error("Login error:", error);
      showNotification({
        title: "Ошибка",
        message: "Не удалось войти",
        color: "red",
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box className="min-h-screen flex mt-[100px] justify-center p-4">
      <Box w={360} mx="auto">
        <Card shadow="lg" padding="xl" radius="lg" withBorder>
          <Title order={2} ta="center" mb="sm">
            Вход
          </Title>
          <Text c="dimmed" ta="center" mb="lg">
            Введите свои данные для входа в аккаунт
          </Text>

          <form onSubmit={handleSubmit} noValidate>
            <TextInput
              label="Имя пользователя"
              placeholder="Ваше имя пользователя"
              leftSection={<User size={20} />}
              leftSectionPointerEvents="none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
              size="md"
              mb="md"
            />

            <PasswordInput
              label="Пароль"
              placeholder="Ваш пароль"
              leftSection={<Lock size={20} />}
              leftSectionPointerEvents="none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              size="md"
              mb="xl"
            />

            <Button
              type="submit"
              fullWidth
              size="md"
              loading={isFormLoading}
              gradient={{ from: "indigo", to: "cyan" }}
            >
              {isFormLoading ? <Loader size="xs" color="white" /> : "Войти"}
            </Button>
          </form>

          <Group justify="center" mt="md">
            <Text size="sm" c="dimmed">
              Нет аккаунта?
            </Text>
            <Button
              variant="subtle"
              color="blue"
              component="a"
              size="sm"
              px={0}
              onClick={() => router.push("/sign-up")}
            >
              Зарегистрироваться
            </Button>
          </Group>
        </Card>
      </Box>
    </Box>
  );
}
