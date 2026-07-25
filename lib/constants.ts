// Cross-cutting constants: CTA destinations on the app host, current pricing.
// Source of truth: knowlagebase.md in the revii-foundation repo root.

export const APP_HOST = "https://panel.reviw.app";

export const CTA_URLS = {
  register: `${APP_HOST}/register`,
  login: `${APP_HOST}/login`,
} as const;

// Both plans: 2 months free when billed annually (annual price = 10x monthly).
// Both trials require a credit card up front — never claim otherwise in copy.
export const PRICING = {
  business: {
    monthly: { price: "$19", period: "/mo" },
    yearly: { price: "$190", period: "/yr", effectiveMonthly: "$15.83" },
    trialDays: 7,
  },
  agency: {
    monthly: { price: "$67", period: "/mo" },
    yearly: { price: "$670", period: "/yr", effectiveMonthly: "$55.83" },
    trialDays: 14,
    includedLocations: 15,
    extraLocationPrice: "$5/mo",
  },
} as const;
