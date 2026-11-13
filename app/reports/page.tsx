"use client";

import DashboardLayout from "@/components/ai-os/layout/DashboardLayout";
import ReportsPage from "@/components/ai-os/reports/ReportsPage";
import { DashboardProvider } from "@/lib/context/DashboardContext";

export default function Reports() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <ReportsPage />
      </DashboardLayout>
    </DashboardProvider>
  );
}