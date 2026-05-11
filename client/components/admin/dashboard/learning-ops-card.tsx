"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, FileClock } from "lucide-react";

import type { AdminDashboardData } from "@/types/admin-dashboard";

export function LearningOpsCard({ data }: { data: AdminDashboardData }) {
  const items = [
    {
      label: "Self-learning courses",
      value: data.learningOps.selfLearningCourses,
      href: "/admin/courses",
      icon: BookOpen,
    },
    {
      label: "Published",
      value: data.learningOps.publishedCourses,
      href: "/admin/courses",
      icon: CheckCircle2,
    },
    {
      label: "Drafts",
      value: data.learningOps.draftCourses,
      href: "/admin/courses",
      icon: FileClock,
    },
  ];

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Learning operations
          </p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">
            Self-learning library
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Starter kit courses use recorded lessons, resources, learner
            progress, and certificates.
          </p>
        </div>
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          Manage <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-xl border bg-background p-4 transition hover:border-primary/40 hover:bg-primary/5"
          >
            <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="size-4" />
            </div>
            <p className="text-2xl font-semibold">{item.value}</p>
            <p className="text-sm text-muted-foreground">{item.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
