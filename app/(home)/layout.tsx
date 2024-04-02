import { NavbarHome } from "./_components/navbar-home";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <NavbarHome />
      <main className="pt-40 pb-20 bg-neutral-500">{children}</main>
    </div>
  );
};

export default HomeLayout;
