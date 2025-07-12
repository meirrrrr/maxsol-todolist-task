"use client";

import React from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MantineProvider>
        <Notifications />
        {children}
      </MantineProvider>
    </AuthProvider>
  );
}
