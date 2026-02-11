import DottedSeparator from "@/components/dotted-separator";
import Navigation from "@/components/navigation";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">Logo</Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
