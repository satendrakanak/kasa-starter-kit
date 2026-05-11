import { userServerService } from "@/services/users/user.server";
import { getSession } from "@/lib/auth";
import { Course } from "@/types/course";
import DashboardClient from "@/components/profile/dashboard-client";
import { DashboardStats, WeeklyProgress } from "@/types/user";
import { getErrorMessage } from "@/lib/error-handler";
import { orderServerService } from "@/services/orders/order.server";
import { Order } from "@/types/order";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;
  let stats: DashboardStats = {
    courses: 0,
    completed: 0,
    progress: 0,
    examsTaken: 0,
    examsPassed: 0,
    certificatesEarned: 0,
    learningSummary: undefined,
  };
  let courses: Course[] = [];
  let weeklyProgress: WeeklyProgress[] = [];
  let orders: Order[] = [];

  try {
    const [
      statsRes,
      coursesRes,
      weeklyProgressRes,
      ordersRes,
    ] =
      await Promise.all([
        userServerService.getDashboardStats(session.id),
        userServerService.getEnrolledCourses(session.id),
        userServerService.getWeeklyProgress(session.id),
        orderServerService.getMine(),
      ]);

    stats = statsRes.data;
    courses = coursesRes.data;
    weeklyProgress = weeklyProgressRes.data;
    orders = ordersRes.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome back 👋
        </h2>

        <p className="text-sm text-muted-foreground">
          Keep learning and track your progress
        </p>
      </div>

      <DashboardClient
        stats={stats}
        courses={courses}
        weeklyProgress={weeklyProgress}
        orders={orders}
        user={session}
      />
    </div>
  );
}
