import Image from "next/image";

const REVIW_LOGO_URL =
  "https://gpagwuhcgnxmbjgenogr.supabase.co/storage/v1/object/public/general-assets/reviw-logo.png";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Image
      src={REVIW_LOGO_URL}
      alt="Reviw"
      width={compact ? 80 : 112}
      height={compact ? 20 : 28}
      priority
      className={`${compact ? "h-5" : "h-7"} w-auto dark:brightness-0 dark:invert`}
    />
  );
}
