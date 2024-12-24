"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/types";

export default function SingleTaskPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();

  const fetchTask = async () => {
    const res = await fetch(`/api/tasks/list`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    const currentTask = data.find((item: Task) => item._id === params.id);
    setTask(currentTask);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return task ? (
    <div className="min-h-screen bg-black text-zinc-200 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-lg shadow-lg p-6">
        {/* Task Title */}
        <h1 className="text-3xl font-bold text-zinc-100 mb-4">{task.name}</h1>

        {/* Task Description */}
        <div className="bg-zinc-800 rounded-lg p-4 mb-6 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
          <h2 className="text-lg font-medium text-zinc-300 mb-2">Description</h2>
          <p className="text-zinc-400">{task.description}</p>
        </div>

        {/* Task Due Date */}
        <p className="text-sm text-zinc-400 mb-6">
          <span className="font-medium text-zinc-300">Due Date:</span>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>

        {/* Back Button */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition-all duration-300"
          onClick={() => router.push("/task")}
        >
          Back to Tasks
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-black text-zinc-200 flex justify-center items-center">
      <p className="text-xl text-zinc-400">Loading...</p>
    </div>
  );
}
