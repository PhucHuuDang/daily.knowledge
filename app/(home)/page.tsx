import { LibraryBig } from "lucide-react";
import { MacbookScrollHome } from "./_components/macbook-scroll-home";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center  flex-col mb-4">
        <LibraryBig className="h-24 w-24 mb-4" />
        <h1 className="text-4xl font-semibold">Where I can</h1>
        <h2 className="text-5xl font-bold text-amber-700 ">remind knowledge</h2>
      </div>
      <MacbookScrollHome />
    </div>
  );
};

export default HomePage;
