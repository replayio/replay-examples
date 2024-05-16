import React, { useState } from "react";
import { useAtom } from "jotai";
import { addTodoAtom } from "../atoms";

export const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const [, addTodo] = useAtom(addTodoAtom);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <input
      className="w-full outline-none py-1"
      placeholder="New To-Do"
      value={newTodo}
      data-test="new-todo"
      onChange={(e) => setNewTodo(e.target.value)}
      onKeyUp={handleSubmit}
    />
  );
};
