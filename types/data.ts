export type Difficulty = "easy" | "normal" | "hard";
export type SequenceType = "exercise" | "strecth" | "break";
export type ExerciseFormData = {
    name: string,
    duration: string,
    reps?: string,
    type: string
}
export interface SequenceItem {
    slug: string,
    name: string,
    duration: number,
    reps?: number,
    type: SequenceType
}
export interface Workout {
    slug: string,
    name: string,
    duration: number,
    difficulty: Difficulty,
    sequence: Array<SequenceItem>
}

export type WorkoutFormData = {
    name: string
  }