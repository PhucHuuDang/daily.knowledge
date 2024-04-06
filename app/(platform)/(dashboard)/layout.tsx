import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-gradient-to-r from-slate-900 to-slate-700">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
