import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import { authMiddleware } from "@/lib/authMiddleware";

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === "GET") {
    try {

        console.log("IN GET TASK ID:");
        console.log(req.user.userId);
      const tasks = await Task.find({ user: req.user.userId });
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
};

export default authMiddleware(handler);
