import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { Workout } from "../types/types";
import WorkoutFormModal from "../components/WorkoutFormModal";
import { Button } from "void-ui-library";

const Home: React.FC = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const URL = "http://localhost:4000/api/workouts";
      // this is where the frontend will hit the REST API
      const response = await fetch(URL);

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout: Workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
      <Button>Hello</Button>
      <WorkoutFormModal method="POST"/>
    </div>
  );
};

export default Home;
