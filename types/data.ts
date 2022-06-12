export type Difficulty = "easy" | "normal" | "hard";
export type SequenceType = "exercise" | "strecth" | "break";
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