import { Instagram } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/charles_leclerc/" },
  { label: "TikTok", href: "https://www.tiktok.com/@charlesleclerc" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCIzIX1qgW7P3eF6JCk_afCA" },
  { label: "Twitch", href: "https://www.twitch.tv/charlesleclerc" },
  { label: "X", href: "https://x.com/Charles_Leclerc" },
];

const FooterSection = () => {
  return (
    <footer className="bg-foreground section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <p className="font-display font-black text-5xl text-primary-foreground tracking-tighter">
              CL<span className="text-primary">16</span>
            </p>
            <p className="font-body text-primary-foreground/50 text-sm mt-4 max-w-sm">
              Fan tribute site celebrating the career and journey of one of 
              Formula 1's most talented drivers.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-display text-xs text-primary tracking-[0.3em] mb-2">
              Follow
            </p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-primary-foreground/60 text-sm hover:text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-display text-xs text-primary tracking-[0.3em] mb-2">
              Navigate
            </p>
            {["The Driver", "Career", "Gallery", "Life"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                className="font-body text-primary-foreground/60 text-sm hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-primary-foreground/30 text-xs">
            © 2025 Fan Tribute. Not affiliated with Charles Leclerc or Ferrari.
          </p>
          <p className="font-body text-primary-foreground/30 text-xs">
            Built with passion for motorsport
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
