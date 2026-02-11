export const Logo = () => {
  return (
    <div className="group flex cursor-pointer items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg transition-transform group-hover:rotate-12">
        <div className="h-4 w-4 rotate-45 transform rounded-sm bg-white" />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">
        NexusCloud
      </span>
    </div>
  );
};
