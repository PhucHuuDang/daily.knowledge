import Maps from "@/components/maps";
import { Suspense } from "react";
import LoadingMapsPage from "./loading";

const MapsPage = () => {
  return (
    <div className="2xl:max-w-screen pt-20">
      <Maps />
    </div>
  );
};

export default MapsPage;
