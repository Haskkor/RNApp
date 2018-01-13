export type Set = {
  reps: number,
  weight: number
}

export type ExerciseSet = {
  muscleGroup: string
  exercise: ExerciseMuscle
  sets: Set[]
}
export type MuscleGroups = {
  muscle: string,
  exercises: ExerciseMuscle[]
}

export type ExerciseMuscle = {
  name: string,
  equipment: string
}