import { Sidebar } from "../_components/side-bar";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen ">
      <div className="flex gap-x-7 ">
        <div className="w-64 shrink-0 md:block hidden">
          <Sidebar />
        </div>
        <div className="px-8 md:px-16 pt-10">{children}</div>
      </div>
    </div>
  );
};

export default NewsLayout;
