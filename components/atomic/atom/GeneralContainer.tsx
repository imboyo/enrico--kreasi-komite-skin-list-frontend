import {ReactNode} from "react";
import {cn} from "libs/util/cn";

interface GeneralContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Responsive container that works across mobile, tablet, and desktop.
 * Centers content on large screens and provides base padding for all viewports.
 */
export default function GeneralContainer({children, className}: GeneralContainerProps) {
  return (
    <div className="relative isolate min-h-screen w-full bg-background">
      <div
        className={cn(
          "mx-auto flex min-h-screen w-full max-w-125 flex-col px-4 py-4 sm:max-w-160 md:max-w-3xl lg:max-w-240 xl:max-w-7xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
