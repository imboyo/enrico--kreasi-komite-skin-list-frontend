import {ReactNode} from "react";
import {cn} from "@/util/cn";
import MobileContainerBackdrop from "@/components/atomic/atom/MobileContainerBackdrop";

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export default function MobileContainer({children, className}: MobileContainerProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden sm:bg-[#d0d4da]">
      <MobileContainerBackdrop/>

      {/* px-4 py-4 removed — each page/section controls its own padding */}
      <div
        className={cn(
          "relative min-h-screen w-full bg-background sm:mx-auto sm:max-w-125 sm:shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_24px_60px_rgba(63,70,79,0.18)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
