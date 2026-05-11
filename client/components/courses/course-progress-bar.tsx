"use client";

import Link from "next/link";

interface CourseProgressBarProps {
  percent: number;
  slug: string;
  mode?: string | null;
}

export function CourseProgressBar({ percent, slug }: CourseProgressBarProps) {
  const label = percent > 0 ? "Continue Learning →" : "Start Learning →";

  return (
    <div className="mt-auto space-y-3 ">
      <div>
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <Link href={`/course/${slug}/learn`}>
        <span className="text-sm font-medium text-primary">
          {label}
        </span>
      </Link>
    </div>
  );
}
