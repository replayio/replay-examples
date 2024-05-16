import { TodoList } from "../src/components/TodoList";
import { AddTodo } from "../src/components/AddTodo";
import { Inbox } from "../src/components/icons/Inbox";
import { Spinner } from "../src/components/Spinner";
import { useAtom } from "jotai";
import {
  todosAtom,
  updatingAtom,
  deleteTodoAtom,
  fetchTodosAtom,
} from "../src/atoms";
import { useState, useEffect } from "react";

export default function Home() {
  const [, fetchTodos] = useAtom(fetchTodosAtom);
  const [loaded, setLoaded] = useState(false);
  const [updating] = useAtom(updatingAtom);

  useEffect(() => {
    fetchTodos().then(() => setLoaded(true));
  }, []);

  const [todos] = useAtom(todosAtom);
  const [, deleteTodo] = useAtom(deleteTodoAtom);

  return (
    <section
      data-test-updating={updating}
      data-test-loaded={loaded}
      className="h-screen w-screen bg-slate-800 flex items-center justify-center"
    >
      <div className="max-w-lg w-full bg-white rounded-xl overflow-hidden shadow-lg px-5 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            <Inbox className="fill-blue-500 inline-block mb-1 mr-2" />
            Todos
          </h1>
        </header>
        <div className="border-b border-gray-200 mb-6">
          <AddTodo />
        </div>
        {!loaded ? (
          <Spinner />
        ) : (
          <TodoList todos={todos} deleteTodo={deleteTodo} />
        )}
      </div>
    </section>
  );
}
