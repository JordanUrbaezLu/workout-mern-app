import * as React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm: React.FC = () => {
  const { dispatch } = useWorkoutsContext();

  const [name, setName] = React.useState<string>("");
  const [sets, setSets] = React.useState<string>("");
  const [weight, setWeight] = React.useState<string>("");
  const [reps, setReps] = React.useState<string>("");
  const [error, setError] = React.useState<any>(null);
  const [emptyFields, setEmptyFields] = React.useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const workout = { name, sets, weight, reps };

    const URL = "http://localhost:4000/api/workouts";

    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setName("");
      setSets("");
      setWeight("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Workout:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields?.includes("name") ? "error" : ""}
      />

      <label>Weight (in lbs):</label>
      <input
        type="number"
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
        className={emptyFields?.includes("weight") ? "error" : ""}
      />

      <label>Sets:</label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        className={emptyFields?.includes("sets") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields?.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
