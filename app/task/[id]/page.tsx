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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl">{task.name}</h1>
      <p>{task.description}</p>
      <p className="text-gray-500 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => router.push("/task")}
      >
        Back to Tasks
      </button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
