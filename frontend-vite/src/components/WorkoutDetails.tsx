import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Workout } from "../types/types";

export interface WorkoutDetailsProps {
  workout: Workout;
}

const WorkoutDetails: React.FC<WorkoutDetailsProps> = (props) => {
  const { workout } = props;
  const { dispatch } = useWorkoutsContext();

  const dateAddedLabel = `Added ${formatDistanceToNow(
    new Date(workout.createdAt),
    {
      addSuffix: true,
    }
  )}`;

  const handleClick = async () => {
    const URL = "http://localhost:4000/api/workouts/";
    const response = await fetch(URL + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.name}</h4>
      <p>
        <strong>Weight: </strong>
        {workout.weight} lbs
      </p>
      <p>
        <strong>Sets: </strong>
        {workout.sets}x
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}x
      </p>
      <p>{dateAddedLabel}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
