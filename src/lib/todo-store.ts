import { todosSchema, type Todo } from "@/types/todo";

const STORAGE_KEY = "openclaw-todo:todos:v1";

/**
 * Minimal external store backed by LocalStorage.
 * - `getTodos()` / `setTodos()` for reading & writing.
 * - `subscribeTodos()` so React can sync via `useSyncExternalStore`.
 * - Multi-tab sync via the native `storage` event.
 *
 * The module-level cache keeps `getSnapshot` referentially stable,
 * which `useSyncExternalStore` requires.
 */

let cache: Todo[] | null = null;
const listeners = new Set<() => void>();

function read(): Todo[] {
  if (cache) return cache;
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return (cache = []);
    const parsed = todosSchema.safeParse(JSON.parse(raw));
    return (cache = parsed.success ? parsed.data : []);
  } catch {
    return (cache = []);
  }
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

export function getTodos(): Todo[] {
  return read();
}

/** Server snapshot used during SSR / hydration. */
export function getServerTodos(): Todo[] {
  return [];
}

export function setTodos(todos: Todo[]): void {
  cache = todos;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Storage full / private mode — the in-memory state still works.
  }
  emit();
}

export function subscribeTodos(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
