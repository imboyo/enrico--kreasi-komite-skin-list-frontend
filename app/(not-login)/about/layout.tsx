import { Icon } from "@iconify/react";
import React from "react";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div className="flex items-center justify-center pb-4">
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Icon
            icon="material-symbols:spa-outline-rounded"
            width={14}
            height={14}
            className="text-orange-500"
          />
          Skin List · v1.0
        </span>
      </div>
    </>
  );
}
