import { Navbar } from "../(dashboard)/_components/navbar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="h-full bg-[linear-gradient(to-right, #F1AE00, #9613AD, #A0004F, #FFDCC5)] overflow-y-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default AdminLayout;
