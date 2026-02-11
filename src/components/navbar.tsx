"use client";

import { useState } from "react";
import MobileSidebar from "./mobile-sidebar";
import UserAvatar from "./user-avatar";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="cursor-pointer p-2 text-slate-400 hover:text-slate-600 lg:hidden"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">
          Monitore todos os seus projetos e tarefas em um só lugar
        </p>
      </div>
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeItem={activeTab}
        onNavigate={setActiveTab}
      />
      <UserAvatar />
    </nav>
  );
};

export default Navbar;
