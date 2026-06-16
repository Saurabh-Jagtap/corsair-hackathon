import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({
  children,
}: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};