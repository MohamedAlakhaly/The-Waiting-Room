"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getStories } from "@/lib/stories";

const COLORS = [
  "bg-blue-500/10 text-blue-400",
  "bg-emerald-500/10 text-emerald-400",
  "bg-amber-500/10 text-amber-400"
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function LatestVoices() {
  const t = useTranslations("latestVoices");
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await getStories();
      // خذ آخر 3 قصص فقط
      setStories((data || []).slice(0, 3));
      setLoading(false);
    };
    fetchStories();
  }, []);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {t("label")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/stories"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-5 h-48 animate-pulse"
              />
            ))}
          </div>
        ) : stories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-border bg-card p-12 text-center"
          >
            <p className="text-4xl mb-4">✍️</p>
            <p className="text-sm text-muted-foreground">{t("noStories")}</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {stories.map((story, index) => {
              const color = COLORS[index % COLORS.length];
              const isAnonymous = story.is_anonymous;
              const name = story.display_name || "";
              const initials = name
                ? name
                    .trim()
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2)
                : "";

              return (
                <motion.div
                  key={story.id}
                  variants={cardVariant}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 40px rgba(201, 241, 78, 0.08)",
                    borderColor: "rgba(201, 241, 78, 0.3)"
                  }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 cursor-default"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${color}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {isAnonymous ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-medium">{initials}</span>
                      )}
                    </motion.div>
                    {story.previous_country && (
                      <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border capitalize">
                        {story.previous_country} → BE
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {isAnonymous ? t("anonymous") : name}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed italic line-clamp-3">
                      "{story.content}"
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground flex-1">
                      {story.years_in_belgium && (
                        <>
                          <Clock className="h-3.5 w-3.5" />
                          {story.years_in_belgium} {t("yearsInBE")}
                        </>
                      )}
                    </span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/stories/${story.id}`}
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
                      >
                        {t("readStory")}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Mobile link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 text-center sm:hidden"
        >
          <Link
            href="/stories"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            {t("viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
