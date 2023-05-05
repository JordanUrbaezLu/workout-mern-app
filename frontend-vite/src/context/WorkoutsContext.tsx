import * as React from "react";
import { Action, State, Workout } from "../types/types";

export type WorkoutsContextType = {
  workouts: Workout[];
  dispatch: React.Dispatch<Action>;
};

export const WorkoutsContext = React.createContext<
  WorkoutsContextType | undefined
>(undefined);

export const workoutsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout: Workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

interface WorkoutsContextProps {
  children?: React.ReactNode;
}

export const WorkoutsContextProvider: React.FC<WorkoutsContextProps> = (
  props
) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(workoutsReducer, {
    workouts: null,
  });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
