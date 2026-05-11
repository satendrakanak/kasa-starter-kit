import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from 'src/certificates/certificate.entity';
import { Course } from 'src/courses/course.entity';
import { EnrollmentsService } from 'src/enrollments/providers/enrollments.service';
import { WeeklyProgress } from 'src/user-progress/interfaces/weekly-progress.interface';
import { UserProgres } from 'src/user-progress/user-progres.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetDashboardStatsProvider {
  constructor(
    /**
     * Inject enrollmentsService
     */

    private readonly enrollmentsService: EnrollmentsService,

    /**
     * Inject userProgressRepository
     */
    @InjectRepository(UserProgres)
    private readonly userProgressRepository: Repository<UserProgres>,

  @InjectRepository(Certificate)
  private readonly certificateRepository: Repository<Certificate>,

  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>,
  ) {}

  async getDashboardStats(userId: number) {
    const [
      learningSummary,
      certificatesEarned,
    ] = await Promise.all([
      this.getLearningSummary(userId),
      this.certificateRepository.count({ where: { user: { id: userId } } }),
    ]);

    return {
      courses: learningSummary.totalCourses,
      completed: learningSummary.completedCourses,
      progress: learningSummary.averageProgress,
      examsTaken: 0,
      examsPassed: 0,
      certificatesEarned,
      learningSummary,
    };
  }

  async getWeeklyProgress(userId: number): Promise<WeeklyProgress[]> {
    const timezone = 'Asia/Kolkata';
    const completionThreshold = 100;

    const result = await this.userProgressRepository
      .createQueryBuilder('progress')
      .select([
        `TO_CHAR(timezone('${timezone}', progress.updatedAt), 'YYYY-MM-DD') as "date"`,
        `COUNT(DISTINCT progress.lectureId) as "completedLectures"`,
      ])
      .where('progress.userId = :userId', { userId })
      .andWhere('progress.progress >= :completionThreshold', {
        completionThreshold,
      })
      .andWhere(
        `timezone('${timezone}', progress.updatedAt)::date >= timezone('${timezone}', NOW())::date - INTERVAL '6 days'`,
      )
      .groupBy('"date"')
      .orderBy('"date"', 'ASC')
      .getRawMany();

    const completedByDate = new Map(
      result.map((item) => [item.date, Number(item.completedLectures) || 0]),
    );

    const totalCompletedThisWeek = result.reduce(
      (sum, item) => sum + Number(item.completedLectures || 0),
      0,
    );

    const days: WeeklyProgress[] = [];
    const today = new Date();

    for (let offset = 6; offset >= 0; offset--) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);

      const formattedDate = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);

      const completedLectures = completedByDate.get(formattedDate) ?? 0;

      days.push({
        day: new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          weekday: 'short',
        }).format(date),

        progress:
          totalCompletedThisWeek === 0
            ? 0
            : Math.round((completedLectures / totalCompletedThisWeek) * 100),
      });
    }

    return days;
  }

  private async getLearningSummary(userId: number) {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .innerJoin(
        'course.enrollments',
        'enrollment',
        'enrollment.userId = :userId AND enrollment.isActive = true',
        { userId },
      )
      .leftJoin('course.chapters', 'chapter')
      .leftJoin('chapter.lectures', 'lecture', 'lecture.isPublished = true')
      .leftJoin('lecture.progress', 'progress', 'progress.userId = :userId', {
        userId,
      })
      .select('course.id', 'courseId')
      .addSelect('course.title', 'title')
      .addSelect('course.slug', 'slug')
      .addSelect('course.mode', 'mode')
      .addSelect('COUNT(DISTINCT lecture.id)', 'totalLectures')
      .addSelect(
        `COUNT(DISTINCT CASE WHEN progress.isCompleted = true THEN lecture.id END)`,
        'completedLectures',
      )
      .where('course.isPublished = true')
      .groupBy('course.id')
      .addGroupBy('course.title')
      .addGroupBy('course.slug')
      .addGroupBy('course.mode')
      .getRawMany();

    const courseSummaries = await Promise.all(
      courses.map(async (course) => {
        const courseId = Number(course.courseId);
        const totalLectures = Number(course.totalLectures) || 0;
        const completedLectures = Number(course.completedLectures) || 0;
        const overallProgress = totalLectures
          ? Math.round((completedLectures / totalLectures) * 100)
          : 0;

        return {
          courseId,
          title: course.title,
          slug: course.slug,
          mode: 'self_learning',
          overallProgress,
          recorded: {
            enabled: true,
            totalLectures,
            completedLectures,
            progress: overallProgress,
          },
          live: {
            enabled: false,
            completedClasses: 0,
            attendedClasses: 0,
            missedClasses: 0,
            upcomingClasses: 0,
            progress: 0,
          },
        };
      }),
    );

    const totalCourses = courseSummaries.length;
    const completedCourses = courseSummaries.filter(
      (course) => course.overallProgress >= 100,
    ).length;
    const averageProgress = totalCourses
      ? Math.round(
          courseSummaries.reduce(
            (sum, course) => sum + course.overallProgress,
            0,
          ) / totalCourses,
        )
      : 0;

    return {
      totalCourses,
      completedCourses,
      averageProgress,
      recordedCourses: courseSummaries.filter((course) => course.recorded.enabled)
        .length,
      liveCourses: courseSummaries.filter((course) => course.live.enabled).length,
      upcomingLiveClasses: courseSummaries.reduce(
        (sum, course) => sum + course.live.upcomingClasses,
        0,
      ),
      completedLiveClasses: courseSummaries.reduce(
        (sum, course) => sum + course.live.completedClasses,
        0,
      ),
      attendedLiveClasses: courseSummaries.reduce(
        (sum, course) => sum + course.live.attendedClasses,
        0,
      ),
      missedLiveClasses: courseSummaries.reduce(
        (sum, course) => sum + course.live.missedClasses,
        0,
      ),
      courses: courseSummaries,
    };
  }
}
