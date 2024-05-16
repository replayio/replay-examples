import React, { useState } from "react";
import { Todo } from "../types";
import { useAtom } from "jotai";
import { completeTodoAtom, editTodoAtom, updatingAtom } from "../atoms";
import { Close } from "./icons/Close";

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, deleteTodo }) => {
  const [, completeTodo] = useAtom(completeTodoAtom);
  const [, editTodo] = useAtom(editTodoAtom);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [updating] = useAtom(updatingAtom);

  const handleComplete = (todo: Todo) => {
    completeTodo(todo);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (todoId: Todo["id"], editedTitle: Todo["title"]) => {
    editTodo({ title: editedTitle, id: todoId });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  return (
    <li
      data-test="todo-item"
      className="flex justify-between items-center bg-slate-100 rounded-md px-2 py-1 my-1.5 hover:bg-slate-200 cursor-pointer w-full"
    >
      <div className="flex items-center w-full">
        <input
          data-test="todo-complete"
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleComplete(todo)}
          className="mr-2"
        />
        {editing ? (
          <input
            data-test="todo-edit-field"
            type="text"
            value={editedTitle}
            onChange={handleChange}
            onBlur={() => handleSave(todo.id, editedTitle)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSave(todo.id, editedTitle);
              } else if (event.key === "Escape") {
                handleCancel();
              }
            }}
            autoFocus
            className="outline-none bg-transparent text-lg flex-grow"
          />
        ) : (
          <p
            className={`text-gray-800 text-lg flex-grow ${
              todo.completed ? "line-through	" : ""
            }`}
            onClick={handleEdit}
          >
            {todo.title}
          </p>
        )}
        {!updating && (
          <Close
            className="fill-slate-600 ml-2 delete"
            data-test="todo-delete"
            onClick={() => deleteTodo(todo.id)}
          />
        )}
      </div>
    </li>
  );
};
