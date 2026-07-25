"use client";

import { FinalCTA } from "@/components/marketing/sections/FinalCTA";
import { useTranslations } from "@/lib/i18n";

// Thin wrapper so /for-agencies/page.tsx (a server component) doesn't need
// its own "use client" + useTranslations just to resolve three strings —
// FinalCTA itself takes resolved text, not translation keys.
export function AgencyFinalCTA() {
  const { t } = useTranslations();

  return (
    <FinalCTA
      title={t("agencyPage.finalCta.title")}
      subtitle={t("agencyPage.finalCta.subtitle")}
      secondaryLabel={t("agencyPage.finalCta.secondary")}
      trust={t<string[]>("agencyPage.finalCta.trust")}
      mascotSrc="https://gpagwuhcgnxmbjgenogr.supabase.co/storage/v1/object/public/general-assets/mascot/reviw-money.png"
    />
  );
}
