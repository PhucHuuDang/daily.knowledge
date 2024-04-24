import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "../_components/side-bar";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className=" pr-4 max-w-6xl 2xl:max-w-screen bg-white overflow-hidden ">
    <div className=" 2xl:max-w-screen  ">
      <div className="flex  ">
        <div className="w-auto shrink-0 md:block hidden ">
          <TooltipProvider>
            <Sidebar />
          </TooltipProvider>
        </div>
        <div className="pt-20 md:pt-24 w-full ">{children}</div>
      </div>
    </div>
  );
};

export default NewsLayout;
