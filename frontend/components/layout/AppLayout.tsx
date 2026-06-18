import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({
  children,
}: AppLayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 flex-1 p-6">
        {children}
      </main>
    </div>
  );
};