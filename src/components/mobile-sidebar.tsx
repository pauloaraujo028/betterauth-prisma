import Sidebar from "./sidebar";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onNavigate: (item: string) => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-60 bg-slate-950/60 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 bottom-0 left-0 z-70 flex w-72 flex-col bg-slate-100 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-3 right-2 flex items-center border-b border-white/5">
          <button
            onClick={onClose}
            className="p-2 text-slate-400 transition-colors hover:text-slate-600"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        {/* <nav className="grow space-y-2 overflow-y-auto px-4 py-6">
          {routes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.label);
                  onClose();
                }}
                className={`flex w-full items-center space-x-4 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                  activeItem === item.label
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className={activeItem === item.label ? "scale-110" : ""}>
                  <Icon className="size-5" />
                </div>
                <span className="font-semibold">{item.label}</span>
                {activeItem === item.label && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-white"></div>
                )}
              </button>
            );
          })}
        </nav> */}

        <Sidebar />

        {/* Footer */}
        <div className="border-t border-white/5 p-4">
          <button
            onClick={() => {}}
            className="flex w-full items-center space-x-4 rounded-2xl px-4 py-4 font-bold text-red-400 transition-all hover:bg-red-500/10"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Sair do App</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
