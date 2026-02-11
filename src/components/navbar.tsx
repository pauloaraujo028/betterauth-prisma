import UserAvatar from "./user-avatar";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">
          Monitore todos os seus projetos e tarefas em um só lugar
        </p>
      </div>

      <UserAvatar />
    </nav>
  );
};

export default Navbar;
