"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Heart, Github, Instagram, Mail, MessageCircle, Globe } from "lucide-react"

export function Footer() {
  const t = useTranslations('footer')

  const footerLinks = [
    { name: t('privacy'), href: "/privacy" },
    { name: t('contact'), href: "/about" },
    { name: t('terms'), href: "/terms" },
  ]

  const socials = [
    {
      icon: MessageCircle,
      href: "https://wa.me/32466161289",
      label: "WhatsApp",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/iom._.moi",
      label: "Instagram",
    },
    {
      icon: Github,
      href: "https://github.com/MohamedAlakhaly",
      label: "GitHub",
    },
    {
      icon: Mail,
      href: "mailto:alakhail755@gmail.com",
      label: "Email",
      
    },
     {
    icon: Globe,
    href: "https://www.alakhali.be/",
    label: "Website",
  },
  ]

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  }

  return (
    <footer className="border-t border-border bg-[#0F0F0F] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 pb-24 sm:pb-16 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >

          {/* Logo */}
          <motion.div variants={item} className="flex flex-col items-center gap-3">
            <Link href="/" className="group">
              <motion.span
                className="font-serif text-2xl font-bold text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                The Waiting Room
              </motion.span>
            </Link>
            <p className="text-center text-sm text-muted-foreground max-w-md leading-relaxed">
              {t('tagline')}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div variants={item} className="w-full max-w-xs">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>

          {/* Links */}
          <motion.nav variants={container} className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <motion.div key={link.href} variants={item}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div variants={item} className="w-full">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>

          {/* Copyright */}
          <motion.p
            variants={item}
            className="flex items-center gap-1.5 text-center text-xs text-muted-foreground"
          >
            © {new Date().getFullYear()} The Waiting Room.
            <span>{t('rights')}</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="h-3 w-3 text-primary fill-primary" />
            </motion.span>
          </motion.p>

        </motion.div>
      </div>
    </footer>
  )
}