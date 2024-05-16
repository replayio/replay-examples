import React from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../types";

type Props = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, deleteTodo }) => {
  return (
    <ul data-test-todo-list>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
};
