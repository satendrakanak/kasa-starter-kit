"use client";

import { BookOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/course";

type CourseModeFormProps = {
  course: Course;
};

export function CourseModeForm(_props: CourseModeFormProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(11,18,32,0.96),rgba(17,27,46,0.98))]">
      <div className="border-b border-slate-100 px-4 py-3 dark:border-white/10">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-medium text-slate-900 dark:text-white">
            Delivery Mode
          </h3>
          <Badge variant="outline">Starter</Badge>
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          kasa-starter-kit ships self-learning courses only.
        </p>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/10 p-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">Self learning</span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              Recorded lessons, PDF/file attachments, progress tracking, and
              completion certificates.
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
