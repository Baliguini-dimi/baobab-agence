import type { SocialLink, SocialNetwork } from "@/config/contact";

const labels: Record<SocialNetwork, string> = {
  Instagram: "Instagram",
  Facebook: "Facebook",
  LinkedIn: "LinkedIn",
  TikTok: "TikTok",
  X: "X",
};

function Mark({ network }: { network: SocialNetwork }) {
  if (network === "Instagram") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.7" r="1" fill="currentColor"/></svg>;
  if (network === "Facebook") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13H10v8h3.4Z"/></svg>;
  if (network === "LinkedIn") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M5.2 8.4a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM3.6 10h3.2v10H3.6V10Zm5.2 0h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.8V20h-3.2v-4.9c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6V20H8.8V10Z"/></svg>;
  if (network === "TikTok") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M14 3h3c.2 1.7 1.2 3.1 3 3.7v3.1a8.3 8.3 0 0 1-3-1v6.3a5.6 5.6 0 1 1-5.6-5.6c.4 0 .8 0 1.2.1v3.2a2.5 2.5 0 1 0 1.4 2.2V3Z"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3L12 14.9 6.6 21H3.4l7.3-8.4L2.8 3h6.5l4.5 5.9L18.9 3Zm-1.1 16h1.7L8.3 4.9H6.5L17.8 19Z"/></svg>;
}

export function SocialLinks({ links, label, className = "" }: { links: SocialLink[]; label: string; className?: string }) {
  return <div aria-label={label} className={`flex items-center gap-3 ${className}`} role="group">{links.map((link) => {
    const icon = <Mark network={link.network} />;
    return link.url
      ? <a aria-label={labels[link.network]} className="social-icon" href={link.url} key={link.network} rel="noreferrer" target="_blank">{icon}</a>
      : <span aria-label={`${labels[link.network]} — URL à renseigner`} className="social-icon social-icon-placeholder" key={link.network} title={`${labels[link.network]} — URL à renseigner`}>{icon}</span>;
  })}</div>;
}
