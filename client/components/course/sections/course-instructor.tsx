"use client";

import Image from "next/image";
import { BookOpen, Star, UserRound } from "lucide-react";

import { Course } from "@/types/course";

interface CourseInstructorProps {
  course: Course;
}

export const CourseInstructor = ({ course }: CourseInstructorProps) => {
  const instructor = course.updatedBy || course.createdBy;
  const name =
    `${instructor?.firstName || ""} ${instructor?.lastName || ""}`.trim() ||
    "Course Instructor";
  const avatar = instructor?.avatar?.path || "/assets/default.png";

  return (
    <section className="academy-card p-5 md:p-6">
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-card-foreground">
          Instructor
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Basic instructor details shown for this self-learning course.
        </p>
      </div>

      <article className="group relative overflow-hidden rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-300 hover:border-primary/25 hover:bg-primary/5 md:p-5">
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-start">
          <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-3xl border-4 border-card bg-muted shadow-[0_14px_36px_rgba(15,23,42,0.12)] ring-1 ring-primary/10 md:mx-0">
            <Image
              src={avatar}
              alt={name}
              fill
              sizes="112px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0 flex-1 text-center md:text-left">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-card-foreground">
                {name}
              </h3>

              <p className="mt-1 text-sm font-semibold text-primary">
                Course Instructor
              </p>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-medium text-muted-foreground md:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                Self-learning course
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                Recorded lessons
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
                <UserRound className="h-3.5 w-3.5 text-primary" />
                Instructor info
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
