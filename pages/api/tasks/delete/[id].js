import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import { authMiddleware } from "@/lib/authMiddleware";

const handler = async (req, res) => {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const task = await Task.findOneAndDelete({ _id: id, user: req.user.userId });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
};

export default authMiddleware(handler);
