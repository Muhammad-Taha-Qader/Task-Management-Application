"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import useAuth from "@/lib/useAuth";
import { Task } from "@/types";

export default function TaskManagementPage() {
  const isAuthenticated = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  // Fetch tasks from the API
  const fetchTasks = async () => {
    const res = await fetch("/api/tasks/list", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for Create and Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditing ? `/api/tasks/update/${editTaskId}` : "/api/tasks/create";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ name: "", description: "", dueDate: "" });
      setIsEditing(false);
      setEditTaskId(null);
      fetchTasks();
    }
  };

  // Handle edit
  const handleEdit = (task: Task) => {
    setIsEditing(true);
    setEditTaskId(task._id);
    setFormData({
      name: task.name,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().split("T")[0],
    });
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/tasks/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (res.ok) {
      fetchTasks();
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchTasks();
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      {/* Header */}
      <header className="bg-zinc-900 text-zinc-200 py-6 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Task Management Dashboard</h1>
          <p className="text-lg mt-2 text-zinc-400">Organize your tasks efficiently</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="bg-zinc-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-zinc-100">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium text-zinc-300">
                Task Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Task Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium text-zinc-300">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="dueDate" className="block font-medium text-zinc-300">
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                {isEditing ? "Update Task" : "Add Task"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditTaskId(null);
                    setFormData({ name: "", description: "", dueDate: "" });
                  }}
                  className="bg-zinc-600 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-zinc-100">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-zinc-400">No tasks found. Add a task to get started.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-4 mt-8 shadow-md">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Task Management App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
