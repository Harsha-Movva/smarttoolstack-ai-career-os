"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type DashboardData = {
  atsScore: number;
  skills: string[];
  missingSkills: string[];
  career: string;

  roadmap: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
};

type DashboardContextType = {
  data: DashboardData;
  setData: (data: DashboardData) => void;
};

const DashboardContext =
  createContext<DashboardContextType | null>(null);

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<DashboardData>({
  atsScore: 0,
  skills: [],
  missingSkills: [],
  career: "",

  roadmap: [],
  strengths: [],
  weaknesses: [],
  suggestions: [],
});

  return (
    <DashboardContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}