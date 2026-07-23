import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/logo.webp"
      alt="Logo de Lavalle Pádel"
      className="rounded-full"
      width={90}
      height={90}
      preload
    />
  );
}
