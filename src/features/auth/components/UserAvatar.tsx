"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

type UserAvatarProps = {
  name: string;
  image?: string | null;
  size: number;
  className?: string;
};

export default function UserAvatar({ name, image, size, className }: UserAvatarProps) {
  const [hasFailed, setHasFailed] = useState(false);

  if (!image || hasFailed) {
    return (
      <span
        style={{ width: size, height: size }}
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-mint font-heading ring-1 ring-foreground/20",
          className,
        )}
      >
        {name.slice(0, 1)}
      </span>
    );
  }

  return (
    <Image
      src={image}
      alt={name}
      width={size}
      height={size}
      unoptimized
      referrerPolicy="no-referrer"
      onError={() => setHasFailed(true)}
      className={cn("shrink-0 rounded-full ring-1 ring-foreground/20", className)}
    />
  );
}