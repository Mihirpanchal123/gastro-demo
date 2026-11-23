"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { nav } from "@/lib/site";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Lumen Digestive Care home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-mint to-teal">
        <span className="h-3.5 w-3.5 rounded-full border-2 border-ink" />
      </span>
      <span className={`leading-none ${light ? "text-white" : "text-ink"}`}>
        <span className="block text-[15px] font-semibold tracking-tight">Lumen</span>
        <span className={`block text-[11px] ${light ? "text-white/60" : "text-ink/55"}`}>Digestive Care</span>
      </span>
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setOpen(false);
    setExpanded(null);
  };

  const isActive = (href: string, children?: { href: string }[]) =>
    pathname === href ||
    (href !== "/" && pathname.startsWith(href + "/")) ||
    !!children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));

  return (
    <header className="fixed inset-x-0 top-8 z-50 px-4 sm:px-6 print:hidden">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5 ${
          scrolled || open ? "glass bg-ink/80 shadow-2xl shadow-black/20" : "bg-transparent"
        }`}
      >
        <Logo />

        {/* Desktop menu */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active = isActive(item.href, item.children);
            const wide = (item.children?.length ?? 0) > 5;
            return (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition hover:bg-white/10 hover:text-white ${
                    active ? "text-mint" : "text-white/75"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 transition group-hover:rotate-180 group-focus-within:rotate-180" />
                  )}
                </Link>

                {item.children && (
                  <div
                    className={`invisible absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${
                      wide ? "w-[36rem]" : "w-72"
                    }`}
                  >
                    <div className={`rounded-2xl border border-ink/5 bg-white p-2 text-ink shadow-2xl shadow-black/25 ${wide ? "grid grid-cols-2 gap-1" : ""}`}>
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`block rounded-xl px-4 py-3 transition hover:bg-mist ${pathname === c.href ? "bg-mist" : ""}`}
                        >
                          <span className="block text-sm font-medium">{c.label}</span>
                          {c.hint && <span className="mt-0.5 block text-xs text-ink/50">{c.hint}</span>}
                        </Link>
                      ))}
                      {wide && (
                        <Link
                          href={item.href}
                          className="col-span-2 mt-1 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-sm text-white hover:bg-teal"
                        >
                          View all treatments <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className="group hidden items-center gap-1.5 rounded-full bg-mint px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-white sm:flex"
          >
            Book visit
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            onClick={() => (open ? closeMenu() : setOpen(true))}
            className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-auto mt-2 max-h-[75vh] max-w-7xl overflow-y-auto rounded-2xl bg-ink/95 p-3 lg:hidden">
          <Link href="/" onClick={closeMenu} className="block rounded-xl px-4 py-3 text-white/85 hover:bg-white/10">
            Home
          </Link>
          {nav.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                  aria-expanded={expanded === item.label}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-white/85 hover:bg-white/10"
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition ${expanded === item.label ? "rotate-180" : ""}`} />
                </button>
                {expanded === item.label && (
                  <div className="mb-2 ml-4 border-l border-white/10 pl-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={closeMenu}
                        className="block rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 text-white/85 hover:bg-white/10"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/book"
            onClick={closeMenu}
            className="mt-2 block rounded-xl bg-mint px-4 py-3 text-center font-medium text-ink"
          >
            Book visit
          </Link>
        </div>
      )}
    </header>
  );
}
