import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "../_components/side-bar";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-20 md:pt-16 pr-4 max-w-6xl 2xl:max-w-screen ">
      <div className="flex gap-x-7 ">
        <div className="w-auto shrink-0 md:block hidden">
          <TooltipProvider>
            <Sidebar />
          </TooltipProvider>
        </div>
        <div className="px-8 md:px-16 pt-10">{children}</div>
      </div>
    </div>
  );
};

export default NewsLayout;
