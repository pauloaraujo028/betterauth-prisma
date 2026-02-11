import DottedSeparator from "@/components/dotted-separator";
import { Logo } from "@/components/logo";
import Navigation from "@/components/navigation";
import WorkspaceSwitcher from "@/components/workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 px-6 py-4">
      <Logo />
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
