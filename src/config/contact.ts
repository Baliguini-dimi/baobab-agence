export type SocialNetwork = "Instagram" | "Facebook" | "LinkedIn" | "TikTok" | "X";

export interface SocialLink {
  network: SocialNetwork;
  url: string | null;
}

export const agencyContact = {
  address: "Dokui, Abobo, Abidjan",
  phone: "+2250779917447",
  phoneDisplay: "+225 07 79 91 74 47",
  email: "dbaliguini@gmail.com",
  whatsappNumber: "+23672380384",
  latitude: 5.4040088,
  longitude: -4.0008089,
  socialLinks: [
    { network: "Facebook", url: null },
    { network: "Instagram", url: null },
    { network: "LinkedIn", url: null },
    { network: "TikTok", url: null },
    { network: "X", url: null },
  ] as SocialLink[],
};

export const openingHours = {
  weekdays: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
  saturday: { days: ["Saturday"], opens: "08:00", closes: "12:00" },
} as const;

export function getMapDestination() {
  if (agencyContact.latitude !== null && agencyContact.longitude !== null) {
    return `${agencyContact.latitude},${agencyContact.longitude}`;
  }
  return agencyContact.address;
}

export function getWhatsAppUrl() {
  const digits = agencyContact.whatsappNumber?.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}
