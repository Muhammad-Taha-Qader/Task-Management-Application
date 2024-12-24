"use client";

import { Task } from "@/types";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const router = useRouter();

  return (
    <div
      className="border p-4 rounded shadow hover:shadow-md cursor-pointer"
      onClick={() => router.push(`/task/${task._id}`)}
    >
      <h2 className="font-bold text-lg">{task.name}</h2>
      <p>{task.description}</p>
      <p className="text-gray-500 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="text-blue-500 text-sm hover:underline"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
