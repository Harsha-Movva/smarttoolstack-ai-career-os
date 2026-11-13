"use client";

import DashboardLayout from "@/components/ai-os/layout/DashboardLayout";
import Dashboard from "@/components/ai-os/dashboard/Dashboard";
import { DashboardProvider } from "@/lib/context/DashboardContext";

export default function AIOSPage() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </DashboardProvider>
  );
}