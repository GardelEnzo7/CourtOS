import Image from "next/image";

import { MVP_CONFIG } from "@/config/mvp";

export function Logo() {
  return (
    <Image
      src="/logo.webp"
      alt={MVP_CONFIG.name}
      className="rounded-full"
      width={90}
      height={90}
      preload
    />
  );
}
