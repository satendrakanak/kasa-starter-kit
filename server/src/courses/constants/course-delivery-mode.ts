export const CourseDeliveryMode = {
  SelfLearning: 'self_learning',
} as const;

export type CourseDeliveryMode =
  (typeof CourseDeliveryMode)[keyof typeof CourseDeliveryMode];

export const COURSE_DELIVERY_MODE_VALUES = Object.values(CourseDeliveryMode);

export function getCourseDeliveryMode(mode?: string | null): CourseDeliveryMode {
  return CourseDeliveryMode.SelfLearning;
}

export function hasRecordedLearning(mode?: string | null) {
  return true;
}

export function hasLiveClasses(mode?: string | null) {
  return false;
}
