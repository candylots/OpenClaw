import { z } from "zod";

/**
 * Zod schema for a single todo item.
 * Used both for runtime validation of user input and for
 * validating anything loaded back from LocalStorage.
 */
export const todoSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .trim()
    .min(1, "請輸入任務內容")
    .max(200, "任務內容最多 200 字"),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;

/** Schema for the whole persisted list. */
export const todosSchema = z.array(todoSchema);

export type Filter = "all" | "active" | "completed";

export const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "active", label: "進行中" },
  { value: "completed", label: "已完成" },
];

/** Schema for the add/edit form input. */
export const titleSchema = z
  .string()
  .trim()
  .min(1, "請輸入任務內容")
  .max(200, "任務內容最多 200 字");
