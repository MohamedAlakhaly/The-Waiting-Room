import Link from "next/link"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations('footer')

  const footerLinks = [
    { name: t('privacy'), href: "/privacy" },
    { name: t('contact'), href: "/contact" },
    { name: t('terms'), href: "/terms" },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl font-bold text-foreground">
            The Waiting Room
          </Link>

          {/* Tagline */}
          <p className="text-center text-sm text-muted-foreground">
            {t('tagline')}
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} The Waiting Room. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
