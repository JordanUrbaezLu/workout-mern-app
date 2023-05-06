export type Workout = {
  createdAt: string;
  name: string;
  reps: number;
  sets: number;
  updatedAt: string;
  weight: number;
  __v: number;
  _id: number;
};

export type Action = {
  type: "SET_WORKOUTS" | "CREATE_WORKOUT" | "DELETE_WORKOUT";
  payload: any;
};

export type State = {
  workouts: Workout[];
};
