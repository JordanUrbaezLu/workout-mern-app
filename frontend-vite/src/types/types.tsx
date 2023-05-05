export type Workout = {
  createdAt: string;
  load: number;
  reps: number;
  title: string;
  updatedAt: string;
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
