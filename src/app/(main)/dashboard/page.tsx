import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOrganizations } from "@/features/dashboard/actions/organizations";
import { CreateOrganizationForm } from "@/features/dashboard/components/create-organization-form";
import OrganizationSwitcher from "@/features/dashboard/components/organization-switcher";

export default async function Dashboard() {
  const organizations = await getOrganizations();

  return (
    <div>
      <h1>Dashboard</h1>
      <OrganizationSwitcher organizations={organizations} />

      <div className="flex h-screen items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Criar organização</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar organização</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar uma nova organização.
              </DialogDescription>
              <CreateOrganizationForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
