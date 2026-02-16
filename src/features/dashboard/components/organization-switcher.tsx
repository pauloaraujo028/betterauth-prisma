"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { Organization } from "@/lib/generated/prisma/client";
import { toast } from "sonner";

interface OrganizationSwitcherProps {
  organizations: Organization[];
}

const OrganizationSwitcher = ({ organizations }: OrganizationSwitcherProps) => {
  const { data: activeOrganization } = authClient.useActiveOrganization();

  const handleChangeOrganization = async (organizationId: string) => {
    try {
      const { error } = await authClient.organization.setActive({
        organizationId,
      });

      if (error) {
        toast.error("Erro ao mudar de organização.");
        return;
      }

      toast.success("Organização alterada com sucesso!");
    } catch {
      toast.error("Erro ao mudar de organização.");
    }
  };

  return (
    <Select
      onValueChange={handleChangeOrganization}
      value={activeOrganization?.id}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((organization) => (
          <SelectItem key={organization.id} value={organization.id}>
            {organization.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrganizationSwitcher;
