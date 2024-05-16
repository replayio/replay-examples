import { atom } from "jotai";
import axios from "axios";
import { Todo } from "./types";

export const todosAtom = atom<Todo[]>([]);
export const updatingAtom = atom<boolean>(false);

export const fetchTodosAtom = atom(
  (get) => get(todosAtom),
  async (_, set) => {
    const res = await axios.get("/api/todos");
    set(todosAtom, res.data);
  }
);

export const addTodoAtom = atom(null, async (get, set, newTodo: string) => {
  const res = await axios.post("/api/todos", {
    title: newTodo,
    completed: false,
  });
  set(todosAtom, [...get(todosAtom), res.data]);
});

export const deleteTodoAtom = atom(null, async (get, set, todoId: number) => {
  set(updatingAtom, true);
  await axios.delete(`/api/todos/${todoId}`);
  set(updatingAtom, false);

  set(
    todosAtom,
    get(todosAtom).filter((t: Todo) => t.id !== todoId)
  );
});

export const completeTodoAtom = atom(null, async (get, set, todo: Todo) => {
  const res = await axios.put(`/api/todos/${todo.id}`, {
    completed: !todo.completed,
  });
  set(
    todosAtom,
    get(todosAtom).map((t: Todo) => (t.id === todo.id ? res.data : t))
  );
});

export const editTodoAtom = atom(
  null,
  async (get, set, todo: Pick<Todo, "title" | "id">) => {
    const res = await axios.put(`/api/todos/${todo.id}`, {
      title: todo.title,
    });
    set(
      todosAtom,
      get(todosAtom).map((t: Todo) => (t.id === todo.id ? res.data : t))
    );
  }
);
