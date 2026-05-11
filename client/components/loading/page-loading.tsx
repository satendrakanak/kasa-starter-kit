import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

type LoadingVariant = "website" | "admin" | "profile" | "learning" | "auth";

type PageLoadingProps = {
  variant?: LoadingVariant;
};

export function PageLoading({ variant = "website" }: PageLoadingProps) {
  if (variant === "admin") return <AdminLoading />;
  if (variant === "learning") return <LearningLoading />;
  if (variant === "auth") return <AuthLoading />;
  if (variant === "profile") return <ProfileLoading />;

  return <WebsiteLoading />;
}

function WebsiteLoading() {
  return (
    <div className="min-h-[70vh] bg-background">
      <section className="relative overflow-hidden border-b bg-muted/30 py-12">
        <Container>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-5 h-10 w-full max-w-2xl" />
          <Skeleton className="mt-4 h-4 w-full max-w-3xl" />
          <Skeleton className="mt-2 h-4 w-2/3 max-w-xl" />
        </Container>
      </section>

      <Container className="py-8">
        <CourseGridSkeleton />
      </Container>
    </div>
  );
}

function ProfileLoading() {
  return (
    <Container className="py-8">
      <div className="grid gap-5 md:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    </Container>
  );
}

function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-32" />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>

      <div className="rounded-lg border bg-card">
        <div className="border-b p-4">
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="space-y-3 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

function LearningLoading() {
  return (
    <div className="grid min-h-screen gap-0 bg-background lg:grid-cols-[320px_1fr]">
      <aside className="hidden border-r bg-muted/30 p-4 lg:block">
        <Skeleton className="h-8 w-44" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </aside>

      <main className="p-4 md:p-6">
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="mt-6 space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </main>
    </div>
  );
}

function AuthLoading() {
  return (
    <div className="grid min-h-screen place-items-center bg-muted/30 p-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <Skeleton className="mx-auto h-10 w-36" />
        <Skeleton className="mt-8 h-8 w-52" />
        <Skeleton className="mt-3 h-4 w-full" />
        <div className="mt-8 space-y-4">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    </div>
  );
}

function CourseGridSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border bg-card shadow-sm"
        >
          <Skeleton className="aspect-video w-full rounded-none" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
