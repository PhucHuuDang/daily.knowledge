import { MacbookScrollHome } from "./_components/macbook-scroll-home";
import { NavbarHome } from "./_components/navbar-home";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-amber-50">
      <NavbarHome />
      <main className="pt-40 pb-20 ">{children}</main>
    </div>
  );
};

export default HomeLayout;
