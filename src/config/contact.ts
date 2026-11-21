export type SocialNetwork = "Instagram" | "Facebook" | "LinkedIn" | "TikTok" | "X";

export interface SocialLink {
  network: SocialNetwork;
  url: string | null;
}

export const agencyContact = {
  address: "Dokui, Abobo, Abidjan",
  phone: "+2250779917447",
  email: "dbaliguini@gmail.com",
  whatsappNumber: "+23672380384",
  hours: null as string | null,
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
