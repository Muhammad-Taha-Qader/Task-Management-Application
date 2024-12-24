// "use client";
// import useAuth from "@/lib/useAuth"; // Custom hook for authentication

// export default function Task() {
//     const isAuthenticated = useAuth(); // Redirects to login if user is not authenticated
//     return (
//       <div className="">
//         <h1 className="text-2xl">Task-Management Panel</h1> 
//         <p>{isAuthenticated}</p>
//       </div>
  
//     );
//   }
  
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
      dueDate: new Date(task.dueDate).toISOString().split("T")[0], // Format date for input
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Task Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="dueDate" className="block font-medium">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
