import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import { authMiddleware } from "@/lib/authMiddleware";

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === "POST") {
    const { name, description, dueDate } = req.body;

    console.log("Decoded User in Handler:", req.user);

    try {
      const task = await Task.create({
        user: req.user.userId, // Use userId from decoded token
        name,
        description,
        dueDate,
      });

      return res.status(201).json(task);
    } catch (error) {
      console.error("Error Creating Task:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
};

export default authMiddleware(handler);
