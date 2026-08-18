"use client";

import * as React from "react";
import {
  Check,
  CheckCircle2,
  ListTodo,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  getServerTodos,
  getTodos,
  setTodos,
  subscribeTodos,
} from "@/lib/todo-store";
import { FILTERS, titleSchema, type Filter, type Todo } from "@/types/todo";

function createTodo(title: string): Todo {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function TodoApp() {
  // Single source of truth: LocalStorage-backed external store.
  // `useSyncExternalStore` handles SSR, hydration and cross-tab updates.
  const todos = React.useSyncExternalStore(subscribeTodos, getTodos, getServerTodos);
  const [filter, setFilter] = React.useState<Filter>("all");
  const [newTitle, setNewTitle] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingTitle, setEditingTitle] = React.useState("");
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;
  const progress =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  const visibleTodos = React.useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  function handleAdd() {
    const parsed = titleSchema.safeParse(newTitle);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "無法新增任務");
      return;
    }
    setTodos([createTodo(parsed.data), ...todos]);
    setNewTitle("");
    toast.success("已新增任務");
  }

  function handleToggle(id: string, completed: boolean) {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed, updatedAt: new Date().toISOString() } : t
      )
    );
  }

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingTitle("");
  }

  function saveEdit(id: string) {
    const parsed = titleSchema.safeParse(editingTitle);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "無法儲存變更");
      return;
    }
    setTodos(
      todos.map((t) =>
        t.id === id
          ? { ...t, title: parsed.data, updatedAt: new Date().toISOString() }
          : t
      )
    );
    cancelEdit();
    toast.success("已更新任務");
  }

  function requestDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  function confirmDelete() {
    if (!deleteId) return;
    setTodos(todos.filter((t) => t.id !== deleteId));
    setDeleteOpen(false);
    setDeleteId(null);
    toast.success("已刪除任務");
  }

  function clearCompleted() {
    const count = completedCount;
    if (count === 0) return;
    setTodos(todos.filter((t) => !t.completed));
    toast.success(`已清除 ${count} 項完成的任務`);
  }

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-600/20" />
        <div className="absolute top-1/3 -right-32 size-96 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-600/15" />
        <div className="absolute -bottom-40 left-1/4 size-96 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-600/10" />
      </div>

      <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 py-10 sm:py-16">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
              <ListTodo className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">待辦清單</h1>
              <p className="text-xs text-muted-foreground">Todo List · 資料儲存於本機</p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Add form */}
        <form
          className="mb-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="新增一項任務…"
            aria-label="新增任務"
            className="h-10 flex-1 bg-card shadow-sm"
            maxLength={201}
          />
          <Button type="submit" size="lg" className="h-10 shrink-0 px-4" aria-label="送出新增任務">
            <Plus />
            <span className="hidden sm:inline">新增</span>
          </Button>
        </form>

        {/* Filter tabs */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label="篩選任務"
            className="inline-flex items-center gap-1 rounded-lg bg-muted p-1"
          >
            {FILTERS.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <Badge variant="secondary" className="shrink-0">
            {activeCount} 項待辦
          </Badge>
        </div>

        {/* Todo list */}
        {visibleTodos.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {visibleTodos.map((todo) => {
              const isEditing = editingId === todo.id;
              return (
                <li
                  key={todo.id}
                  className="group flex items-center gap-3 rounded-xl border bg-card/80 px-3 py-2.5 shadow-sm backdrop-blur transition-colors hover:border-primary/30 hover:bg-card"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={(checked) =>
                      handleToggle(todo.id, Boolean(checked))
                    }
                    aria-label={`標記「${todo.title}」為${todo.completed ? "未完成" : "已完成"}`}
                    className="size-5 shrink-0"
                  />

                  {isEditing ? (
                    <div className="flex flex-1 items-center gap-2">
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(todo.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                        autoFocus
                        maxLength={201}
                        aria-label="編輯任務內容"
                        className="h-8 flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="儲存"
                        onClick={() => saveEdit(todo.id)}
                        className="shrink-0 text-emerald-600 hover:text-emerald-600"
                      >
                        <Check />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="取消"
                        onClick={cancelEdit}
                        className="shrink-0"
                      >
                        <X />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`flex-1 text-sm sm:text-base transition-colors ${
                          todo.completed
                            ? "text-muted-foreground line-through decoration-muted-foreground/50"
                            : ""
                        }`}
                      >
                        {todo.title}
                      </span>
                      <div className="flex shrink-0 items-center gap-0.5 opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="編輯"
                          onClick={() => startEdit(todo)}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="刪除"
                          onClick={() => requestDelete(todo.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed bg-card/40 px-6 py-14 text-center">
            {todos.length === 0 ? (
              <>
                <ListTodo className="size-10 text-muted-foreground/60" />
                <div>
                  <p className="font-medium">還沒有任務</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    在上方輸入框新增你的第一項任務吧
                  </p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle2 className="size-10 text-emerald-500/70" />
                <div>
                  <p className="font-medium">
                    {filter === "completed" ? "還沒有已完成的任務" : "太好了，全部完成！"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    沒有符合目前篩選的任務
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        {todos.length > 0 && (
          <footer className="mt-6 rounded-xl border bg-card/60 p-4 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {completedCount}/{todos.length} 已完成 · 剩餘{" "}
                <span className="font-medium text-foreground">{activeCount}</span> 項
              </p>
              {completedCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 />
                  清除已完成
                </Button>
              )}
            </div>
            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="完成進度"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </footer>
        )}

        <p className="mt-8 text-center text-xs text-muted-foreground/80">
          資料僅儲存在此瀏覽器（LocalStorage），不會上傳到任何伺服器
        </p>
      </main>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>刪除任務？</DialogTitle>
            <DialogDescription>
              此操作無法復原。確定要刪除這項任務嗎？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 />
              刪除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
