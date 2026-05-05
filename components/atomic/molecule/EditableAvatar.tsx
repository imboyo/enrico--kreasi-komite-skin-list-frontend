"use client";

import { Icon } from "@iconify/react";
import React, { useRef } from "react";
import { cn } from "libs/util/cn";

export interface EditableAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string | null;
  onImageChange?: (file: File) => void;
  size?: number;
}

export function EditableAvatar({
  imageUrl,
  onImageChange,
  size = 120,
  className,
  ...props
}: EditableAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div 
      className={cn("relative inline-block", className)} 
      style={{ width: size, height: size }}
      {...props}
    >
      <div 
        className="overflow-hidden rounded-full border-4 border-background bg-zinc-200 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {imageUrl ? (
          <img
            src={imageUrl} 
            alt="Profile Avatar" 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400">
            <Icon icon="mdi:account" width={size / 2} height={size / 2} />
          </div>
        )}
      </div>
      
      {onImageChange && (
        <>
          <button
            onClick={handleEditClick}
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-zinc-900 text-white transition-transform hover:scale-105 active:scale-95"
            aria-label="Edit profile photo"
            type="button"
          >
            <Icon icon="mdi:camera" width={20} height={20} />
          </button>
          <input 
            type="file" 
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
