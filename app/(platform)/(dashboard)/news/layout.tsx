import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "../_components/side-bar";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className=" pr-4 max-w-6xl 2xl:max-w-screen bg-white overflow-hidden ">
    <div className=" 2xl:max-w-screen  ">
      <div className="flex  ">
        <TooltipProvider>
          <div className="w-auto shrink-0 md:block hidden ">
            <Sidebar />
          </div>
          <div className="pt-14 w-full h-full 2xl:h-screen overflow-y-auto">
            {children}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default NewsLayout;
