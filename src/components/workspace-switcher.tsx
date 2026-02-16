import { RiAddCircleFill } from "react-icons/ri";

const WorkspaceSwitcher = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-500 uppercase">Workspaces</p>
        {/* <CirclePlus className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" /> */}
        <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
      </div>

      <div></div>
    </div>
  );
};

export default WorkspaceSwitcher;
