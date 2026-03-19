import { useState, useEffect } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "The Driver", href: "#driver" },
  { label: "Career", href: "#career" },
  { label: "Gallery", href: "#gallery" },
  { label: "Life", href: "#life" },
  { label: "News", href: "#news" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <a href="#" className="font-display font-black text-2xl tracking-tighter">
            <span className={scrolled ? "text-foreground" : "text-primary-foreground"}>
              CL
            </span>
            <span className={scrolled ? "text-primary" : "text-primary-foreground"}>
              16
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link hover:text-primary ${
                  scrolled ? "text-foreground" : "text-primary-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/charles_leclerc/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              <Instagram size={18} />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden transition-colors ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-foreground flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-display text-3xl text-primary-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
