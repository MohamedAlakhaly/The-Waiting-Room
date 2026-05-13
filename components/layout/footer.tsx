import Link from "next/link"

const footerLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Contact Support", href: "/contact" },
  { name: "Terms of Service", href: "/terms" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl font-bold text-foreground">
            Voice For All
          </Link>

          {/* Tagline */}
          <p className="text-center text-sm text-muted-foreground">
            Empowering migrants in legal limbo to participate in the civic journey through storytelling and advocacy.
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Civic Advocacy Initiative. All voices matter.
          </p>
        </div>
      </div>
    </footer>
  )
}
