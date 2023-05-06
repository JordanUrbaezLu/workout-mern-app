import * as React from "react";

export type Method = "GET" | "POST" | "DELETE" | "PATCH";

export interface WorkoutFormModalProps {
  method: Method;
}

const WorkoutFormModal: React.FC<WorkoutFormModalProps> = (props) => {
  const { method } = props;

  return <div>{method}</div>;
};

export default WorkoutFormModal;
