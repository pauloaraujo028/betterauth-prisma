"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { RiAddCircleFill } from "react-icons/ri";

const WorkspaceSwitcher = () => {
  const { data: workspaces } = authClient.useListOrganizations();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-500 uppercase">Workspaces</p>
        {/* <CirclePlus className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" /> */}
        <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
      </div>

      <Select>
        <SelectTrigger className="w-full bg-neutral-200 p-1 font-medium">
          <SelectValue placeholder="Nenhum workspace selecionado" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              {workspace.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
