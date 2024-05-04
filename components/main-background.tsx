import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

export const MainBackground = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div
      className="
            absolute
            flex
            items-center
            justify-center
            w-full
            h-full
            inset-0
            z-0
            
        "
    >
      <Image
        src="/images/space-background.webp"
        fill
        // objectFit="cover"
        className="object-cover aspect-video  w-full h-full"
        alt="main-background"
      />
    </div>
  );
};
