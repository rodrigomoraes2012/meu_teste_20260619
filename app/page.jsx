"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Circle,
  ClipboardList,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "todo-list-next-items";

const initialTodos = [
  {
    id: "welcome-1",
    title: "Criar minha primeira tarefa",
    completed: false,
    createdAt: 1,
  },
  {
    id: "welcome-2",
    title: "Marcar uma tarefa como concluida",
    completed: true,
    createdAt: 2,
  },
];

const filters = [
  { id: "all", label: "Todas" },
  { id: "active", label: "Pendentes" },
  { id: "completed", label: "Concluidas" },
];

function createTodo(title) {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  };
}

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [hasLoaded, todos]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remainingCount;

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos
      .filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      })
      .filter((todo) => todo.title.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => Number(a.completed) - Number(b.completed) || b.createdAt - a.createdAt);
  }, [filter, query, todos]);

  function handleSubmit(event) {
    event.preventDefault();

    const title = draft.trim();
    if (!title) return;

    setTodos((currentTodos) => [createTodo(title), ...currentTodos]);
    setDraft("");
    inputRef.current?.focus();
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed));
  }

  function startEditing(todo) {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingTitle("");
  }

  function saveEditing(id) {
    const title = editingTitle.trim();

    if (!title) {
      deleteTodo(id);
      cancelEditing();
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
    cancelEditing();
  }

  function resetList() {
    setTodos(initialTodos);
    setFilter("all");
    setQuery("");
    setDraft("");
    cancelEditing();
    inputRef.current?.focus();
  }

  return (
    <main className="page-shell">
      <section className="todo-app" aria-labelledby="app-title">
        <header className="app-header">
          <div className="title-group">
            <span className="app-icon" aria-hidden="true">
              <ClipboardList size={24} strokeWidth={2.2} />
            </span>
            <div>
              <p className="eyebrow">Next.js Todo</p>
              <h1 id="app-title">Lista de tarefas</h1>
            </div>
          </div>

          <button className="icon-button" type="button" onClick={resetList} title="Restaurar lista inicial">
            <RotateCcw size={18} />
            <span className="sr-only">Restaurar lista inicial</span>
          </button>
        </header>

        <form className="add-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="new-todo">
            Nova tarefa
          </label>
          <input
            id="new-todo"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Adicionar uma tarefa..."
            autoComplete="off"
          />
          <button type="submit" title="Adicionar tarefa">
            <Plus size={19} />
            <span>Adicionar</span>
          </button>
        </form>

        <div className="summary-grid" aria-label="Resumo da lista">
          <div>
            <span>{todos.length}</span>
            <p>Total</p>
          </div>
          <div>
            <span>{remainingCount}</span>
            <p>Pendentes</p>
          </div>
          <div>
            <span>{completedCount}</span>
            <p>Concluidas</p>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-field">
            <Search size={17} aria-hidden="true" />
            <label className="sr-only" htmlFor="todo-search">
              Buscar tarefas
            </label>
            <input
              id="todo-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar"
              autoComplete="off"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} title="Limpar busca">
                <X size={16} />
                <span className="sr-only">Limpar busca</span>
              </button>
            ) : null}
          </div>

          <div className="filter-tabs" aria-label="Filtrar tarefas">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={filter === item.id ? "active" : ""}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="todo-list" aria-label="Tarefas">
          {visibleTodos.map((todo) => {
            const isEditing = editingId === todo.id;

            return (
              <li key={todo.id} className={todo.completed ? "todo-item completed" : "todo-item"}>
                <button
                  className="check-button"
                  type="button"
                  onClick={() => toggleTodo(todo.id)}
                  title={todo.completed ? "Marcar como pendente" : "Marcar como concluida"}
                >
                  {todo.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                  <span className="sr-only">
                    {todo.completed ? "Marcar como pendente" : "Marcar como concluida"}
                  </span>
                </button>

                {isEditing ? (
                  <input
                    className="edit-input"
                    value={editingTitle}
                    onChange={(event) => setEditingTitle(event.target.value)}
                    onBlur={() => saveEditing(todo.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") saveEditing(todo.id);
                      if (event.key === "Escape") cancelEditing();
                    }}
                    autoFocus
                  />
                ) : (
                  <button className="todo-title" type="button" onDoubleClick={() => startEditing(todo)}>
                    {todo.title}
                  </button>
                )}

                <div className="todo-actions">
                  <button type="button" onClick={() => startEditing(todo)} title="Editar tarefa">
                    <Pencil size={17} />
                    <span className="sr-only">Editar tarefa</span>
                  </button>
                  <button type="button" onClick={() => deleteTodo(todo.id)} title="Excluir tarefa">
                    <Trash2 size={17} />
                    <span className="sr-only">Excluir tarefa</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {visibleTodos.length === 0 ? (
          <div className="empty-state">
            <ClipboardList size={32} strokeWidth={1.8} />
            <p>Nenhuma tarefa encontrada.</p>
          </div>
        ) : null}

        <footer className="app-footer">
          <span>
            {remainingCount === 1 ? "1 tarefa pendente" : `${remainingCount} tarefas pendentes`}
          </span>
          <button type="button" onClick={clearCompleted} disabled={completedCount === 0}>
            Limpar concluidas
          </button>
        </footer>
      </section>
    </main>
  );
}
