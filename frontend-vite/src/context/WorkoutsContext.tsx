import * as React from "react";

export const WorkoutsContext = React.createContext<any>(null);

type Action = {
  type: "SET_WORKOUTS" | "CREATE_WORKOUT" | "DELETE_WORKOUT";
  payload: any;
};

export const workoutsReducer = (state: any, action: Action) => {
  console.log(state.type, action.type);
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
          (w: any) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

interface WorkoutsContextProps {
  children?: React.ReactNode;
}

export const WorkoutsContextProvider = ({ children }: WorkoutsContextProps) => {
  const [state, dispatch] = React.useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
