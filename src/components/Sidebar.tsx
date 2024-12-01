"use client";

import { History, Plus, PlusIcon, Zap } from "lucide-react";
import { CodebaseSelectionDialog } from "./NewConversationDialog";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Current Conversation",
    url: "#",
    icon: Zap,
  },
  {
    title: "New Conversation",
    url: "#",
    icon: Plus,
  },
  {
    title: "Past Conversations",
    url: "#",
    icon: History,
  },
];

export function AppSidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewConversation = () => {
    setIsDialogOpen(true);
  };

  const handleCodebaseSelect = (codebase: string) => {
    console.log("Selected codebase: ", codebase);
    setIsDialogOpen(false);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 text-xl font-bold">Repo RAG</div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleNewConversation}>
                  <PlusIcon />
                  <span>New Conversation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <CodebaseSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSelect={handleCodebaseSelect}
      />
    </Sidebar>
  );
}
