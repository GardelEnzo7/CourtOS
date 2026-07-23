import Image from "next/image";

import { CLUB_CONFIG } from "@/config/club";

export function Logo() {
  return (
    <Image
      src="/logo.webp"
      alt={`Logo de ${CLUB_CONFIG.name}`}
      className="rounded-full"
      width={90}
      height={90}
      preload
    />
  );
}
