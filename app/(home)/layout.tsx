import { NavbarHome } from "./_components/navbar-home";
import { Footer } from "./_components/footer";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-gradient-to-r from-slate-900 to-slate-700">
      <NavbarHome />
      <main className="pt-40">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
