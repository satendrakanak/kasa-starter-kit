type CourseModeLike = {
  mode?: string | null;
};

export const COURSE_DELIVERY_MODES = [
  {
    value: "self_learning",
    label: "Self-learning course",
    shortLabel: "Self learning",
    description:
      "Recorded lessons, downloadable resources, progress tracking, and completion certificates.",
  },
] as const;

export type CourseDeliveryMode = (typeof COURSE_DELIVERY_MODES)[number]["value"];

export function getCourseDeliveryMode(mode?: string | null): CourseDeliveryMode {
  return "self_learning";
}

export function getCourseDeliveryLabel(mode?: string | null) {
  const deliveryMode = getCourseDeliveryMode(mode);

  return (
    COURSE_DELIVERY_MODES.find((item) => item.value === deliveryMode) ??
    COURSE_DELIVERY_MODES[0]
  );
}

export function isSelfLearningCourse(course: CourseModeLike) {
  return getCourseDeliveryMode(course.mode) === "self_learning";
}

export function isFacultyLedCourse(course: CourseModeLike) {
  return false;
}

export function isBlendedCourse(course: CourseModeLike) {
  return false;
}

export function hasRecordedLearning(course: CourseModeLike) {
  return true;
}

export function hasLiveClasses(course: CourseModeLike) {
  return false;
}
