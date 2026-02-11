import { RiAddCircleFill } from "react-icons/ri";

const workspaces = [
  {
    name: "Teste1",
  },
  {
    name: "Teste2",
  },
  {
    name: "Teste3",
  },
  {
    name: "Teste4",
  },
  {
    name: "Teste5",
  },
];

const WorkspaceSwitcher = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-500 uppercase">Workspaces</p>
        {/* <CirclePlus className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" /> */}
        <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
      </div>

      <div>
        <select className="w-full bg-neutral-200 p-1 font-medium">
          <option value="default">Nenhum workspace selecionado</option>
          {workspaces.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default WorkspaceSwitcher;
