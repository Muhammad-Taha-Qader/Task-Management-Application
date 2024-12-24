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
      className="bg-zinc-950 border border-zinc-700 rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => router.push(`/task/${task._id}`)}
    >
      {/* Task Title */}
      <h2 className="text-xl font-bold text-zinc-100 mb-2 truncate">{task.name}</h2>

      {/* Task Description */}
      <div className="mb-4 max-h-24 overflow-y-auto text-zinc-400 text-sm pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
        <p>{task.description}</p>
      </div>

      {/* Task Due Date */}
      <p className="text-sm text-zinc-500 mb-4">
        <span className="font-medium">Due:</span>{" "}
        {new Date(task.dueDate).toLocaleDateString()}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="px-3 py-1 bg-green-600 text-sm text-white rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="px-3 py-1 bg-red-600 text-sm text-white rounded-lg hover:bg-red-700 transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
